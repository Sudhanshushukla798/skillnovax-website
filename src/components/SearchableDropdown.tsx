import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Search, X, Check } from 'lucide-react';

interface SearchableDropdownProps {
  id: string;
  label: string;
  placeholder: string;
  searchPlaceholder?: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export default function SearchableDropdown({
  id,
  label,
  placeholder,
  searchPlaceholder = "Search...",
  options,
  value,
  onChange,
  disabled = false,
  icon
}: SearchableDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Filter options based on search query
  const filteredOptions = options.filter(opt =>
    opt.toLowerCase().includes(search.toLowerCase())
  );

  // Reset highlighted index when options or search change
  useEffect(() => {
    setHighlightedIndex(-1);
  }, [search, options]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      // Small timeout to allow Framer Motion open animation to start
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      setSearch('');
    }
  }, [isOpen]);

  // Handle outside clicks to close the dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (!isOpen) {
      if (e.key === 'Enter' || e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < filteredOptions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev > 0 ? prev - 1 : filteredOptions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
          handleSelect(filteredOptions[highlightedIndex]);
        } else if (filteredOptions.length === 1) {
          handleSelect(filteredOptions[0]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        break;
      case 'Tab':
        setIsOpen(false);
        break;
    }
  };

  // Ensure highlighted element is scrolled into view
  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const activeEl = listRef.current.children[highlightedIndex] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [highlightedIndex]);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
    setSearch('');
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
    setSearch('');
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-full" id={`container-${id}`}>
      {/* Label */}
      <label 
        htmlFor={`trigger-${id}`} 
        className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2"
      >
        {label}
      </label>

      {/* Selector Trigger Button */}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 z-10">
            {icon}
          </div>
        )}
        
        <button
          id={`trigger-${id}`}
          type="button"
          disabled={disabled}
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          className={`w-full pl-11 pr-10 py-3 bg-white/45 dark:bg-slate-900/45 backdrop-blur-md border border-white/50 dark:border-white/10 rounded-xl text-left text-sm font-sans transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-400 flex items-center justify-between cursor-pointer select-none ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          } ${value ? 'text-slate-900 dark:text-white font-medium' : 'text-slate-400 dark:text-slate-500'}`}
        >
          <span className="truncate">{value || placeholder}</span>
          
          <div className="flex items-center space-x-1 shrink-0 text-slate-400">
            {value && !disabled && (
              <span
                onClick={handleClear}
                className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
                title="Clear selection"
              >
                <X className="h-3.5 w-3.5" />
              </span>
            )}
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </div>
        </button>
      </div>

      {/* Floating Options Dropdown */}
      <AnimatePresence>
        {isOpen && !disabled && (
          <motion.div
            id={`dropdown-${id}`}
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute z-50 w-full bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 rounded-2xl shadow-xl overflow-hidden"
          >
            {/* Search input inside dropdown */}
            <div className="flex items-center border-b border-slate-100 dark:border-slate-800 px-3 py-2 bg-slate-50/50 dark:bg-slate-900/50">
              <Search className="h-4 w-4 text-slate-400 shrink-0 mr-2" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder={searchPlaceholder}
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 py-1"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Scrollable list of options */}
            <div
              ref={listRef}
              className="max-h-56 overflow-y-auto py-1 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800"
            >
              {filteredOptions.length > 0 ? (
                filteredOptions.map((opt, idx) => {
                  const isSelected = value === opt;
                  const isHighlighted = highlightedIndex === idx;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleSelect(opt)}
                      className={`w-full px-4 py-2.5 text-left text-sm font-sans flex items-center justify-between transition-colors ${
                        isSelected 
                          ? 'bg-blue-50/70 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-semibold' 
                          : isHighlighted 
                            ? 'bg-slate-100/70 dark:bg-slate-900/70 text-slate-900 dark:text-white' 
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50/50 dark:hover:bg-slate-900/30 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <span className="truncate">{opt}</span>
                      {isSelected && <Check className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0 ml-2" />}
                    </button>
                  );
                })
              ) : (
                <div className="px-4 py-3 text-sm text-slate-400 dark:text-slate-500 text-center font-sans">
                  No results found
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
