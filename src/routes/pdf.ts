import { Router } from 'express';
import { generatePdf, generatePreviewImage } from '../services/pdfGenerator.js';

export const pdfRouter = Router();

pdfRouter.post('/generate', async (req, res) => {
  try {
    const { resumeData, templateConfig } = req.body;

    if (!resumeData || !templateConfig) {
      res.status(400).json({ error: 'resumeData and templateConfig are required' });
      return;
    }

    const pdfBuffer = await generatePdf(resumeData, templateConfig);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="resume.pdf"`,
      'Content-Length': pdfBuffer.length.toString(),
    });

    res.send(pdfBuffer);
  } catch (error) {
    console.error('PDF generation error:', error);
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
});

pdfRouter.post('/preview-image', async (req, res) => {
  try {
    const { resumeData, templateConfig } = req.body;

    if (!resumeData || !templateConfig) {
      res.status(400).json({ error: 'resumeData and templateConfig are required' });
      return;
    }

    const imageBuffer = await generatePreviewImage(resumeData, templateConfig);

    res.set({
      'Content-Type': 'image/png',
      'Content-Disposition': `inline; filename="preview.png"`,
      'Content-Length': imageBuffer.length.toString(),
    });

    res.send(imageBuffer);
  } catch (error) {
    console.error('Preview image generation error:', error);
    res.status(500).json({ error: 'Failed to generate preview image' });
  }
});
