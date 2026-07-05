import { CODING_LEVELS, COLLEGE_YEARS, DEPARTMENTS } from '../../data/assessmentOptions';
import { FieldError, FieldLabel } from './FieldLabel';
import type { StudentProfile } from '../../types';

type Props = {
  profile: StudentProfile;
  setProfile: (updater: (prev: StudentProfile) => StudentProfile) => void;
  errors: Record<string, string>;
};

export function StepPersonal({ profile, setProfile, errors }: Props) {
  return (
    <div className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="name" required>Full Name</FieldLabel>
          <input
            id="name"
            type="text"
            value={profile.name}
            onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
            placeholder="e.g. Aarav Sharma"
            className="input-field"
          />
          <FieldError>{errors.name}</FieldError>
        </div>
        <div>
          <FieldLabel htmlFor="email" required>Email</FieldLabel>
          <input
            id="email"
            type="email"
            value={profile.email}
            onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
            placeholder="you@college.edu"
            className="input-field"
          />
          <FieldError>{errors.email}</FieldError>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="department" required>Department</FieldLabel>
          <select
            id="department"
            value={profile.department}
            onChange={(e) => setProfile((p) => ({ ...p, department: e.target.value }))}
            className="input-field"
          >
            <option value="">Select department</option>
            {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          <FieldError>{errors.department}</FieldError>
        </div>
        <div>
          <FieldLabel htmlFor="year" required>College Year</FieldLabel>
          <select
            id="year"
            value={profile.collegeYear}
            onChange={(e) => setProfile((p) => ({ ...p, collegeYear: e.target.value }))}
            className="input-field"
          >
            <option value="">Select year</option>
            {COLLEGE_YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
          <FieldError>{errors.collegeYear}</FieldError>
        </div>
      </div>

      <div>
        <FieldLabel htmlFor="cgpa" required hint="Scale of 10">CGPA</FieldLabel>
        <input
          id="cgpa"
          type="number"
          step="0.01"
          min="0"
          max="10"
          value={profile.cgpa}
          onChange={(e) => setProfile((p) => ({ ...p, cgpa: e.target.value }))}
          placeholder="e.g. 8.4"
          className="input-field"
        />
        <FieldError>{errors.cgpa}</FieldError>
      </div>

      <div className="rounded-2xl border border-brand-100 dark:border-brand-500/20 bg-brand-50/60 dark:bg-brand-500/10 p-4">
        <p className="text-xs text-brand-700 dark:text-brand-300 leading-relaxed">
          Your personal information is used only to personalize the report. It is never sold or shared.
        </p>
      </div>
    </div>
  );
}

export function StepSkills({ profile, setProfile }: Pick<Props, 'profile' | 'setProfile'>) {
  const toggle = (id: string) => {
    setProfile((p) => ({
      ...p,
      skills: p.skills.includes(id) ? p.skills.filter((s) => s !== id) : [...p.skills, id],
    }));
  };
  const grouped = {
    Programming: ['java', 'python', 'c', 'cpp', 'javascript'],
    Frontend: ['react', 'html', 'css'],
    Backend: ['nodejs', 'springboot'],
    Database: ['sql', 'mongodb'],
    Tools: ['git'],
  } as const;

  const labelOf = (id: string) => {
    const map: Record<string, string> = {
      java: 'Java', python: 'Python', c: 'C', cpp: 'C++', javascript: 'JavaScript',
      react: 'React', html: 'HTML', css: 'CSS', nodejs: 'Node.js', springboot: 'Spring Boot',
      sql: 'SQL', mongodb: 'MongoDB', git: 'Git',
    };
    return map[id] ?? id;
  };

  return (
    <div className="space-y-6">
      <div>
        <FieldLabel required>Select your technical skills</FieldLabel>
        <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">Pick all technologies you are comfortable with. You can choose multiple.</p>
        <div className="space-y-5">
          {Object.entries(grouped).map(([group, ids]) => (
            <div key={group}>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">{group}</p>
              <div className="flex flex-wrap gap-2">
                {ids.map((id) => {
                  const active = profile.skills.includes(id);
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => toggle(id)}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition-all border ${
                        active
                          ? 'bg-gradient-to-r from-brand-600 to-accent-600 text-white border-transparent shadow-glow'
                          : 'bg-white dark:bg-white/5 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-white/10 hover:border-brand-300 dark:hover:border-brand-500/40'
                      }`}
                    >
                      {labelOf(id)}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function StepExperience({ profile, setProfile }: Pick<Props, 'profile' | 'setProfile'>) {
  return (
    <div className="space-y-5">
      <div>
        <FieldLabel htmlFor="projects" hint="One per line or paragraph">Projects</FieldLabel>
        <textarea
          id="projects"
          rows={5}
          value={profile.projects}
          onChange={(e) => setProfile((p) => ({ ...p, projects: e.target.value }))}
          placeholder="Describe your key projects. e.g.&#10;E-commerce API (Node.js, MongoDB) - built REST endpoints, JWT auth, and order workflow."
          className="input-field resize-y"
        />
      </div>
      <div>
        <FieldLabel htmlFor="internships" hint="Optional">Internships</FieldLabel>
        <textarea
          id="internships"
          rows={4}
          value={profile.internships}
          onChange={(e) => setProfile((p) => ({ ...p, internships: e.target.value }))}
          placeholder="Company, role, duration, and what you built or learned."
          className="input-field resize-y"
        />
      </div>
      <div>
        <FieldLabel htmlFor="certifications" hint="Optional">Certifications</FieldLabel>
        <textarea
          id="certifications"
          rows={4}
          value={profile.certifications}
          onChange={(e) => setProfile((p) => ({ ...p, certifications: e.target.value }))}
          placeholder="e.g. AWS Cloud Practitioner, Meta Frontend Developer, NPTEL DBMS."
          className="input-field resize-y"
        />
      </div>
    </div>
  );
}

export function StepLevels({ profile, setProfile, errors }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <FieldLabel required>Coding Level</FieldLabel>
        <div className="grid gap-3 sm:grid-cols-3">
          {CODING_LEVELS.map((level) => {
            const active = profile.codingLevel === level;
            return (
              <button
                key={level}
                type="button"
                onClick={() => setProfile((p) => ({ ...p, codingLevel: level }))}
                className={`rounded-2xl border p-4 text-left transition-all ${
                  active
                    ? 'border-brand-500 bg-brand-50 dark:bg-brand-500/15 shadow-glow'
                    : 'border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 hover:border-brand-300 dark:hover:border-brand-500/40'
                }`}
              >
                <p className={`text-sm font-semibold ${active ? 'text-brand-700 dark:text-brand-300' : 'text-slate-800 dark:text-slate-100'}`}>{level}</p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {level === 'Beginner' && 'Comfortable with basics, learning DSA.'}
                  {level === 'Intermediate' && 'Solve medium problems, know core DSA.'}
                  {level === 'Advanced' && 'Solve hard problems, system design aware.'}
                </p>
              </button>
            );
          })}
        </div>
        <FieldError>{errors.codingLevel}</FieldError>
      </div>

      <div>
        <FieldLabel required>Communication Level</FieldLabel>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {['Poor', 'Average', 'Good', 'Excellent'].map((level) => {
            const active = profile.communicationLevel === level;
            return (
              <button
                key={level}
                type="button"
                onClick={() => setProfile((p) => ({ ...p, communicationLevel: level as StudentProfile['communicationLevel'] }))}
                className={`rounded-2xl border p-4 text-left transition-all ${
                  active
                    ? 'border-accent-500 bg-accent-50 dark:bg-accent-500/15 shadow-glow-accent'
                    : 'border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 hover:border-accent-300 dark:hover:border-accent-500/40'
                }`}
              >
                <p className={`text-sm font-semibold ${active ? 'text-accent-700 dark:text-accent-300' : 'text-slate-800 dark:text-slate-100'}`}>{level}</p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {level === 'Poor' && 'Hesitant in group discussions.'}
                  {level === 'Average' && 'Manage everyday conversation.'}
                  {level === 'Good' && 'Clear in interviews and presentations.'}
                  {level === 'Excellent' && 'Persuasive, confident, articulate.'}
                </p>
              </button>
            );
          })}
        </div>
        <FieldError>{errors.communicationLevel}</FieldError>
      </div>
    </div>
  );
}

export function StepRole({ profile, setProfile, errors }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <FieldLabel htmlFor="role" required>Target Role</FieldLabel>
        <select
          id="role"
          value={profile.targetRole}
          onChange={(e) => setProfile((p) => ({ ...p, targetRole: e.target.value as StudentProfile['targetRole'] }))}
          className="input-field"
        >
          <option value="">Select your target role</option>
          {['Software Developer', 'Backend Developer', 'Frontend Developer', 'Full Stack Developer', 'QA Engineer', 'Data Analyst', 'AI Engineer'].map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
        <FieldError>{errors.targetRole}</FieldError>
      </div>

      <div>
        <FieldLabel htmlFor="resume" hint="Paste your resume text - we will not store it">Resume</FieldLabel>
        <textarea
          id="resume"
          rows={8}
          value={profile.resumeText}
          onChange={(e) => setProfile((p) => ({ ...p, resumeText: e.target.value, resumeFileName: '' }))}
          placeholder="Paste your resume text here. Include education, skills, projects, experience, and achievements."
          className="input-field resize-y"
        />
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
          Tip: Paste the plain text of your resume so the AI can extract context about your experience.
        </p>
      </div>
    </div>
  );
}
