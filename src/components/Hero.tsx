import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { Shield, Sparkles, Zap, Clock, MapPin, CheckCircle } from 'lucide-react';
import PhoneSimulator from './PhoneSimulator';
import { 
  StaggerContainer, 
  StaggerItem, 
  AnimatedCounter, 
  MagneticButton, 
  RippleButton 
} from './Animate';

interface HeroProps {
  onJoinWaitlist: (role: 'customer' | 'worker') => void;
  waitlistCount: number;
}

export default function Hero({ onJoinWaitlist, waitlistCount }: HeroProps) {
  const trustBadges = [
    { text: 'Verified Professionals', icon: Shield, color: 'text-blue-800 dark:text-blue-300 bg-blue-50/40 dark:bg-blue-950/40 border-blue-200/50 dark:border-blue-800/50 backdrop-blur-md' },
    { text: 'AI Hyper-Matching', icon: Zap, color: 'text-indigo-800 dark:text-indigo-300 bg-indigo-50/40 dark:bg-indigo-950/40 border-indigo-200/50 dark:border-indigo-800/50 backdrop-blur-md' },
    { text: 'Secure Escrow Booking', icon: CheckCircle, color: 'text-emerald-800 dark:text-emerald-300 bg-emerald-50/40 dark:bg-emerald-950/40 border-emerald-200/50 dark:border-emerald-800/50 backdrop-blur-md' },
    { text: 'Fast 15-Min Response', icon: Clock, color: 'text-amber-800 dark:text-amber-300 bg-amber-50/40 dark:bg-amber-950/40 border-amber-200/50 dark:border-amber-800/50 backdrop-blur-md' },
    { text: 'Real-Time Map Tracking', icon: MapPin, color: 'text-purple-800 dark:text-purple-300 bg-purple-50/40 dark:bg-purple-950/40 border-purple-200/50 dark:border-purple-800/50 backdrop-blur-md' },
  ];

  // High-fidelity spring-backed mouse parallax setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 45, stiffness: 120 });
  const springY = useSpring(mouseY, { damping: 45, stiffness: 120 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Gentle parallax travel range of 25 pixels
      const x = (e.clientX - window.innerWidth / 2) / 40;
      const y = (e.clientY - window.innerHeight / 2) / 40;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      id="home"
      className="relative pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-36 lg:pb-32 overflow-hidden bg-transparent"
    >
      {/* Background Decorative Blur Gradients */}
      <div className="absolute top-0 left-1/4 w-[40%] h-[40%] rounded-full bg-blue-400/10 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-[30%] h-[30%] rounded-full bg-purple-400/10 blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading and CTAs */}
          <div className="lg:col-span-7">
            <StaggerContainer className="flex flex-col space-y-6 md:space-y-8 text-center lg:text-left">
              
              {/* Live Indicator Alert */}
              <StaggerItem direction="up">
                <div className="inline-flex items-center self-center lg:self-start space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50/40 dark:bg-blue-950/40 backdrop-blur-md border border-blue-200/50 dark:border-blue-800/50 shadow-sm">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600 dark:bg-blue-400"></span>
                  </span>
                  <span className="font-display text-xs font-bold text-blue-800 dark:text-blue-300 tracking-wide uppercase flex items-center gap-1.5">
                    Over <AnimatedCounter value={waitlistCount} suffix="+" /> early birds registered in India
                  </span>
                </div>
              </StaggerItem>

              {/* Title */}
              <StaggerItem direction="up" className="space-y-3">
                <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-slate-950 dark:text-white tracking-tight leading-[1.1]">
                  India's Smart <br />
                  <span className="gradient-text pb-1 inline-block">AI-Powered</span> <br />
                  Home Service Marketplace
                </h1>
              </StaggerItem>

              {/* Subheadline */}
              <StaggerItem direction="up">
                <p className="font-sans text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                  Book trusted, Aadhaar-verified professionals in minutes for every home service—from electricians and plumbers to cleaning, repairs, beauty services, construction, and more.
                </p>
              </StaggerItem>

              {/* CTA Buttons - Magnetic with custom ripples */}
              <StaggerItem direction="up">
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <MagneticButton range={45}>
                    <RippleButton
                      id="hero-cta-customer"
                      onClick={() => onJoinWaitlist('customer')}
                      className="w-full sm:w-auto px-8 py-4 rounded-2xl font-display font-bold text-white gradient-bg hover:shadow-xl hover:shadow-blue-500/25 cursor-pointer text-center flex items-center justify-center min-w-[200px]"
                    >
                      Join Early Access
                    </RippleButton>
                  </MagneticButton>

                  <MagneticButton range={45}>
                    <RippleButton
                      id="hero-cta-worker"
                      onClick={() => onJoinWaitlist('worker')}
                      rippleColor="rgba(148, 163, 184, 0.2)"
                      className="w-full sm:w-auto px-8 py-4 rounded-2xl font-display font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 shadow-xs cursor-pointer text-center flex items-center justify-center min-w-[200px]"
                    >
                      Become a Worker
                    </RippleButton>
                  </MagneticButton>
                </div>
              </StaggerItem>

              {/* Trust Badges List */}
              <StaggerItem direction="up" className="pt-6 border-t border-slate-200/60 dark:border-white/10">
                <p className="text-slate-400 dark:text-slate-500 font-bold text-xs uppercase tracking-wider mb-4">
                  THE SKILLNOVAX GUARANTEE
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-2.5">
                  {trustBadges.map((badge, idx) => {
                    const Icon = badge.icon;
                    return (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold cursor-default transition-shadow hover:shadow-sm ${badge.color}`}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{badge.text}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </StaggerItem>

            </StaggerContainer>
          </div>

          {/* Right Column: Live CSS Phone Simulator with elegant floating and parallax animation */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1], // power4.out curve
              }}
              className="w-full max-w-[320px] sm:max-w-sm relative"
              style={{ x: springX, y: springY }}
            >
              <motion.div
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, 1.2, 0, -1.2, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="relative"
              >
                {/* Glow behind phone slowly pulses */}
                <div className="absolute inset-0 bg-blue-500/10 dark:bg-blue-400/10 rounded-[48px] blur-3xl scale-95 animate-pulse pointer-events-none" style={{ animationDuration: '4s' }} />
                <PhoneSimulator waitlistCount={waitlistCount} />
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
