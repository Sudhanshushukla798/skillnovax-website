import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, MapPin, ChevronLeft, ChevronRight, Sparkles, 
  User, Shield, DollarSign, Star, Smartphone 
} from 'lucide-react';

export default function ScreenshotsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const screens = [
    {
      title: 'Customer Onboarding',
      subtitle: 'Secure Mobile OTP Login',
      badge: 'Frictionless Entry',
      icon: User,
      bullets: ['Instant OTP generation', 'Google One-tap synchronization', 'Automatic location pinpointing'],
      mockUp: (
        <div className="w-full h-full bg-slate-50 flex flex-col p-4 text-slate-800">
          <div className="flex items-center space-x-1 mb-6 mt-2">
            <Zap className="h-5 w-5 text-blue-600 fill-current" />
            <span className="font-display font-bold text-sm tracking-tight">SkillnovaX</span>
          </div>
          <h4 className="font-display font-extrabold text-base leading-tight mt-4 text-slate-900">Verify your mobile number</h4>
          <p className="text-[10px] text-slate-400 mt-1">We will send a 4-digit code to verify your profile.</p>
          <div className="mt-6 space-y-3">
            <div className="flex bg-slate-100 border border-slate-200 p-2.5 rounded-xl text-xs font-semibold items-center">
              <span className="text-slate-500 mr-2 border-r border-slate-300 pr-2">+91</span>
              <span className="text-slate-800">98765 43210</span>
            </div>
            <button className="w-full py-3 rounded-xl gradient-bg text-white font-bold text-xs text-center shadow-md">
              Get OTP Verification Code
            </button>
          </div>
          <div className="mt-8 flex items-center justify-between text-[9px] text-slate-400 font-medium">
            <span className="h-[1px] bg-slate-200 flex-1"></span>
            <span className="mx-2">OR SECURELY ACCESS WITH</span>
            <span className="h-[1px] bg-slate-200 flex-1"></span>
          </div>
          <button className="mt-3 py-2.5 border border-slate-200 rounded-xl bg-white flex items-center justify-center space-x-2 text-[11px] font-bold">
            <span className="font-extrabold text-blue-600">G</span>
            <span>Google Sign In</span>
          </button>
        </div>
      )
    },
    {
      title: 'AI Hyper-Matching',
      subtitle: 'Verified Vetting & Search',
      badge: 'Zero Coordinate Haggle',
      icon: Sparkles,
      bullets: ['Automated background screening', 'Real-time credentials auditing', 'Pre-calculated local estimations'],
      mockUp: (
        <div className="w-full h-full bg-slate-900 text-white flex flex-col p-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[9px] font-bold text-slate-400">AI MATCH SEARCH</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping"></span>
          </div>
          <div className="my-auto text-center">
            <div className="p-3.5 bg-indigo-500/20 border border-indigo-400/40 rounded-full w-fit mx-auto animate-pulse mb-3">
              <Sparkles className="h-6 w-6 text-indigo-400" />
            </div>
            <h5 className="font-bold text-xs">Vetting Electrians...</h5>
            <p className="text-[9px] text-slate-400 mt-1 max-w-[140px] mx-auto">Evaluating 14 active trade certifications in Noida.</p>
          </div>
          <div className="bg-slate-800 border border-slate-700/50 p-2.5 rounded-xl text-[10px] space-y-1.5 mt-auto">
            <div className="flex justify-between">
              <span className="text-slate-400">Nearby available:</span>
              <span className="text-emerald-400 font-bold">8 experts</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">KYC Status Check:</span>
              <span className="text-blue-400 font-bold">100% Ok</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Live Map Tracking',
      subtitle: 'Real-time GPS Coordinate Track',
      badge: 'Ultimate Safety',
      icon: MapPin,
      bullets: ['Worker transit live visualization', 'Interactive ETA updates', 'OTP secure arrival validation'],
      mockUp: (
        <div className="w-full h-full bg-slate-50 flex flex-col p-4 text-slate-800">
          <div className="bg-emerald-50 border border-emerald-100 p-2 rounded-xl text-center text-emerald-800 text-[9px] font-bold mb-3">
            ✓ SANJAY SHARMA DISPATCHED
          </div>
          <div className="flex-1 bg-slate-200 border border-slate-300/40 rounded-xl relative overflow-hidden flex flex-col justify-end p-2 min-h-[100px]">
            <div className="absolute right-4 top-4 bg-blue-600 text-white p-1 rounded-full"><MapPin className="h-3 w-3" /></div>
            <div className="absolute left-6 bottom-12 bg-emerald-500 text-white p-1 rounded-full animate-bounce"><Zap className="h-3 w-3" /></div>
            <div className="bg-white/95 p-1.5 rounded-lg text-[9px] font-medium text-slate-700 text-center">
              Arriving in <b>3 mins</b> • 250m
            </div>
          </div>
          <div className="mt-3 flex items-center space-x-2">
            <div className="w-7 h-7 rounded-full bg-slate-300 overflow-hidden flex items-center justify-center font-bold text-xs text-slate-600">SS</div>
            <div>
              <div className="font-extrabold text-[11px]">Sanjay Sharma</div>
              <div className="text-[9px] text-slate-400">AC Specialist • ⭐ 4.85</div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Worker Earnings Dashboard',
      subtitle: 'Instant Payout Ledger',
      badge: 'Empowering Trade',
      icon: DollarSign,
      bullets: ['0% platform launch commission', 'Direct secure UPI bank transfers', 'Daily analytics tracking graphs'],
      mockUp: (
        <div className="w-full h-full bg-slate-950 text-white flex flex-col p-4">
          <div className="flex justify-between items-center mb-4 mt-1">
            <span className="text-[9px] text-slate-400 font-bold">EARNINGS PORTAL</span>
            <span className="bg-emerald-500/20 text-emerald-400 text-[8px] font-bold px-1.5 py-0.5 rounded">✓ Verified Payout</span>
          </div>
          <span className="text-[8px] text-slate-400">Available Wallet Balance</span>
          <span className="text-xl font-black text-white">₹24,850</span>
          
          <div className="mt-4 bg-slate-900 border border-slate-800 p-2.5 rounded-xl space-y-2 flex-1 flex flex-col justify-center text-left">
            <span className="text-[8px] text-slate-400 font-bold block">REVENUE TIMELINE</span>
            <div className="flex items-end space-x-1 h-12 pt-2 border-b border-slate-800 pb-1">
              {[20, 50, 40, 80, 60, 95].map((h, i) => (
                <div key={i} className="flex-1 bg-indigo-500 rounded-t-xs" style={{ height: `${h}%` }}></div>
              ))}
            </div>
            <button className="w-full py-2 bg-indigo-600 rounded-lg text-[10px] font-bold text-center mt-2 shadow-xs">
              Instant Bank Transfer
            </button>
          </div>
        </div>
      )
    }
  ];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % screens.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + screens.length) % screens.length);
  };

  return (
    <section id="screenshots" className="py-20 md:py-28 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1 px-3.5 py-1.5 rounded-full bg-blue-50/45 dark:bg-blue-950/45 backdrop-blur-md border border-blue-200/50 dark:border-blue-800/50 text-xs font-bold text-blue-800 dark:text-blue-300 uppercase tracking-wider mb-4">
            <Smartphone className="h-4 w-4" />
            <span>APP GALLERY PREVIEW</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight mb-4">
            State-Of-The-Art UI Built For High Fidelity
          </h2>
          <p className="font-sans text-base text-slate-500 dark:text-slate-400">
            A visual overview of the real high-performance interface screens designed for the modern on-demand economy.
          </p>
        </div>

        {/* Carousel Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Interactive Navigation & bullet list */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50/45 dark:bg-blue-950/45 backdrop-blur-md border border-blue-200/50 dark:border-blue-800/50 text-xs font-bold text-blue-700 dark:text-blue-300 w-fit">
              {screens[currentIndex].badge}
            </span>
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-950 dark:text-white">
              {screens[currentIndex].title}
            </h3>
            <p className="font-sans text-sm text-slate-500 dark:text-slate-400 font-medium">
              {screens[currentIndex].subtitle}
            </p>
            
            <div className="space-y-3 pt-4 border-t border-white/40 dark:border-white/10">
              {screens[currentIndex].bullets.map((bullet, index) => (
                <div key={index} className="flex items-center space-x-2.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-500 shrink-0"></div>
                  <span className="font-sans text-xs text-slate-600 dark:text-slate-300 font-medium">
                    {bullet}
                  </span>
                </div>
              ))}
            </div>

            {/* Slider Buttons */}
            <div className="flex items-center space-x-4 pt-6">
              <button
                onClick={handlePrev}
                className="p-3 rounded-full bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-white/50 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-800/60 active:scale-95 transition-all shadow-xs cursor-pointer"
                aria-label="Previous screenshot"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="font-mono text-xs font-bold text-slate-400 dark:text-slate-500">
                {String(currentIndex + 1).padStart(2, '0')} / {String(screens.length).padStart(2, '0')}
              </span>
              <button
                onClick={handleNext}
                className="p-3 rounded-full bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-white/50 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-800/60 active:scale-95 transition-all shadow-xs cursor-pointer"
                aria-label="Next screenshot"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Right Column: Sliding CSS Phone mockup with AnimatePresence */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="relative w-full max-w-[280px]">
              
              {/* Main Phone frame */}
              <div className="relative w-full aspect-[9/19] rounded-[42px] border-[8px] border-slate-900 bg-slate-950 shadow-2xl overflow-hidden flex flex-col">
                {/* Notch */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-5 bg-slate-900 rounded-full z-30"></div>
                
                {/* Status bar mock */}
                <div className="h-8 px-4 flex items-end justify-between text-[10px] text-slate-400 pb-1 z-20 font-sans">
                  <span>09:41</span>
                  <div className="flex items-center space-x-1">
                    <span className="w-3 h-2 bg-slate-400 rounded-xs"></span>
                  </div>
                </div>

                {/* Sliding screen content */}
                <div className="flex-1 bg-white relative overflow-hidden flex flex-col">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                      className="absolute inset-0 flex flex-col"
                    >
                      {screens[currentIndex].mockUp}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Backing glow */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-4/5 h-12 bg-indigo-500/10 blur-xl rounded-full pointer-events-none"></div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
