import React from 'react';
import { motion } from 'motion/react';
import { 
  Cpu, CheckSquare, MapPin, Receipt, PhoneCall, Bell,
  Sparkles, Check, ArrowRight
} from 'lucide-react';
import { WHY_CHOOSE_US } from '../data';
import { StaggerContainer, StaggerItem, AnimatedCounter } from './Animate';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Cpu,
  CheckSquare,
  MapPin,
  Receipt,
  PhoneCall,
  Bell
};

export default function WhyChooseUs() {
  const featureChecks = [
    'Aadhaar KYC verified professionals',
    'Real-time automated matching in seconds',
    'Smart notifications & push timeline updates',
    'Secure UPI Escrow releases',
    'Interactive live worker travel maps',
    'Flexible booking with easy cancellation'
  ];

  return (
    <section id="features" className="py-20 md:py-28 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Layout Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1 px-3.5 py-1.5 rounded-full bg-blue-50/45 dark:bg-blue-950/45 backdrop-blur-md border border-blue-200/50 dark:border-blue-800/50 text-xs font-bold text-blue-800 dark:text-blue-300 uppercase tracking-wider mb-4">
            <Sparkles className="h-4 w-4" />
            <span>THE SKILLNOVAX DIFFERENCE</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight mb-4">
            Why Hundreds of Households Choose Us Daily
          </h2>
          <p className="font-sans text-base text-slate-500 dark:text-slate-400">
            We are reinventing hyperlocal gigs by building unmatched digital safeguards, live maps, and instant AI dispatches directly in India.
          </p>
        </div>

        {/* Bento/Grid Layout Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Block: Core Tech Checklist */}
          <div className="lg:col-span-4 flex flex-col space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -4, boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.05)' }}
              className="glass-card p-8 rounded-3xl hover:bg-white/60 dark:hover:bg-slate-900/40 hover:border-white/70 dark:hover:border-white/20 hover:shadow-xl transition-all duration-300"
            >
              <h3 className="font-display font-bold text-xl text-slate-950 dark:text-white mb-3">
                Built For Modern India
              </h3>
              <p className="font-sans text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                SkillnovaX combines local trust vectors with high-tech dispatch engines, eliminating endless phone coordinating, delays, and double-pricing entirely.
              </p>
              
              <StaggerContainer staggerChildren={0.05} className="space-y-3.5">
                {featureChecks.map((check, idx) => (
                  <StaggerItem key={idx} direction="left" distance={15} className="flex items-start space-x-2.5">
                    <div className="p-1 rounded-full bg-emerald-100/50 dark:bg-emerald-950/50 backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-800/50 text-emerald-800 dark:text-emerald-300 shrink-0 mt-0.5">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                    <span className="font-sans text-xs font-medium text-slate-700 dark:text-slate-300 leading-snug">
                      {check}
                    </span>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </motion.div>
            
            {/* Embedded Live Status Stat */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="gradient-bg-light p-6 rounded-3xl text-white relative overflow-hidden shadow-md shadow-blue-500/10"
            >
              <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-blue-100">AI SCAN VELOCITY</span>
              <h4 className="font-display font-extrabold text-2xl mt-1 flex items-center gap-1.5">
                <AnimatedCounter value={15} suffix=" Seconds" />
              </h4>
              <p className="font-sans text-[11px] text-blue-100/90 mt-1">Average match accept velocity between customers and verified experts.</p>
            </motion.div>
          </div>

          {/* Right Block: Animated Feature Cards Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {WHY_CHOOSE_US.map((item, idx) => {
              const Icon = iconMap[item.icon] || Cpu;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  whileHover={{ 
                    y: -6, 
                    scale: 1.015,
                    boxShadow: '0 20px 40px -15px rgba(37, 99, 235, 0.12)'
                  }}
                  className="group relative glass-card rounded-3xl p-6 sm:p-8 hover:bg-white/60 dark:hover:bg-slate-900/40 hover:border-white/70 dark:hover:border-white/20 transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-3.5 rounded-2xl bg-blue-50/50 dark:bg-blue-950/50 backdrop-blur-md border border-blue-200/30 dark:border-blue-800/30 text-blue-700 dark:text-blue-300 group-hover:scale-110 transition-transform duration-300 shrink-0">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {item.title}
                      </h4>
                      <p className="font-sans text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  {/* Subtle right arrow hover decoration */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-blue-600 dark:text-blue-400">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
