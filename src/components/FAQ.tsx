import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { FAQ_DATA } from '../data';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [faqSearch, setFaqSearch] = useState('');

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const filteredFaqs = FAQ_DATA.filter(
    (faq) =>
      faq.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
      faq.answer.toLowerCase().includes(faqSearch.toLowerCase())
  );

  return (
    <section id="faq" className="py-20 md:py-28 bg-transparent">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1 px-3.5 py-1.5 rounded-full bg-blue-50/45 dark:bg-blue-950/45 backdrop-blur-md border border-blue-200/50 dark:border-blue-800/50 text-xs font-bold text-blue-800 dark:text-blue-300 uppercase tracking-wider mb-4">
            <HelpCircle className="h-4 w-4" />
            <span>COMMON INQUIRIES</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight mb-4 transition-colors">
            Frequently Asked Questions
          </h2>
          <p className="font-sans text-sm text-slate-500 dark:text-slate-400 transition-colors">
            Got questions about our upcoming launch, secure payment escrows, or background vetting? We have answers.
          </p>
        </div>

        {/* Mini FAQ Search Bar */}
        <div className="relative mb-10 max-w-md mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="h-4 w-4" />
          </div>
          <input
            id="faq-search-input"
            type="text"
            value={faqSearch}
            onChange={(e) => setFaqSearch(e.target.value)}
            placeholder="Search FAQs..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/45 dark:bg-slate-900/45 backdrop-blur-xl border border-white/50 dark:border-white/10 shadow-xs text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/25 focus:border-blue-400/80"
          />
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <motion.div
                  key={faq.question}
                  layout="position"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className={`glass-card rounded-2xl overflow-hidden transition-all duration-200 ${
                    isOpen 
                      ? 'ring-1 ring-blue-500/10 border-blue-200/80 dark:border-blue-500/30 shadow-md bg-white/60 dark:bg-slate-900/60' 
                      : 'hover:bg-white/40 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <button
                    id={`faq-trigger-${idx}`}
                    onClick={() => toggleAccordion(idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left select-none focus:outline-hidden cursor-pointer"
                  >
                    <span className="font-display font-bold text-sm sm:text-base text-slate-900 dark:text-white pr-4 transition-colors">
                      {faq.question}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="p-1 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-400 shrink-0 transition-colors block"
                    >
                      <ChevronDown className="h-4 w-4 text-slate-700 dark:text-slate-300" />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="border-t border-white/40 dark:border-white/10 bg-white/20 dark:bg-slate-950/20 backdrop-blur-sm"
                      >
                        <div className="px-6 py-5">
                          <p className="font-sans text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filteredFaqs.length === 0 && (
            <div className="text-center py-8 glass-card rounded-2xl p-6">
              <p className="font-display font-semibold text-slate-900">No FAQ matches found</p>
              <button
                onClick={() => setFaqSearch('')}
                className="mt-2 text-xs text-blue-600 font-bold hover:underline"
              >
                Clear search terms
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
