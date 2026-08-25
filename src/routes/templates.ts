import { Router } from 'express';
import { TEMPLATES_DATA } from '../data/templatesData.js';

export const templatesRouter = Router();

templatesRouter.get('/', (_req, res) => {
  res.json(TEMPLATES_DATA);
});

templatesRouter.get('/:id', (req, res) => {
  const template = TEMPLATES_DATA.find((t) => t.id === req.params.id);
  if (!template) {
    res.status(404).json({ error: 'Template not found' });
    return;
  }
  res.json(template);
});
