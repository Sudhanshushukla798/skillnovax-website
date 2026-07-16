import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, HardHat, ShieldAlert, Sparkles, Check, 
  Map, Fingerprint, TrendingUp, CreditCard, Clock, Star, Landmark
} from 'lucide-react';
import { CUSTOMER_FEATURES, WORKER_FEATURES, ADMIN_FEATURES } from '../data';

export default function AppFeatures() {
  const [activeSegment, setActiveSegment] = useState<'customer' | 'worker' | 'admin'>('customer');

  const segments = [
    { id: 'customer', name: 'Customer Application', icon: User, clr: 'bg-blue-50 text-blue-600 border-blue-100' },
    { id: 'worker', name: 'Worker Application', icon: HardHat, clr: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
    { id: 'admin', name: 'Admin Control Hub', icon: ShieldAlert, clr: 'bg-purple-50 text-purple-600 border-purple-100' }
  ];

  const getFeaturesList = () => {
    switch (activeSegment) {
      case 'customer': return CUSTOMER_FEATURES;
      case 'worker': return WORKER_FEATURES;
      case 'admin': return ADMIN_FEATURES;
    }
  };

  const getMockDescription = () => {
    switch (activeSegment) {
      case 'customer':
        return {
          title: 'A Beautiful, Frictionless Client Experience',
          subtitle: 'Designed for high convenience',
          badge: 'Verified & Quick',
          desc: 'With location intelligence, UPI one-click booking, and live GPS map vectors, customers enjoy an absolute premium on-demand service reminiscent of leading food delivery and cab apps.',
          statTitle: 'Average Booking Time',
          statVal: '10 Seconds'
        };
      case 'worker':
        return {
          title: 'Empowering India’s Skilled Workforce',
          subtitle: 'Zero commissions, instant payouts',
          badge: '0% Commision Launch',
          desc: 'Workers enjoy total freedom. Choose skills, manage geographic radius limits, accept nearby jobs instantly, audit daily earnings performance, and withdraw directly to bank accounts.',
          statTitle: 'Worker Earnings Multiplier',
          statVal: '1.4x Higher'
        };
      case 'admin':
        return {
          title: 'Centralized Control & Real-time Auditing',
          subtitle: 'Intelligent security dispatch systems',
          badge: 'Data-driven Node Operations',
          desc: 'Easily track live active sessions, verify worker Aadhaar registries in real-time, audit geographic growth nodes, administer customer support tickets, and push regional notifications.',
          statTitle: 'Dispute Settlement Rate',
          statVal: '< 15 Mins'
        };
    }
  };

  const info = getMockDescription();

  return (
    <section id="app-features" className="py-20 md:py-28 bg-transparent border-t border-white/40 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1 px-3.5 py-1.5 rounded-full bg-blue-50/45 dark:bg-blue-950/45 backdrop-blur-md border border-blue-200/50 dark:border-blue-800/50 text-xs font-bold text-blue-800 dark:text-blue-300 uppercase tracking-wider mb-4">
            <Sparkles className="h-4 w-4" />
            <span>INTERACTIVE FEATURE CATALOGUE</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight mb-4">
            Designed for Customers. Built for Workers. Controlled by AI.
          </h2>
          <p className="font-sans text-base text-slate-500 dark:text-slate-400">
            Switch segments below to explore the high-fidelity features baked directly into our comprehensive ecosystem.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-16 max-w-3xl mx-auto">
          {segments.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeSegment === tab.id;
            return (
              <button
                key={tab.id}
                id={`feature-tab-${tab.id}`}
                onClick={() => setActiveSegment(tab.id as any)}
                className={`w-full sm:w-auto flex items-center justify-center space-x-2.5 px-6 py-4 rounded-2xl font-display font-bold text-sm border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-white/50 dark:bg-slate-900/50 text-slate-950 dark:text-white border-white/60 dark:border-white/10 shadow-lg scale-[1.02]'
                    : 'bg-white/20 dark:bg-slate-950/20 backdrop-blur-sm text-slate-500 dark:text-slate-400 border-transparent hover:text-slate-800 dark:hover:text-slate-200 hover:bg-white/40 dark:hover:bg-slate-900/40'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Features Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Block: Narrative Info Panel */}
          <div className="lg:col-span-5 space-y-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50/45 dark:bg-indigo-950/45 backdrop-blur-md border border-indigo-200/50 dark:border-indigo-800/50 text-xs font-bold text-indigo-700 dark:text-indigo-300">
              {info.badge}
            </span>
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-950 dark:text-white leading-tight">
              {info.title}
            </h3>
            <p className="font-sans text-sm text-slate-500 dark:text-slate-400 font-medium italic">
              {info.subtitle}
            </p>
            <p className="font-sans text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-light">
              {info.desc}
            </p>

            {/* Quick KPI Block */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-200/50 dark:border-white/10">
              <div className="p-4 glass-card rounded-2xl hover:bg-white/60 dark:hover:bg-slate-900/40 hover:border-white/70 dark:hover:border-white/20 transition-all duration-300">
                <span className="font-sans text-[10px] font-bold text-slate-400 dark:text-slate-500 block uppercase tracking-wider">{info.statTitle}</span>
                <span className="font-display font-black text-slate-900 dark:text-white text-lg sm:text-xl mt-1 block">{info.statVal}</span>
              </div>
              <div className="p-4 glass-card rounded-2xl hover:bg-white/60 dark:hover:bg-slate-900/40 hover:border-white/70 dark:hover:border-white/20 transition-all duration-300">
                <span className="font-sans text-[10px] font-bold text-slate-400 dark:text-slate-500 block uppercase tracking-wider">Aadhaar Validation</span>
                <span className="font-display font-black text-emerald-600 dark:text-emerald-400 text-lg sm:text-xl mt-1 block">100% Real-Time</span>
              </div>
            </div>
          </div>

          {/* Right Block: Dynamic Features Cards */}
          <div className="lg:col-span-7 glass-card p-6 sm:p-10 rounded-3xl hover:bg-white/60 dark:hover:bg-slate-900/40 hover:border-white/70 dark:hover:border-white/20 hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-300">
            <span className="font-display font-bold text-sm text-slate-950 dark:text-white uppercase tracking-wide block mb-6">
              Full Feature Directory
            </span>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {getFeaturesList().map((feature, idx) => (
                <div key={idx} className="flex items-start space-x-3 group">
                  <div className="p-1 rounded-full bg-blue-100/50 dark:bg-blue-950/50 backdrop-blur-sm border border-blue-200/50 dark:border-blue-800/50 text-blue-800 dark:text-blue-300 group-hover:bg-blue-600 dark:group-hover:bg-blue-500 group-hover:text-white dark:group-hover:text-white transition-all duration-200 shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white leading-tight">
                      {feature.name}
                    </h4>
                    <p className="font-sans text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed font-light">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
