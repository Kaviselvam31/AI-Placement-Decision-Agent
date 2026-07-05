import { motion } from 'framer-motion';
import { ClipboardList, Cpu, FileBarChart, Upload } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';

const STEPS = [
  { icon: ClipboardList, title: 'Complete Assessment', description: 'Fill a guided multi-step form with your academic profile, skills, projects, and target role.' },
  { icon: Upload, title: 'Upload Resume', description: 'Paste or upload your resume text so the AI can extract context about your experience.' },
  { icon: Cpu, title: 'Gemini Analysis', description: 'Gemini acts as an experienced placement mentor and analyzes your full profile in seconds.' },
  { icon: FileBarChart, title: 'Get Your Report', description: 'Receive a dashboard with score, roadmap, gaps, companies, and a downloadable PDF.' },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="How It Works"
          title={<>From profile to placement plan in four steps</>}
          description="No accounts, no friction. Just answer a few questions and let the AI mentor do the heavy lifting."
        />

        <div className="mt-16 relative">
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-300 dark:via-brand-500/40 to-transparent" />
          <div className="grid gap-8 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="relative">
                    <span className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-card">
                      <step.icon className="h-8 w-8 text-brand-600 dark:text-brand-300" />
                    </span>
                    <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-accent-600 text-xs font-bold text-white shadow-glow">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-slate-900 dark:text-white">{step.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-xs">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
