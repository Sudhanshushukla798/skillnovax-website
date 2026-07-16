import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { ArrowUp, Sparkles, Shield, MapPin, Zap, RefreshCw } from 'lucide-react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import AppFeatures from './components/AppFeatures';
import HowItWorks from './components/HowItWorks';
import ScreenshotsCarousel from './components/ScreenshotsCarousel';
import Benefits from './components/Benefits';
import FAQ from './components/FAQ';
import WaitlistForm from './components/WaitlistForm';
import Footer from './components/Footer';
import { ScrollReveal, FloatingParticles } from './components/Animate';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  const [loadingStatus, setLoadingStatus] = useState('Orchestrating gig workforce...');
  const [waitlistCount, setWaitlistCount] = useState(1420);
  const [selectedRole, setSelectedRole] = useState<'customer' | 'worker'>('customer');
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  // Mouse position state for following glow effect
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  // Scroll Progress Setup
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Loading Screen simulation with realistic step counters and messages
  useEffect(() => {
    const statuses = [
      'Orchestrating gig workforce...',
      'Securing Aadhaar identity layers...',
      'Mapping location grid (2.5km limit)...',
      'Configuring digital escrow gates...',
      'Launching SkillnovaX India...'
    ];

    let start = 0;
    const interval = setInterval(() => {
      start += Math.floor(Math.random() * 15) + 8;
      if (start >= 100) {
        start = 100;
        setLoadingPercentage(100);
        clearInterval(interval);
        setTimeout(() => setLoading(false), 250); // fast & elegant smooth exit
      } else {
        setLoadingPercentage(start);
        // Rotate status messages periodically based on loading progress
        const statusIdx = Math.min(
          Math.floor((start / 100) * statuses.length),
          statuses.length - 1
        );
        setLoadingStatus(statuses[statusIdx]);
      }
    }, 30); // accelerated progress speed for 1-second animation budget

    return () => clearInterval(interval);
  }, []);

  // Initialize Lenis smooth scroll with luxurious inertia and acceleration
  useEffect(() => {
    if (loading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // ultra-smooth expo-out
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    let frameId: number;
    function raf(time: number) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }
    frameId = requestAnimationFrame(raf);

    // Dynamic scroll tracking for window parallax and ScrollTrigger alignment
    const handleScroll = () => {
      // update state if needed, can let Lenis natively control smoothness
    };
    lenis.on('scroll', handleScroll);

    // Custom anchor element interception to smooth-scroll via Lenis
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor && anchor.hash && anchor.hash.startsWith('#')) {
        const targetElement = document.querySelector(anchor.hash);
        if (targetElement) {
          e.preventDefault();
          lenis.scrollTo(anchor.hash, {
            offset: -80,
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        }
      }
    };
    document.addEventListener('click', handleAnchorClick);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
      document.removeEventListener('click', handleAnchorClick);
    };
  }, [loading]);

  // Back to top button visibility & Mouse Glow configuration
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Only track if on a desktop/hover-capable device
      if (window.matchMedia('(hover: hover)').matches) {
        setMousePos({ x: e.clientX, y: e.clientY });
        setIsHovering(true);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleJoinWaitlist = (role: 'customer' | 'worker') => {
    setSelectedRole(role);
    const element = document.querySelector('#waitlist');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSubmissionAdded = (newCount: number) => {
    setWaitlistCount(newCount);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
            className="fixed inset-0 z-[9999] bg-slate-950 flex flex-col items-center justify-center p-6 text-white overflow-hidden"
          >
            {/* Background glowing effects for loader */}
            <div className="absolute top-[20%] left-[15%] w-[40vw] h-[40vw] bg-blue-600/10 rounded-full blur-3xl" />
            <div className="absolute bottom-[20%] right-[15%] w-[40vw] h-[40vw] bg-purple-600/10 rounded-full blur-3xl" />
            
            <div className="text-center max-w-md relative z-10 flex flex-col items-center">
              {/* Spinning / Glowing Badge Logo */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="mb-8 relative"
              >
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse" />
                <div className="p-5 bg-slate-900 border border-slate-800 rounded-3xl relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
                  >
                    <Zap className="h-10 w-10 text-blue-400 fill-blue-400/20" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Title logo and Tagline */}
              <h1 className="font-display font-extrabold text-3xl tracking-tight text-white mb-2">
                SKILLNOVA<span className="text-blue-500">X</span>
              </h1>
              <p className="font-sans text-xs uppercase tracking-[0.25em] text-slate-400 font-bold mb-10">
                Empowering Bharat's Skilled Workforce
              </p>

              {/* Progress counter */}
              <div className="text-5xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-400 mb-4 select-none">
                {loadingPercentage}%
              </div>

              {/* Loader track bar */}
              <div className="w-64 h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800/80 mb-4">
                <motion.div 
                  className="h-full bg-gradient-to-r from-blue-500 to-sky-400 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${loadingPercentage}%` }}
                  transition={{ ease: 'easeOut', duration: 0.1 }}
                />
              </div>

              {/* Real-time Status Dispatcher */}
              <motion.p
                key={loadingStatus}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="font-mono text-xs text-slate-400 h-5"
              >
                {loadingStatus}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={loading ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-blue-500/20 selection:text-blue-900 flex flex-col font-sans relative overflow-x-hidden transition-colors duration-300"
      >
        
        {/* Scroll Progress Indicator Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-sky-400 z-[999] origin-left"
          style={{ scaleX }}
        />

        {/* Ambient Mouse-Following Glow Orb (Visible only on hover-capable desktops for optimal performance) */}
        {isHovering && (
          <motion.div
            className="fixed pointer-events-none z-0 w-[400px] h-[400px] rounded-full bg-blue-500/10 dark:bg-blue-600/5 blur-[100px]"
            animate={{
              x: mousePos.x - 200,
              y: mousePos.y - 200,
            }}
            transition={{
              type: 'spring',
              damping: 40,
              stiffness: 150,
              mass: 0.6,
            }}
          />
        )}

        {/* Static Background Frosted Blobs - with slow hover/sway animation */}
        <div className="fixed top-[-10%] right-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-blue-200/40 dark:bg-blue-600/15 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-50 pointer-events-none z-0 animate-float" style={{ animationDuration: '14s' }}></div>
        <div className="fixed bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] bg-purple-200/30 dark:bg-purple-600/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-40 pointer-events-none z-0 animate-float" style={{ animationDuration: '18s', animationDelay: '-4s' }}></div>
        <div className="fixed top-[40%] left-[-20%] w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] bg-indigo-200/25 dark:bg-indigo-600/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 pointer-events-none z-0"></div>
        <div className="fixed bottom-[20%] right-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-sky-200/30 dark:bg-sky-600/15 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-35 pointer-events-none z-0 animate-float" style={{ animationDuration: '22s', animationDelay: '-8s' }}></div>

        {/* Sticky navigation with fade-down page load motion */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={loading ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-50"
        >
          <Navbar />
        </motion.div>

        <main className="flex-1 relative z-10">
          {/* Hero section with floating particles overlay */}
          <div className="relative overflow-hidden">
            <FloatingParticles count={25} />
            <ScrollReveal direction="none" delay={0.2}>
              <Hero onJoinWaitlist={handleJoinWaitlist} waitlistCount={waitlistCount} />
            </ScrollReveal>
          </div>

          {/* About segment */}
          <ScrollReveal direction="up" delay={0.1}>
            <About />
          </ScrollReveal>

          {/* Interactive service browser */}
          <ScrollReveal direction="up" delay={0.1}>
            <Services />
          </ScrollReveal>

          {/* Feature grid */}
          <ScrollReveal direction="up" delay={0.1}>
            <WhyChooseUs />
          </ScrollReveal>

          {/* Live app simulator directories */}
          <ScrollReveal direction="up" delay={0.1}>
            <AppFeatures />
          </ScrollReveal>

          {/* Onboarding steps timeline */}
          <ScrollReveal direction="up" delay={0.1}>
            <HowItWorks />
          </ScrollReveal>

          {/* App screenshots gallery */}
          <ScrollReveal direction="up" delay={0.1}>
            <ScreenshotsCarousel />
          </ScrollReveal>

          {/* Benefits side-by-side bento grids */}
          <ScrollReveal direction="up" delay={0.1}>
            <Benefits />
          </ScrollReveal>

          {/* Frequently asked inquiries */}
          <ScrollReveal direction="up" delay={0.1}>
            <FAQ />
          </ScrollReveal>

          {/* Waitlist registry block & database ledger */}
          <ScrollReveal direction="up" delay={0.1}>
            <WaitlistForm
              preselectedRole={selectedRole}
              onSubmissionAdded={handleSubmissionAdded}
              waitlistCount={waitlistCount}
            />
          </ScrollReveal>
        </main>

        {/* Footer contacts & copyrights */}
        <ScrollReveal direction="none">
          <Footer />
        </ScrollReveal>

        {/* Back to Top Button */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              onClick={scrollToTop}
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 50 }}
              whileHover={{ scale: 1.1, y: -4 }}
              whileTap={{ scale: 0.95 }}
              className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white shadow-xl shadow-blue-500/30 dark:shadow-blue-900/30 transition-colors duration-200 cursor-pointer focus:outline-none"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="h-5 w-5 stroke-[2.5]" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
