import { Router } from 'express';

export const docsRouter = Router();

const TIPS_DATA = {
  actionVerbs: [
    { category: 'Leadership', verbs: ['Spearheaded', 'Orchestrated', 'Championed', 'Directed', 'Mobilized', 'Delegated', 'Governed'] },
    { category: 'Development & Engineering', verbs: ['Architected', 'Engineered', 'Refactored', 'Deployed', 'Automated', 'Scaled', 'Configured'] },
    { category: 'Innovation & Creation', verbs: ['Pioneered', 'Formulated', 'Innovated', 'Constructed', 'Conceptualized', 'Introduced'] },
    { category: 'Optimization & Growth', verbs: ['Accelerated', 'Amplified', 'Enhanced', 'Optimized', 'Streamlined', 'Maximized', 'Transformed'] },
    { category: 'Communication & Teamwork', verbs: ['Collaborated', 'Mentored', 'Negotiated', 'Fostered', 'Advocated', 'Partnered'] },
  ],
  sectionTips: {
    personalInfo: [
      'Include a professional email address (e.g. firstname.lastname@domain.com).',
      'Location can just be City, Country — complete street address is not mandatory.',
      'Add customized portfolio, GitHub, or LinkedIn profile links for immediate credibility.',
    ],
    summary: [
      'Keep it between 3 to 5 impactful sentences.',
      'Highlight years of experience, core technical specialties, and notable business impact.',
      'Avoid cliché buzzwords like "hard worker" — demonstrate results with facts.',
    ],
    workExperience: [
      'Use the reverse-chronological order (most recent job first).',
      'Follow the STAR method (Situation, Task, Action, Result) for bullet points.',
      'Incorporate numbers & metrics: "Improved load speed by 35%", "Led team of 6 engineers".',
    ],
    skills: [
      'List 8 to 15 relevant hard and soft skills targeted for the specific job description.',
      'Group skills logically (e.g. Languages, Frameworks, Tools, Practices).',
    ],
    atsOptimization: [
      'Use standard heading titles like "Work Experience", "Education", "Skills".',
      'Avoid embedding vital text inside flat image graphics.',
      'Maintain clean bulleted lists and consistent date formatting (e.g. MMM YYYY).',
      'Include exact keywords found in the target job advertisement.',
    ],
    interviewPreparation: [
      'Practice the "Tell me about yourself" pitch in 90 seconds or less.',
      'Prepare 2-3 behavioral stories where you overcame a technical or team challenge.',
      'Research the company\'s products, stack, and recent company milestones before the call.',
      'Prepare thoughtful questions to ask the interviewer at the conclusion.',
    ],
    coverLetter: [
      'Address the hiring manager or team specifically whenever possible.',
      'Opening hook: state the exact role and why you are drawn to this organization.',
      'Body paragraph: spotlight 1-2 major career wins most relevant to their job requirements.',
      'Closing: reiterate enthusiasm and request an opportunity for an introductory call.',
    ],
  },
};

docsRouter.get('/tips', (_req, res) => {
  res.json(TIPS_DATA);
});
