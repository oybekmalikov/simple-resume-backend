import { Router } from 'express';
import {
  generateSummary,
  improveExperience,
  generateCoverLetter,
  checkSpellingAndGrammar,
  translateResumeText,
  analyzeAtsScore,
  suggestSkills,
} from '../services/aiService.js';

export const aiRouter = Router();

aiRouter.post('/generate', async (req, res) => {
  try {
    const { type, jobTitle, currentSummary, text, language, targetRole, companyName } = req.body;
    const lang = language || 'en';

    if (type === 'summary') {
      const summary = await generateSummary(jobTitle || 'Software Engineer', currentSummary, lang);
      res.json({ result: summary });
      return;
    }

    if (type === 'experience') {
      const improved = await improveExperience(text || '', lang);
      res.json({ result: improved });
      return;
    }

    if (type === 'cover-letter') {
      const coverLetter = await generateCoverLetter(
        targetRole || jobTitle || 'Professional',
        companyName || 'Target Company',
        text || '',
        lang
      );
      res.json({ result: coverLetter });
      return;
    }

    if (type === 'spellcheck') {
      const suggestions = await checkSpellingAndGrammar(text || '', lang);
      res.json({ result: suggestions.improved, issuesCount: suggestions.issuesCount });
      return;
    }

    if (type === 'translate') {
      const translated = await translateResumeText(text || '', lang);
      res.json({ result: translated });
      return;
    }

    if (type === 'ats-score') {
      const analysis = analyzeAtsScore(req.body.resumeData || {});
      res.json(analysis);
      return;
    }

    if (type === 'suggest-skills') {
      const skills = await suggestSkills(jobTitle || 'Software Engineer', lang);
      res.json({ result: skills });
      return;
    }

    res.status(400).json({ error: 'Invalid AI operation type.' });
  } catch (error) {
    console.error('AI generation error:', error);
    res.status(500).json({ error: 'AI processing failed' });
  }
});

aiRouter.post('/suggest-skills', async (req, res) => {
  try {
    const { jobTitle, language } = req.body;
    const skills = await suggestSkills(jobTitle || 'Software Engineer', language || 'en');
    res.json({ skills });
  } catch (error) {
    console.error('Skills suggestion error:', error);
    res.status(500).json({ error: 'Failed to suggest skills' });
  }
});
