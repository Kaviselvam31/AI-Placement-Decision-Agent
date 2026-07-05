import type { SkillOption, TargetRole } from '../types';

export const SKILL_OPTIONS: SkillOption[] = [
  { id: 'java', label: 'Java', category: 'Programming' },
  { id: 'python', label: 'Python', category: 'Programming' },
  { id: 'c', label: 'C', category: 'Programming' },
  { id: 'cpp', label: 'C++', category: 'Programming' },
  { id: 'javascript', label: 'JavaScript', category: 'Programming' },
  { id: 'react', label: 'React', category: 'Frontend' },
  { id: 'nodejs', label: 'Node.js', category: 'Backend' },
  { id: 'springboot', label: 'Spring Boot', category: 'Backend' },
  { id: 'sql', label: 'SQL', category: 'Database' },
  { id: 'mongodb', label: 'MongoDB', category: 'Database' },
  { id: 'git', label: 'Git', category: 'Tools' },
  { id: 'html', label: 'HTML', category: 'Frontend' },
  { id: 'css', label: 'CSS', category: 'Frontend' },
];

export const TARGET_ROLES: TargetRole[] = [
  'Software Developer',
  'Backend Developer',
  'Frontend Developer',
  'Full Stack Developer',
  'QA Engineer',
  'Data Analyst',
  'AI Engineer',
];

export const DEPARTMENTS = [
  'Computer Science & Engineering',
  'Information Technology',
  'Electronics & Communication',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Artificial Intelligence & Data Science',
  'Other',
];

export const COLLEGE_YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduate'];

export const CODING_LEVELS = ['Beginner', 'Intermediate', 'Advanced'] as const;
export const COMMUNICATION_LEVELS = ['Poor', 'Average', 'Good', 'Excellent'] as const;
