import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface StudentProfile {
  name: string;
  email: string;
  department: string;
  collegeYear: string;
  cgpa: string;
  skills: string[];
  projects: string;
  internships: string;
  certifications: string;
  codingLevel: string;
  communicationLevel: string;
  targetRole: string;
  resumeText: string;
  resumeFileName: string;
}

interface RoadmapItem {
  day: string;
  title: string;
  focus: string;
  tasks: string[];
}

interface SkillGapItem {
  skill: string;
  importance: "Critical" | "High" | "Medium";
  currentLevel: string;
  requiredLevel: string;
  gap: number;
}

interface InterviewQuestion {
  category: string;
  question: string;
  difficulty: "Easy" | "Medium" | "Hard";
  sampleAnswer: string;
}

interface RecommendedProject {
  title: string;
  description: string;
  technologies: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedTime: string;
}

interface PlacementReport {
  placementScore: number;
  status: "Excellent" | "On Track" | "Needs Work" | "At Risk";
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
}

const SYSTEM_PROMPT = `You are an experienced Placement Mentor and Technical Interviewer with 15+ years of experience helping engineering students get placed at top product and service companies.

You will receive a student's profile including their academic details, technical skills, projects, internships, certifications, coding level, communication level, target role, and resume text.

Your job is to deeply analyze the student's profile and produce a comprehensive placement readiness report.

Analyze:
1. Current skills vs. industry expectations for the target role
2. Quality and relevance of projects
3. CGPA and academic standing
4. Coding and problem-solving level
5. Communication level
6. Resume content and presentation
7. Internship and certification experience

Produce:
- A placementScore (0-100 integer) that reflects overall placement readiness
- A status: "Excellent" (>=75), "On Track" (55-74), "Needs Work" (35-54), or "At Risk" (<35)
- A concise professional summary (2-3 sentences)
- 4-6 specific strengths
- 4-6 specific weaknesses
- 3-6 missing skills critical for the target role
- The bestRole suited for the student (may differ from target role if profile fits better elsewhere)
- 5-8 recommendedCompanies that match the profile (mix of product and service companies, Indian and global)
- skillGapAnalysis: 4-6 items with skill name, importance (Critical/High/Medium), currentLevel, requiredLevel, and gap (0-100 integer representing how far behind)
- roadmap: 4-6 phase items covering a 30-day plan. Each item has day (e.g. "Days 1-5"), title, focus area, and 3-4 concrete tasks
- recommendedProjects: 3-4 projects with title, description, technologies array, difficulty, and estimatedTime
- recommendedCertifications: 3-5 certifications relevant to the target role
- codingTips: 4-6 actionable coding improvement tips
- communicationTips: 4-6 actionable communication improvement tips
- interviewQuestions: 5-7 personalized interview questions with category, difficulty, and a concise sampleAnswer
- finalRecommendation: a 3-4 sentence professional recommendation summarizing the path forward

CRITICAL RULES:
- Return ONLY valid JSON. No markdown, no code fences, no commentary.
- All string values must be plain text without markdown formatting.
- All arrays must contain at least the minimum number of items specified.
- The placementScore must be a realistic integer between 0 and 100.
- Be honest but encouraging. Tailor everything to the specific student profile.
- If resume text is empty, infer from other fields and note it as a weakness.`;

function buildUserPrompt(profile: StudentProfile): string {
  return `Analyze this student profile and return a placement readiness report as JSON.

STUDENT PROFILE:
- Name: ${profile.name}
- Email: ${profile.email}
- Department: ${profile.department}
- College Year: ${profile.collegeYear}
- CGPA: ${profile.cgpa}
- Technical Skills: ${profile.skills.length > 0 ? profile.skills.join(', ') : 'None specified'}
- Projects: ${profile.projects || 'None provided'}
- Internships: ${profile.internships || 'None provided'}
- Certifications: ${profile.certifications || 'None provided'}
- Coding Level: ${profile.codingLevel || 'Not specified'}
- Communication Level: ${profile.communicationLevel || 'Not specified'}
- Target Role: ${profile.targetRole || 'Not specified'}
- Resume Text: ${profile.resumeText || 'No resume provided'}

Return ONLY the JSON object matching this exact schema:
{
  "placementScore": number,
  "status": "Excellent" | "On Track" | "Needs Work" | "At Risk",
  "summary": string,
  "strengths": string[],
  "weaknesses": string[],
  "missingSkills": string[],
  "bestRole": string,
  "recommendedCompanies": string[],
  "skillGapAnalysis": [{"skill": string, "importance": "Critical"|"High"|"Medium", "currentLevel": string, "requiredLevel": string, "gap": number}],
  "roadmap": [{"day": string, "title": string, "focus": string, "tasks": string[]}],
  "recommendedProjects": [{"title": string, "description": string, "technologies": string[], "difficulty": "Beginner"|"Intermediate"|"Advanced", "estimatedTime": string}],
  "recommendedCertifications": string[],
  "codingTips": string[],
  "communicationTips": string[],
  "interviewQuestions": [{"category": string, "question": string, "difficulty": "Easy"|"Medium"|"Hard", "sampleAnswer": string}],
  "finalRecommendation": string
}

Remember: return ONLY valid JSON, no markdown, no code fences.`;
}

function extractJson(text: string): unknown {
  // Strip markdown code fences if present
  let cleaned = text.trim();
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/i, '');
  }
  // Find first { and last }
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start === -1 || end === -1 || end <= start) {
    throw new Error('AI response did not contain a valid JSON object.');
  }
  const slice = cleaned.slice(start, end + 1);
  return JSON.parse(slice);
}

function sanitizeReport(raw: unknown): PlacementReport {
  const r = raw as Partial<PlacementReport>;
  const clamp = (n: unknown, min: number, max: number, fallback: number): number => {
    const num = typeof n === 'number' ? n : typeof n === 'string' ? parseFloat(n) : NaN;
    if (Number.isNaN(num)) return fallback;
    return Math.max(min, Math.min(max, Math.round(num)));
  };
  const arr = (v: unknown): string[] => (Array.isArray(v) ? v.map((x) => String(x)).filter(Boolean) : []);
  const status: PlacementReport['status'] = (() => {
    const s = String(r.status ?? '');
    if (s === 'Excellent' || s === 'On Track' || s === 'Needs Work' || s === 'At Risk') return s;
    const score = clamp(r.placementScore, 0, 100, 50);
    if (score >= 75) return 'Excellent';
    if (score >= 55) return 'On Track';
    if (score >= 35) return 'Needs Work';
    return 'At Risk';
  })();

  return {
    placementScore: clamp(r.placementScore, 0, 100, 50),
    status,
    summary: String(r.summary ?? 'No summary provided.'),
    strengths: arr(r.strengths),
    weaknesses: arr(r.weaknesses),
    missingSkills: arr(r.missingSkills),
    bestRole: String(r.bestRole ?? ''),
    recommendedCompanies: arr(r.recommendedCompanies),
    skillGapAnalysis: Array.isArray(r.skillGapAnalysis)
      ? r.skillGapAnalysis.map((g) => ({
          skill: String((g as SkillGapItem).skill ?? ''),
          importance: ((g as SkillGapItem).importance === 'Critical' || (g as SkillGapItem).importance === 'High' || (g as SkillGapItem).importance === 'Medium'
            ? (g as SkillGapItem).importance
            : 'Medium') as SkillGapItem['importance'],
          currentLevel: String((g as SkillGapItem).currentLevel ?? ''),
          requiredLevel: String((g as SkillGapItem).requiredLevel ?? ''),
          gap: clamp((g as SkillGapItem).gap, 0, 100, 50),
        }))
      : [],
    roadmap: Array.isArray(r.roadmap)
      ? r.roadmap.map((item) => ({
          day: String((item as RoadmapItem).day ?? ''),
          title: String((item as RoadmapItem).title ?? ''),
          focus: String((item as RoadmapItem).focus ?? ''),
          tasks: arr((item as RoadmapItem).tasks),
        }))
      : [],
    recommendedProjects: Array.isArray(r.recommendedProjects)
      ? r.recommendedProjects.map((p) => ({
          title: String((p as RecommendedProject).title ?? ''),
          description: String((p as RecommendedProject).description ?? ''),
          technologies: arr((p as RecommendedProject).technologies),
          difficulty: ((p as RecommendedProject).difficulty === 'Beginner' || (p as RecommendedProject).difficulty === 'Intermediate' || (p as RecommendedProject).difficulty === 'Advanced'
            ? (p as RecommendedProject).difficulty
            : 'Intermediate') as RecommendedProject['difficulty'],
          estimatedTime: String((p as RecommendedProject).estimatedTime ?? ''),
        }))
      : [],
    recommendedCertifications: arr(r.recommendedCertifications),
    codingTips: arr(r.codingTips),
    communicationTips: arr(r.communicationTips),
    interviewQuestions: Array.isArray(r.interviewQuestions)
      ? r.interviewQuestions.map((q) => ({
          category: String((q as InterviewQuestion).category ?? ''),
          question: String((q as InterviewQuestion).question ?? ''),
          difficulty: ((q as InterviewQuestion).difficulty === 'Easy' || (q as InterviewQuestion).difficulty === 'Medium' || (q as InterviewQuestion).difficulty === 'Hard'
            ? (q as InterviewQuestion).difficulty
            : 'Medium') as InterviewQuestion['difficulty'],
          sampleAnswer: String((q as InterviewQuestion).sampleAnswer ?? ''),
        }))
      : [],
    finalRecommendation: String(r.finalRecommendation ?? 'No final recommendation provided.'),
  };
}

async function callGemini(profile: StudentProfile): Promise<PlacementReport> {
  const apiKey = Deno.env.get('GEMINI_API_KEY');
  if (!apiKey) {
    throw new Error('Gemini API key is not configured. Please set the GEMINI_API_KEY secret in your Supabase project.');
  }

  const model = Deno.env.get('GEMINI_MODEL') || 'gemini-2.0-flash';
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const payload = {
    system_instruction: {
      parts: [{ text: SYSTEM_PROMPT }],
    },
    contents: [
      {
        role: 'user',
        parts: [{ text: buildUserPrompt(profile) }],
      },
    ],
    generationConfig: {
      temperature: 0.7,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseMimeType: 'application/json',
    },
    safetySettings: [
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
    ],
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${errText.slice(0, 500)}`);
  }

  const data = await response.json();
  const text =
    data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text).join('\n') ??
    data?.candidates?.[0]?.content?.parts?.[0]?.text ??
    '';

  if (!text) {
    throw new Error('Gemini returned an empty response. Please try again.');
  }

  const parsed = extractJson(text);
  return sanitizeReport(parsed);
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed. Use POST.' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await req.json();
    const profile = body?.profile as StudentProfile;

    if (!profile || !profile.name || !profile.targetRole) {
      return new Response(
        JSON.stringify({ error: 'Invalid request. Profile with name and target role is required.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const report = await callGemini(profile);

    return new Response(JSON.stringify({ report }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected error during analysis.';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
