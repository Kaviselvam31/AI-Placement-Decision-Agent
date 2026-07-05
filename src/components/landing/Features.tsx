import { motion } from 'framer-motion';
import {
  Award,
  Building2,
  Code2,
  FileText,
  Gauge,
  ListChecks,
  MessageSquareQuote,
  Route,
  TrendingUp,
} from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';

const FEATURES = [
  { icon: Gauge, title: 'Placement Readiness Score', description: 'A weighted score (0-100) computed from your skills, projects, CGPA, and communication.' },
  { icon: TrendingUp, title: 'Strength & Weakness Map', description: 'See exactly what makes you stand out and what is holding you back.' },
  { icon: ListChecks, title: 'Skill Gap Analysis', description: 'Critical, high, and medium gaps ranked by importance for your target role.' },
  { icon: Route, title: '30-Day Learning Roadmap', description: 'A day-by-day plan with concrete tasks to close gaps before placements begin.' },
  { icon: Building2, title: 'Recommended Companies', description: 'A curated list of companies that match your profile and target role.' },
  { icon: Code2, title: 'Project & Certification Ideas', description: 'Hands-on project suggestions and certifications that strengthen your resume.' },
  { icon: MessageSquareQuote, title: 'Personalized Interview Questions', description: 'Practice with role-specific questions and sample answers from the AI mentor.' },
  { icon: Award, title: 'Best Role Recommendation', description: 'Discover the role that maximizes your placement chances based on your profile.' },
  { icon: FileText, title: 'PDF Report Download', description: 'Export a polished, recruiter-ready placement report in one click.' },
];

export function Features() {
  return (
    <section id="features" className="relative py-20 sm:py-28 bg-white/60 dark:bg-slate-900/40 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Features"
          title={<>Everything a placement mentor should give you</>}
          description="Nine AI-powered modules that turn your profile into a clear, actionable placement plan."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="group card-surface p-6 hover:-translate-y-1 hover:shadow-card-hover transition-all"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500/15 to-accent-500/15 text-brand-600 dark:text-brand-300 group-hover:from-brand-500 group-hover:to-accent-600 group-hover:text-white transition-all">
                  <feature.icon className="h-6 w-6" />
                </span>
                <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">{feature.title}</h3>
              </div>
              <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
