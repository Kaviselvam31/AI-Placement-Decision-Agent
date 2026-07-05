import { motion } from 'framer-motion';
import {
  Award,
  Building2,
  CheckCircle2,
  Code2,
  FileText,
  GraduationCap,
  Lightbulb,
  ListChecks,
  MessageSquareQuote,
  Route,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
  XCircle,
} from 'lucide-react';
import { Card, CardHeader } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';
import type {
  PlacementReport,
  RecommendedProject,
  RoadmapItem,
  SkillGapItem,
} from '../../types';
import { cn } from '../../utils/cn';

const importanceColor: Record<SkillGapItem['importance'], string> = {
  Critical: 'text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-500/15',
  High: 'text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-500/15',
  Medium: 'text-brand-600 dark:text-brand-300 bg-brand-100 dark:bg-brand-500/15',
};

const difficultyColor: Record<RecommendedProject['difficulty'], string> = {
  Beginner: 'text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-500/15',
  Intermediate: 'text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-500/15',
  Advanced: 'text-rose-700 dark:text-rose-300 bg-rose-100 dark:bg-rose-500/15',
};

export function StudentSummary({ report, student }: { report: PlacementReport; student: { name: string; department: string; collegeYear: string; cgpa: string; email: string; targetRole: string } }) {
  return (
    <Card className="p-6">
      <div className="flex flex-wrap items-center gap-4">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-accent-600 text-white shadow-glow">
          <GraduationCap className="h-7 w-7" />
        </span>
        <div className="flex-1 min-w-0">
          <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">{student.name}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">{student.department} - {student.collegeYear}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="chip"><Award className="h-3 w-3" /> CGPA: {student.cgpa}</span>
          <span className="chip"><Target className="h-3 w-3" /> {student.targetRole}</span>
          <span className="chip"><Sparkles className="h-3 w-3" /> {report.bestRole}</span>
        </div>
      </div>
      <p className="mt-5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{report.summary}</p>
    </Card>
  );
}

export function StrengthsCard({ strengths }: { strengths: string[] }) {
  return (
    <Card hover className="overflow-hidden">
      <CardHeader icon={<TrendingUp className="h-5 w-5" />} title="Strengths" subtitle="What makes you stand out" accent="success" />
      <div className="px-6 pb-6 space-y-2.5">
        {strengths.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">No specific strengths identified.</p>
        ) : (
          strengths.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-start gap-2.5"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
              <p className="text-sm text-slate-700 dark:text-slate-200">{s}</p>
            </motion.div>
          ))
        )}
      </div>
    </Card>
  );
}

export function WeaknessesCard({ weaknesses }: { weaknesses: string[] }) {
  return (
    <Card hover className="overflow-hidden">
      <CardHeader icon={<TrendingDown className="h-5 w-5" />} title="Weaknesses" subtitle="Areas to improve" accent="warning" />
      <div className="px-6 pb-6 space-y-2.5">
        {weaknesses.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">No significant weaknesses identified.</p>
        ) : (
          weaknesses.map((w, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-start gap-2.5"
            >
              <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
              <p className="text-sm text-slate-700 dark:text-slate-200">{w}</p>
            </motion.div>
          ))
        )}
      </div>
    </Card>
  );
}

export function MissingSkillsCard({ skills }: { skills: string[] }) {
  return (
    <Card hover className="overflow-hidden">
      <CardHeader icon={<ListChecks className="h-5 w-5" />} title="Missing Skills" subtitle="Critical for your target role" accent="error" />
      <div className="px-6 pb-6">
        {skills.length === 0 ? (
          <p className="text-sm text-emerald-600 dark:text-emerald-400">No critical missing skills - focus on deepening existing knowledge.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {skills.map((s, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="rounded-full bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-500/30 px-3 py-1.5 text-xs font-medium"
              >
                {s}
              </motion.span>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}

export function SkillGapCard({ items }: { items: SkillGapItem[] }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader icon={<Target className="h-5 w-5" />} title="Skill Gap Analysis" subtitle="Where you are vs. where you need to be" accent="brand" />
      <div className="px-6 pb-6 space-y-4">
        {items.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">No specific skill gaps identified.</p>
        ) : (
          items.map((gap, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-slate-200/70 dark:border-white/10 p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{gap.skill}</p>
                <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-semibold', importanceColor[gap.importance])}>
                  {gap.importance}
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                {gap.currentLevel || 'Beginner'} <span className="mx-1">&rarr;</span> {gap.requiredLevel || 'Proficient'}
              </p>
              <div className="mt-3">
                <ProgressBar value={gap.gap} color={gap.importance === 'Critical' ? 'error' : gap.importance === 'High' ? 'warning' : 'brand'} showValue={false} size="sm" />
              </div>
            </motion.div>
          ))
        )}
      </div>
    </Card>
  );
}

export function BestRoleCard({ role, companies }: { role: string; companies: string[] }) {
  return (
    <Card className="overflow-hidden bg-gradient-to-br from-brand-600 to-accent-600 text-white border-0">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
            <Award className="h-6 w-6" />
          </span>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider opacity-80">Best Suited Role</p>
            <h3 className="font-display text-xl font-bold">{role}</h3>
          </div>
        </div>
        <div className="mt-5">
          <p className="text-xs font-medium uppercase tracking-wider opacity-80 mb-2">Recommended Companies</p>
          <div className="flex flex-wrap gap-2">
            {companies.length === 0 ? (
              <p className="text-sm opacity-90">No specific companies recommended.</p>
            ) : (
              companies.map((c, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur px-3 py-1.5 text-xs font-medium"
                >
                  <Building2 className="h-3 w-3" />
                  {c}
                </motion.span>
              ))
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

export function RoadmapCard({ roadmap }: { roadmap: RoadmapItem[] }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader icon={<Route className="h-5 w-5" />} title="30-Day Learning Roadmap" subtitle="Your personalized plan" accent="accent" />
      <div className="px-6 pb-6">
        <div className="relative">
          <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-brand-300 to-accent-300 dark:from-brand-500/40 dark:to-accent-500/40" />
          <div className="space-y-5">
            {roadmap.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative pl-10"
              >
                <span className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-accent-600 text-white text-xs font-bold shadow-glow">
                  {i + 1}
                </span>
                <div className="rounded-2xl border border-slate-200/70 dark:border-white/10 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="font-display text-sm font-semibold text-slate-900 dark:text-white">{item.title}</h4>
                    <span className="chip">{item.day}</span>
                  </div>
                  <p className="mt-1 text-xs text-brand-600 dark:text-brand-300 font-medium">Focus: {item.focus}</p>
                  <ul className="mt-3 space-y-1.5">
                    {item.tasks.map((task, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

export function ProjectsCard({ projects }: { projects: RecommendedProject[] }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader icon={<Code2 className="h-5 w-5" />} title="Recommended Projects" subtitle="Build to strengthen your resume" accent="brand" />
      <div className="px-6 pb-6 space-y-4">
        {projects.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">No specific projects recommended.</p>
        ) : (
          projects.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-slate-200/70 dark:border-white/10 p-4 hover:border-brand-300/60 dark:hover:border-brand-500/40 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <h4 className="font-display text-sm font-semibold text-slate-900 dark:text-white">{p.title}</h4>
                <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-semibold shrink-0', difficultyColor[p.difficulty])}>
                  {p.difficulty}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{p.description}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {p.technologies.map((t, j) => (
                  <span key={j} className="chip">{t}</span>
                ))}
                <span className="ml-auto text-xs text-slate-400 dark:text-slate-500">{p.estimatedTime}</span>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </Card>
  );
}

export function CertificationsCard({ items }: { items: string[] }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader icon={<Award className="h-5 w-5" />} title="Recommended Certifications" subtitle="Validate your skills" accent="accent" />
      <div className="px-6 pb-6 space-y-2.5">
        {items.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">No specific certifications recommended.</p>
        ) : (
          items.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-start gap-2.5"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
              <p className="text-sm text-slate-700 dark:text-slate-200">{c}</p>
            </motion.div>
          ))
        )}
      </div>
    </Card>
  );
}

export function TipsCard({ title, tips, icon, accent }: { title: string; tips: string[]; icon: 'code' | 'message'; accent: 'brand' | 'accent' }) {
  const Icon = icon === 'code' ? Code2 : MessageSquareQuote;
  return (
    <Card className="overflow-hidden">
      <CardHeader icon={<Icon className="h-5 w-5" />} title={title} accent={accent} />
      <div className="px-6 pb-6 space-y-2.5">
        {tips.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">No tips available.</p>
        ) : (
          tips.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-start gap-2.5"
            >
              <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
              <p className="text-sm text-slate-700 dark:text-slate-200">{t}</p>
            </motion.div>
          ))
        )}
      </div>
    </Card>
  );
}

export function InterviewQuestionsCard({ questions }: { questions: PlacementReport['interviewQuestions'] }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader icon={<MessageSquareQuote className="h-5 w-5" />} title="Personalized Interview Questions" subtitle="Practice with sample answers" accent="accent" />
      <div className="px-6 pb-6 space-y-3">
        {questions.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">No interview questions available.</p>
        ) : (
          questions.map((q, i) => (
            <motion.details
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group rounded-2xl border border-slate-200/70 dark:border-white/10 overflow-hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-3 p-4 list-none">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="chip">{q.category}</span>
                    <span className={cn('rounded-full px-2 py-0.5 text-xs font-semibold',
                      q.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300' :
                      q.difficulty === 'Medium' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300' :
                      'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300'
                    )}>{q.difficulty}</span>
                  </div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{q.question}</p>
                </div>
                <span className="text-xs text-slate-400 group-open:rotate-180 transition-transform">v</span>
              </summary>
              <div className="px-4 pb-4 pt-1 border-t border-slate-200/70 dark:border-white/10">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Sample Answer</p>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{q.sampleAnswer}</p>
              </div>
            </motion.details>
          ))
        )}
      </div>
    </Card>
  );
}

export function FinalRecommendationCard({ recommendation }: { recommendation: string }) {
  return (
    <Card className="overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-900 dark:to-slate-950 text-white border-0">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
            <FileText className="h-6 w-6" />
          </span>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider opacity-70">Final Recommendation</p>
            <h3 className="font-display text-lg font-bold">Your path forward</h3>
          </div>
        </div>
        <p className="mt-5 text-sm leading-relaxed opacity-90">{recommendation}</p>
      </div>
    </Card>
  );
}
