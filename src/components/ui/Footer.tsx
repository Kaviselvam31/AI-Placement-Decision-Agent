import { Link } from 'react-router-dom';
import { Brain, Github, Linkedin, Mail, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-slate-200/70 dark:border-white/10 bg-white/60 dark:bg-slate-950/60 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-accent-600 shadow-glow">
                <Brain className="h-5 w-5 text-white" />
              </span>
              <span className="font-display text-base font-bold text-slate-900 dark:text-white">
                Placement<span className="gradient-text-strong">AI</span>
              </span>
            </Link>
            <p className="mt-4 max-w-md text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              An AI-powered placement mentor that analyzes your academic profile, technical skills,
              projects, and resume to deliver a personalized placement readiness report and roadmap.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[Github, Twitter, Linkedin, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:text-brand-700 dark:hover:text-brand-300 hover:border-brand-300 dark:hover:border-brand-500/40 transition-colors"
                  aria-label="social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-slate-900 dark:text-white">Product</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link to="/assessment" className="text-slate-500 dark:text-slate-400 hover:text-brand-700 dark:hover:text-brand-300">Assessment</Link></li>
              <li><Link to="/#features" className="text-slate-500 dark:text-slate-400 hover:text-brand-700 dark:hover:text-brand-300">Features</Link></li>
              <li><Link to="/#how-it-works" className="text-slate-500 dark:text-slate-400 hover:text-brand-700 dark:hover:text-brand-300">How It Works</Link></li>
              <li><Link to="/#faq" className="text-slate-500 dark:text-slate-400 hover:text-brand-700 dark:hover:text-brand-300">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-slate-900 dark:text-white">Resources</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><a href="#" onClick={(e) => e.preventDefault()} className="text-slate-500 dark:text-slate-400 hover:text-brand-700 dark:hover:text-brand-300">Documentation</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} className="text-slate-500 dark:text-slate-400 hover:text-brand-700 dark:hover:text-brand-300">Privacy Policy</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} className="text-slate-500 dark:text-slate-400 hover:text-brand-700 dark:hover:text-brand-300">Terms of Service</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} className="text-slate-500 dark:text-slate-400 hover:text-brand-700 dark:hover:text-brand-300">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200/70 dark:border-white/10 pt-6">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            (c) {new Date().getFullYear()} Placement Decision AI Agent. Built for the AI Agent Development Challenge.
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Powered by Google Gemini
          </p>
        </div>
      </div>
    </footer>
  );
}
