export type SkillOption = {
  id: string;
  label: string;
  category: 'Programming' | 'Frontend' | 'Backend' | 'Database' | 'Tools';
};

export type CodingLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type CommunicationLevel = 'Poor' | 'Average' | 'Good' | 'Excellent';
export type TargetRole =
  | 'Software Developer'
  | 'Backend Developer'
  | 'Frontend Developer'
  | 'Full Stack Developer'
  | 'QA Engineer'
  | 'Data Analyst'
  | 'AI Engineer';

export type StudentProfile = {
  name: string;
  email: string;
  department: string;
  collegeYear: string;
  cgpa: string;
  skills: string[];
  projects: string;
  internships: string;
  certifications: string;
  codingLevel: CodingLevel | '';
  communicationLevel: CommunicationLevel | '';
  targetRole: TargetRole | '';
  resumeText: string;
  resumeFileName: string;
};

export type RoadmapItem = {
  day: string;
  title: string;
  focus: string;
  tasks: string[];
};

export type SkillGapItem = {
  skill: string;
  importance: 'Critical' | 'High' | 'Medium';
  currentLevel: string;
  requiredLevel: string;
  gap: number;
};

export type InterviewQuestion = {
  category: string;
  question: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  sampleAnswer: string;
};

export type RecommendedProject = {
  title: string;
  description: string;
  technologies: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
};

export type PlacementReport = {
  placementScore: number;
  status: 'Excellent' | 'On Track' | 'Needs Work' | 'At Risk';
  summary: string;
  strengths: string[];
  weaknesses: string[];
  missingSkills: string[];
  bestRole: string;
  recommendedCompanies: string[];
  skillGapAnalysis: SkillGapItem[];
  roadmap: RoadmapItem[];
  recommendedProjects: RecommendedProject[];
  recommendedCertifications: string[];
  codingTips: string[];
  communicationTips: string[];
  interviewQuestions: InterviewQuestion[];
  finalRecommendation: string;
};

export type AnalyzeResponse = {
  report: PlacementReport;
};

export type AnalyzeError = {
  error: string;
  details?: string;
};
