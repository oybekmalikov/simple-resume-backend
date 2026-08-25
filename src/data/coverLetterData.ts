export interface CoverLetterTemplate {
  id: string;
  name: string;
  description: string;
  category: 'classic' | 'modern' | 'creative' | 'professional';
  headerStyle: 'classic' | 'modern' | 'minimal' | 'sidebar' | 'banner' | 'centered' | 'elegant' | 'corporate';
  thumbnailColor: string;
  config: {
    fonts: {
      body: string;
      heading: string;
      size: { name: number; body: number; small: number };
    };
    colors: {
      primary: string;
      text: string;
      background: string;
      accent: string;
      headerBg: string;
      headerText: string;
    };
    spacing: {
      lineHeight: number;
      pageMargin: number;
      paragraphGap: number;
    };
    pageFormat: string;
  };
}

export const COVER_LETTER_TEMPLATES: CoverLetterTemplate[] = [
  {
    id: 'cl-classic',
    name: 'Classic Professional',
    description: 'Traditional business letter with clean divider and professional typography.',
    category: 'classic',
    headerStyle: 'classic',
    thumbnailColor: '#111827',
    config: {
      fonts: { body: 'Inter', heading: 'Plus Jakarta Sans', size: { name: 24, body: 11, small: 9.5 } },
      colors: { primary: '#111827', text: '#1e293b', background: '#ffffff', accent: '#111827', headerBg: '#ffffff', headerText: '#111827' },
      spacing: { lineHeight: 1.65, pageMargin: 36, paragraphGap: 14 },
      pageFormat: 'A4',
    },
  },
  {
    id: 'cl-modern-blue',
    name: 'Modern Blue',
    description: 'Bold bottom-border header with indigo accent and contemporary spacing.',
    category: 'modern',
    headerStyle: 'modern',
    thumbnailColor: '#2563eb',
    config: {
      fonts: { body: 'Inter', heading: 'Plus Jakarta Sans', size: { name: 26, body: 11, small: 9.5 } },
      colors: { primary: '#2563eb', text: '#0f172a', background: '#ffffff', accent: '#3b82f6', headerBg: '#ffffff', headerText: '#0f172a' },
      spacing: { lineHeight: 1.65, pageMargin: 34, paragraphGap: 14 },
      pageFormat: 'A4',
    },
  },
  {
    id: 'cl-minimal',
    name: 'Minimal Clean',
    description: 'Ultra-minimal layout with no dividers — content speaks for itself.',
    category: 'classic',
    headerStyle: 'minimal',
    thumbnailColor: '#334155',
    config: {
      fonts: { body: 'Inter', heading: 'Inter', size: { name: 22, body: 10.5, small: 9 } },
      colors: { primary: '#334155', text: '#1e293b', background: '#ffffff', accent: '#475569', headerBg: '#ffffff', headerText: '#1e293b' },
      spacing: { lineHeight: 1.6, pageMargin: 38, paragraphGap: 12 },
      pageFormat: 'A4',
    },
  },
  {
    id: 'cl-navy-banner',
    name: 'Navy Banner',
    description: 'Full-width navy banner header for executive-level cover letters.',
    category: 'professional',
    headerStyle: 'banner',
    thumbnailColor: '#0f2744',
    config: {
      fonts: { body: 'Inter', heading: 'Plus Jakarta Sans', size: { name: 24, body: 11, small: 9.5 } },
      colors: { primary: '#38bdf8', text: '#1e293b', background: '#ffffff', accent: '#0284c7', headerBg: '#0f2744', headerText: '#f8fafc' },
      spacing: { lineHeight: 1.65, pageMargin: 32, paragraphGap: 14 },
      pageFormat: 'A4',
    },
  },
  {
    id: 'cl-emerald-corporate',
    name: 'Emerald Corporate',
    description: 'Two-column header with emerald branding — ideal for business roles.',
    category: 'professional',
    headerStyle: 'corporate',
    thumbnailColor: '#047857',
    config: {
      fonts: { body: 'Inter', heading: 'Plus Jakarta Sans', size: { name: 24, body: 11, small: 9.5 } },
      colors: { primary: '#047857', text: '#0f172a', background: '#ffffff', accent: '#10b981', headerBg: '#ffffff', headerText: '#0f172a' },
      spacing: { lineHeight: 1.65, pageMargin: 34, paragraphGap: 14 },
      pageFormat: 'A4',
    },
  },
  {
    id: 'cl-centered-serif',
    name: 'Centered Serif',
    description: 'Centered elegant header with serif typography and subtle divider.',
    category: 'modern',
    headerStyle: 'centered',
    thumbnailColor: '#4f46e5',
    config: {
      fonts: { body: 'Georgia', heading: 'Playfair Display', size: { name: 28, body: 11.5, small: 9.5 } },
      colors: { primary: '#4f46e5', text: '#1e293b', background: '#ffffff', accent: '#6366f1', headerBg: '#ffffff', headerText: '#1e293b' },
      spacing: { lineHeight: 1.7, pageMargin: 36, paragraphGap: 16 },
      pageFormat: 'A4',
    },
  },
  {
    id: 'cl-elegant-rose',
    name: 'Elegant Rose',
    description: 'Sophisticated left-border design with warm rose accent — ideal for creative fields.',
    category: 'creative',
    headerStyle: 'elegant',
    thumbnailColor: '#be185d',
    config: {
      fonts: { body: 'Inter', heading: 'Merriweather', size: { name: 24, body: 11, small: 9.5 } },
      colors: { primary: '#be185d', text: '#1e293b', background: '#ffffff', accent: '#ec4899', headerBg: '#ffffff', headerText: '#1e293b' },
      spacing: { lineHeight: 1.65, pageMargin: 34, paragraphGap: 14 },
      pageFormat: 'A4',
    },
  },
  {
    id: 'cl-coral-avatar',
    name: 'Coral Avatar',
    description: 'Full-width header with avatar initial and coral-navy palette.',
    category: 'creative',
    headerStyle: 'sidebar',
    thumbnailColor: '#f43f5e',
    config: {
      fonts: { body: 'Inter', heading: 'Plus Jakarta Sans', size: { name: 24, body: 11, small: 9.5 } },
      colors: { primary: '#f43f5e', text: '#1e293b', background: '#ffffff', accent: '#fb7185', headerBg: '#1e1b4b', headerText: '#f8fafc' },
      spacing: { lineHeight: 1.65, pageMargin: 32, paragraphGap: 14 },
      pageFormat: 'A4',
    },
  },
];
