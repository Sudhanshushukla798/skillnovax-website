import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, MapPin, ShieldCheck, Clock, User, 
  CheckCircle, Search, Star, Bell, Plus, 
  ArrowRight, DollarSign, Users, Award, Eye
} from 'lucide-react';

interface PhoneSimulatorProps {
  initialTab?: 'customer' | 'worker' | 'admin';
  waitlistCount?: number;
}

export default function PhoneSimulator({ initialTab = 'customer', waitlistCount = 1420 }: PhoneSimulatorProps) {
  const [activeTab, setActiveTab] = useState<'customer' | 'worker' | 'admin'>(initialTab);
  
  // Customer App State
  const [bookingStep, setBookingStep] = useState<'browse' | 'matching' | 'tracking' | 'completed'>('browse');
  const [selectedCategory, setSelectedCategory] = useState<string>('Electrical');
  const [timerText, setTimerText] = useState<string>('');
  
  // Worker App State
  const [workerStatus, setWorkerStatus] = useState<'offline' | 'searching' | 'alert' | 'active' | 'payout' | 'online'>('online');
  const [earnings, setEarnings] = useState(14850);
  
  // Simulated tracking coordinates / progress
  const [progress, setProgress] = useState(0);

  // Trigger simulated AI matching
  const startMatching = () => {
    setBookingStep('matching');
    let count = 0;
    const interval = setInterval(() => {
      count += 1;
      if (count === 1) setTimerText('Analyzing location...');
      if (count === 2) setTimerText('Vetting local electricians...');
      if (count === 3) setTimerText('Checking Aadhaar verification status...');
      if (count === 4) setTimerText('Connecting with Rajesh Kumar (4.9★)...');
      if (count === 5) {
        clearInterval(interval);
        setBookingStep('tracking');
        setProgress(0);
      }
    }, 1000);
  };

  // Simulate active worker travel
  useEffect(() => {
    if (bookingStep === 'tracking') {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setBookingStep('completed'), 1000);
            return 100;
          }
          return prev + 10;
        });
      }, 800);
      return () => clearInterval(interval);
    }
  }, [bookingStep]);

  return (
    <div className="relative mx-auto w-full max-w-[340px] flex flex-col items-center">
      {/* Device Tab Selector */}
      <div className="flex bg-white/20 dark:bg-slate-900/45 backdrop-blur-md p-1 rounded-xl mb-4 w-full text-xs font-semibold shadow-inner border border-white/40 dark:border-white/10">
        <button
          onClick={() => setActiveTab('customer')}
          className={`flex-1 py-1.5 rounded-lg text-center transition-all cursor-pointer ${
            activeTab === 'customer'
              ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm'
              : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
          }`}
        >
          Customer App
        </button>
        <button
          onClick={() => setActiveTab('worker')}
          className={`flex-1 py-1.5 rounded-lg text-center transition-all cursor-pointer ${
            activeTab === 'worker'
              ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
              : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
          }`}
        >
          Worker App
        </button>
        <button
          onClick={() => setActiveTab('admin')}
          className={`flex-1 py-1.5 rounded-lg text-center transition-all cursor-pointer ${
            activeTab === 'admin'
              ? 'bg-white dark:bg-slate-800 text-purple-600 dark:text-purple-400 shadow-sm'
              : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
          }`}
        >
          Admin Panel
        </button>
      </div>

      {/* Main Phone Frame Container */}
      <div className="relative w-full aspect-[9/19] rounded-[48px] border-[10px] border-slate-900 bg-slate-950 shadow-2xl shadow-blue-500/10 overflow-hidden flex flex-col select-none">
        {/* Notch / Dynamic Island */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-full z-30 flex items-center justify-center">
          <div className="w-2.5 h-2.5 bg-slate-800 rounded-full ml-auto mr-4"></div>
        </div>

        {/* Status Bar */}
        <div className="h-10 px-6 flex items-end justify-between text-[11px] font-medium text-slate-400 z-20 pb-1">
          <span>09:41 AM</span>
          <div className="flex items-center space-x-1.5">
            <span className="w-3.5 h-2 bg-slate-400 rounded-xs"></span>
            <span className="w-2 h-2 bg-slate-400 rounded-full"></span>
          </div>
        </div>

        {/* Live Interface Screen Area */}
        <div className="flex-1 bg-slate-50 relative overflow-hidden flex flex-col text-slate-800 text-xs font-sans">
          
          {/* CUSTOMER SCREEN SIMULATOR */}
          <AnimatePresence mode="wait">
            {activeTab === 'customer' && (
              <motion.div
                key="customer-screen"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="flex-1 flex flex-col p-4 bg-slate-50 overflow-y-auto"
              >
                {/* Simulated App Header */}
                <div className="flex items-center justify-between mb-3 mt-1">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4.5 w-4.5 text-blue-600 animate-bounce" />
                    <div>
                      <div className="font-bold text-[10px] text-slate-400">YOUR LOCATION</div>
                      <div className="font-extrabold text-[11px] text-slate-800">DLF Phase 3, Gurugram</div>
                    </div>
                  </div>
                  <div className="relative">
                    <Bell className="h-5 w-5 text-slate-600" />
                    <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                  </div>
                </div>

                {/* Simulated Content Based on Stage */}
                {bookingStep === 'browse' && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex-1 flex flex-col"
                  >
                    {/* Search Bar */}
                    <div className="bg-slate-100 p-2.5 rounded-xl flex items-center space-x-2 text-slate-400 border border-slate-200/50 mb-3.5">
                      <Search className="h-4 w-4" />
                      <span>Search electrical, plumbers...</span>
                    </div>

                    {/* AI Smart Prompt Banner */}
                    <div className="gradient-bg-light text-white p-3 rounded-2xl mb-4 shadow-md relative overflow-hidden">
                      <div className="absolute right-0 bottom-0 translate-y-3 translate-x-1 opacity-20">
                        <Zap className="h-20 w-20 text-white fill-current" />
                      </div>
                      <div className="font-bold text-xs">AI Smart Matching</div>
                      <p className="text-[10px] text-blue-100 mt-1 max-w-[80%] leading-relaxed">
                        Describe what needs fixing, or select a category below to instantly matching checked experts.
                      </p>
                    </div>

                    {/* Quick Selection Cards */}
                    <div className="font-extrabold text-slate-800 text-[11px] mb-2 uppercase tracking-wider">Popular Services</div>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {[
                        { name: 'Electrical', icon: 'Zap', color: 'bg-amber-100 text-amber-700 border-amber-200' },
                        { name: 'Plumbing', icon: 'Droplet', color: 'bg-blue-100 text-blue-700 border-blue-200' },
                        { name: 'AC Service', icon: 'Tv', color: 'bg-teal-100 text-teal-700 border-teal-200' },
                        { name: 'Deep Clean', icon: 'Sparkles', color: 'bg-purple-100 text-purple-700 border-purple-200' }
                      ].map((cat) => (
                        <button
                          key={cat.name}
                          onClick={() => setSelectedCategory(cat.name)}
                          className={`p-2.5 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
                            selectedCategory === cat.name
                              ? 'border-blue-500 bg-blue-50/50 ring-2 ring-blue-100 scale-[0.98]'
                              : 'border-slate-200 bg-white hover:border-slate-300'
                          }`}
                        >
                          <span className="font-bold text-[11px] mt-1">{cat.name}</span>
                        </button>
                      ))}
                    </div>

                    {/* Simulated Match Trigger Button */}
                    <button
                      onClick={startMatching}
                      className="mt-auto w-full py-3 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-md shadow-blue-600/20 flex items-center justify-center space-x-1.5 hover:bg-blue-700 active:scale-98 transition-all"
                    >
                      <span>Find AI Match for {selectedCategory}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </motion.div>
                )}

                {bookingStep === 'matching' && (
                  <motion.div
                    key="matching-flow"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex-1 flex flex-col items-center justify-center text-center px-2 py-6"
                  >
                    <div className="relative mb-6">
                      {/* Pulse Animations */}
                      <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping"></div>
                      <div className="relative gradient-bg-light p-5 rounded-full text-white shadow-lg">
                        <Zap className="h-10 w-10 fill-current animate-pulse" />
                      </div>
                    </div>
                    <h4 className="font-extrabold text-sm text-slate-800">SkillnovaX AI Engine</h4>
                    <p className="text-slate-500 text-[10px] mt-1 max-w-[180px] leading-relaxed">
                      Scanning for verified {selectedCategory} professionals within 2.5km...
                    </p>
                    
                    <div className="mt-8 bg-white p-3 rounded-xl border border-slate-200 shadow-sm w-full">
                      <div className="flex items-center space-x-2 text-[10px] text-slate-600 font-medium">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="animate-pulse">{timerText || 'Initializing neural match...'}</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full w-[70%] rounded-full animate-[shimmer_1.5s_infinite]"></div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {bookingStep === 'tracking' && (
                  <motion.div
                    key="tracking-flow"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex-1 flex flex-col"
                  >
                    <div className="bg-emerald-50 border border-emerald-100 p-2 rounded-xl text-emerald-800 font-semibold text-[10px] text-center mb-3">
                      ✓ AI MATCH SECURED • VERIFIED EXPERT DISPATCHED
                    </div>

                    {/* Matched Worker Card */}
                    <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-3 mb-4">
                      <div className="relative">
                        <div className="w-10 h-10 bg-slate-200 rounded-full overflow-hidden flex items-center justify-center font-display font-extrabold text-slate-600 border border-slate-100">
                          RK
                        </div>
                        <span className="absolute bottom-0 right-0 h-3 w-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-1">
                          <span className="font-extrabold text-[12px] truncate text-slate-900">Rajesh Kumar</span>
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-blue-50 border border-blue-100 text-[8px] font-bold text-blue-700 space-x-0.5">
                            <ShieldCheck className="h-2 w-2 fill-current" />
                            <span>Aadhaar</span>
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500 font-medium">Verified Electrician • 6 Yrs Exp</p>
                        <div className="flex items-center space-x-1 text-[10px] font-bold text-amber-500 mt-0.5">
                          <Star className="h-3 w-3 fill-current" />
                          <span>4.9</span>
                          <span className="text-slate-400 font-normal">(184 jobs)</span>
                        </div>
                      </div>
                    </div>

                    {/* Interactive Mock Map Tracking Graph */}
                    <div className="flex-1 bg-slate-200 rounded-2xl border border-slate-300/40 p-2 relative overflow-hidden flex flex-col justify-end min-h-[120px] shadow-inner">
                      {/* Grid design representing roads */}
                      <div className="absolute inset-0 bg-grid opacity-30"></div>
                      <div className="absolute top-4 left-6 h-1 w-24 bg-slate-300 rounded-full rotate-12"></div>
                      <div className="absolute top-12 left-16 h-12 w-1 bg-slate-300 rounded-full"></div>
                      <div className="absolute top-16 right-8 h-1 w-16 bg-slate-300 rounded-full -rotate-12"></div>
                      
                      {/* Home Pin */}
                      <div className="absolute right-8 top-8 text-center">
                        <div className="bg-blue-600 text-white p-1.5 rounded-full shadow-md animate-pulse">
                          <MapPin className="h-4 w-4" />
                        </div>
                        <span className="text-[8px] font-extrabold text-blue-800 bg-white/80 px-1 rounded-md">Home</span>
                      </div>

                      {/* Worker Pin Moving */}
                      <div 
                        className="absolute transition-all duration-700 ease-out text-center"
                        style={{ 
                          left: `${progress * 0.6 + 10}%`, 
                          top: `${60 - progress * 0.4}%` 
                        }}
                      >
                        <div className="bg-emerald-500 text-white p-1.5 rounded-full shadow-lg">
                          <Zap className="h-4 w-4 fill-current" />
                        </div>
                        <span className="text-[8px] font-extrabold text-emerald-800 bg-white/80 px-1 rounded-md">Rajesh (En Route)</span>
                      </div>

                      <div className="bg-white/95 backdrop-blur-xs p-2 rounded-xl relative z-10 border border-slate-200 shadow-sm text-[10px] font-medium text-slate-700 flex justify-between items-center">
                        <span className="flex items-center space-x-1">
                          <Clock className="h-3.5 w-3.5 text-blue-600" />
                          <span>Arriving in <b>4 mins</b></span>
                        </span>
                        <span className="text-slate-400 text-[9px]">Dist: 340m</span>
                      </div>
                    </div>

                    {/* Cancel Trigger */}
                    <button 
                      onClick={() => setBookingStep('browse')}
                      className="mt-3 text-center text-slate-400 font-semibold hover:text-slate-600 transition-colors py-1.5"
                    >
                      Cancel Booking
                    </button>
                  </motion.div>
                )}

                {bookingStep === 'completed' && (
                  <motion.div
                    key="completed-flow"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex-1 flex flex-col items-center justify-center text-center py-6 px-1"
                  >
                    <div className="bg-emerald-100 p-4 rounded-full text-emerald-600 mb-4 shadow-sm">
                      <CheckCircle className="h-10 w-10" />
                    </div>
                    <h4 className="font-extrabold text-sm text-slate-900">Task Completed!</h4>
                    <p className="text-[10px] text-slate-500 max-w-[190px] mt-1.5 leading-relaxed">
                      Rajesh Kumar has completed the Electrical Inspection and fix. OTP Verification matched.
                    </p>

                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 w-full my-4 text-left">
                      <div className="flex justify-between font-bold text-[10px] text-slate-500 border-b border-dashed border-slate-200 pb-1.5">
                        <span>SERVICE CHARGE</span>
                        <span>₹249</span>
                      </div>
                      <div className="flex justify-between font-extrabold text-slate-800 pt-1.5 text-xs">
                        <span>PAID VIA UPI</span>
                        <span className="text-blue-600">₹249</span>
                      </div>
                    </div>

                    {/* Rating Selection */}
                    <div className="text-[10px] font-bold text-slate-500 uppercase mb-2">Rate your Expert</div>
                    <div className="flex space-x-1.5 mb-6">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-5 w-5 fill-current text-amber-400 cursor-pointer" />
                      ))}
                    </div>

                    <button
                      onClick={() => setBookingStep('browse')}
                      className="w-full py-2.5 rounded-xl border border-blue-600 text-blue-600 font-bold hover:bg-blue-50 active:scale-98 transition-all"
                    >
                      Book Another Service
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* WORKER SCREEN SIMULATOR */}
            {activeTab === 'worker' && (
              <motion.div
                key="worker-screen"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="flex-1 flex flex-col p-4 bg-slate-950 text-white overflow-y-auto"
              >
                {/* Simulated Worker App Header */}
                <div className="flex items-center justify-between mb-4 mt-1">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white border border-indigo-400">
                      R
                    </div>
                    <div>
                      <div className="font-extrabold text-[11px]">Rajesh (Electrician)</div>
                      <div className="flex items-center space-x-1 text-[9px] text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                        <span>Online & Ready</span>
                      </div>
                    </div>
                  </div>
                  {/* Offline/Online toggle */}
                  <button 
                    onClick={() => setWorkerStatus(workerStatus === 'online' ? 'offline' : 'online')}
                    className={`px-2 py-1 rounded-full text-[8px] font-bold tracking-wider transition-colors ${
                      workerStatus === 'online' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {workerStatus === 'online' ? 'ONLINE' : 'OFFLINE'}
                  </button>
                </div>

                {/* Earnings Card */}
                <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl mb-4 shadow-md">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[9px] text-slate-400 font-bold tracking-wider uppercase">Today's Earnings</span>
                    <span className="text-[9px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">✓ 0% Commission</span>
                  </div>
                  <div className="flex items-baseline space-x-1.5">
                    <span className="text-xl font-black text-white">₹{earnings}</span>
                    <span className="text-[9px] text-emerald-400 font-medium">↑ 18% vs yesterday</span>
                  </div>
                  {/* Earnings Progress Line */}
                  <div className="w-full bg-slate-800 h-1 rounded-full mt-3 overflow-hidden">
                    <div className="bg-indigo-500 h-full w-[80%] rounded-full"></div>
                  </div>
                  <div className="flex justify-between text-[8px] text-slate-500 mt-1.5 font-semibold">
                    <span>Completed: 4 Jobs</span>
                    <span>Direct Wallet Payout</span>
                  </div>
                </div>

                {/* Live Worker Interface Content */}
                {workerStatus === 'online' && (
                  <div className="flex-1 flex flex-col justify-center">
                    {/* Simulated Job Pop up alert */}
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="bg-indigo-600/95 border border-indigo-500 p-3.5 rounded-2xl text-white shadow-xl relative overflow-hidden"
                    >
                      <div className="absolute right-0 top-0 translate-y-[-10px] translate-x-[10px] opacity-10">
                        <Zap className="h-16 w-16 text-white" />
                      </div>
                      
                      <div className="flex items-center space-x-1.5 mb-2 bg-indigo-500/40 w-fit px-2 py-0.5 rounded-full">
                        <span className="h-1.5 w-1.5 bg-red-500 rounded-full animate-ping"></span>
                        <span className="text-[8px] font-extrabold tracking-wider">NEW DUAL MATCH IN AREA</span>
                      </div>
                      
                      <h5 className="font-extrabold text-[12px] leading-tight">Switch Repair & Home Wiring inspection</h5>
                      <div className="flex items-center space-x-1 text-indigo-200 mt-1">
                        <MapPin className="h-3 w-3" />
                        <span className="text-[9px] font-semibold">DLF Phase 3 • 850m away</span>
                      </div>

                      <div className="flex items-center justify-between mt-3.5 pt-2 border-t border-indigo-500/50">
                        <div>
                          <div className="text-[8px] text-indigo-200">Guaranteed Earnings</div>
                          <div className="text-sm font-black text-white">₹249</div>
                        </div>
                        <button 
                          onClick={() => {
                            setEarnings(prev => prev + 249);
                            setWorkerStatus('active');
                            setTimeout(() => {
                              setWorkerStatus('online');
                            }, 4000);
                          }}
                          className="px-3.5 py-1.5 rounded-xl bg-white text-indigo-700 font-extrabold text-[10px] hover:bg-slate-100 shadow-md active:scale-95 transition-all"
                        >
                          Accept Job
                        </button>
                      </div>
                    </motion.div>

                    <div className="text-center text-[10px] text-slate-500 font-medium mt-4">
                      Listening to requests within your 5.0km service radius...
                    </div>
                  </div>
                )}

                {workerStatus === 'active' && (
                  <div className="flex-1 flex flex-col justify-center text-center py-6">
                    <div className="bg-indigo-500/20 p-4 rounded-full text-indigo-400 w-fit mx-auto mb-3">
                      <Zap className="h-8 w-8 animate-bounce fill-current" />
                    </div>
                    <h5 className="font-extrabold text-sm text-white">Job in Progress</h5>
                    <p className="text-slate-400 text-[10px] mt-1 max-w-[180px] mx-auto">
                      Dispatched to DLF Phase 3. Live ETA is 4 mins.
                    </p>
                    <div className="mt-4 bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-left text-[9px] space-y-1">
                      <div><b>Customer:</b> Sudhanshu S.</div>
                      <div><b>Phone OTP code:</b> ****</div>
                      <div><b>Category:</b> Electrical switch repair</div>
                    </div>
                  </div>
                )}

                {workerStatus === 'offline' && (
                  <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-500 py-10">
                    <p className="font-semibold text-[11px]">You are offline</p>
                    <p className="text-[9px] max-w-[160px] mt-1">Toggle online status above to start receiving local job alerts.</p>
                  </div>
                )}
              </motion.div>
            )}

            {/* ADMIN SCREEN SIMULATOR */}
            {activeTab === 'admin' && (
              <motion.div
                key="admin-screen"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="flex-1 flex flex-col p-4 bg-slate-900 text-slate-200 overflow-y-auto"
              >
                {/* Simulated Admin Header */}
                <div className="flex items-center justify-between mb-4 mt-1">
                  <div className="flex items-center space-x-1">
                    <ShieldCheck className="h-4.5 w-4.5 text-purple-400" />
                    <span className="font-extrabold text-[11px] text-purple-300 tracking-wider uppercase">SkillnovaX Admin</span>
                  </div>
                  <span className="text-[9px] font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700/50">
                    Noida Node
                  </span>
                </div>

                {/* KPI stats Grid */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/40">
                    <span className="text-[8px] text-slate-400 font-bold block">TOTAL WAITLIST</span>
                    <span className="text-base font-black text-white">{waitlistCount}</span>
                  </div>
                  <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/40">
                    <span className="text-[8px] text-slate-400 font-bold block">VERIFIED WORKERS</span>
                    <span className="text-base font-black text-purple-400">428</span>
                  </div>
                </div>

                <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700/40 mb-3.5">
                  <span className="text-[8px] text-slate-400 font-bold tracking-wider uppercase block mb-1">Live Hub Volume</span>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-sm font-bold text-white">₹3,48,500 <span className="text-[9px] text-emerald-400 font-medium">↑ 12%</span></span>
                    <span className="text-[8px] text-slate-400 font-semibold">Active Bookings: 47</span>
                  </div>
                  
                  {/* Dynamic mini bar graph */}
                  <div className="flex items-end space-x-1.5 h-10 pt-2 border-b border-slate-700/60 pb-1">
                    {[30, 45, 60, 40, 75, 90, 80].map((h, i) => (
                      <div 
                        key={i} 
                        className={`flex-1 rounded-t-xs transition-all duration-500 ${
                          i === 6 ? 'bg-purple-500' : 'bg-slate-700'
                        }`} 
                        style={{ height: `${h}%` }}
                      ></div>
                    ))}
                  </div>
                  <div className="flex justify-between text-[7px] text-slate-500 font-semibold mt-1">
                    <span>Delhi</span>
                    <span>Gurgaon</span>
                    <span>Noida</span>
                    <span>Bengaluru</span>
                  </div>
                </div>

                {/* Audit Queue */}
                <span className="text-[8px] text-slate-400 font-bold tracking-wider uppercase mb-2 block">Pending Worker Audits</span>
                <div className="space-y-1.5">
                  {[
                    { name: 'Amit Singh', trade: 'Plumbing', state: 'Aadhaar Pending', clr: 'text-amber-400' },
                    { name: 'Sanjay Dutt', trade: 'AC Repair', state: 'Approved KYC', clr: 'text-emerald-400' }
                  ].map((aud) => (
                    <div key={aud.name} className="bg-slate-800 p-2 rounded-xl border border-slate-700/30 flex justify-between items-center text-[9px]">
                      <div>
                        <div className="font-extrabold text-white">{aud.name}</div>
                        <div className="text-slate-400 text-[8px]">{aud.trade}</div>
                      </div>
                      <span className={`font-bold ${aud.state.includes('Approved') ? 'text-emerald-400 bg-emerald-500/10' : 'text-amber-400 bg-amber-500/10'} px-1.5 py-0.5 rounded text-[8px]`}>
                        {aud.state}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Simulated App Navigation Bar (Bottom) */}
          <div className="h-11 bg-white border-t border-slate-200/60 flex items-center justify-around text-slate-400 font-medium text-[9px] pt-1 z-20">
            <button className="flex flex-col items-center space-y-0.5 text-blue-600">
              <Search className="h-4 w-4" />
              <span>Explore</span>
            </button>
            <button className="flex flex-col items-center space-y-0.5">
              <Clock className="h-4 w-4" />
              <span>Bookings</span>
            </button>
            <button className="flex flex-col items-center space-y-0.5">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </button>
          </div>
        </div>
      </div>

      {/* Decorative reflection glow effect under the phone */}
      <div className="absolute -bottom-10 w-4/5 h-20 bg-gradient-to-t from-blue-500/5 to-transparent blur-xl pointer-events-none rounded-full"></div>
    </div>
  );
}
