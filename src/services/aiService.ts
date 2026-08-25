export interface AtsAnalysisResult {
  score: number;
  grade: string;
  keywordsCount: number;
  suggestions: string[];
}

export interface SpellcheckResult {
  improved: string;
  issuesCount: number;
}

async function callGemini(prompt: string): Promise<string | null> {
  const apiKey = process.env.GEMINI_API_KEY || process.env.AI_API_KEY;
  if (!apiKey) return null;

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1000,
        },
      }),
    });

    if (!response.ok) {
      console.warn('Gemini API returned status:', response.status);
      return null;
    }

    const data = (await response.json()) as any;
    const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return candidateText?.trim() || null;
  } catch (err) {
    console.error('Gemini API call failed, using local fallback:', err);
    return null;
  }
}

export async function generateSummary(jobTitle: string, currentSummary?: string, lang: string = 'en'): Promise<string> {
  const prompt = `Write a compelling, professional 3-sentence resume summary for a "${jobTitle}".
Tone: confident, quantifiable, and ATS-friendly.
Language: ${lang === 'uz' ? 'Uzbek' : lang === 'ru' ? 'Russian' : 'English'}.
${currentSummary ? `Existing context to improve: "${currentSummary}"` : ''}
Output only the raw summary text without any markdown or quotation marks.`;

  const aiResult = await callGemini(prompt);
  if (aiResult) return aiResult;

  if (lang === 'uz') {
    return `${jobTitle} sohasida ko'p yillik tajribaga ega bo'lgan, zamonaviy texnologiyalar va amaliyotlarni chuqur o'zlashtirgan mutaxassis. Jamoa bilan samarali ishlash, biznes talablarini texnik yechimlarga aylantirish va yuqori sifatli natijalarga erishish bo'yicha kuchli ko'nikmalarga ega. Doimiy o'sish va kompaniya rivojiga hissa qo'shishga yo'naltirilgan.`;
  }
  if (lang === 'ru') {
    return `Целеустремленный и квалифицированный ${jobTitle} с подтвержденным опытом разработки и внедрения масштабируемых решений. Обладает глубокими знаниями современных стандартов, отличными навыками командной работы и фокусом на оптимизацию бизнес-процессов. Ориентирован на достижение измеримых результатов.`;
  }

  const summaries = [
    `Results-driven and innovative ${jobTitle} with proven expertise in designing, developing, and delivering scalable solutions. Skilled in collaborating with cross-functional teams, implementing industry best practices, and driving tangible business growth with clean, maintainable architecture.`,
    `Accomplished ${jobTitle} with a passion for building intuitive user experiences and high-performance systems. Adept at agile methodologies, technical leadership, and continuous optimization to elevate product quality and user satisfaction.`,
    `Dynamic ${jobTitle} bringing a strong blend of problem-solving ability, technical depth, and strategic thinking. Proven track record of spearheading complex projects from conception to deployment with measurable operational improvements.`,
  ];
  return summaries[Math.floor(Math.random() * summaries.length)];
}

export async function improveExperience(text: string, lang: string = 'en'): Promise<string> {
  if (!text) return 'Architected and deployed scalable solutions that enhanced overall team velocity and reduced system latency.';

  const prompt = `Rewrite the following resume job description bullet points using the STAR method (Action Verb + Context + Quantified Impact).
Original text: "${text}"
Language: ${lang === 'uz' ? 'Uzbek' : lang === 'ru' ? 'Russian' : 'English'}.
Return only the improved bullet points separated by newlines, with strong action verbs.`;

  const aiResult = await callGemini(prompt);
  if (aiResult) return aiResult;

  const strongVerbs = ['Spearheaded', 'Architected', 'Engineered', 'Streamlined', 'Optimized', 'Accelerated', 'Championed', 'Orchestrated'];
  const sentences = text.split(/[.!?]\s+/).filter(Boolean);
  const improved = sentences.map((sentence, i) => {
    let s = sentence.trim();
    const hasVerb = strongVerbs.some((v) => s.toLowerCase().startsWith(v.toLowerCase()));
    if (!hasVerb) {
      const verb = strongVerbs[i % strongVerbs.length];
      s = `${verb} ` + s.charAt(0).toLowerCase() + s.slice(1);
    }
    if (!s.match(/\d+%/)) {
      if (i === 0) s += ', resulting in a 25% efficiency increase';
    }
    return s;
  });

  return improved.join('. ') + '.';
}

export async function generateCoverLetter(
  role: string,
  company: string,
  backgroundText: string,
  lang: string = 'en'
): Promise<string> {
  const prompt = `Write a professional, personalized Cover Letter for the position of "${role}" at "${company}".
Background details: "${backgroundText || 'Experienced professional with relevant skills'}".
Language: ${lang === 'uz' ? 'Uzbek' : lang === 'ru' ? 'Russian' : 'English'}.
Format: Include Salutation, Opening paragraph, 2 Body paragraphs highlighting value, and a strong Closing sign-off.`;

  const aiResult = await callGemini(prompt);
  if (aiResult) return aiResult;

  if (lang === 'uz') {
    return `Hurmatli Ish Beruvchi,

Men ${company} kompaniyasidagi "${role}" lavozimiga bo'lgan katta qiziqishimni bildirish uchun ushbu xatni yozyapman. O'z sohamdagi amaliy tajribam va zamonaviy yondashuvlarim bilan jamoangizning yangi marralarga erishishiga hissa qo'sha olishimga ishonchim komil.

Faoliyatim davomida murakkab loyihalarni muvaffaqiyatli amalga oshirish, samaradorlikni oshirish va jamoaviy hamkorlikni mustahkamlashga e'tibor qaratib kelganman. ${backgroundText ? backgroundText.slice(0, 150) : 'Mening ko\'nikmalarim ushbu vakansiya talablariga to\'liq javob beradi.'}

${company} kompaniyasining yutuqlari va professional madaniyati meni juda ilhomlantiradi. Kelgusida o'z tajribam bilan loyihalaringizga qanday qiymat bera olishimni suhbat davomida muhokama qilishdan mamnun bo'lar edim.

E'tiboringiz va vaqtingiz uchun minnatdorchilik bildiraman.

Hurmat bilan,
Nomzod`;
  }

  return `Dear Hiring Manager,

I am writing to express my enthusiastic interest in the ${role} position at ${company}. With a proven background in building scalable solutions and delivering high-quality user experiences, I am eager to contribute directly to your team's ongoing success.

Throughout my career, I have focused on solving complex challenges, optimizing project workflows, and collaborating effectively across disciplines. ${backgroundText ? `My experience in ${backgroundText.slice(0, 150)} aligns closely with the objectives outlined for this position.` : 'My technical foundations and drive for continuous improvement equip me to hit the ground running.'}

What excites me most about ${company} is your commitment to innovation and delivering world-class products. I welcome the opportunity to discuss how my skill set and passion can bring tangible value to your organization.

Thank you for your time and consideration.

Sincerely,
Candidate`;
}

export async function checkSpellingAndGrammar(text: string, lang: string = 'en'): Promise<SpellcheckResult> {
  const prompt = `Proofread the following text for grammar, typos, punctuation, and professional tone.
Text: "${text}"
Language: ${lang === 'uz' ? 'Uzbek' : lang === 'ru' ? 'Russian' : 'English'}.
Return a JSON object with:
{"improved": "the corrected text", "issuesCount": number_of_errors_found}`;

  const aiResult = await callGemini(prompt);
  if (aiResult) {
    try {
      const parsed = JSON.parse(aiResult.replace(/```json|```/g, '').trim());
      if (parsed.improved) return parsed;
    } catch (_) { }
  }

  let improved = text;
  let issuesCount = 0;
  const fixes: Record<string, string> = {
    'teh ': 'the ',
    'adn ': 'and ',
    'managment': 'management',
    'experiance': 'experience',
    'develope ': 'develop ',
    'developement': 'development',
    'sucessfull': 'successful',
    'responcible': 'responsible',
    ' acheive': ' achieve',
    'recieve': 'receive',
    'imediate': 'immediate',
    'referance': 'reference',
  };

  for (const [bad, good] of Object.entries(fixes)) {
    if (improved.toLowerCase().includes(bad)) {
      improved = improved.replace(new RegExp(bad, 'gi'), good);
      issuesCount++;
    }
  }

  return { improved, issuesCount };
}

export async function translateResumeText(text: string, targetLang: string): Promise<string> {
  const langNames: Record<string, string> = {
    uz: 'Uzbek',
    ru: 'Russian',
    en: 'English',
    de: 'German',
    fr: 'French',
    es: 'Spanish',
  };

  const targetName = langNames[targetLang] || targetLang;
  const prompt = `Translate the following resume content into natural, professional ${targetName}.
Maintain all bullet points, numbers, technical terms, and structure:
"${text}"
Output only the translated text.`;

  const aiResult = await callGemini(prompt);
  if (aiResult) return aiResult;

  return text;
}

export function analyzeAtsScore(resumeData: any): AtsAnalysisResult {
  let score = 50;
  const suggestions: string[] = [];
  let keywordsCount = 0;

  if (resumeData.personalInfo?.email) score += 5;
  else suggestions.push('Add an email address so recruiters can contact you.');

  if (resumeData.personalInfo?.phone) score += 5;
  else suggestions.push('Add a valid phone number.');

  if (resumeData.personalInfo?.city || resumeData.personalInfo?.country) score += 5;
  else suggestions.push('Include your location (City, Country).');

  if (resumeData.summary?.content && resumeData.summary.content.length > 50) {
    score += 15;
  } else {
    suggestions.push('Add a detailed professional summary (at least 2-3 sentences).');
  }

  if (resumeData.workExperience?.length > 0) {
    score += 15;
    const hasHighlights = resumeData.workExperience.some(
      (w: any) => (w.highlights && w.highlights.length > 0) || (w.description && w.description.length > 30)
    );
    if (hasHighlights) score += 5;
    else suggestions.push('Add achievement bullet points to your work experience.');
  } else {
    suggestions.push('Add at least one work experience entry.');
  }

  if (resumeData.education?.length > 0) score += 10;
  else suggestions.push('Include your education background.');

  if (resumeData.skills?.length >= 5) {
    score += 10;
    keywordsCount = resumeData.skills.length;
  } else {
    suggestions.push('List at least 5 relevant technical/soft skills.');
  }

  if (resumeData.projects?.length > 0 || resumeData.certificates?.length > 0) {
    score += 5;
  }

  score = Math.min(score, 100);
  let grade = 'B';
  if (score >= 90) grade = 'A+';
  else if (score >= 80) grade = 'A';
  else if (score >= 70) grade = 'B+';
  else if (score >= 60) grade = 'B';
  else grade = 'C';

  return { score, grade, keywordsCount, suggestions };
}

export async function suggestSkills(jobTitle: string, lang: string = 'en'): Promise<string[]> {
  const prompt = `List the top 10 most in-demand technical and core skills for a "${jobTitle}".
Language: ${lang === 'uz' ? 'Uzbek' : lang === 'ru' ? 'Russian' : 'English'}.
Output ONLY a comma-separated list of skills, e.g. "React, TypeScript, CSS, Git, Agile"`;

  const aiResult = await callGemini(prompt);
  if (aiResult) {
    const list = aiResult.split(/,\s*|\n/).map((s) => s.replace(/^[0-9.-•*\s]+/, '').trim()).filter(Boolean);
    if (list.length > 0) return list.slice(0, 10);
  }

  const t = jobTitle.toLowerCase();
  if (t.includes('frontend') || t.includes('react') || t.includes('web')) {
    return ['React', 'TypeScript', 'JavaScript (ES6+)', 'HTML5 & CSS3', 'Tailwind CSS', 'Next.js', 'Git / GitHub', 'REST APIs', 'Unit Testing', 'Performance Optimization'];
  }
  if (t.includes('backend') || t.includes('node') || t.includes('python')) {
    return ['Node.js / Express', 'Python / Django', 'PostgreSQL', 'MongoDB', 'REST & GraphQL APIs', 'Docker', 'Redis', 'Microservices', 'Git', 'CI/CD'];
  }
  if (t.includes('design') || t.includes('ui') || t.includes('ux')) {
    return ['Figma', 'UI/UX Design', 'Wireframing', 'Prototyping', 'Design Systems', 'User Research', 'Information Architecture', 'Interaction Design', 'Usability Testing', 'Responsive Design'];
  }
  if (t.includes('manager') || t.includes('product') || t.includes('project')) {
    return ['Project Management', 'Agile / Scrum', 'Stakeholder Management', 'Risk Management', 'Jira / Confluence', 'Product Strategy', 'Roadmapping', 'Budgeting', 'Cross-Functional Leadership', 'Data Analysis'];
  }

  return ['Communication', 'Problem Solving', 'Team Leadership', 'Project Planning', 'Critical Thinking', 'Time Management', 'Continuous Learning', 'Adaptability', 'Attention to Detail', 'Collaboration'];
}
