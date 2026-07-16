import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, Droplet, Tv, Sparkles, Hammer, Paintbrush, 
  Layers, HardHat, Shield, Laptop, Scissors, Bug, 
  Truck, Flower2, Search, ChevronDown, ChevronUp, PlusCircle, Check, Users, ChefHat, Heart
} from 'lucide-react';
import { SERVICES_DATA } from '../data';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap,
  Droplet,
  Tv,
  Sparkles,
  Hammer,
  Paintbrush,
  Layers,
  HardHat,
  Shield,
  Laptop,
  Scissors,
  Bug,
  Truck,
  Flower2,
  Users,
  ChefHat
};

const marqueeServices = [
  { name: 'Electrical Works', icon: Zap },
  { name: 'Plumbing Solutions', icon: Droplet },
  { name: 'Appliance Tuning', icon: Tv },
  { name: 'Sanitation Vetting', icon: Sparkles },
  { name: 'Woodwork Crafting', icon: Hammer },
  { name: 'Wall Painting', icon: Paintbrush },
  { name: 'Waterproofing', icon: Layers },
  { name: 'Civil Construction', icon: HardHat },
  { name: 'Aadhaar Screening', icon: Shield },
  { name: 'Software Vetting', icon: Laptop },
  { name: 'Grooming & Salon', icon: Scissors },
  { name: 'Pest Control', icon: Bug },
  { name: 'Cargo Transit', icon: Truck },
  { name: 'Horticulture', icon: Flower2 },
  { name: 'Catering & Dining', icon: ChefHat },
];

export default function Services() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  // Custom Service Suggestion State
  const [customSuggestion, setCustomSuggestion] = useState('');
  const [suggestionSubmitted, setSuggestionSubmitted] = useState(false);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Filter service categories based on category name or sub-service name
  const filteredServices = SERVICES_DATA.filter((service) => {
    const matchesCategory = service.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubService = service.subServices.some((sub) =>
      sub.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return matchesCategory || matchesSubService;
  });

  const handleSuggestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customSuggestion.trim()) return;
    setSuggestionSubmitted(true);
    setTimeout(() => {
      setCustomSuggestion('');
      setSuggestionSubmitted(false);
    }, 3000);
  };

  return (
    <section id="services" className="py-20 md:py-28 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-1 px-3.5 py-1.5 rounded-full bg-blue-50/45 dark:bg-blue-950/45 backdrop-blur-md border border-blue-200/50 dark:border-blue-800/50 text-xs font-bold text-blue-800 dark:text-blue-300 uppercase tracking-wider mb-4">
            <Zap className="h-4 w-4" />
            <span>OUR OFFERINGS</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight mb-4">
            A Hyperlocal Specialist for Every Need
          </h2>
          <p className="font-sans text-base text-slate-500 dark:text-slate-400">
            Explore our massive range of 14 key categories covering over 120+ specialized home and wellness services.
          </p>
        </div>

        {/* Premium Infinite Scroll Service Logos/Category Ticker */}
        <div className="relative w-full overflow-hidden mb-16 py-4 bg-slate-100/30 dark:bg-slate-900/10 border-y border-slate-200/30 dark:border-white/5 select-none">
          {/* Edge Fades for smooth blend in */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-slate-50/50 to-transparent dark:from-slate-950 z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-slate-50/50 to-transparent dark:from-slate-950 z-10 pointer-events-none" />

          <motion.div
            className="flex space-x-8 whitespace-nowrap"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              repeat: Infinity,
              ease: 'linear',
              duration: 28,
            }}
          >
            {/* Double the array for infinite wrap effect */}
            {[...marqueeServices, ...marqueeServices].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-2xl bg-white/70 dark:bg-slate-900/50 backdrop-blur-md border border-slate-100 dark:border-white/5 shadow-xs text-xs font-bold text-slate-700 dark:text-slate-300"
                >
                  <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-500 dark:text-blue-400">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span>{item.name}</span>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Live Search Bar */}
        <div className="max-w-xl mx-auto mb-12 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <Search className="h-5 w-5" />
          </div>
          <input
            id="service-search-input"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search e.g., Fan Installation, Haircut, RO Repair..."
            className="w-full pl-11 pr-4 py-4 rounded-2xl bg-white/45 dark:bg-slate-900/45 backdrop-blur-xl border border-white/50 dark:border-white/10 shadow-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/25 focus:border-blue-400/80 text-sm transition-all font-sans"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, idx) => {
              const Icon = iconMap[service.icon] || Zap;
              const isExpanded = expandedId === service.id || searchTerm.trim() !== '';

              return (
                <motion.div
                  key={service.id}
                  id={`service-card-${service.id}`}
                  layout="position"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    y: -6, 
                    scale: 1.015,
                    boxShadow: '0 20px 40px -15px rgba(37, 99, 235, 0.12)'
                  }}
                  transition={{ 
                    duration: 0.35, 
                    delay: idx * 0.04,
                    layout: { type: 'spring', stiffness: 150, damping: 20 }
                  }}
                  className={`glass-card rounded-3xl overflow-hidden flex flex-col h-fit hover:bg-white/60 dark:hover:bg-slate-900/40 hover:border-white/70 dark:hover:border-white/20 transition-all duration-300 ${
                    isExpanded ? 'ring-2 ring-blue-500/15 border-blue-300/60 dark:border-blue-500/30' : ''
                  }`}
                >
                  {/* Card Header Trigger */}
                  <div
                    onClick={() => toggleExpand(service.id)}
                    className="p-6 cursor-pointer select-none flex items-start justify-between space-x-4"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="p-3 rounded-2xl bg-blue-50/50 dark:bg-blue-950/50 backdrop-blur-md border border-blue-200/30 dark:border-blue-800/30 text-blue-700 dark:text-blue-300">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                          {service.name}
                        </h3>
                        <p className="font-sans text-xs text-slate-400 dark:text-slate-500 font-medium mt-1">
                          {service.subServices.length} sub-services available
                        </p>
                      </div>
                    </div>
                    <button
                      className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 group-hover:bg-slate-100 dark:group-hover:bg-slate-700 transition-colors"
                      aria-label="Expand service options"
                    >
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                      )}
                    </button>
                  </div>

                  {/* Card Description */}
                  <div className="px-6 pb-4">
                    <p className="font-sans text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Expandable Sub-Services List */}
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="border-t border-white/40 dark:border-white/10 bg-white/20 dark:bg-slate-900/20 backdrop-blur-md p-6 flex-1"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {service.subServices.map((sub, idx) => {
                          const isSearched = searchTerm && sub.toLowerCase().includes(searchTerm.toLowerCase());
                          return (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.02 }}
                              className={`flex items-center space-x-2 p-2 rounded-xl border text-[11px] font-semibold transition-all ${
                                isSearched
                                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                                  : 'bg-white/50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 border-slate-200/50 dark:border-white/10 backdrop-blur-sm'
                              }`}
                            >
                              {isSearched ? (
                                <Check className="h-3 w-3 shrink-0" />
                              ) : (
                                <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0"></span>
                              )}
                              <span className="truncate">{sub}</span>
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Fallback empty search state */}
          {filteredServices.length === 0 && (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12 glass-card rounded-3xl p-8">
              <p className="font-display font-bold text-lg text-slate-900 dark:text-white">No matching services found</p>
              <p className="font-sans text-xs text-slate-400 dark:text-slate-500 mt-1">Try refining your search terms or submit a custom suggestion below.</p>
            </div>
          )}
        </div>

        {/* Future-proof Suggest a Service Section */}
        <div className="mt-16 glass-card rounded-3xl p-8 max-w-2xl mx-auto hover:bg-white/60 dark:hover:bg-slate-900/40 hover:shadow-xl hover:border-white/70 dark:hover:border-white/20 transition-all duration-300">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded-2xl shrink-0">
              <PlusCircle className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-display font-bold text-slate-950 dark:text-white text-base">
                Looking for a service category not listed?
              </h4>
              <p className="font-sans text-xs text-slate-500 dark:text-slate-400">
                Let us know! SkillnovaX is expanding quickly, and we design our systems to easily scale with new hyperlocal modules.
              </p>
            </div>
          </div>

          <form onSubmit={handleSuggestSubmit} className="flex gap-2">
            <input
              id="suggest-service-input"
              type="text"
              value={customSuggestion}
              onChange={(e) => setCustomSuggestion(e.target.value)}
              placeholder="e.g. Electric Vehicle Charger Fixing, Pet Grooming..."
              disabled={suggestionSubmitted}
              className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white/45 dark:bg-slate-900/45 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 disabled:opacity-50"
            />
            <button
              id="suggest-service-btn"
              type="submit"
              disabled={suggestionSubmitted || !customSuggestion.trim()}
              className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 active:scale-95 transition-all duration-200 cursor-pointer shrink-0 disabled:opacity-50"
            >
              {suggestionSubmitted ? '✓ Submitted!' : 'Suggest Service'}
            </button>
          </form>

          {suggestionSubmitted && (
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[11px] text-emerald-600 font-semibold mt-2"
            >
              Thank you! Our AI team reviews service requests to prioritizing our next city launches.
            </motion.p>
          )}
        </div>

      </div>
    </section>
  );
}
