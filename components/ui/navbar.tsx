import React, { useState, useEffect, useRef } from 'react';
import { Button } from './button';
import { Menu, X, Calendar, Sun, Moon, Type, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../lib/theme-provider';
import { useFont, FontFamily } from '../../lib/font-provider';
import { SynapseLogo } from './synapse-logo';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [fontMenuOpen, setFontMenuOpen] = useState(false);
  const fontMenuRef = useRef<HTMLDivElement>(null);
  
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { font, setFont } = useFont();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    // Close dropdown on click outside
    const handleClickOutside = (event: MouseEvent) => {
      if (fontMenuRef.current && !fontMenuRef.current.contains(event.target as Node)) {
        setFontMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navLinks = [
    { name: 'O Sistema', href: '#features' },
    { name: 'Aplicações', href: '#use-cases' },
    { name: 'Workflow', href: '#workflow' },
  ];

  const fonts: { id: FontFamily; name: string }[] = [
    { id: 'hanken', name: 'Hanken Grotesk' },
    { id: 'montreal', name: 'Neue Montreal' },
    { id: 'sen', name: 'Sen' },
    { id: 'manrope', name: 'Manrope' },
  ];

  const handleContact = () => {
    document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
          scrolled 
            ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-slate-200 dark:border-white/10 py-3 shadow-sm dark:shadow-none" 
            : "bg-transparent border-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer group" onClick={() => navigate('/')}>
            {/* Animated Logo Component - Increased Size */}
            <div className="relative w-14 h-14 flex items-center justify-center">
               <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
               <SynapseLogo className="w-16 h-16 text-slate-900 dark:text-white relative z-10" />
            </div>
            
            {/* Text Branding */}
            <div className="flex flex-col justify-center">
              <span className="font-bold text-xl tracking-tight leading-none text-slate-900 dark:text-white">
                Synapse<span className="text-cyan-600 dark:text-cyan-400">.AI</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 font-semibold mt-1">
                Intelligence Hub
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {/* Font Switcher */}
            <div className="relative" ref={fontMenuRef}>
              <button
                onClick={() => setFontMenuOpen(!fontMenuOpen)}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
                aria-label="Change font"
              >
                <Type className="w-5 h-5" />
              </button>

              <AnimatePresence>
                {fontMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 w-48 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-xl overflow-hidden z-50 p-1"
                  >
                    {fonts.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => {
                          setFont(f.id);
                          setFontMenuOpen(false);
                        }}
                        className={cn(
                          "w-full px-3 py-2 text-sm text-left rounded-lg flex items-center justify-between transition-colors",
                          font === f.id 
                            ? "bg-cyan-50 dark:bg-cyan-950/30 text-cyan-600 dark:text-cyan-400 font-medium" 
                            : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5"
                        )}
                      >
                        {f.name}
                        {font === f.id && <Check className="w-4 h-4" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <Button variant="gradient" size="sm" onClick={handleContact} className="gap-2">
              <Calendar className="w-4 h-4" /> Agendar Demo
            </Button>
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-4 md:hidden">
             <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button 
              className="text-slate-900 dark:text-slate-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white dark:bg-slate-950 pt-24 px-6 md:hidden overflow-y-auto"
          >
            <div className="flex flex-col gap-6 pb-10">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-medium text-slate-900 dark:text-slate-300"
                >
                  {link.name}
                </a>
              ))}
              
              <hr className="border-slate-200 dark:border-white/10" />

              <div className="space-y-3">
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Tipografia</p>
                <div className="grid grid-cols-2 gap-2">
                  {fonts.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setFont(f.id)}
                      className={cn(
                        "px-3 py-2 text-sm rounded-lg border transition-all",
                        font === f.id 
                          ? "border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400" 
                          : "border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400"
                      )}
                    >
                      {f.name}
                    </button>
                  ))}
                </div>
              </div>

              <hr className="border-slate-200 dark:border-white/10" />
              
              <Button size="lg" variant="gradient" className="w-full" onClick={() => {
                setMobileMenuOpen(false);
                handleContact();
              }}>
                Agendar Demo
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};