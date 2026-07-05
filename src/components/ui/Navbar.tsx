import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Menu, Moon, Sun, X } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Button } from './Button';

type NavbarProps = {
  isDark: boolean;
  onToggleTheme: () => void;
};

const NAV_LINKS = [
  { label: 'Features', href: '/#features' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Benefits', href: '/#benefits' },
  { label: 'FAQ', href: '/#faq' },
];

export function Navbar({ isDark, onToggleTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const handleNav = (href: string) => {
    if (href.startsWith('/#')) {
      const id = href.slice(2);
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 200);
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(href);
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        scrolled
          ? 'glass-strong shadow-card border-b border-white/40 dark:border-white/10'
          : 'bg-transparent',
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-accent-600 shadow-glow">
            <Brain className="h-5 w-5 text-white" />
            <span className="absolute inset-0 rounded-xl ring-2 ring-brand-400/40 animate-pulse-ring" />
          </span>
          <span className="font-display text-base font-bold tracking-tight text-slate-900 dark:text-white">
            Placement<span className="gradient-text-strong">AI</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-700 dark:hover:text-brand-300 hover:bg-brand-50/60 dark:hover:bg-white/5 transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:text-brand-700 dark:hover:text-brand-300 transition-colors"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isDark ? (
                <motion.span key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Sun className="h-4 w-4" />
                </motion.span>
              ) : (
                <motion.span key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Moon className="h-4 w-4" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <div className="hidden sm:block">
            <Button size="sm" onClick={() => navigate('/assessment')}>
              Start Assessment
            </Button>
          </div>
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/5 text-slate-700 dark:text-slate-200"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden glass-strong border-t border-white/40 dark:border-white/10"
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="block w-full rounded-2xl px-4 py-3 text-left text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-brand-50 dark:hover:bg-white/5"
                >
                  {link.label}
                </button>
              ))}
              <Button className="w-full mt-2" onClick={() => navigate('/assessment')}>
                Start Assessment
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
