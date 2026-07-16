import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Zap, Sparkles, Sun, Moon } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme;
      }
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Control glass transparency
      if (currentScrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Hide on scroll down, reveal on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 120) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'For Customers', href: '#benefits-customers' },
    { name: 'For Workers', href: '#benefits-workers' },
    { name: 'About', href: '#about' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      setIsOpen(false);
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav
      id="navbar"
      style={{
        transform: visible ? 'translate3d(0, 0, 0)' : 'translate3d(0, -100%, 0)',
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), padding 0.3s, background-color 0.3s, border-color 0.3s, box-shadow 0.3s'
      }}
      className={`fixed top-0 left-0 w-full z-50 ${
        scrolled
          ? 'py-3 bg-white/35 dark:bg-slate-950/35 backdrop-blur-xl border-b border-white/45 dark:border-white/10 shadow-lg shadow-blue-900/5'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            id="nav-logo"
            href="#home"
            onClick={(e) => handleScrollTo(e, '#home')}
            className="flex items-center group focus:outline-none"
          >
            <svg
              viewBox="0 0 392 125"
              className="h-13 sm:h-15 w-auto transition-transform duration-300 group-hover:scale-[1.02]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#2563eb" />
                  <stop offset="100%" stopColor="#0ea5e9" />
                </linearGradient>
                <linearGradient id="blueGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1d4ed8" />
                  <stop offset="50%" stopColor="#2563eb" />
                  <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>
              </defs>
              
              {/* SKILLNOVA Letters - Bolder with strokeWidth 6.0 */}
              {/* S */}
              <path
                d="M 45,50 L 22,50 L 22,62 L 45,66 L 45,80 L 22,80"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-slate-900 dark:text-white transition-colors duration-300"
              />
              {/* K */}
              <path
                d="M 58,50 L 58,80 M 78,50 L 59,65 L 78,80"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-slate-900 dark:text-white transition-colors duration-300"
              />
              {/* I */}
              <path
                d="M 90,50 L 90,80"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                className="text-slate-900 dark:text-white transition-colors duration-300"
              />
              {/* L */}
              <path
                d="M 102,50 L 102,80 L 118,80"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-slate-900 dark:text-white transition-colors duration-300"
              />
              {/* L */}
              <path
                d="M 130,50 L 130,80 L 146,80"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-slate-900 dark:text-white transition-colors duration-300"
              />
              {/* N */}
              <path
                d="M 158,80 L 158,50 L 180,80 L 180,50"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-slate-900 dark:text-white transition-colors duration-300"
              />
              {/* O */}
              <rect
                x="194"
                y="50"
                width="22"
                height="30"
                rx="6"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                className="text-slate-900 dark:text-white transition-colors duration-300"
              />
              {/* V */}
              <path
                d="M 228,50 L 239,80 L 250,50"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-slate-900 dark:text-white transition-colors duration-300"
              />
              {/* A */}
              <path
                d="M 262,80 L 273,50 L 284,80 M 266,71 L 280,71"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-slate-900 dark:text-white transition-colors duration-300"
              />
              
              {/* Custom Blue Theme X */}
              {/* Elongated diagonal with Star pointing tip */}
              <line
                x1="300"
                y1="83"
                x2="350"
                y2="32"
                stroke="url(#blueGradient)"
                strokeWidth="7"
                strokeLinecap="round"
              />
              {/* Shorter diagonal */}
              <line
                x1="304"
                y1="51"
                x2="334"
                y2="79"
                stroke="url(#blueGradient)"
                strokeWidth="7"
                strokeLinecap="round"
              />
              
              {/* Swooping Arc over the word */}
              <path
                d="M 90,48 Q 200,10 350,30"
                fill="none"
                stroke="url(#arcGradient)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              
              {/* Glowing Sparkle Star at tip of X */}
              {/* Large Flare */}
              <path
                d="M 350,12 Q 350,30 332,30 Q 350,30 350,48 Q 350,30 368,30 Q 350,30 350,12"
                fill="url(#blueGradient)"
              />
              {/* Small Flare (rotated 45deg) */}
              <path
                d="M 350,12 Q 350,30 332,30 Q 350,30 350,48 Q 350,30 368,30 Q 350,30 350,12"
                fill="url(#blueGradient)"
                transform="rotate(45 350 30)"
              />
              {/* Sparkle center dot */}
              <circle cx="350" cy="30" r="2.5" fill="#FFFFFF" />
              
              {/* Tagline Section with Side Lines */}
              {/* Left Line */}
              <line
                x1="20"
                y1="108"
                x2="52"
                y2="108"
                stroke="#2563eb"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              {/* Right Line */}
              <line
                x1="340"
                y1="108"
                x2="372"
                y2="108"
                stroke="#38bdf8"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              {/* Centered Tagline text */}
              <text
                x="196"
                y="112"
                textAnchor="middle"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontSize="10"
                fontWeight="800"
                letterSpacing="2.8"
              >
                <tspan fill="currentColor" className="text-slate-900 dark:text-white transition-colors duration-300">EMPOWERING BHARAT'S </tspan>
                <tspan fill="#38bdf8">SKILLED WORKFORCE</tspan>
              </text>
            </svg>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                id={`nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="relative px-3 py-2 rounded-lg font-sans text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50/40 dark:hover:bg-slate-800/30 transition-all duration-300 group/nav"
              >
                <span>{link.name}</span>
                <span className="absolute bottom-1.5 left-3 right-3 h-[1.5px] bg-blue-600 dark:bg-blue-400 transform scale-x-0 group-hover/nav:scale-x-100 transition-transform duration-300 origin-left" />
              </a>
            ))}
          </div>

          {/* Theme Switcher, CTA & Status Badge */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Theme Toggle Button */}
            <motion.button
              id="theme-toggle-desktop"
              onClick={toggleTheme}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 rounded-xl bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border border-white/50 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/80 dark:hover:bg-slate-800/80 active:scale-95 transition-all cursor-pointer shadow-xs"
              aria-label="Toggle dark mode"
            >
              {theme === 'light' ? (
                <Moon className="h-4.5 w-4.5" />
              ) : (
                <Sun className="h-4.5 w-4.5" />
              )}
            </motion.button>

            <motion.span
              whileHover={{ y: -1 }}
              className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40 text-xs font-semibold text-indigo-700 dark:text-indigo-300"
            >
              <Sparkles className="h-3 w-3 animate-pulse" />
              <span>Launching Soon</span>
            </motion.span>
            
            <motion.a
              id="nav-cta-waitlist"
              href="#waitlist"
              onClick={(e) => handleScrollTo(e, '#waitlist')}
              whileHover={{ scale: 1.04, boxShadow: '0 10px 25px -10px rgba(37, 99, 235, 0.4)' }}
              whileTap={{ scale: 0.97 }}
              className="px-5 py-2.5 rounded-xl font-display text-sm font-semibold text-white gradient-bg hover:shadow-lg hover:shadow-blue-500/20 active:scale-95 transition-all duration-200"
            >
              Join Waitlist
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            {/* Theme Toggle Button */}
            <button
              id="theme-toggle-mobile"
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border border-white/50 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 active:scale-95 transition-all cursor-pointer"
              aria-label="Toggle dark mode"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </button>

            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40 text-[10px] font-semibold text-indigo-700 dark:text-indigo-300">
              Soon
            </span>
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sliding Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu-container"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden bg-white/45 dark:bg-slate-950/45 backdrop-blur-xl border-b border-white/45 dark:border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1 sm:px-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  id={`mobile-nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className="block px-3 py-3 rounded-lg text-base font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/50 flex flex-col space-y-3 px-3">
                <a
                  id="mobile-nav-cta"
                  href="#waitlist"
                  onClick={(e) => handleScrollTo(e, '#waitlist')}
                  className="w-full text-center px-4 py-3 rounded-xl font-display font-semibold text-white gradient-bg shadow-sm"
                >
                  Join Waitlist
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
