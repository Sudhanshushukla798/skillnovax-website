import { motion } from 'motion/react';
import { 
  ShieldCheck, Clock, Lock, PiggyBank, Map, Award, 
  CalendarClock, Users, Smartphone, TrendingUp, UserCheck, Star,
  CheckCircle2
} from 'lucide-react';

export default function Benefits() {
  const customerBenefits = [
    { title: 'Trusted Workers', desc: 'Sleep easy knowing every specialist undergoes digital Aadhaar checks, professional credential audits, and police vetting.', icon: ShieldCheck },
    { title: 'Fast Service Dispatch', desc: 'Automated hyper-matching routes specialists nearby, reducing wait times to just 15 minutes average response.', icon: Clock },
    { title: 'Secure Escrow Booking', desc: 'Secure UPI Escrow releases. Funds are held safely and paid to providers only after you verify perfect completion.', icon: Lock },
    { title: 'Affordable, Fixed Pricing', desc: 'Clear, dynamic pricing based on honest local rates. Know exact service estimates before booking with zero surprise fees.', icon: PiggyBank },
    { title: 'Live Map Tracking', desc: 'Watch your service provider journey to your home in real-time. Direct secure in-app calling keeps tracking private.', icon: Map },
    { title: 'Quality Assurance Warranty', desc: 'Every service is backed by our robust satisfaction assurance. Support claims resolve rapidly to make jobs right.', icon: Award }
  ];

  const workerBenefits = [
    { title: 'Flexible Working Hours', desc: 'Be your own boss. Work according to your availability—toggle online or offline status with a simple button slide.', icon: CalendarClock },
    { title: 'Constant Customer Stream', desc: 'Stop spending hours searching for clients or paying high agency fees. Receive matching service requests in seconds.', icon: Users },
    { title: 'Easy Booking Management', desc: 'An elegant digital timeline tracks accepted jobs, locations, customer requests, and invoices seamlessly.', icon: Smartphone },
    { title: 'Higher Earning Potential', desc: 'Boost your take-home pay. Earn more under 0% platform commissions during our launch phases across metropolitan hubs.', icon: TrendingUp },
    { title: 'Premium Digital Profile', desc: 'Build a premium digital resume showing off your credentials, certificates, verified ratings, and finished trade images.', icon: UserCheck },
    { title: 'Rating-Based Reputation Growth', desc: 'Deliver excellence to build premium ratings. High-rated professionals receive dispatch priority and earn premium rates.', icon: Star }
  ];

  return (
    <section className="py-20 md:py-28 bg-transparent border-y border-white/40 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight mb-4 animate-fade-in">
            Win-Win Hyperlocal Framework
          </h2>
          <p className="font-sans text-base text-slate-500 dark:text-slate-400">
            We are engineering standardizations that protect consumer peace of mind while multiplying the earnings and reputation of skilled local labor.
          </p>
        </div>

        {/* Benefits Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* CUSTOMER BENEFITS PANEL */}
          <div id="benefits-customers" className="space-y-8">
            <div className="flex items-center space-x-3 pb-4 border-b border-white/40 dark:border-white/10">
              <div className="p-2.5 rounded-xl bg-blue-50/50 dark:bg-blue-950/50 backdrop-blur-md border border-blue-200/30 dark:border-blue-800/30 text-blue-700 dark:text-blue-300">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900 dark:text-white">
                Benefits For Customers
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {customerBenefits.map((b, i) => {
                const Icon = b.icon;
                return (
                  <div key={i} className="group p-5 glass-card rounded-2xl hover:bg-white/60 dark:hover:bg-slate-900/40 hover:shadow-2xl hover:shadow-blue-900/5 hover:border-white/70 dark:hover:border-white/20 transition-all duration-300">
                    <div className="p-2.5 rounded-xl bg-blue-50/50 dark:bg-blue-950/50 backdrop-blur-md border border-blue-200/30 dark:border-blue-800/30 text-blue-700 dark:text-blue-300 w-fit group-hover:scale-105 transition-transform mb-4">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h4 className="font-display font-bold text-sm text-slate-950 dark:text-white mb-1.5">{b.title}</h4>
                    <p className="font-sans text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light">{b.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* WORKER BENEFITS PANEL */}
          <div id="benefits-workers" className="space-y-8">
            <div className="flex items-center space-x-3 pb-4 border-b border-white/40 dark:border-white/10">
              <div className="p-2.5 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/50 backdrop-blur-md border border-indigo-200/30 dark:border-indigo-800/30 text-indigo-700 dark:text-indigo-300">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900 dark:text-white">
                Benefits For Workers
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {workerBenefits.map((b, i) => {
                const Icon = b.icon;
                return (
                  <div key={i} className="group p-5 glass-card rounded-2xl hover:bg-white/60 dark:hover:bg-slate-900/40 hover:shadow-2xl hover:shadow-indigo-900/5 hover:border-white/70 dark:hover:border-white/20 transition-all duration-300">
                    <div className="p-2.5 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/50 backdrop-blur-md border border-indigo-200/30 dark:border-indigo-800/30 text-indigo-700 dark:text-indigo-300 w-fit group-hover:scale-105 transition-transform mb-4">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h4 className="font-display font-bold text-sm text-slate-950 dark:text-white mb-1.5">{b.title}</h4>
                    <p className="font-sans text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light">{b.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
