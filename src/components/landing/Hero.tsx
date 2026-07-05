import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BrainCircuit, FileSearch, Sparkles, Target } from 'lucide-react';
import { Button } from '../ui/Button';

export function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="absolute inset-0 bg-mesh-light dark:bg-mesh-dark" />
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-brand-400/30 blur-3xl animate-float" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-accent-400/30 blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <span className="section-eyebrow">
              <Sparkles className="h-3.5 w-3.5" />
              AI Placement Mentor
            </span>
            <h1 className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white text-balance leading-[1.05]">
              Know your <span className="gradient-text-strong">placement readiness</span> before the recruiter does.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-slate-600 dark:text-slate-300 leading-relaxed text-balance">
              Upload your profile, skills, and resume. Our Gemini-powered mentor analyzes your strengths,
              finds skill gaps, and builds a personalized 30-day roadmap to land your dream role.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button size="lg" onClick={() => navigate('/assessment')} rightIcon={<ArrowRight className="h-4 w-4" />}>
                Start Free Assessment
              </Button>
              <Button size="lg" variant="ghost" onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}>
                See How It Works
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
                No signup required
              </div>
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-brand-500" />
                Powered by Gemini AI
              </div>
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-accent-500" />
                PDF report download
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="relative"
          >
            <HeroIllustration />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HeroIllustration() {
  return (
    <div className="relative mx-auto max-w-md">
      <div className="absolute inset-0 -m-8 rounded-[3rem] bg-gradient-to-br from-brand-500/20 to-accent-500/20 blur-2xl" />
      <div className="relative glass-strong rounded-[2.5rem] p-6 shadow-glow">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-accent-600">
              <BrainCircuit className="h-5 w-5 text-white" />
            </span>
            <div>
              <p className="text-xs font-semibold text-slate-900 dark:text-white">AI Mentor</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">Analyzing profile...</p>
            </div>
          </div>
          <span className="chip">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live
          </span>
        </div>

        <div className="mt-5 space-y-3">
          {[
            { icon: FileSearch, label: 'Resume parsed', value: '7 skills extracted', color: 'text-brand-600' },
            { icon: Target, label: 'Target role matched', value: 'Full Stack Developer', color: 'text-accent-600' },
            { icon: Sparkles, label: 'Skill gaps found', value: '3 critical, 2 medium', color: 'text-amber-600' },
          ].map((row, i) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.15 }}
              className="flex items-center gap-3 rounded-2xl border border-slate-200/70 dark:border-white/10 bg-white/70 dark:bg-white/5 p-3"
            >
              <span className={`flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 dark:bg-white/10 ${row.color}`}>
                <row.icon className="h-4 w-4" />
              </span>
              <div className="flex-1">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{row.label}</p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{row.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-5 rounded-2xl bg-gradient-to-br from-brand-600 to-accent-600 p-4 text-white shadow-glow">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium opacity-90">Placement Readiness</p>
            <p className="text-2xl font-bold tabular-nums">72<span className="text-sm font-medium opacity-80">/100</span></p>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/20">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '72%' }}
              transition={{ duration: 1.4, delay: 0.6, ease: 'easeOut' }}
              className="h-full rounded-full bg-white"
            />
          </div>
          <p className="mt-3 text-xs opacity-90">On Track - 30-day roadmap ready</p>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -right-4 -top-4 glass rounded-2xl px-3 py-2 shadow-card"
      >
        <p className="text-[10px] font-semibold text-slate-900 dark:text-white">+12% improvement</p>
      </motion.div>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -left-4 bottom-8 glass rounded-2xl px-3 py-2 shadow-card"
      >
        <p className="text-[10px] font-semibold text-slate-900 dark:text-white">5 companies matched</p>
      </motion.div>
    </div>
  );
}
