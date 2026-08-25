import express from 'express';
import cors from 'cors';
import { pdfRouter } from './routes/pdf.js';
import { aiRouter } from './routes/ai.js';
import { templatesRouter } from './routes/templates.js';
import { importRouter } from './routes/import.js';
import { docsRouter } from './routes/docs.js';
import { coverLetterRouter } from './routes/coverLetter.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

app.use('/api/pdf', pdfRouter);
app.use('/api/ai', aiRouter);
app.use('/api/templates', templatesRouter);
app.use('/api/import', importRouter);
app.use('/api/docs', docsRouter);
app.use('/api/cover-letter', coverLetterRouter);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'simple-resume-api', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Backend started on port ${PORT}`);
});
