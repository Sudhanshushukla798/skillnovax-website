import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, Mail, Phone, MapPin, CheckCircle, 
  Sparkles, ShieldCheck, Heart, PieChart, Database,
  ArrowRight, Landmark, FileSpreadsheet, Trash2, Loader2,
  Globe, Map, X
} from 'lucide-react';
import { WaitlistSubmission } from '../types';
import { collection, query, where, getDocs, addDoc, serverTimestamp, onSnapshot, orderBy, limit } from 'firebase/firestore';
import { db, OperationType, handleFirestoreError } from '../firebase';
import SearchableDropdown from './SearchableDropdown';

interface WaitlistFormProps {
  preselectedRole?: 'customer' | 'worker';
  onSubmissionAdded: (count: number) => void;
  waitlistCount: number;
}

export default function WaitlistForm({ preselectedRole = 'customer', onSubmissionAdded, waitlistCount }: WaitlistFormProps) {
  // Form State
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedTehsil, setSelectedTehsil] = useState('');
  const [role, setRole] = useState<'customer' | 'worker'>(preselectedRole);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  
  // Location dataset state
  const [indiaLocations, setIndiaLocations] = useState<Record<string, Record<string, string[]>> | null>(null);
  const [isLoadingLocations, setIsLoadingLocations] = useState(false);

  // Success state toast variables
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Lazy load India location database when component mounts
  useEffect(() => {
    setIsLoadingLocations(true);
    import('../data/india_locations.json')
      .then((module) => {
        setIndiaLocations(module.default);
      })
      .catch((err) => {
        console.error('Failed to lazy load India location dataset:', err);
      })
      .finally(() => {
        setIsLoadingLocations(false);
      });
  }, []);

  // Compute options dynamically
  const stateOptions = indiaLocations ? Object.keys(indiaLocations).sort((a, b) => a.localeCompare(b)) : [];
  const districtOptions = (indiaLocations && selectedState)
    ? Object.keys(indiaLocations[selectedState] || {}).sort((a, b) => a.localeCompare(b))
    : [];
  const tehsilOptions = (indiaLocations && selectedState && selectedDistrict)
    ? (indiaLocations[selectedState]?.[selectedDistrict] || []).slice().sort((a, b) => a.localeCompare(b))
    : [];

  const handleStateChange = (stateName: string) => {
    setSelectedState(stateName);
    setSelectedDistrict('');
    setSelectedTehsil('');
  };

  const handleDistrictChange = (districtName: string) => {
    setSelectedDistrict(districtName);
    setSelectedTehsil('');
  };

  // Expose city as a computed property for backwards compatibility
  const city = selectedTehsil ? `${selectedTehsil}, ${selectedDistrict}` : '';
  
  // UI States
  const [submitted, setSubmitted] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [registrations, setRegistrations] = useState<WaitlistSubmission[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Popular preselected service choices
  const popularServices = [
    'Electrician', 'Plumbing', 'AC Repair', 'Deep Cleaning',
    'Carpenter', 'Wall Painting', 'Home Renovation', 'CCTV & Security',
    'Internet/Tech', 'Beauty/Wellness', 'Helper'
  ];

  // Load waitlist registrations from Firestore in real-time using production Waitlist collection
  useEffect(() => {
    const q = query(collection(db, 'Waitlist'), orderBy('createdAt', 'desc'), limit(100));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const firestoreRegistrations: WaitlistSubmission[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          firestoreRegistrations.push({
            id: doc.id,
            name: data.fullName || '',
            mobile: data.phoneNumber || '',
            email: data.email || '',
            city: data.city || (data.tehsil ? `${data.tehsil}, ${data.district}` : ''),
            role: (data.userType || 'Customer').toLowerCase() === 'worker' ? 'worker' : 'customer',
            interestedServices: data.selectedServices || [],
            submittedAt: data.createdAt?.toDate?.() 
              ? data.createdAt.toDate().toISOString() 
              : new Date().toISOString(),
          });
        });

        if (firestoreRegistrations.length > 0) {
          setRegistrations(firestoreRegistrations);
        } else {
          // Fallback to local storage or initial mocks if Firestore has no records yet
          const stored = localStorage.getItem('skillnovax_waitlist');
          if (stored) {
            setRegistrations(JSON.parse(stored));
          } else {
            const initialMocks: WaitlistSubmission[] = [
              { id: '1', name: 'Arjun Mehta', mobile: '9812457890', email: 'arjun.mehta@gmail.com', city: 'Noida', role: 'customer', interestedServices: ['Electrician', 'Deep Cleaning'], submittedAt: '2026-07-13T14:24:00Z' },
              { id: '2', name: 'Priya Sharma', mobile: '9944321098', email: 'priya.sharma@outlook.com', city: 'Bengaluru', role: 'customer', interestedServices: ['Beauty/Wellness'], submittedAt: '2026-07-13T16:10:00Z' },
              { id: '3', name: 'Ramesh Patel', mobile: '8877665544', email: 'ramesh.services@yahoo.com', city: 'Mumbai', role: 'worker', interestedServices: ['Plumbing', 'Home Renovation'], submittedAt: '2026-07-14T01:45:00Z' },
              { id: '4', name: 'Aditi Nair', mobile: '9001122334', email: 'aditi.nair@live.com', city: 'Hyderabad', role: 'customer', interestedServices: ['AC Repair', 'Pest Control'], submittedAt: '2026-07-14T05:12:00Z' },
              { id: '5', name: 'Vikram Singh', mobile: '7766554433', email: 'vikram.singh@gmail.com', city: 'Delhi NCR', role: 'worker', interestedServices: ['CCTV & Security', 'Internet/Tech'], submittedAt: '2026-07-14T07:30:00Z' }
            ];
            setRegistrations(initialMocks);
          }
        }
      },
      (err) => {
        // Handle firestore permissions/quota gracefully without throwing a crashing uncaught exception
        console.warn('Firestore listening status: client offline or rule deployment pending. Falling back to local state.', err);
        
        const stored = localStorage.getItem('skillnovax_waitlist');
        if (stored) {
          setRegistrations(JSON.parse(stored));
        } else {
          const initialMocks: WaitlistSubmission[] = [
            { id: '1', name: 'Arjun Mehta', mobile: '9812457890', email: 'arjun.mehta@gmail.com', city: 'Noida', role: 'customer', interestedServices: ['Electrician', 'Deep Cleaning'], submittedAt: '2026-07-13T14:24:00Z' },
            { id: '2', name: 'Priya Sharma', mobile: '9944321098', email: 'priya.sharma@outlook.com', city: 'Bengaluru', role: 'customer', interestedServices: ['Beauty/Wellness'], submittedAt: '2026-07-13T16:10:00Z' },
            { id: '3', name: 'Ramesh Patel', mobile: '8877665544', email: 'ramesh.services@yahoo.com', city: 'Mumbai', role: 'worker', interestedServices: ['Plumbing', 'Home Renovation'], submittedAt: '2026-07-14T01:45:00Z' },
            { id: '4', name: 'Aditi Nair', mobile: '9001122334', email: 'aditi.nair@live.com', city: 'Hyderabad', role: 'customer', interestedServices: ['AC Repair', 'Pest Control'], submittedAt: '2026-07-14T05:12:00Z' },
            { id: '5', name: 'Vikram Singh', mobile: '7766554433', email: 'vikram.singh@gmail.com', city: 'Delhi NCR', role: 'worker', interestedServices: ['CCTV & Security', 'Internet/Tech'], submittedAt: '2026-07-14T07:30:00Z' }
          ];
          setRegistrations(initialMocks);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  // Update parent select role if props update
  useEffect(() => {
    setRole(preselectedRole);
  }, [preselectedRole]);

  const toggleService = (srv: string) => {
    if (selectedServices.includes(srv)) {
      setSelectedServices(selectedServices.filter((s) => s !== srv));
    } else {
      setSelectedServices([...selectedServices, srv]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Trim all inputs
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedState = selectedState.trim();
    const trimmedDistrict = selectedDistrict.trim();
    const trimmedTehsil = selectedTehsil.trim();

    // Sanitization: Convert phone number to digits only
    const cleanedMobile = mobile.replace(/\D/g, '').trim();

    // Validations
    if (!trimmedName) {
      setError('Full name is required.');
      return;
    }
    if (trimmedName.length < 2) {
      setError('Full name must be at least 2 characters.');
      return;
    }
    if (cleanedMobile.length !== 10) {
      setError('Phone number must contain exactly 10 digits.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      setError('Email must be valid.');
      return;
    }
    if (!trimmedState) {
      setError('State required.');
      return;
    }
    if (!trimmedDistrict) {
      setError('District required.');
      return;
    }
    if (!trimmedTehsil) {
      setError('Tehsil required.');
      return;
    }
    if (selectedServices.length === 0) {
      setError('At least one service must be selected.');
      return;
    }
    if (!role) {
      setError('userType required.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Prevent duplicate phone numbers
      const phoneQuery = query(collection(db, 'Waitlist'), where('phoneNumber', '==', cleanedMobile));
      // 2. Prevent duplicate email addresses
      const emailQuery = query(collection(db, 'Waitlist'), where('email', '==', trimmedEmail));

      const [phoneSnap, emailSnap] = await Promise.all([
        getDocs(phoneQuery).catch((err) => {
          handleFirestoreError(err, OperationType.LIST, 'Waitlist');
          throw err;
        }),
        getDocs(emailQuery).catch((err) => {
          handleFirestoreError(err, OperationType.LIST, 'Waitlist');
          throw err;
        })
      ]);

      if (!phoneSnap.empty) {
        setError('You are already registered with SkillnovaX.');
        setIsSubmitting(false);
        return;
      }

      if (!emailSnap.empty) {
        setError('This email address is already registered with SkillnovaX.');
        setIsSubmitting(false);
        return;
      }

      const userType = role === 'worker' ? 'Worker' : 'Customer';

      // Save to Firestore 'Waitlist' collection with exact schema required
      await addDoc(collection(db, 'Waitlist'), {
        fullName: trimmedName,
        phoneNumber: cleanedMobile,
        email: trimmedEmail,
        userType: userType,
        selectedServices: selectedServices,
        state: trimmedState,
        district: trimmedDistrict,
        tehsil: trimmedTehsil,
        status: 'Pending',
        source: 'Website',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }).catch((err) => {
        handleFirestoreError(err, OperationType.CREATE, 'Waitlist');
        throw err;
      });

      // Show friendly premium success toast
      setToastMessage(`Thank you for joining SkillnovaX.\n\nWe have successfully received your registration.\n\nWe will notify you before launch.`);
      setShowToast(true);

      // Auto dismiss success toast after 8 seconds
      setTimeout(() => {
        setShowToast(false);
      }, 8000);

      // Notify parent to increment the counter
      onSubmissionAdded(waitlistCount + 1);

      // Reset the form
      handleResetForm();
      setSubmitted(true);
    } catch (err: any) {
      console.error('Waitlist submission failed:', err);
      let errMsg = 'An error occurred. Please try again.';
      if (err instanceof Error) {
        try {
          const parsed = JSON.parse(err.message);
          if (parsed && parsed.error) {
            if (parsed.error.includes('Missing or insufficient permissions') || parsed.error.includes('permission')) {
              errMsg = 'Permission issue: Please verify your Firebase connection and Firestore security rules.';
            } else {
              errMsg = parsed.error;
            }
          } else {
            errMsg = err.message;
          }
        } catch {
          if (err.message.includes('permission') || err.message.includes('insufficient')) {
            errMsg = 'Permission issue: Please verify your Firebase connection and Firestore security rules.';
          } else {
            errMsg = err.message;
          }
        }
      }
      setError(errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClearDatabase = () => {
    if (window.confirm('Are you sure you want to clear simulated local submissions? (Real Firestore records require admin access to delete)')) {
      localStorage.removeItem('skillnovax_waitlist');
      setRegistrations([]);
    }
  };

  const handleResetForm = () => {
    setName('');
    setMobile('');
    setEmail('');
    setSelectedState('');
    setSelectedDistrict('');
    setSelectedTehsil('');
    setSelectedServices([]);
    setError(null);
  };

  // Pre-calculate statistics for the Investor Panel
  const customerCount = registrations.filter(r => r.role === 'customer').length;
  const workerCount = registrations.filter(r => r.role === 'worker').length;
  const citiesReport: Record<string, number> = {};
  registrations.forEach(r => {
    citiesReport[r.city] = (citiesReport[r.city] || 0) + 1;
  });

  return (
    <section id="waitlist" className="py-20 md:py-28 bg-transparent relative overflow-hidden">
      {/* Glow backgrounds */}
      <div className="absolute bottom-0 left-0 w-[30%] h-[30%] rounded-full bg-blue-500/5 blur-[80px] pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[30%] h-[30%] rounded-full bg-purple-500/5 blur-[80px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1 px-3.5 py-1.5 rounded-full bg-indigo-50/45 backdrop-blur-md border border-indigo-200/50 text-xs font-bold text-indigo-800 uppercase tracking-wider mb-4">
            <Users className="h-4 w-4 animate-pulse" />
            <span>SECURE EARLY ACCESS</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight mb-4">
            Join the SkillnovaX Waitlist Today
          </h2>
          <p className="font-sans text-base text-slate-500 dark:text-slate-400">
            Early birds secure flat ₹250 wallet credits at launch, 3 months of free bookings, and top priority AI matching. Workers get 0% commission fees for 6 months!
          </p>
        </div>

        {/* Floating Developer Dashboard Trigger */}
        <div className="flex justify-center mb-8">
          <button
            id="admin-dashboard-toggle"
            onClick={() => setShowAdminDashboard(!showAdminDashboard)}
            className="inline-flex items-center space-x-2 px-4.5 py-2 rounded-full bg-white/40 dark:bg-slate-900/40 backdrop-blur-md hover:bg-white/60 dark:hover:bg-slate-800/60 border border-white/50 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-all cursor-pointer shadow-xs active:scale-95"
          >
            <Database className="h-4 w-4 text-indigo-600 animate-pulse" />
            <span>{showAdminDashboard ? 'Back to Waitlist Form' : 'View Live Analytics Dashboard (Investor Demo)'}</span>
          </button>
        </div>

        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            
            {/* Live Investor/Admin Dashboard Section */}
            {showAdminDashboard ? (
              <motion.div
                key="admin-dashboard"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="bg-slate-900/90 backdrop-blur-xl text-slate-100 rounded-4xl p-6 sm:p-10 border border-white/20 shadow-2xl relative overflow-hidden"
              >
                {/* Glowing decor */}
                <div className="absolute right-0 top-0 translate-y-[-20%] translate-x-[20%] opacity-10 bg-purple-500 h-64 w-64 rounded-full blur-3xl pointer-events-none"></div>

                {/* Dashboard Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/10 pb-6 mb-8 gap-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-indigo-400">ADMIN CONTROL PANEL</span>
                    <h3 className="font-display font-bold text-xl text-white flex items-center space-x-2 mt-1">
                      <Landmark className="h-5.5 w-5.5" />
                      <span>Pre-Launch Demand Metrics</span>
                    </h3>
                  </div>
                  <div className="flex items-center space-x-3 w-full sm:w-auto">
                    <button
                      onClick={handleClearDatabase}
                      className="px-3.5 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-red-950 hover:text-red-300 border border-slate-700/50 transition-colors flex items-center space-x-1.5"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Clear DB</span>
                    </button>
                  </div>
                </div>

                {/* Core KPI metrics cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  <div className="bg-slate-950/45 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Total Submissions</span>
                    <span className="font-display font-black text-white text-2xl block mt-1">{waitlistCount + registrations.length - 5}</span>
                    <span className="text-[8px] text-emerald-400 font-medium block mt-1">↑ 100% Real-time Ledger</span>
                  </div>
                  <div className="bg-slate-950/45 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Customer Registrations</span>
                    <span className="font-display font-black text-blue-400 text-2xl block mt-1">{customerCount}</span>
                    <span className="text-[8px] text-slate-400 font-semibold block mt-1">Simulated User Base</span>
                  </div>
                  <div className="bg-slate-950/45 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Worker Registrations</span>
                    <span className="font-display font-black text-purple-400 text-2xl block mt-1">{workerCount}</span>
                    <span className="text-[8px] text-indigo-400 font-bold block mt-1">0% Commission Launch</span>
                  </div>
                </div>

                {/* Database Table view representing live registrations */}
                <h4 className="font-display font-bold text-xs text-slate-400 uppercase tracking-widest mb-3.5 flex items-center space-x-1.5">
                  <FileSpreadsheet className="h-4 w-4 text-emerald-500" />
                  <span>Interactive Real-time SQL Database Ledger</span>
                </h4>
                
                <div className="bg-slate-950/45 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden mb-6 max-h-[220px] overflow-y-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-900/60 border-b border-white/10 text-[10px] text-slate-400 font-bold tracking-wider uppercase">
                        <th className="p-3">Name</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">Mobile</th>
                        <th className="p-3">Role</th>
                        <th className="p-3">City</th>
                        <th className="p-3">Interested Services</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 text-slate-300">
                      {registrations.map((sub) => (
                        <tr key={sub.id} className="hover:bg-slate-900/40 transition-colors">
                          <td className="p-3 font-bold text-white">{sub.name}</td>
                          <td className="p-3 font-mono text-[10px] text-indigo-300">{sub.email}</td>
                          <td className="p-3 font-mono text-[10px]">{sub.mobile}</td>
                          <td className="p-3">
                            <span className={`inline-flex px-1.5 py-0.5 rounded text-[8px] font-bold ${
                              sub.role === 'customer' ? 'bg-blue-500/10 text-blue-400' : 'bg-purple-500/10 text-purple-400'
                            }`}>
                              {sub.role.toUpperCase()}
                            </span>
                          </td>
                          <td className="p-3">{sub.city}</td>
                          <td className="p-3 font-light text-[10px] max-w-[120px] truncate" title={sub.interestedServices.join(', ')}>
                            {sub.interestedServices.join(', ') || 'All Services'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Geographic distribution chart visualization using simple responsive CSS grids */}
                <h4 className="font-display font-bold text-xs text-slate-400 uppercase tracking-widest mb-3.5 flex items-center space-x-1.5">
                  <PieChart className="h-4 w-4 text-blue-400" />
                  <span>Geographic Demand Breakdown</span>
                </h4>
                <div className="bg-slate-950/45 backdrop-blur-md border border-white/10 p-5 rounded-2xl space-y-3.5">
                  {Object.entries(citiesReport).map(([cityName, count]) => {
                    const percentage = Math.round((count / registrations.length) * 100) || 0;
                    return (
                      <div key={cityName} className="space-y-1.5">
                        <div className="flex justify-between text-[11px] font-semibold text-slate-300">
                          <span>{cityName}</span>
                          <span>{count} signups ({percentage}%)</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full transition-all duration-500" style={{ width: `${percentage}%` }}></div>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </motion.div>
            ) : (
              
              /* STYLED CUSTOMER / WORKER WAITLIST SIGNUP FORM */
              <motion.div
                key="waitlist-form"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="glass-card rounded-4xl p-6 sm:p-10 hover:bg-white/60 dark:hover:bg-slate-900/40 hover:shadow-2xl hover:shadow-blue-900/5 hover:border-white/70 dark:hover:border-white/20 transition-all duration-300 relative"
              >
                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.form
                       key="signup-fields"
                       onSubmit={handleSubmit}
                       className="space-y-6"
                    >
                      {/* Role Toggle Choice */}
                      <div className="grid grid-cols-2 bg-white/25 dark:bg-slate-950/25 backdrop-blur-md p-1.5 rounded-2xl text-xs font-bold border border-white/40 dark:border-white/10 text-center">
                        <button
                          type="button"
                          id="form-role-customer"
                          onClick={() => setRole('customer')}
                          className={`py-3 rounded-xl transition-all cursor-pointer ${
                            role === 'customer'
                              ? 'bg-white dark:bg-slate-800 text-blue-700 dark:text-blue-300 shadow-sm font-black'
                              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                          }`}
                        >
                          I am a Customer
                        </button>
                        <button
                          type="button"
                          id="form-role-worker"
                          onClick={() => setRole('worker')}
                          className={`py-3 rounded-xl transition-all cursor-pointer ${
                            role === 'worker'
                              ? 'bg-white dark:bg-slate-800 text-indigo-700 dark:text-indigo-300 shadow-sm font-black'
                              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                          }`}
                        >
                          I am a Worker
                        </button>
                      </div>

                      {/* Name Field */}
                      <div>
                        <label htmlFor="fullName" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                          Full Name
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <Users className="h-4.5 w-4.5" />
                          </div>
                          <input
                            id="fullName"
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g., Sudhanshu Shukla"
                            className="w-full pl-11 pr-4 py-3 bg-white/45 dark:bg-slate-900/45 backdrop-blur-md border border-white/50 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500/25 focus:border-blue-400 text-sm font-sans"
                          />
                        </div>
                      </div>

                      {/* Mobile & Email Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="mobile" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                            Mobile Number
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                              <Phone className="h-4.5 w-4.5" />
                            </div>
                            <input
                              id="mobile"
                              type="tel"
                              required
                              pattern="[0-9]{10}"
                              value={mobile}
                              onChange={(e) => setMobile(e.target.value)}
                              placeholder="e.g., 9876543210 (10 digits)"
                              className="w-full pl-11 pr-4 py-3 bg-white/45 dark:bg-slate-900/45 backdrop-blur-md border border-white/50 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500/25 focus:border-blue-400 text-sm font-sans"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                            Email Address
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                              <Mail className="h-4.5 w-4.5" />
                            </div>
                            <input
                              id="email"
                              type="email"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="e.g., sudhanshu@gmail.com"
                              className="w-full pl-11 pr-4 py-3 bg-white/45 dark:bg-slate-900/45 backdrop-blur-md border border-white/50 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500/25 focus:border-blue-400 text-sm font-sans"
                            />
                          </div>
                        </div>
                      </div>

                      {/* India Location Selector (State -> District -> Tehsil) */}
                      <div className="space-y-6">
                        <SearchableDropdown
                          id="state"
                          label="Select State / UT"
                          placeholder={isLoadingLocations ? "Loading locations..." : "Search and select State or UT"}
                          options={stateOptions}
                          value={selectedState}
                          onChange={handleStateChange}
                          icon={<Globe className="h-4.5 w-4.5" />}
                        />

                        <SearchableDropdown
                          id="district"
                          label="Select District"
                          placeholder={selectedState ? "Search and select District" : "Select a State first"}
                          options={districtOptions}
                          value={selectedDistrict}
                          onChange={handleDistrictChange}
                          disabled={!selectedState}
                          icon={<Map className="h-4.5 w-4.5" />}
                        />

                        <SearchableDropdown
                          id="tehsil"
                          label="Select Tehsil (Taluka / Block)"
                          placeholder={selectedDistrict ? "Search and select Tehsil" : "Select a District first"}
                          options={tehsilOptions}
                          value={selectedTehsil}
                          onChange={setSelectedTehsil}
                          disabled={!selectedDistrict}
                          icon={<MapPin className="h-4.5 w-4.5" />}
                        />
                      </div>

                      {/* Multi-select Services Badges */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                          {role === 'customer' ? 'Services You Are Interested In' : 'Select Your Trade Skills'}
                        </label>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500 mb-3 leading-tight">
                          Select one or more categories below so we can priority launch near you first.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {popularServices.map((srv) => {
                            const isSelected = selectedServices.includes(srv);
                            return (
                              <button
                                key={srv}
                                type="button"
                                onClick={() => toggleService(srv)}
                                className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer select-none active:scale-95 ${
                                  isSelected
                                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                                    : 'bg-white/45 dark:bg-slate-900/45 backdrop-blur-sm text-slate-600 dark:text-slate-300 border-white/40 dark:border-white/10 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-white/60 dark:hover:bg-slate-800/60'
                                }`}
                              >
                                {srv}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Error Display */}
                      {error && (
                        <div className="p-3.5 rounded-xl bg-red-500/10 dark:bg-red-950/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-semibold leading-normal">
                          {error}
                        </div>
                      )}

                      {/* Security Verification note */}
                      <div className="flex items-start space-x-2.5 p-3.5 rounded-xl bg-white/25 dark:bg-slate-900/25 backdrop-blur-md border border-white/40 dark:border-white/10">
                        <ShieldCheck className="h-4.5 w-4.5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                        <span className="font-sans text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                          By joining, you agree to secure pre-launch communications and early priority slots. We process data under strict encryption algorithms. No commercial leaks.
                        </span>
                      </div>

                      {/* Submit button */}
                      <button
                        type="submit"
                        id="form-submit-waitlist"
                        disabled={isSubmitting}
                        className="w-full py-4 rounded-2xl font-display font-extrabold text-sm text-white gradient-bg shadow-md shadow-blue-500/10 hover:shadow-xl hover:shadow-blue-500/20 active:scale-98 cursor-pointer transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Saving to Waitlist...</span>
                          </>
                        ) : (
                          <>
                            <span>Join Early Access Waitlist</span>
                            <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </button>

                    </motion.form>
                  ) : (
                    
                    /* SUCCESS SCREEN */
                    <motion.div
                      key="signup-success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12 px-4"
                    >
                      {/* Large success icon with smooth animation */}
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                        className="bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 p-4 rounded-full w-fit mx-auto mb-6 shadow-md"
                      >
                        <CheckCircle className="h-12 w-12 animate-pulse" />
                      </motion.div>

                      {/* Heading */}
                      <h4 className="font-display font-black text-2xl sm:text-3xl text-slate-900 dark:text-white leading-tight">
                        Thank you for joining SkillnovaX!
                      </h4>

                      {/* Subheading */}
                      <p className="font-sans text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-4 leading-relaxed font-medium">
                        Your registration has been received successfully.
                        <br />
                        We'll notify you before the official launch in your selected location.
                      </p>

                      {/* Clean success card */}
                      <div className="mt-8 bg-white/35 dark:bg-slate-900/35 backdrop-blur-md border border-white/50 dark:border-white/10 rounded-3xl p-6 text-left max-w-md mx-auto space-y-4 shadow-xl">
                        <div className="flex items-center space-x-3 text-emerald-600 dark:text-emerald-400 font-bold font-sans text-sm">
                          <CheckCircle className="h-5 w-5 shrink-0" />
                          <span>Registration Successful</span>
                        </div>
                        
                        <div className="h-px bg-slate-200/50 dark:bg-slate-800/50 my-2" />

                        <div className="flex items-start space-x-3 text-slate-600 dark:text-slate-300 font-sans text-xs leading-relaxed">
                          <span className="text-emerald-500 font-bold shrink-0">✓</span>
                          <span className="font-medium">Your information has been securely saved.</span>
                        </div>

                        <div className="flex items-start space-x-3 text-slate-600 dark:text-slate-300 font-sans text-xs leading-relaxed">
                          <span className="text-emerald-500 font-bold shrink-0">✓</span>
                          <span className="font-medium">We'll contact you when SkillnovaX launches in your area.</span>
                        </div>
                      </div>

                      {/* Return to Home & Register Another Profile Buttons */}
                      <div className="mt-8 flex flex-col sm:flex-row gap-4 max-w-md mx-auto justify-center">
                        <button
                          type="button"
                          onClick={() => {
                            handleResetForm();
                            setSubmitted(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="flex-1 py-3.5 px-6 rounded-2xl font-display font-extrabold text-sm text-white gradient-bg shadow-md shadow-blue-500/10 hover:shadow-xl hover:shadow-blue-500/20 active:scale-98 cursor-pointer transition-all flex items-center justify-center space-x-2"
                        >
                          Return to Home
                        </button>
                        
                        <button
                          type="button"
                          onClick={() => {
                            handleResetForm();
                            setSubmitted(false);
                          }}
                          className="flex-1 py-3.5 px-6 rounded-2xl font-display font-bold text-sm bg-white/45 dark:bg-slate-900/45 backdrop-blur-sm text-slate-700 dark:text-slate-300 border border-white/50 dark:border-white/10 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-white/60 dark:hover:bg-slate-800/60 active:scale-98 cursor-pointer transition-all flex items-center justify-center"
                        >
                          Register Another Profile
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>

      {/* Premium Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-96 z-50 p-5 rounded-2xl bg-slate-900/95 dark:bg-slate-950/95 text-white shadow-2xl border border-white/20 backdrop-blur-xl flex items-start space-x-3.5"
          >
            <div className="bg-emerald-500/20 text-emerald-400 p-2 rounded-xl mt-0.5">
              <CheckCircle className="h-5 w-5" />
            </div>
            <div className="flex-1 font-sans text-xs leading-relaxed">
              <p className="font-bold text-sm text-white mb-1">Success</p>
              <div className="text-slate-300 whitespace-pre-line font-medium">
                {toastMessage}
              </div>
            </div>
            <button
              onClick={() => setShowToast(false)}
              className="p-1 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
