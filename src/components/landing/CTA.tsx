import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

export function CTA() {
  const navigate = useNavigate();
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-600 via-brand-700 to-accent-700 p-10 sm:p-16 text-center shadow-glow"
        >
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-accent-300/20 blur-3xl" />

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              Start in under 2 minutes
            </span>
            <h2 className="mt-6 font-display text-3xl sm:text-4xl font-bold text-white text-balance">
              Ready to discover your placement readiness?
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-base text-white/85 leading-relaxed text-balance">
              Get a personalized AI mentor report with score, roadmap, gaps, and companies. No signup required.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button
                size="lg"
                onClick={() => navigate('/assessment')}
                className="bg-white text-brand-700 hover:bg-brand-50 from-white to-white shadow-xl"
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                Start Assessment
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
