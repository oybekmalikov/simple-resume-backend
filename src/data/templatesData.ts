export interface TemplateItem {
  id: string;
  name: string;
  description: string;
  category: 'simple' | 'modern' | 'creative' | 'professional';
  isNew?: boolean;
  thumbnailColor: string;
  config: {
    layout: {
      columns: 1 | 2;
      sidebarPosition: 'left' | 'right';
      columnWidthRatio: number;
      headerPosition: 'top' | 'sidebar' | 'centered' | 'banner';
      sidebarBg?: string;
      sidebarText?: string;
    };
    fonts: {
      body: string;
      heading: string;
      size: {
        name: number;
        sectionTitle: number;
        body: number;
        small: number;
      };
    };
    colors: {
      primary: string;
      secondary: string;
      text: string;
      background: string;
      accent: string;
      headerBg: string;
      headerText: string;
      sidebarBg?: string;
      sidebarText?: string;
    };
    spacing: {
      sectionGap: number;
      itemGap: number;
      lineHeight: number;
      pageMargin: number;
    };
    headings: {
      style: 'underline' | 'background' | 'border-left' | 'simple' | 'uppercase' | 'pill' | 'accent-dot';
      capitalization: 'none' | 'uppercase' | 'capitalize';
      icons: 'none' | 'outline' | 'filled';
    };
    photo: {
      show: boolean;
      shape: 'circle' | 'square' | 'rounded';
      size: number;
      border: boolean;
      borderColor: string;
    };
    links: {
      underline: boolean;
      showIcons: boolean;
      color: string;
    };
    footer: {
      show: boolean;
      content: string;
    };
    dateFormat: string;
    pageFormat: string;
  };
}

export const TEMPLATES_DATA: TemplateItem[] = [
  {
    id: 'classic',
    name: 'Classic Clear',
    description: 'Clean, traditional single-column layout perfect for ATS and corporate roles.',
    category: 'simple',
    thumbnailColor: '#2563eb',
    config: {
      layout: {
        columns: 1,
        sidebarPosition: 'left',
        columnWidthRatio: 0.35,
        headerPosition: 'top',
      },
      fonts: {
        body: 'Inter',
        heading: 'Plus Jakarta Sans',
        size: { name: 26, sectionTitle: 13, body: 10.5, small: 9 },
      },
      colors: {
        primary: '#2563eb',
        secondary: '#64748b',
        text: '#0f172a',
        background: '#ffffff',
        accent: '#2563eb',
        headerBg: '#ffffff',
        headerText: '#0f172a',
      },
      spacing: { sectionGap: 16, itemGap: 10, lineHeight: 1.45, pageMargin: 30 },
      headings: { style: 'underline', capitalization: 'uppercase', icons: 'none' },
      photo: { show: true, shape: 'circle', size: 76, border: true, borderColor: '#e2e8f0' },
      links: { underline: false, showIcons: true, color: '#2563eb' },
      footer: { show: false, content: '' },
      dateFormat: 'MMM YYYY',
      pageFormat: 'A4',
    },
  },
  {
    id: 'atlantic',
    name: 'Atlantic Blue',
    description: 'Striking navy blue left sidebar with high contrast and structured sections.',
    category: 'professional',
    isNew: true,
    thumbnailColor: '#0f2744',
    config: {
      layout: {
        columns: 2,
        sidebarPosition: 'left',
        columnWidthRatio: 0.34,
        headerPosition: 'sidebar',
        sidebarBg: '#0f2744',
        sidebarText: '#f8fafc',
      },
      fonts: {
        body: 'Inter',
        heading: 'Plus Jakarta Sans',
        size: { name: 22, sectionTitle: 12, body: 10, small: 8.5 },
      },
      colors: {
        primary: '#38bdf8',
        secondary: '#94a3b8',
        text: '#1e293b',
        background: '#ffffff',
        accent: '#0284c7',
        headerBg: '#0f2744',
        headerText: '#ffffff',
        sidebarBg: '#0f2744',
        sidebarText: '#e2e8f0',
      },
      spacing: { sectionGap: 14, itemGap: 8, lineHeight: 1.4, pageMargin: 24 },
      headings: { style: 'border-left', capitalization: 'uppercase', icons: 'none' },
      photo: { show: true, shape: 'circle', size: 84, border: true, borderColor: '#38bdf8' },
      links: { underline: false, showIcons: true, color: '#38bdf8' },
      footer: { show: false, content: '' },
      dateFormat: 'MMM YYYY',
      pageFormat: 'A4',
    },
  },
  {
    id: 'mercury',
    name: 'Mercury Flow',
    description: 'Modern and balanced centered header with subtle dividers and airy spacing.',
    category: 'modern',
    thumbnailColor: '#4f46e5',
    config: {
      layout: {
        columns: 1,
        sidebarPosition: 'left',
        columnWidthRatio: 0.35,
        headerPosition: 'centered',
      },
      fonts: {
        body: 'Roboto',
        heading: 'Plus Jakarta Sans',
        size: { name: 28, sectionTitle: 13, body: 10.5, small: 9 },
      },
      colors: {
        primary: '#4f46e5',
        secondary: '#6b7280',
        text: '#111827',
        background: '#ffffff',
        accent: '#6366f1',
        headerBg: '#ffffff',
        headerText: '#111827',
      },
      spacing: { sectionGap: 18, itemGap: 10, lineHeight: 1.5, pageMargin: 32 },
      headings: { style: 'pill', capitalization: 'capitalize', icons: 'none' },
      photo: { show: true, shape: 'rounded', size: 80, border: false, borderColor: '#4f46e5' },
      links: { underline: false, showIcons: true, color: '#4f46e5' },
      footer: { show: false, content: '' },
      dateFormat: 'MM/YYYY',
      pageFormat: 'A4',
    },
  },
  {
    id: 'saffron',
    name: 'Saffron Line',
    description: 'Two-column layout with warm saffron accents and left visual indicator bar.',
    category: 'creative',
    thumbnailColor: '#d97706',
    config: {
      layout: {
        columns: 2,
        sidebarPosition: 'left',
        columnWidthRatio: 0.32,
        headerPosition: 'top',
        sidebarBg: '#fffbeb',
        sidebarText: '#451a03',
      },
      fonts: {
        body: 'Inter',
        heading: 'Plus Jakarta Sans',
        size: { name: 24, sectionTitle: 12.5, body: 10, small: 8.5 },
      },
      colors: {
        primary: '#d97706',
        secondary: '#78716c',
        text: '#1c1917',
        background: '#ffffff',
        accent: '#f59e0b',
        headerBg: '#ffffff',
        headerText: '#1c1917',
        sidebarBg: '#fffbeb',
        sidebarText: '#451a03',
      },
      spacing: { sectionGap: 15, itemGap: 9, lineHeight: 1.45, pageMargin: 26 },
      headings: { style: 'accent-dot', capitalization: 'uppercase', icons: 'none' },
      photo: { show: true, shape: 'circle', size: 75, border: true, borderColor: '#d97706' },
      links: { underline: false, showIcons: true, color: '#d97706' },
      footer: { show: false, content: '' },
      dateFormat: 'MMM YYYY',
      pageFormat: 'A4',
    },
  },
  {
    id: 'emerald',
    name: 'Emerald Executive',
    description: 'Corporate banner header with emerald green highlights, ideal for leadership roles.',
    category: 'professional',
    isNew: true,
    thumbnailColor: '#047857',
    config: {
      layout: {
        columns: 2,
        sidebarPosition: 'right',
        columnWidthRatio: 0.33,
        headerPosition: 'banner',
      },
      fonts: {
        body: 'Inter',
        heading: 'Plus Jakarta Sans',
        size: { name: 26, sectionTitle: 13, body: 10.5, small: 9 },
      },
      colors: {
        primary: '#047857',
        secondary: '#64748b',
        text: '#0f172a',
        background: '#ffffff',
        accent: '#10b981',
        headerBg: '#047857',
        headerText: '#ffffff',
        sidebarBg: '#f0fdf4',
        sidebarText: '#064e3b',
      },
      spacing: { sectionGap: 16, itemGap: 10, lineHeight: 1.45, pageMargin: 28 },
      headings: { style: 'background', capitalization: 'uppercase', icons: 'none' },
      photo: { show: true, shape: 'rounded', size: 85, border: true, borderColor: '#ffffff' },
      links: { underline: false, showIcons: true, color: '#047857' },
      footer: { show: false, content: '' },
      dateFormat: 'MMM YYYY',
      pageFormat: 'A4',
    },
  },
  {
    id: 'minimal-tech',
    name: 'Minimal Tech',
    description: 'Monochrome and sleek design with skill badge tags for developers & engineers.',
    category: 'simple',
    thumbnailColor: '#0f172a',
    config: {
      layout: {
        columns: 1,
        sidebarPosition: 'left',
        columnWidthRatio: 0.35,
        headerPosition: 'top',
      },
      fonts: {
        body: 'Inter',
        heading: 'Plus Jakarta Sans',
        size: { name: 24, sectionTitle: 12, body: 10, small: 8.5 },
      },
      colors: {
        primary: '#0f172a',
        secondary: '#475569',
        text: '#020617',
        background: '#ffffff',
        accent: '#2563eb',
        headerBg: '#ffffff',
        headerText: '#020617',
      },
      spacing: { sectionGap: 14, itemGap: 8, lineHeight: 1.4, pageMargin: 28 },
      headings: { style: 'simple', capitalization: 'uppercase', icons: 'none' },
      photo: { show: false, shape: 'square', size: 70, border: false, borderColor: '#0f172a' },
      links: { underline: true, showIcons: false, color: '#0f172a' },
      footer: { show: false, content: '' },
      dateFormat: 'YYYY-MM',
      pageFormat: 'A4',
    },
  },
  {
    id: 'coral-navy',
    name: 'Coral Navy',
    description: 'Vibrant coral accents combined with deep navy typography and timeline dots.',
    category: 'creative',
    thumbnailColor: '#f43f5e',
    config: {
      layout: {
        columns: 2,
        sidebarPosition: 'left',
        columnWidthRatio: 0.34,
        headerPosition: 'sidebar',
        sidebarBg: '#1e1b4b',
        sidebarText: '#f8fafc',
      },
      fonts: {
        body: 'Inter',
        heading: 'Plus Jakarta Sans',
        size: { name: 22, sectionTitle: 12, body: 10, small: 8.5 },
      },
      colors: {
        primary: '#f43f5e',
        secondary: '#94a3b8',
        text: '#1e293b',
        background: '#ffffff',
        accent: '#fb7185',
        headerBg: '#1e1b4b',
        headerText: '#ffffff',
        sidebarBg: '#1e1b4b',
        sidebarText: '#f1f5f9',
      },
      spacing: { sectionGap: 14, itemGap: 8, lineHeight: 1.4, pageMargin: 24 },
      headings: { style: 'underline', capitalization: 'uppercase', icons: 'none' },
      photo: { show: true, shape: 'circle', size: 80, border: true, borderColor: '#f43f5e' },
      links: { underline: false, showIcons: true, color: '#f43f5e' },
      footer: { show: false, content: '' },
      dateFormat: 'MMM YYYY',
      pageFormat: 'A4',
    },
  },
  {
    id: 'editorial',
    name: 'Editorial Noir',
    description: 'High-end serif editorial layout inspired by classic journals and publications.',
    category: 'modern',
    thumbnailColor: '#334155',
    config: {
      layout: {
        columns: 1,
        sidebarPosition: 'left',
        columnWidthRatio: 0.35,
        headerPosition: 'centered',
      },
      fonts: {
        body: 'Georgia',
        heading: 'Playfair Display',
        size: { name: 30, sectionTitle: 14, body: 11, small: 9.5 },
      },
      colors: {
        primary: '#1e293b',
        secondary: '#64748b',
        text: '#0f172a',
        background: '#ffffff',
        accent: '#475569',
        headerBg: '#ffffff',
        headerText: '#0f172a',
      },
      spacing: { sectionGap: 20, itemGap: 12, lineHeight: 1.55, pageMargin: 34 },
      headings: { style: 'underline', capitalization: 'capitalize', icons: 'none' },
      photo: { show: true, shape: 'square', size: 75, border: true, borderColor: '#cbd5e1' },
      links: { underline: true, showIcons: false, color: '#1e293b' },
      footer: { show: false, content: '' },
      dateFormat: 'MMMM YYYY',
      pageFormat: 'A4',
    },
  },
  {
    id: 'leaves',
    name: 'Leaves & Sage',
    description: 'Earthy emerald tones with rounded modern styling, ideal for creative and sustainable industries.',
    category: 'creative',
    isNew: true,
    thumbnailColor: '#166534',
    config: {
      layout: {
        columns: 2,
        sidebarPosition: 'left',
        columnWidthRatio: 0.34,
        headerPosition: 'sidebar',
        sidebarBg: '#14532d',
        sidebarText: '#f0fdf4',
      },
      fonts: {
        body: 'Inter',
        heading: 'Plus Jakarta Sans',
        size: { name: 22, sectionTitle: 12.5, body: 10, small: 8.5 },
      },
      colors: {
        primary: '#16a34a',
        secondary: '#86efac',
        text: '#14532d',
        background: '#fcfdfa',
        accent: '#22c55e',
        headerBg: '#14532d',
        headerText: '#f0fdf4',
        sidebarBg: '#14532d',
        sidebarText: '#dcfce7',
      },
      spacing: { sectionGap: 15, itemGap: 8, lineHeight: 1.45, pageMargin: 24 },
      headings: { style: 'pill', capitalization: 'uppercase', icons: 'none' },
      photo: { show: true, shape: 'rounded', size: 84, border: true, borderColor: '#22c55e' },
      links: { underline: false, showIcons: true, color: '#16a34a' },
      footer: { show: false, content: '' },
      dateFormat: 'MMM YYYY',
      pageFormat: 'A4',
    },
  },
  {
    id: 'happy',
    name: 'Happy Orange',
    description: 'Warm and inviting amber-orange highlights with pill badges and modern sans-serif typography.',
    category: 'creative',
    isNew: true,
    thumbnailColor: '#ea580c',
    config: {
      layout: {
        columns: 1,
        sidebarPosition: 'left',
        columnWidthRatio: 0.35,
        headerPosition: 'centered',
      },
      fonts: {
        body: 'Inter',
        heading: 'Plus Jakarta Sans',
        size: { name: 26, sectionTitle: 13, body: 10.5, small: 9 },
      },
      colors: {
        primary: '#ea580c',
        secondary: '#64748b',
        text: '#1e293b',
        background: '#ffffff',
        accent: '#f97316',
        headerBg: '#ffffff',
        headerText: '#1e293b',
      },
      spacing: { sectionGap: 18, itemGap: 10, lineHeight: 1.48, pageMargin: 30 },
      headings: { style: 'pill', capitalization: 'uppercase', icons: 'none' },
      photo: { show: true, shape: 'circle', size: 82, border: true, borderColor: '#fed7aa' },
      links: { underline: false, showIcons: true, color: '#ea580c' },
      footer: { show: false, content: '' },
      dateFormat: 'MMM YYYY',
      pageFormat: 'A4',
    },
  },
  {
    id: 'true-blue',
    name: 'True Blue',
    description: 'Clean single-column tech layout with sapphire borders and high ATS pass-rate.',
    category: 'modern',
    isNew: true,
    thumbnailColor: '#0284c7',
    config: {
      layout: {
        columns: 1,
        sidebarPosition: 'left',
        columnWidthRatio: 0.35,
        headerPosition: 'top',
      },
      fonts: {
        body: 'Inter',
        heading: 'Plus Jakarta Sans',
        size: { name: 26, sectionTitle: 13, body: 10.5, small: 9 },
      },
      colors: {
        primary: '#0284c7',
        secondary: '#64748b',
        text: '#0f172a',
        background: '#ffffff',
        accent: '#38bdf8',
        headerBg: '#ffffff',
        headerText: '#0f172a',
      },
      spacing: { sectionGap: 16, itemGap: 9, lineHeight: 1.45, pageMargin: 30 },
      headings: { style: 'border-left', capitalization: 'uppercase', icons: 'none' },
      photo: { show: true, shape: 'circle', size: 76, border: true, borderColor: '#bae6fd' },
      links: { underline: false, showIcons: true, color: '#0284c7' },
      footer: { show: false, content: '' },
      dateFormat: 'MMM YYYY',
      pageFormat: 'A4',
    },
  },
  {
    id: 'editorial-rule',
    name: 'Editorial Rule',
    description: 'Minimalist editorial format with clean divider lines and disciplined typography.',
    category: 'simple',
    isNew: true,
    thumbnailColor: '#18181b',
    config: {
      layout: {
        columns: 1,
        sidebarPosition: 'left',
        columnWidthRatio: 0.35,
        headerPosition: 'top',
      },
      fonts: {
        body: 'Inter',
        heading: 'Plus Jakarta Sans',
        size: { name: 24, sectionTitle: 12.5, body: 10.5, small: 9 },
      },
      colors: {
        primary: '#18181b',
        secondary: '#71717a',
        text: '#27272a',
        background: '#ffffff',
        accent: '#3f3f46',
        headerBg: '#ffffff',
        headerText: '#18181b',
      },
      spacing: { sectionGap: 16, itemGap: 10, lineHeight: 1.5, pageMargin: 32 },
      headings: { style: 'underline', capitalization: 'uppercase', icons: 'none' },
      photo: { show: false, shape: 'circle', size: 70, border: false, borderColor: '#e4e4e7' },
      links: { underline: true, showIcons: false, color: '#18181b' },
      footer: { show: false, content: '' },
      dateFormat: 'MMM YYYY',
      pageFormat: 'A4',
    },
  },
  {
    id: 'rohan-industrial',
    name: 'Rohan Industrial',
    description: 'Bold industrial header banner with right sidebar and sharp high-contrast structure.',
    category: 'professional',
    isNew: true,
    thumbnailColor: '#1e293b',
    config: {
      layout: {
        columns: 2,
        sidebarPosition: 'right',
        columnWidthRatio: 0.33,
        headerPosition: 'banner',
        sidebarBg: '#f8fafc',
        sidebarText: '#1e293b',
      },
      fonts: {
        body: 'Inter',
        heading: 'Plus Jakarta Sans',
        size: { name: 24, sectionTitle: 12.5, body: 10, small: 8.5 },
      },
      colors: {
        primary: '#0f172a',
        secondary: '#64748b',
        text: '#1e293b',
        background: '#ffffff',
        accent: '#3b82f6',
        headerBg: '#0f172a',
        headerText: '#ffffff',
        sidebarBg: '#f1f5f9',
        sidebarText: '#1e293b',
      },
      spacing: { sectionGap: 14, itemGap: 8, lineHeight: 1.4, pageMargin: 24 },
      headings: { style: 'accent-dot', capitalization: 'uppercase', icons: 'none' },
      photo: { show: true, shape: 'circle', size: 80, border: true, borderColor: '#3b82f6' },
      links: { underline: false, showIcons: true, color: '#2563eb' },
      footer: { show: false, content: '' },
      dateFormat: 'MM/YYYY',
      pageFormat: 'A4',
    },
  },
  {
    id: 'elegant-rose',
    name: 'Elegant Rose',
    description: 'Refined rose gold and charcoal tones for luxury, fashion, and creative portfolios.',
    category: 'creative',
    isNew: true,
    thumbnailColor: '#be185d',
    config: {
      layout: {
        columns: 1,
        sidebarPosition: 'left',
        columnWidthRatio: 0.35,
        headerPosition: 'centered',
      },
      fonts: {
        body: 'Georgia',
        heading: 'Playfair Display',
        size: { name: 28, sectionTitle: 13.5, body: 10.5, small: 9 },
      },
      colors: {
        primary: '#be185d',
        secondary: '#64748b',
        text: '#1e293b',
        background: '#fffbfb',
        accent: '#db2777',
        headerBg: '#fffbfb',
        headerText: '#1e293b',
      },
      spacing: { sectionGap: 18, itemGap: 10, lineHeight: 1.55, pageMargin: 32 },
      headings: { style: 'border-left', capitalization: 'capitalize', icons: 'none' },
      photo: { show: true, shape: 'circle', size: 82, border: true, borderColor: '#fbcfe8' },
      links: { underline: true, showIcons: false, color: '#be185d' },
      footer: { show: false, content: '' },
      dateFormat: 'MMM YYYY',
      pageFormat: 'A4',
    },
  },
];
