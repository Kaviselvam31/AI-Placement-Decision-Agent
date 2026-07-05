import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, ArrowLeft, ArrowRight, Brain, FileText, Rocket, User } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { StepIndicator } from '../components/assessment/StepIndicator';
import {
  StepExperience,
  StepLevels,
  StepPersonal,
  StepRole,
  StepSkills,
} from '../components/assessment/StepPersonal';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { StudentProfile } from '../types';

const EMPTY_PROFILE: StudentProfile = {
  name: '',
  email: '',
  department: '',
  collegeYear: '',
  cgpa: '',
  skills: [],
  projects: '',
  internships: '',
  certifications: '',
  codingLevel: '',
  communicationLevel: '',
  targetRole: '',
  resumeText: '',
  resumeFileName: '',
};

const STEPS = [
  { id: 'personal', label: 'Personal', icon: User },
  { id: 'skills', label: 'Skills', icon: Brain },
  { id: 'experience', label: 'Experience', icon: FileText },
  { id: 'levels', label: 'Levels', icon: Rocket },
  { id: 'role', label: 'Target Role', icon: ArrowRight },
];

export function AssessmentPage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useLocalStorage<StudentProfile>('placement-profile', EMPTY_PROFILE);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const progress = useMemo(() => ((step + 1) / STEPS.length) * 100, [step]);

  const validateStep = (current: number): boolean => {
    const next: Record<string, string> = {};
    if (current === 0) {
      if (!profile.name.trim()) next.name = 'Please enter your name.';
      if (!profile.email.trim()) next.email = 'Please enter your email.';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) next.email = 'Please enter a valid email.';
      if (!profile.department) next.department = 'Please select your department.';
      if (!profile.collegeYear) next.collegeYear = 'Please select your college year.';
      if (!profile.cgpa) next.cgpa = 'Please enter your CGPA.';
      else {
        const cgpa = parseFloat(profile.cgpa);
        if (Number.isNaN(cgpa) || cgpa < 0 || cgpa > 10) next.cgpa = 'CGPA must be between 0 and 10.';
      }
    }
    if (current === 1 && profile.skills.length === 0) next.skills = 'Select at least one technical skill.';
    if (current === 3) {
      if (!profile.codingLevel) next.codingLevel = 'Please select your coding level.';
      if (!profile.communicationLevel) next.communicationLevel = 'Please select your communication level.';
    }
    if (current === 4 && !profile.targetRole) next.targetRole = 'Please select your target role.';

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleNext = () => {
    if (!validateStep(step)) return;
    if (step < STEPS.length - 1) setStep((s) => s + 1);
  };

  const handlePrev = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const handleAnalyze = async () => {
    if (!validateStep(step)) return;
    setSubmitting(true);
    try {
      // Stash profile for the processing page and dashboard
      window.sessionStorage.setItem('placement-profile-pending', JSON.stringify(profile));
      navigate('/processing');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen pt-24 pb-16 bg-mesh-light dark:bg-mesh-dark">
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="section-eyebrow">Placement Assessment</span>
          <h1 className="mt-4 font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Let's get to know your profile
          </h1>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
            Step {step + 1} of {STEPS.length} - takes about 2 minutes.
          </p>
        </div>

        <div className="mt-8">
          <StepIndicator steps={STEPS} current={step} />
        </div>

        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-200/80 dark:bg-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-500"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        <div className="mt-8 card-surface p-6 sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.3 }}
            >
              {step === 0 && <StepPersonal profile={profile} setProfile={setProfile} errors={errors} />}
              {step === 1 && <StepSkills profile={profile} setProfile={setProfile} />}
              {step === 2 && <StepExperience profile={profile} setProfile={setProfile} />}
              {step === 3 && <StepLevels profile={profile} setProfile={setProfile} errors={errors} />}
              {step === 4 && <StepRole profile={profile} setProfile={setProfile} errors={errors} />}
            </motion.div>
          </AnimatePresence>

          {Object.keys(errors).length > 0 && (
            <div className="mt-6 flex items-start gap-2 rounded-2xl border border-rose-200 dark:border-rose-500/30 bg-rose-50 dark:bg-rose-500/10 p-3 text-sm text-rose-700 dark:text-rose-300">
              <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
              <span>Please fix the highlighted fields before continuing.</span>
            </div>
          )}

          <div className="mt-8 flex items-center justify-between gap-3">
            <Button variant="ghost" onClick={handlePrev} disabled={step === 0} leftIcon={<ArrowLeft className="h-4 w-4" />}>
              Previous
            </Button>
            {step < STEPS.length - 1 ? (
              <Button onClick={handleNext} rightIcon={<ArrowRight className="h-4 w-4" />}>
                Next
              </Button>
            ) : (
              <Button onClick={handleAnalyze} loading={submitting} rightIcon={<Rocket className="h-4 w-4" />}>
                Analyze My Placement
              </Button>
            )}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
          Your data is processed securely and never shared. You can re-run the assessment any time.
        </p>
      </div>
    </div>
  );
}
