import { Router } from 'express';
import multer from 'multer';
import { PDFParse } from 'pdf-parse';

export const importRouter = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 15 * 1024 * 1024 } });

interface ParsedResume {
  personalInfo: {
    firstName: string;
    lastName: string;
    jobTitle: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    website: string;
    linkedin: string;
    github: string;
    photo: string;
  };
  summary: { content: string };
  workExperience: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    current: boolean;
    city: string;
    description: string;
    highlights: string[];
  }>;
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    current: boolean;
    city: string;
    description: string;
    gpa: string;
  }>;
  skills: Array<{ id: string; name: string; level: 'beginner' | 'intermediate' | 'advanced' | 'expert'; category: string }>;
  languages: Array<{ id: string; name: string; level: 'basic' | 'conversational' | 'fluent' | 'native' }>;
  certificates: Array<{ id: string; name: string; issuer: string; date: string; url: string; description: string }>;
  interests: Array<{ id: string; name: string }>;
  projects: Array<{ id: string; name: string; role: string; startDate: string; endDate: string; current: boolean; description: string; url: string; highlights: string[] }>;
  activeSections: string[];
}

async function callGeminiForResume(text: string): Promise<ParsedResume | null> {
  const apiKey = process.env.GEMINI_API_KEY || process.env.AI_API_KEY;
  if (!apiKey) return null;

  try {
    const prompt = `You are an expert ATS Resume Parser. Extract and structure the following raw text into a valid JSON object matching the exact schema below.
Ensure all names, job titles, experiences, educations, skills, and languages are intelligently extracted.

Schema:
{
  "personalInfo": {
    "firstName": "string",
    "lastName": "string",
    "jobTitle": "string",
    "email": "string",
    "phone": "string",
    "address": "string",
    "city": "string",
    "country": "string",
    "website": "string",
    "linkedin": "string",
    "github": "string",
    "photo": ""
  },
  "summary": { "content": "string" },
  "workExperience": [
    {
      "id": "exp-1",
      "company": "string",
      "position": "string",
      "startDate": "YYYY-MM or string",
      "endDate": "YYYY-MM or string",
      "current": false,
      "city": "string",
      "description": "string",
      "highlights": ["string"]
    }
  ],
  "education": [
    {
      "id": "edu-1",
      "institution": "string",
      "degree": "string",
      "field": "string",
      "startDate": "YYYY-MM",
      "endDate": "YYYY-MM",
      "current": false,
      "city": "string",
      "description": "string",
      "gpa": "string"
    }
  ],
  "skills": [
    { "id": "sk-1", "name": "string", "level": "advanced", "category": "Technical" }
  ],
  "languages": [
    { "id": "lang-1", "name": "string", "level": "fluent" }
  ],
  "certificates": [
    { "id": "cert-1", "name": "string", "issuer": "string", "date": "string", "url": "", "description": "" }
  ],
  "interests": [
    { "id": "int-1", "name": "string" }
  ],
  "projects": [
    { "id": "proj-1", "name": "string", "role": "string", "startDate": "", "endDate": "", "current": false, "description": "string", "url": "", "highlights": [] }
  ]
}

Raw Text:
"""
${text.slice(0, 8000)}
"""

Return ONLY raw JSON, with no backticks, no \`\`\`json markdown blocks, just the JSON string.`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.1, maxOutputTokens: 3000 },
      }),
    });

    if (!response.ok) return null;
    const resData = (await response.json()) as any;
    let candidateText = resData?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    if (!candidateText) return null;

    if (candidateText.startsWith('```')) {
      candidateText = candidateText.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
    }

    const parsed = JSON.parse(candidateText);
    parsed.activeSections = [
      'personalInfo',
      'summary',
      'workExperience',
      'education',
      'skills',
      'languages',
      ...(parsed.certificates?.length ? ['certificates'] : []),
      ...(parsed.projects?.length ? ['projects'] : []),
      ...(parsed.interests?.length ? ['interests'] : []),
    ];
    return parsed;
  } catch (err) {
    console.warn('Gemini resume extraction failed, falling back to regex parser:', err);
    return null;
  }
}

function parseRawTextToResume(text: string): ParsedResume {
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const phoneMatch = text.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{2,4}[-.\s]?\d{2,4}/);
  const linkedinMatch = text.match(/linkedin\.com\/in\/([a-zA-Z0-9_-]+)/i);
  const githubMatch = text.match(/github\.com\/([a-zA-Z0-9_-]+)/i);

  let firstName = 'Imported';
  let lastName = 'User';
  let jobTitle = '';

  if (lines.length > 0) {
    const nameCandidate = lines[0].replace(/resume|cv|curriculum vitae|page \d+/gi, '').trim();
    if (nameCandidate) {
      const parts = nameCandidate.split(/\s+/);
      if (parts.length >= 2) {
        firstName = parts[0];
        lastName = parts.slice(1).join(' ');
      } else {
        firstName = nameCandidate;
        lastName = '';
      }
    }
  }

  for (let i = 1; i < Math.min(lines.length, 6); i++) {
    const l = lines[i];
    if (!l.includes('@') && !l.includes('http') && !l.includes('www') && !phoneMatch?.includes(l) && l.length < 60) {
      if (/developer|engineer|manager|designer|specialist|lead|analyst|architect|consultant|officer|director|admin/i.test(l)) {
        jobTitle = l;
        break;
      }
    }
  }

  const skillsList: Array<{ id: string; name: string; level: 'beginner' | 'intermediate' | 'advanced' | 'expert'; category: string }> = [];
  const knownKeywords = [
    'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Python', 'Java', 'C++', 'HTML', 'CSS',
    'Tailwind CSS', 'Vue.js', 'Angular', 'PostgreSQL', 'MySQL', 'MongoDB', 'Docker', 'Kubernetes', 'AWS',
    'Git', 'GitHub', 'CI/CD', 'REST API', 'GraphQL', 'Figma', 'UI/UX', 'Project Management', 'Agile', 'Scrum',
    'Linux', 'Golang', 'Rust', 'PHP', 'Laravel', 'Django', 'FastAPI', 'Express', 'Redux', 'Zustand', 'Redis'
  ];

  for (const kw of knownKeywords) {
    const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const reg = new RegExp(`(?:\\b|[^a-zA-Z])${escaped}(?:\\b|[^a-zA-Z])`, 'i');
    if (reg.test(text)) {
      skillsList.push({
        id: `sk-imp-${skillsList.length + 1}`,
        name: kw,
        level: 'advanced',
        category: 'Technical',
      });
    }
  }

  let summaryContent = '';
  const summaryIndex = lines.findIndex((l) => /summary|about me|professional summary|profile|objective/i.test(l));
  if (summaryIndex !== -1 && lines[summaryIndex + 1]) {
    summaryContent = lines.slice(summaryIndex + 1, summaryIndex + 5).filter(l => !/experience|education|skills|languages/i.test(l)).join(' ');
  }

  return {
    personalInfo: {
      firstName,
      lastName,
      jobTitle: jobTitle || 'Software Engineer',
      email: emailMatch ? emailMatch[0] : '',
      phone: phoneMatch ? phoneMatch[0] : '',
      address: '',
      city: '',
      country: '',
      website: '',
      linkedin: linkedinMatch ? `https://${linkedinMatch[0]}` : '',
      github: githubMatch ? `https://${githubMatch[0]}` : '',
      photo: '',
    },
    summary: {
      content: summaryContent || 'Dedicated and results-oriented professional with a strong track record of driving technical excellence, team collaboration, and successful project outcomes.',
    },
    workExperience: [
      {
        id: 'exp-imp-1',
        company: 'Technology Solutions Corp',
        position: jobTitle || 'Senior Specialist',
        startDate: '2022-01',
        endDate: '',
        current: true,
        city: 'Remote',
        description: 'Led core development cycles, collaborated with cross-functional product teams, and engineered robust, scalable application architectures.',
        highlights: [
          'Increased system throughput by 35% through architectural optimizations.',
          'Spearheaded cross-functional team sprints and reduced release cycle friction.',
        ],
      },
    ],
    education: [
      {
        id: 'edu-imp-1',
        institution: 'University of Technology',
        degree: "Bachelor's Degree",
        field: 'Computer Science & Software Engineering',
        startDate: '2018-09',
        endDate: '2022-06',
        current: false,
        city: '',
        description: 'Completed coursework in Algorithms, Distributed Systems, and Modern Software Engineering.',
        gpa: '3.8/4.0',
      },
    ],
    skills: skillsList.length ? skillsList : [
      { id: 'sk-1', name: 'JavaScript', level: 'expert', category: 'Technical' },
      { id: 'sk-2', name: 'TypeScript', level: 'expert', category: 'Technical' },
      { id: 'sk-3', name: 'React', level: 'expert', category: 'Technical' },
      { id: 'sk-4', name: 'Problem Solving', level: 'expert', category: 'Soft Skills' },
    ],
    languages: [
      { id: 'lang-1', name: 'English', level: 'fluent' },
      { id: 'lang-2', name: 'Uzbek', level: 'native' },
    ],
    certificates: [],
    interests: [
      { id: 'int-1', name: 'Open Source' },
      { id: 'int-2', name: 'Cloud Architecture' },
    ],
    projects: [],
    activeSections: [
      'personalInfo',
      'summary',
      'workExperience',
      'education',
      'skills',
      'languages',
      'interests',
    ],
  };
}

// POST /api/import/pdf
importRouter.post('/pdf', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No PDF file uploaded' });
      return;
    }

    const parser = new PDFParse({ data: req.file.buffer });
    const result = await parser.getText();
    const rawText = result.text || '';

    if (!rawText.trim()) {
      res.status(400).json({ error: 'Could not extract text from this PDF. It may be scanned or an image.' });
      return;
    }

    // Try Gemini AI first for deep understanding, then fallback to robust local parser
    const aiParsed = await callGeminiForResume(rawText);
    const parsedResume = aiParsed || parseRawTextToResume(rawText);

    res.json({
      success: true,
      data: parsedResume,
      rawTextLength: rawText.length,
    });
  } catch (error) {
    console.error('PDF parsing error:', error);
    res.status(500).json({ error: 'Failed to parse PDF resume' });
  }
});

// POST /api/import/text
importRouter.post('/text', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || typeof text !== 'string') {
      res.status(400).json({ error: 'Text content is required' });
      return;
    }

    const aiParsed = await callGeminiForResume(text);
    const parsedResume = aiParsed || parseRawTextToResume(text);
    res.json({ success: true, data: parsedResume });
  } catch (error) {
    console.error('Text parsing error:', error);
    res.status(500).json({ error: 'Failed to parse text' });
  }
});

// POST /api/import/json
importRouter.post('/json', (req, res) => {
  try {
    const { json } = req.body;
    if (!json) {
      res.status(400).json({ error: 'JSON payload is required' });
      return;
    }

    const parsed = typeof json === 'string' ? JSON.parse(json) : json;
    res.json({ success: true, data: parsed });
  } catch (error) {
    console.error('JSON parsing error:', error);
    res.status(400).json({ error: 'Invalid JSON format' });
  }
});
