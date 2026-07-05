import { config } from '../config/index.js';

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
- The bestRole suited for the student
- 5-8 recommendedCompanies that match the profile
- skillGapAnalysis: 4-6 items with skill, importance (Critical/High/Medium), currentLevel, requiredLevel, gap (0-100)
- roadmap: 4-6 phase items covering a 30-day plan with day, title, focus, and 3-4 tasks
- recommendedProjects: 3-4 projects with title, description, technologies, difficulty, estimatedTime
- recommendedCertifications: 3-5 certifications
- codingTips: 4-6 actionable tips
- communicationTips: 4-6 actionable tips
- interviewQuestions: 5-7 personalized questions with category, difficulty, sampleAnswer
- finalRecommendation: a 3-4 sentence professional recommendation

CRITICAL RULES:
- Return ONLY valid JSON. No markdown, no code fences, no commentary.
- All string values must be plain text without markdown formatting.
- The placementScore must be a realistic integer between 0 and 100.
- Be honest but encouraging. Tailor everything to the specific student profile.`;

function buildUserPrompt(profile) {
  return `Analyze this student profile and return a placement readiness report as JSON.

STUDENT PROFILE:
- Name: ${profile.name}
- Email: ${profile.email}
- Department: ${profile.department}
- College Year: ${profile.collegeYear}
- CGPA: ${profile.cgpa}
- Technical Skills: ${(profile.skills || []).join(', ') || 'None specified'}
- Projects: ${profile.projects || 'None provided'}
- Internships: ${profile.internships || 'None provided'}
- Certifications: ${profile.certifications || 'None provided'}
- Coding Level: ${profile.codingLevel || 'Not specified'}
- Communication Level: ${profile.communicationLevel || 'Not specified'}
- Target Role: ${profile.targetRole || 'Not specified'}
- Resume Text: ${profile.resumeText || 'No resume provided'}

Return ONLY the JSON object.`;
}

function extractJson(text) {
  let cleaned = text.trim();
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/i, '');
  }
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start === -1 || end === -1 || end <= start) {
    throw new Error('AI response did not contain a valid JSON object.');
  }
  return JSON.parse(cleaned.slice(start, end + 1));
}

export async function analyzeProfile(profile) {
  if (!config.geminiApiKey) {
    throw new Error('Gemini API key is not configured. Please set GEMINI_API_KEY in your .env file.');
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${config.geminiModel}:generateContent?key=${config.geminiApiKey}`;

  const payload = {
    system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents: [{ role: 'user', parts: [{ text: buildUserPrompt(profile) }] }],
    generationConfig: {
      temperature: 0.7,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseMimeType: 'application/json',
    },
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
    data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('\n') ??
    data?.candidates?.[0]?.content?.parts?.[0]?.text ??
    '';

  if (!text) {
    throw new Error('Gemini returned an empty response. Please try again.');
  }

  return extractJson(text);
}
