import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Brain, CheckCircle2, Cpu, FileSearch, Lightbulb, ListChecks, Map, RefreshCw, Target, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { analyzePlacement } from '../services/aiService';
import type { PlacementReport, StudentProfile } from '../types';

const STAGES = [
  { id: 0, label: 'Analyzing Resume...', icon: FileSearch },
  { id: 1, label: 'Extracting Skills...', icon: Brain },
  { id: 2, label: 'Understanding Profile...', icon: Cpu },
  { id: 3, label: 'Comparing Industry Requirements...', icon: Target },
  { id: 4, label: 'Finding Skill Gaps...', icon: ListChecks },
  { id: 5, label: 'Calculating Placement Readiness...', icon: TrendingUp },
  { id: 6, label: 'Generating Personalized Roadmap...', icon: Map },
  { id: 7, label: 'Preparing Final Report...', icon: Lightbulb },
];

export function ProcessingPage() {
  const navigate = useNavigate();
  const [stage, setStage] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const stored = window.sessionStorage.getItem('placement-profile-pending');
    if (!stored) {
      navigate('/assessment');
      return;
    }
    const profile = JSON.parse(stored) as StudentProfile;

    const stageTimers: number[] = [];
    const totalDuration = 9000;
    const perStage = totalDuration / STAGES.length;
    STAGES.forEach((_, i) => {
      const t = window.setTimeout(() => setStage(i), i * perStage);
      stageTimers.push(t);
    });

    const run = async () => {
      const result = await analyzePlacement(profile);
      stageTimers.forEach(clearTimeout);
      if (result.ok) {
        const report: PlacementReport = result.report;
        window.sessionStorage.setItem('placement-report', JSON.stringify(report));
        window.sessionStorage.setItem('placement-profile', JSON.stringify(profile));
        setStage(STAGES.length - 1);
        setTimeout(() => navigate('/dashboard'), 700);
      } else {
        setError(result.error);
      }
    };
    void run();

    return () => stageTimers.forEach(clearTimeout);
  }, [navigate]);

  const handleRetry = () => {
    setError(null);
    setStage(0);
    startedRef.current = false;
    // re-trigger effect by reloading
    window.location.reload();
  };

  if (error) {
    return (
      <div className="relative min-h-screen flex items-center justify-center px-4 pt-24 pb-16 bg-mesh-light dark:bg-mesh-dark">
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative max-w-lg w-full card-surface p-8 text-center"
        >
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100 dark:bg-rose-500/15 text-rose-600 dark:text-rose-300">
            <AlertTriangle className="h-7 w-7" />
          </span>
          <h2 className="mt-5 font-display text-2xl font-bold text-slate-900 dark:text-white">Analysis hit a snag</h2>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{error}</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button onClick={handleRetry} leftIcon={<RefreshCw className="h-4 w-4" />}>Try again</Button>
            <Button variant="ghost" onClick={() => navigate('/assessment')}>Back to assessment</Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 pt-24 pb-16 bg-mesh-light dark:bg-mesh-dark">
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="absolute top-1/3 -left-32 h-96 w-96 rounded-full bg-brand-400/30 blur-3xl animate-float" />
      <div className="absolute bottom-1/4 -right-32 h-96 w-96 rounded-full bg-accent-400/30 blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      <div className="relative w-full max-w-xl">
        <div className="text-center">
          <div className="relative mx-auto h-32 w-32">
            <span className="absolute inset-0 rounded-full bg-brand-500/20 animate-pulse-ring" />
            <span className="absolute inset-2 rounded-full bg-accent-500/20 animate-pulse-ring" style={{ animationDelay: '0.6s' }} />
            <span className="absolute inset-4 rounded-full bg-gradient-to-br from-brand-600 to-accent-600 shadow-glow flex items-center justify-center">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              >
                <Brain className="h-12 w-12 text-white" />
              </motion.span>
            </span>
          </div>
          <h1 className="mt-8 font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Gemini is analyzing your profile
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            This usually takes 10-15 seconds. Hang tight.
          </p>
        </div>

        <div className="mt-10 card-surface p-6">
          <ul className="space-y-3">
            {STAGES.map((s, i) => {
              const done = i < stage;
              const active = i === stage;
              const pending = i > stage;
              return (
                <li key={s.id} className="flex items-center gap-3">
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all ${
                      done
                        ? 'bg-emerald-100 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-300'
                        : active
                          ? 'bg-gradient-to-br from-brand-600 to-accent-600 text-white shadow-glow'
                          : 'bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    {done ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : active ? (
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                      >
                        <s.icon className="h-4 w-4" />
                      </motion.span>
                    ) : (
                      <s.icon className="h-4 w-4" />
                    )}
                  </span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={s.label + i}
                      initial={{ opacity: 0.4 }}
                      animate={{ opacity: pending ? 0.5 : 1 }}
                      className={`text-sm font-medium ${
                        done
                          ? 'text-slate-500 dark:text-slate-400 line-through'
                          : active
                            ? 'text-slate-900 dark:text-white'
                            : 'text-slate-400 dark:text-slate-500'
                      }`}
                    >
                      {s.label}
                    </motion.span>
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-slate-200/80 dark:bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-500"
              animate={{ width: `${((stage + 1) / STAGES.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
