import { motion } from 'motion/react';
import { ShieldCheck, MapPin, BadgePercent, Lock, Award, Zap, HeartHandshake } from 'lucide-react';
import { StaggerContainer, StaggerItem } from './Animate';

export default function About() {
  const highlights = [
    {
      title: 'Aadhaar-Verified Workers',
      desc: 'Double-screened professionals with digital identity checks for extreme household safety.',
      icon: ShieldCheck,
      color: 'text-blue-700 bg-blue-100/50 backdrop-blur-md border border-blue-200/50'
    },
    {
      title: 'Location-Based Matching',
      desc: 'Proprietary AI matches you with local specialists operating within 2.5km for speedy transit.',
      icon: MapPin,
      color: 'text-indigo-700 bg-indigo-100/50 backdrop-blur-md border border-indigo-200/50'
    },
    {
      title: 'Transparent Pricing',
      desc: 'Clear, fixed upfront quotations with no hidden labor charges or post-service haggling.',
      icon: BadgePercent,
      color: 'text-emerald-700 bg-emerald-100/50 backdrop-blur-md border border-emerald-200/50'
    },
    {
      title: 'Fully Secure Platform',
      desc: 'Secure digital payment gateways with escrow holdings—earnings are released only after completion.',
      icon: Lock,
      color: 'text-amber-700 bg-amber-100/50 backdrop-blur-md border border-amber-200/50'
    },
    {
      title: 'Quality Service Guarantee',
      desc: 'Backed by warranty protection. If you aren’t satisfied, our prompt support works to make it right.',
      icon: Award,
      color: 'text-purple-700 bg-purple-100/50 backdrop-blur-md border border-purple-200/50'
    },
    {
      title: 'Easy Booking Experience',
      desc: 'Request any specialist in just three taps under a seamless customer timeline interface.',
      icon: Zap,
      color: 'text-rose-700 bg-rose-100/50 backdrop-blur-md border border-rose-200/50'
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-white/20 dark:bg-slate-900/10 backdrop-blur-md border-y border-white/40 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1 px-3.5 py-1.5 rounded-full bg-blue-50/45 dark:bg-blue-950/45 backdrop-blur-md border border-blue-200/50 dark:border-blue-800/50 text-xs font-bold text-blue-800 dark:text-blue-300 uppercase tracking-wider mb-4">
            <HeartHandshake className="h-4 w-4" />
            <span>WHO WE ARE</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight mb-4">
            Connecting India with India's Finest Local Specialists
          </h2>
          <p className="font-sans text-base text-slate-500 dark:text-slate-400 leading-relaxed">
            SkillnovaX is a hyperlocal, AI-orchestrated home service marketplace. Our mission is to bridge the gap between quality-seeking households and highly skilled local service workers, driving trust, digitizing reputations, and guaranteeing transparent micro-pricing.
          </p>
        </div>

        {/* Content Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <StaggerItem 
                key={idx} 
                direction="up" 
                distance={20}
              >
                <motion.div
                  whileHover={{ 
                    y: -6, 
                    scale: 1.015,
                    boxShadow: '0 20px 40px -15px rgba(37, 99, 235, 0.08)'
                  }}
                  className="group p-6 sm:p-8 rounded-3xl glass-card hover:bg-white/60 dark:hover:bg-slate-900/40 hover:border-white/70 dark:hover:border-white/20 h-full transition-all duration-300 flex flex-col justify-start"
                >
                  <div className={`p-3.5 rounded-2xl w-fit ${item.color} group-hover:scale-110 transition-transform duration-300 mb-6`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="font-sans text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Aesthetic Statement Card with rich scroll entrance */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -2 }}
          className="mt-16 bg-gradient-to-br from-blue-950/80 via-indigo-950/85 to-purple-950/80 backdrop-blur-xl border border-white/10 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl shadow-blue-500/10"
        >
          <div className="absolute right-0 top-0 translate-y-[-20%] translate-x-[10%] opacity-10">
            <Zap className="h-64 w-64 text-white animate-pulse" />
          </div>
          <div className="max-w-3xl relative z-10">
            <span className="font-mono text-xs font-bold uppercase text-blue-200 tracking-widest">
              HYPERLOCAL AI MATCHING
            </span>
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl mt-2 mb-4 leading-snug">
              "We aren't just an app. We are building the trust framework for local trade in India."
            </h3>
            <p className="font-sans text-sm sm:text-base text-blue-100 font-light leading-relaxed">
              Every day, millions of skilled electricians, plumbers, carpenters, and beauticians struggle to find fair, consistent local gigs. Simultaneously, families struggle to find safe, reliable help. SkillnovaX uses location-intelligent matching models to eliminate middle-agents, empower workers, and serve clients safely.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
