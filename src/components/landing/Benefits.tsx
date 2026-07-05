import { motion } from 'framer-motion';
import { Clock, HeartPulse, Layers, LineChart, MapPin, Users } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';

const BENEFITS = [
  { icon: Clock, title: 'Save weeks of guesswork', description: 'Get clarity on your placement readiness in minutes, not months of trial and error.' },
  { icon: MapPin, title: 'Know exactly what to learn next', description: 'A prioritized roadmap means you always spend study time on the highest-impact skill.' },
  { icon: HeartPulse, title: 'Catch weaknesses early', description: 'Surface blind spots in communication, coding, or core CS fundamentals before interviews.' },
  { icon: Users, title: 'Match with the right companies', description: 'Stop applying blindly. Target companies that fit your profile and target role.' },
  { icon: Layers, title: 'Build a stronger resume', description: 'Project and certification recommendations that fill real gaps recruiters care about.' },
  { icon: LineChart, title: 'Track improvement', description: 'Re-run the assessment any time to measure how your readiness score changes.' },
];

export function Benefits() {
  return (
    <section id="benefits" className="relative py-20 sm:py-28 bg-white/60 dark:bg-slate-900/40 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Benefits"
          title={<>Why students use Placement AI before placements</>}
          description="Real outcomes: less anxiety, sharper preparation, and a clear path to the offer letter."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="card-surface p-6 hover:-translate-y-1 hover:shadow-card-hover transition-all"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-300">
                <benefit.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-base font-semibold text-slate-900 dark:text-white">{benefit.title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
