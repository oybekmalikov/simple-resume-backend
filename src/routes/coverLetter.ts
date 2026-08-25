import { Router } from 'express';
import { generateCoverLetterPdf, generateCoverLetterPreview } from '../services/pdfGenerator.js';
import { COVER_LETTER_TEMPLATES } from '../data/coverLetterData.js';

export const coverLetterRouter = Router();

coverLetterRouter.get('/templates', (_req, res) => {
  res.json(COVER_LETTER_TEMPLATES);
});

coverLetterRouter.get('/templates/:id', (req, res) => {
  const template = COVER_LETTER_TEMPLATES.find((t) => t.id === req.params.id);
  if (!template) {
    res.status(404).json({ error: 'Cover letter template not found' });
    return;
  }
  res.json(template);
});

coverLetterRouter.post('/generate', async (req, res) => {
  try {
    const { coverLetterData, coverLetterConfig } = req.body;

    if (!coverLetterData || !coverLetterConfig) {
      res.status(400).json({ error: 'coverLetterData and coverLetterConfig are required' });
      return;
    }

    const pdfBuffer = await generateCoverLetterPdf(coverLetterData, coverLetterConfig);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="cover-letter.pdf"`,
      'Content-Length': pdfBuffer.length.toString(),
    });

    res.send(pdfBuffer);
  } catch (error) {
    console.error('Cover letter PDF generation error:', error);
    res.status(500).json({ error: 'Failed to generate cover letter PDF' });
  }
});

coverLetterRouter.post('/preview-image', async (req, res) => {
  try {
    const { coverLetterData, coverLetterConfig } = req.body;

    if (!coverLetterData || !coverLetterConfig) {
      res.status(400).json({ error: 'coverLetterData and coverLetterConfig are required' });
      return;
    }

    const imageBuffer = await generateCoverLetterPreview(coverLetterData, coverLetterConfig);

    res.set({
      'Content-Type': 'image/png',
      'Content-Disposition': `inline; filename="cover-letter-preview.png"`,
      'Content-Length': imageBuffer.length.toString(),
    });

    res.send(imageBuffer);
  } catch (error) {
    console.error('Cover letter preview error:', error);
    res.status(500).json({ error: 'Failed to generate cover letter preview' });
  }
});
