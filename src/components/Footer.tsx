import React from 'react';
import { motion } from 'motion/react';
import { Zap, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' }
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer id="contact" className="bg-slate-950/45 backdrop-blur-md text-slate-400 pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-white/10">
          
          {/* Brand block (span 4) */}
          <div className="md:col-span-4 space-y-4">
            <a
              href="#home"
              onClick={(e) => handleScrollTo(e, '#home')}
              className="flex items-center space-x-2 w-fit group"
            >
              <div className="gradient-bg-light p-2 rounded-xl text-white shadow-md group-hover:rotate-12 transition-transform duration-300">
                <Zap className="h-4 w-4 fill-current" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-white">
                Skillnova<span className="text-blue-500">X</span>
              </span>
            </a>
            <p className="font-sans text-xs text-slate-400 leading-relaxed max-w-sm">
              India’s next-generation, AI-powered hyperlocal home service marketplace connecting customers with verified professional tradespeople in seconds.
            </p>
            
            {/* Social Links with elastic hover scaling */}
            <div className="flex space-x-3.5 pt-2">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={idx}
                    href={social.href}
                    whileHover={{ scale: 1.15, rotate: 6 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/15 border border-white/5 transition-colors cursor-pointer"
                    aria-label={social.label}
                  >
                    <Icon className="h-4 w-4" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Quick links block (span 2.5) with sliding hovers */}
          <div className="md:col-span-2.5">
            <h4 className="font-display font-bold text-xs text-white uppercase tracking-wider mb-4 font-mono">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs">
              {['Home', 'About Us', 'Services', 'Features', 'How It Works'].map((link, idx) => {
                const hrefs = ['#home', '#about', '#services', '#features', '#how-it-works'];
                return (
                  <li key={idx}>
                    <motion.a
                      href={hrefs[idx]}
                      onClick={(e) => handleScrollTo(e, hrefs[idx])}
                      whileHover={{ x: 4 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="hover:text-white transition-colors inline-block cursor-pointer"
                    >
                      {link}
                    </motion.a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Guidelines / Privacy Policy block (span 2.5) */}
          <div className="md:col-span-2.5">
            <h4 className="font-display font-bold text-xs text-white uppercase tracking-wider mb-4 font-mono">
              Legal & Careers
            </h4>
            <ul className="space-y-2.5 text-xs">
              {['Privacy Policy', 'Terms & Conditions', 'Careers', 'Investor Pitch', 'FAQ'].map((link, idx) => {
                const hrefs = ['#privacy', '#terms', '#careers', '#investors', '#faq'];
                const isHiring = link === 'Careers';
                const isAnchor = link === 'FAQ';

                return (
                  <li key={idx}>
                    {isAnchor ? (
                      <motion.a
                        href="#faq"
                        onClick={(e) => handleScrollTo(e, '#faq')}
                        whileHover={{ x: 4 }}
                        className="hover:text-white transition-colors inline-block cursor-pointer"
                      >
                        {link}
                      </motion.a>
                    ) : (
                      <motion.a
                        href={hrefs[idx]}
                        whileHover={{ x: 4 }}
                        className="hover:text-white transition-colors inline-flex items-center space-x-1.5 cursor-pointer"
                      >
                        <span>{link}</span>
                        {isHiring && (
                          <span className="px-1.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-[9px] font-bold">Hiring</span>
                        )}
                      </motion.a>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact Details (span 3) */}
          <div className="md:col-span-3 space-y-3.5 text-xs">
            <h4 className="font-display font-bold text-xs text-white uppercase tracking-wider mb-4 font-mono">
              Get in Touch
            </h4>
            <div className="flex items-start space-x-2.5 leading-normal">
              <MapPin className="h-4.5 w-4.5 text-blue-500 shrink-0 mt-0.5" />
              <span>Rameshwaram Tiles and Hardware Building, Rajapur R-2, Teonthar, Rewa, Madhyapradesh - 486220</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <Phone className="h-4 w-4 text-blue-500 shrink-0" />
              <span className="font-mono">+91 79878 56316</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <Mail className="h-4 w-4 text-blue-500 shrink-0" />
              <span className="font-mono text-indigo-400">support@skillnovax.com</span>
            </div>
          </div>

        </div>

        {/* Bottom Rights signature */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs gap-4 text-slate-500">
          <span>© 2026 SkillnovaX. All Rights Reserved.</span>
          <div className="flex space-x-4 font-semibold">
            <motion.a href="#privacy" whileHover={{ y: -1 }} className="hover:text-slate-400 transition-colors">Privacy Policy</motion.a>
            <span>•</span>
            <motion.a href="#terms" whileHover={{ y: -1 }} className="hover:text-slate-400 transition-colors">Terms of Use</motion.a>
          </div>
        </div>

      </div>
    </footer>
  );
}
