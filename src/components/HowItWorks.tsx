import { motion } from 'motion/react';
import { 
  Sparkles, Search, MapPin, Cpu, CheckCircle, 
  Map, ThumbsUp, Star, ClipboardCheck, UserCheck, 
  Sliders, Bell, CheckSquare, ShieldCheck, DollarSign
} from 'lucide-react';
import { StaggerContainer, StaggerItem } from './Animate';

export default function HowItWorks() {
  const customerSteps = [
    { num: '01', title: 'Choose a service', desc: 'Browse our extensive list of 120+ services or describe your need directly.', icon: Search },
    { num: '02', title: 'Select your location', desc: 'Pinpoint your home address on our high-accuracy GPS map tracker.', icon: MapPin },
    { num: '03', title: 'AI finds verified workers', desc: 'Our AI engine scans instantly, vetting credentials, reviews, and distance.', icon: Cpu },
    { num: '04', title: 'Worker accepts booking', desc: 'The matched local professional accepts your dispatch request instantly.', icon: CheckCircle },
    { num: '05', title: 'Track worker live', desc: 'Watch your worker journey toward your door in real-time with zero phone hassle.', icon: Map },
    { num: '06', title: 'Service completed', desc: 'The professional completes the service. Validate with safe OTP codes.', icon: ThumbsUp },
    { num: '07', title: 'Rate the experience', desc: 'Rate your expert, share feedback, and unlock priority booking discounts.', icon: Star }
  ];

  const workerSteps = [
    { num: '01', title: 'Register on App', desc: 'Download our worker app and complete your profile in under 2 minutes.', icon: ClipboardCheck },
    { num: '02', title: 'Aadhaar Verification', desc: 'Verify your digital KYC instantly using secure automated government gateways.', icon: ShieldCheck },
    { num: '03', title: 'Select your skills', desc: 'Check your specific trade trades, years of experience, and desired rates.', icon: Sliders },
    { num: '04', title: 'Receive match alerts', desc: 'Get automated, high-paying booking notifications in your desired radius.', icon: Bell },
    { num: '05', title: 'Accept jobs instantly', desc: 'Accept requests with absolute freedom—no pre-allocations or pressure.', icon: CheckSquare },
    { num: '06', title: 'Complete the service', desc: 'Arrive at the client, enter the OTP, finish the trade, and secure success.', icon: ThumbsUp },
    { num: '07', title: 'Earn & withdraw money', desc: 'Get paid instantly with zero platform commission. Build your rating stars.', icon: DollarSign }
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-white/20 dark:bg-slate-900/10 backdrop-blur-md border-y border-white/40 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1 px-3.5 py-1.5 rounded-full bg-blue-50/45 dark:bg-blue-950/45 backdrop-blur-md border border-blue-200/50 dark:border-blue-800/50 text-xs font-bold text-blue-800 dark:text-blue-300 uppercase tracking-wider mb-4">
            <Sparkles className="h-4 w-4" />
            <span>THE SERVICE FLOWS</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight mb-4">
            How SkillnovaX Orchestrates Local Trust
          </h2>
          <p className="font-sans text-base text-slate-500 dark:text-slate-400">
            A frictionless ecosystem mapped for both clients seeking perfection and professionals seeking growth.
          </p>
        </div>

        {/* Side-by-Side Timelines */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* CUSTOMER PIPELINE */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-8 sm:p-10 rounded-4xl hover:bg-white/60 dark:hover:bg-slate-900/40 hover:shadow-2xl hover:shadow-blue-900/5 hover:border-white/70 dark:hover:border-white/20 transition-all duration-300"
          >
            <div className="flex items-center space-x-3 mb-8 pb-4 border-b border-white/40 dark:border-white/10">
              <span className="p-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs uppercase tracking-wider font-mono">
                CLIENTS
              </span>
              <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                Customer Booking Cycle
              </h3>
            </div>
            
            {/* Steps Timeline Container */}
            <StaggerContainer className="space-y-8 relative before:absolute before:left-[21px] before:top-2 before:bottom-2 before:w-[2px] before:bg-blue-200/50 dark:before:bg-blue-800/30">
              {customerSteps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <StaggerItem key={idx} direction="up" distance={15} className="flex items-start space-x-5 relative z-10 group">
                    <div className="w-[44px] h-[44px] rounded-full bg-white/65 dark:bg-slate-900/65 backdrop-blur-xs border-2 border-blue-600 text-blue-700 dark:text-blue-300 font-display font-bold text-xs flex items-center justify-center shrink-0 shadow-xs group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                      <span className="group-hover:hidden">{step.num}</span>
                      <Icon className="h-4.5 w-4.5 hidden group-hover:block" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm text-slate-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {step.title}
                      </h4>
                      <p className="font-sans text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed font-light">
                        {step.desc}
                      </p>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </motion.div>

          {/* WORKER PIPELINE */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-8 sm:p-10 rounded-4xl hover:bg-white/60 dark:hover:bg-slate-900/40 hover:shadow-2xl hover:shadow-blue-900/5 hover:border-white/70 dark:hover:border-white/20 transition-all duration-300"
          >
            <div className="flex items-center space-x-3 mb-8 pb-4 border-b border-white/40 dark:border-white/10">
              <span className="p-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs uppercase tracking-wider font-mono">
                WORKERS
              </span>
              <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                Worker Earnings Cycle
              </h3>
            </div>

            {/* Steps Timeline Container */}
            <StaggerContainer className="space-y-8 relative before:absolute before:left-[21px] before:top-2 before:bottom-2 before:w-[2px] before:bg-indigo-200/50 dark:before:bg-indigo-800/30">
              {workerSteps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <StaggerItem key={idx} direction="up" distance={15} className="flex items-start space-x-5 relative z-10 group">
                    <div className="w-[44px] h-[44px] rounded-full bg-white/65 dark:bg-slate-900/65 backdrop-blur-xs border-2 border-indigo-600 text-indigo-700 dark:text-indigo-300 font-display font-bold text-xs flex items-center justify-center shrink-0 shadow-xs group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                      <span className="group-hover:hidden">{step.num}</span>
                      <Icon className="h-4.5 w-4.5 hidden group-hover:block" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm text-slate-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {step.title}
                      </h4>
                      <p className="font-sans text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed font-light">
                        {step.desc}
                      </p>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
