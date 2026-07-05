import { motion } from 'framer-motion';
import { BarChart3, Bot, Compass, ShieldCheck } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';

const PILLARS = [
  { icon: Bot, title: 'AI Mentor', description: 'Gemini analyzes your full profile like an experienced placement officer would.' },
  { icon: BarChart3, title: 'Data-Driven', description: 'A transparent placement score backed by skill gap analysis, not guesswork.' },
  { icon: Compass, title: 'Personalized Roadmap', description: 'A 30-day plan tailored to your target role and current skill level.' },
  { icon: ShieldCheck, title: 'Private by Default', description: 'Your data stays in your browser. We never sell or share your information.' },
];

export function About() {
  return (
    <section id="about" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="About the Project"
          title={<>An AI placement mentor that actually understands your career</>}
          description="Built for the AI Agent Development Challenge, Placement Decision AI Agent uses Google's Gemini to deliver startup-grade placement guidance that goes far beyond a simple chatbot."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-surface p-6 hover:-translate-y-1 hover:shadow-card-hover transition-all"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-glow">
                <pillar.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-slate-900 dark:text-white">{pillar.title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{pillar.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
