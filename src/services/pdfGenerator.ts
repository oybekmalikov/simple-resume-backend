import puppeteer from 'puppeteer';
const SVG_ICONS = {
  email: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -2px; margin-right: 5px; opacity: 0.85;"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
  phone: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -2px; margin-right: 5px; opacity: 0.85;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  location: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -2px; margin-right: 5px; opacity: 0.85;"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
  globe: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -2px; margin-right: 5px; opacity: 0.85;"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`,
  linkedin: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -2px; margin-right: 5px; opacity: 0.85;"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>`,
  github: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -2px; margin-right: 5px; opacity: 0.85;"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>`,
  nationality: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -2px; margin-right: 5px; opacity: 0.85;"><circle cx="12" cy="12" r="10"/><path d="m2 12 5.1 2.8L6 20l3.4-1.6L12 22l2.6-3.6L18 20l-1.1-5.2L22 12l-5.1-2.8L18 4l-3.4 1.6L12 2 9.4 5.6 6 4l1.1 5.2z"/></svg>`,
  calendar: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -2px; margin-right: 5px; opacity: 0.85;"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>`,
  clock: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -2px; margin-right: 5px; opacity: 0.85;"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  link: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -2px; margin-right: 5px; opacity: 0.85;"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
};

interface PersonalInfo {
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
  nationality?: string;
  dateOfBirth?: string;
  visa?: string;
  passport?: string;
  availability?: string;
  photo?: string;
  customFields?: Array<{ id: string; label: string; value: string }>;
}

interface ResumeData {
  personalInfo: PersonalInfo;
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
  skills: Array<{ id: string; name: string; level: string; category: string }>;
  languages: Array<{ id: string; name: string; level: string }>;
  certificates: Array<{ id: string; name: string; issuer: string; date: string; url: string }>;
  interests: Array<{ id: string; name: string }>;
  projects?: Array<{
    id: string;
    name: string;
    role: string;
    startDate: string;
    endDate: string;
    current: boolean;
    url: string;
    description: string;
    highlights: string[];
  }>;
  courses?: Array<{ id: string; name: string; institution: string; date: string; url: string }>;
  awards?: Array<{ id: string; title: string; issuer: string; date: string; description: string }>;
  organisations?: Array<{ id: string; name: string; role: string; startDate: string; endDate: string; current: boolean; description: string }>;
  publications?: Array<{ id: string; title: string; publisher: string; date: string; url: string; description: string }>;
  references?: Array<{ id: string; name: string; company: string; position: string; email: string; phone: string; relationship: string }>;
  declaration?: { content: string; date: string; place: string; signatureText: string };
  customSections?: Array<{ id: string; title: string; items: Array<{ id: string; title: string; subtitle: string; date: string; description: string }> }>;
  activeSections?: string[];
  sectionOrder?: string[];
}

export interface CoverLetterData {
  senderName: string;
  senderTitle: string;
  senderEmail: string;
  senderPhone: string;
  senderAddress: string;
  date: string;
  recipientName: string;
  recipientTitle: string;
  companyName: string;
  companyAddress: string;
  salutation: string;
  openingParagraph: string;
  bodyParagraphs: string[];
  closingParagraph: string;
  closing: string;
  signatureName: string;
}

export interface CoverLetterConfig {
  templateId: string;
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
  headerStyle: 'classic' | 'modern' | 'minimal' | 'sidebar' | 'banner' | 'centered' | 'elegant' | 'corporate';
  pageFormat: string;
}

interface TemplateConfig {
  templateId?: string;
  layout: {
    columns: 1 | 2;
    sidebarPosition?: 'left' | 'right';
    columnWidthRatio?: number;
    headerPosition?: 'top' | 'sidebar' | 'centered' | 'banner';
    sidebarBg?: string;
    sidebarText?: string;
  };
  fonts: {
    body: string;
    heading: string;
    size: { name: number; sectionTitle: number; body: number; small: number };
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
  footer?: {
    show: boolean;
    content: string;
  };
  dateFormat: string;
  pageFormat: string;
}

function formatDate(date: string, format: string): string {
  if (!date) return '';
  const parts = date.split('-');
  const year = parts[0];
  const month = parts[1] || '01';
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthFull = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const m = parseInt(month, 10) - 1;

  switch (format) {
    case 'MM/YYYY': return `${month}/${year}`;
    case 'YYYY-MM': return `${year}-${month}`;
    case 'YYYY/MM': return `${year}/${month}`;
    case 'DD/MM/YYYY': return `${parts[2] || '01'}/${month}/${year}`;
    case 'MMMM YYYY': return `${monthFull[m] || month} ${year}`;
    case 'MMM YYYY':
    default: return `${monthNames[m] || month} ${year}`;
  }
}

function renderHeadingHtml(title: string, config: TemplateConfig, isSidebar = false): string {
  const color = isSidebar && config.colors.sidebarText ? config.colors.primary : config.colors.primary;
  const textColor = isSidebar && config.colors.sidebarText ? config.colors.sidebarText : config.colors.text;
  const text = config.headings.capitalization === 'uppercase' ? title.toUpperCase() : title;
  const fontSize = config.fonts.size.sectionTitle;

  const base = `font-family: '${config.fonts.heading}', sans-serif; font-size: ${fontSize}px; font-weight: 700; margin: 0 0 ${config.spacing.itemGap}px 0; letter-spacing: ${config.headings.capitalization === 'uppercase' ? '0.06em' : '0'};`;

  switch (config.headings.style) {
    case 'underline':
      return `<div style="${base} color: ${color}; padding-bottom: 3px; border-bottom: 2px solid ${color};">${text}</div>`;
    case 'background':
      return `<div style="${base} background: ${color}; color: #ffffff; padding: 4px 8px; border-radius: 3px;">${text}</div>`;
    case 'border-left':
      return `<div style="${base} color: ${color}; padding-left: 8px; border-left: 3px solid ${color};">${text}</div>`;
    case 'pill':
      return `<div style="${base} display: inline-block; background: ${color}15; color: ${color}; padding: 3px 10px; border-radius: 12px;">${text}</div>`;
    case 'accent-dot':
      return `<div style="${base} color: ${textColor}; display: flex; align-items: center; gap: 6px;"><span style="width: 8px; height: 8px; border-radius: 50%; background: ${color}; display: inline-block;"></span>${text}</div>`;
    case 'simple':
    default:
      return `<div style="${base} color: ${color};">${text}</div>`;
  }
}

function buildHtmlDocument(data: ResumeData, config: TemplateConfig): string {
  const p = data.personalInfo || ({} as PersonalInfo);
  const fullName = `${p.firstName || ''} ${p.lastName || ''}`.trim() || 'Your Name';
  const isTwoCol = config.layout.columns === 2;
  const sidebarSide = config.layout.sidebarPosition || 'left';
  const sidebarBg = config.colors.sidebarBg || (config.layout.sidebarBg || '#f8fafc');
  const sidebarText = config.colors.sidebarText || (config.layout.sidebarText || config.colors.text);
  const sidebarRatio = config.layout.columnWidthRatio || 0.34;
  const mainRatio = 1 - sidebarRatio;

  const contacts = [
    p.email ? `<span>${SVG_ICONS.email}${p.email}</span>` : '',
    p.phone ? `<span>${SVG_ICONS.phone}${p.phone}</span>` : '',
    [p.city, p.country].filter(Boolean).join(', ') ? `<span>${SVG_ICONS.location}${[p.city, p.country].filter(Boolean).join(', ')}</span>` : '',
    p.website ? `<span>${SVG_ICONS.globe}<a href="${p.website}" style="color: inherit; text-decoration: none;">${p.website.replace(/^https?:\/\//, '')}</a></span>` : '',
    p.linkedin ? `<span>${SVG_ICONS.linkedin}<a href="https://${p.linkedin}" style="color: inherit; text-decoration: none;">${p.linkedin}</a></span>` : '',
    p.github ? `<span>${SVG_ICONS.github}<a href="https://${p.github}" style="color: inherit; text-decoration: none;">${p.github}</a></span>` : '',
    p.nationality ? `<span>${SVG_ICONS.nationality}${p.nationality}</span>` : '',
    p.dateOfBirth ? `<span>${SVG_ICONS.calendar}${p.dateOfBirth}</span>` : '',
    p.availability ? `<span>${SVG_ICONS.clock}${p.availability}</span>` : '',
    ...(p.customFields || []).map(cf => `<span><strong>${cf.label}:</strong> ${cf.value}</span>`),
  ].filter(Boolean);

  let photoHtml = '';
  if (config.photo.show && p.photo) {
    const br = config.photo.shape === 'circle' ? '50%' : config.photo.shape === 'rounded' ? '8px' : '0px';
    photoHtml = `<img src="${p.photo}" alt="" style="width: ${config.photo.size}px; height: ${config.photo.size}px; border-radius: ${br}; object-fit: cover; ${config.photo.border ? `border: 2px solid ${config.photo.borderColor || config.colors.primary};` : ''} margin-bottom: 8px;" />`;
  }

  const activeSections = data.activeSections || [
    'personalInfo',
    'summary',
    'workExperience',
    'education',
    'skills',
    'languages',
    'certificates',
    'interests',
    'projects',
  ];

  const renderSummary = () => {
    if (!activeSections.includes('summary') || !data.summary?.content) return '';
    return `<div style="margin-bottom: ${config.spacing.sectionGap}px;">
      ${renderHeadingHtml('Summary', config)}
      <p style="margin: 0; line-height: ${config.spacing.lineHeight};">${data.summary.content}</p>
    </div>`;
  };

  const renderWork = () => {
    if (!activeSections.includes('workExperience') || !data.workExperience?.length) return '';
    const items = data.workExperience.map(exp => `
      <div style="margin-bottom: ${config.spacing.itemGap}px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <strong style="font-size: ${config.fonts.size.body + 0.5}px; color: ${config.colors.text};">${exp.position}</strong>
          <span style="font-size: ${config.fonts.size.small}px; color: ${config.colors.secondary}; flex-shrink: 0; font-weight: 500;">${formatDate(exp.startDate, config.dateFormat)} — ${exp.current ? 'Present' : formatDate(exp.endDate, config.dateFormat)}</span>
        </div>
        ${(exp.company || exp.city) ? `<div style="display: flex; justify-content: space-between; align-items: baseline; margin-top: 1px; font-size: ${config.fonts.size.small}px;"><span style="font-style: italic; color: ${config.colors.text};">${exp.company}</span>${exp.city ? `<span style="color: ${config.colors.secondary};">${exp.city}</span>` : ''}</div>` : ''}
        ${exp.description ? `<p style="margin: 3px 0 0; line-height: ${config.spacing.lineHeight};">${exp.description}</p>` : ''}
        ${exp.highlights?.filter(Boolean).length ? `<ul style="margin: 3px 0 0; padding-left: 16px; line-height: ${config.spacing.lineHeight};">${exp.highlights.filter(Boolean).map(h => `<li style="margin-bottom: 1px;">${h}</li>`).join('')}</ul>` : ''}
      </div>
    `).join('');
    return `<div style="margin-bottom: ${config.spacing.sectionGap}px;">
      ${renderHeadingHtml('Professional Experience', config)}
      ${items}
    </div>`;
  };

  const renderProjects = () => {
    if (!activeSections.includes('projects') || !data.projects?.length) return '';
    const items = data.projects.map(proj => `
      <div style="margin-bottom: ${config.spacing.itemGap}px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <div><strong style="font-size: ${config.fonts.size.body + 0.5}px;">${proj.name}</strong>${proj.role ? ` <span style="color: ${config.colors.secondary};">— ${proj.role}</span>` : ''}</div>
          <span style="font-size: ${config.fonts.size.small}px; color: ${config.colors.secondary}; flex-shrink: 0;">${formatDate(proj.startDate, config.dateFormat)} — ${proj.current ? 'Present' : formatDate(proj.endDate, config.dateFormat)}</span>
        </div>
        ${proj.url ? `<a href="${proj.url}" style="font-size: ${config.fonts.size.small}px; color: ${config.colors.primary}; text-decoration: none;">${SVG_ICONS.link}${proj.url}</a>` : ''}
        ${proj.description ? `<p style="margin: 3px 0 0; line-height: ${config.spacing.lineHeight};">${proj.description}</p>` : ''}
        ${proj.highlights?.filter(Boolean).length ? `<ul style="margin: 3px 0 0; padding-left: 16px;">${proj.highlights.filter(Boolean).map(h => `<li>${h}</li>`).join('')}</ul>` : ''}
      </div>
    `).join('');
    return `<div style="margin-bottom: ${config.spacing.sectionGap}px;">
      ${renderHeadingHtml('Key Projects', config)}
      ${items}
    </div>`;
  };

  const renderEducation = () => {
    if (!activeSections.includes('education') || !data.education?.length) return '';
    const items = data.education.map(edu => `
      <div style="margin-bottom: ${config.spacing.itemGap}px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <strong style="font-size: ${config.fonts.size.body + 0.5}px; color: ${config.colors.text};">${edu.degree}${edu.field ? ` in ${edu.field}` : ''}</strong>
          <span style="font-size: ${config.fonts.size.small}px; color: ${config.colors.secondary}; flex-shrink: 0; font-weight: 500;">${formatDate(edu.startDate, config.dateFormat)} — ${edu.current ? 'Present' : formatDate(edu.endDate, config.dateFormat)}</span>
        </div>
        ${(edu.institution || edu.city) ? `<div style="display: flex; justify-content: space-between; align-items: baseline; margin-top: 1px; font-size: ${config.fonts.size.small}px;"><span style="font-style: italic; color: ${config.colors.text};">${edu.institution}</span>${edu.city ? `<span style="color: ${config.colors.secondary};">${edu.city}</span>` : ''}</div>` : ''}
        ${edu.gpa ? `<div style="font-size: ${config.fonts.size.small}px; color: ${config.colors.secondary}; margin-top: 2px;">GPA: ${edu.gpa}</div>` : ''}
        ${edu.description ? `<p style="margin: 2px 0 0; line-height: ${config.spacing.lineHeight};">${edu.description}</p>` : ''}
      </div>
    `).join('');
    return `<div style="margin-bottom: ${config.spacing.sectionGap}px;">
      ${renderHeadingHtml('Education', config)}
      ${items}
    </div>`;
  };

  const renderSkills = (isSidebar = false) => {
    if (!activeSections.includes('skills') || !data.skills?.length) return '';
    if (isSidebar) {
      const tags = data.skills.map(s => `
        <span style="display: inline-block; background: rgba(255,255,255,0.12); color: #ffffff; padding: 2px 8px; border-radius: 4px; font-size: ${config.fonts.size.small}px; font-weight: 500; margin: 2px 4px 2px 0;">${s.name}</span>
      `).join('');
      return `<div style="margin-bottom: ${config.spacing.sectionGap}px;">
        ${renderHeadingHtml('Skills', config, isSidebar)}
        <div style="display: flex; flex-wrap: wrap;">${tags}</div>
      </div>`;
    }
    const gridItems = data.skills.map(s => `
      <div style="display: flex; align-items: center; gap: 7px; font-size: ${config.fonts.size.body}px;">
        <span style="font-size: 0.75em; color: ${config.colors.primary};">•</span>
        <span style="font-weight: 500;">${s.name}</span>
      </div>
    `).join('');
    return `<div style="margin-bottom: ${config.spacing.sectionGap}px;">
      ${renderHeadingHtml('Skills', config, isSidebar)}
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 3px 20px;">${gridItems}</div>
    </div>`;
  };

  const renderLanguages = (isSidebar = false) => {
    if (!activeSections.includes('languages') || !data.languages?.length) return '';
    if (isSidebar) {
      const items = data.languages.map(l => `
        <div style="margin-bottom: 4px; display: flex; justify-content: space-between; font-size: ${config.fonts.size.body}px;">
          <strong>${l.name}</strong>
          <span style="color: ${config.colors.secondary}; font-size: ${config.fonts.size.small}px;">${l.level}</span>
        </div>
      `).join('');
      return `<div style="margin-bottom: ${config.spacing.sectionGap}px;">
        ${renderHeadingHtml('Languages', config, isSidebar)}
        <div>${items}</div>
      </div>`;
    }
    const items = data.languages.map(l => `
      <div style="display: flex; align-items: baseline; gap: 7px; font-size: ${config.fonts.size.body}px;">
        <span style="font-size: 0.75em; color: ${config.colors.primary};">•</span>
        <span><strong>${l.name}</strong>${l.level ? ` <span style="color: ${config.colors.secondary}; font-size: ${config.fonts.size.small}px;">— ${l.level}</span>` : ''}</span>
      </div>
    `).join('');
    return `<div style="margin-bottom: ${config.spacing.sectionGap}px;">
      ${renderHeadingHtml('Languages', config, isSidebar)}
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 3px 20px;">${items}</div>
    </div>`;
  };

  const renderCertificates = (isSidebar = false) => {
    if (!activeSections.includes('certificates') || !data.certificates?.length) return '';
    if (isSidebar) {
      const items = data.certificates.map(c => `
        <div style="margin-bottom: ${config.spacing.itemGap}px;">
          <div style="display: flex; justify-content: space-between;">
            <strong>${c.name}</strong>
            ${c.date ? `<span style="font-size: ${config.fonts.size.small}px; color: ${config.colors.secondary};">${formatDate(c.date, config.dateFormat)}</span>` : ''}
          </div>
          ${c.issuer ? `<div style="font-size: ${config.fonts.size.small}px; color: ${config.colors.secondary};">${c.issuer}</div>` : ''}
        </div>
      `).join('');
      return `<div style="margin-bottom: ${config.spacing.sectionGap}px;">
        ${renderHeadingHtml('Certificates', config, isSidebar)}
        ${items}
      </div>`;
    }
    const items = data.certificates.map(c => `
      <div style="display: flex; align-items: baseline; gap: 7px; font-size: ${config.fonts.size.body}px;">
        <span style="font-size: 0.75em; color: ${config.colors.primary};">•</span>
        <div>
          <strong>${c.name}</strong>
          ${c.issuer ? `<div style="font-size: ${config.fonts.size.small}px; color: ${config.colors.secondary};">${c.issuer}</div>` : ''}
        </div>
      </div>
    `).join('');
    return `<div style="margin-bottom: ${config.spacing.sectionGap}px;">
      ${renderHeadingHtml('Certificates', config, isSidebar)}
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 3px 20px;">${items}</div>
    </div>`;
  };

  const renderCourses = (isSidebar = false) => {
    if (!activeSections.includes('courses') || !data.courses?.length) return '';
    const items = data.courses.map(c => `
      <div style="display: flex; justify-content: space-between; font-size: ${config.fonts.size.body}px;">
        <div><strong>${c.name}</strong>${c.institution ? ` <span style="color: ${config.colors.secondary};">— ${c.institution}</span>` : ''}</div>
        ${c.date ? `<span style="color: ${config.colors.secondary}; font-size: ${config.fonts.size.small}px;">${formatDate(c.date, config.dateFormat)}</span>` : ''}
      </div>
    `).join('');
    return `<div style="margin-bottom: ${config.spacing.sectionGap}px;">
      ${renderHeadingHtml('Courses', config, isSidebar)}
      <div style="display: flex; flex-direction: column; gap: ${config.spacing.itemGap}px;">${items}</div>
    </div>`;
  };

  const renderAwards = (isSidebar = false) => {
    if (!activeSections.includes('awards') || !data.awards?.length) return '';
    const items = data.awards.map(a => `
      <div style="margin-bottom: ${config.spacing.itemGap}px;">
        <div style="display: flex; justify-content: space-between;">
          <strong>${a.title}</strong>
          ${a.date ? `<span style="color: ${config.colors.secondary}; font-size: ${config.fonts.size.small}px;">${formatDate(a.date, config.dateFormat)}</span>` : ''}
        </div>
        ${a.issuer ? `<div style="font-size: ${config.fonts.size.small}px; color: ${config.colors.secondary};">${a.issuer}</div>` : ''}
        ${a.description ? `<p style="margin: 2px 0 0;">${a.description}</p>` : ''}
      </div>
    `).join('');
    return `<div style="margin-bottom: ${config.spacing.sectionGap}px;">
      ${renderHeadingHtml('Awards & Honors', config, isSidebar)}
      ${items}
    </div>`;
  };

  const renderOrganisations = (isSidebar = false) => {
    if (!activeSections.includes('organisations') || !data.organisations?.length) return '';
    const items = data.organisations.map(org => `
      <div style="margin-bottom: ${config.spacing.itemGap}px;">
        <div style="display: flex; justify-content: space-between;">
          <strong>${org.name}</strong>
          <span style="color: ${config.colors.secondary}; font-size: ${config.fonts.size.small}px;">${formatDate(org.startDate, config.dateFormat)} — ${org.current ? 'Present' : formatDate(org.endDate, config.dateFormat)}</span>
        </div>
        ${org.role ? `<div style="font-size: ${config.fonts.size.small}px; color: ${config.colors.secondary};">${org.role}</div>` : ''}
        ${org.description ? `<p style="margin: 2px 0 0;">${org.description}</p>` : ''}
      </div>
    `).join('');
    return `<div style="margin-bottom: ${config.spacing.sectionGap}px;">
      ${renderHeadingHtml('Organizations', config, isSidebar)}
      ${items}
    </div>`;
  };

  const renderPublications = () => {
    if (!activeSections.includes('publications') || !data.publications?.length) return '';
    const items = data.publications.map(pub => `
      <div style="margin-bottom: ${config.spacing.itemGap}px;">
        <div style="display: flex; justify-content: space-between;">
          <strong>${pub.title}</strong>
          ${pub.date ? `<span style="color: ${config.colors.secondary}; font-size: ${config.fonts.size.small}px;">${formatDate(pub.date, config.dateFormat)}</span>` : ''}
        </div>
        ${pub.publisher ? `<div style="font-size: ${config.fonts.size.small}px; color: ${config.colors.secondary};">${pub.publisher}</div>` : ''}
        ${pub.description ? `<p style="margin: 2px 0 0;">${pub.description}</p>` : ''}
      </div>
    `).join('');
    return `<div style="margin-bottom: ${config.spacing.sectionGap}px;">
      ${renderHeadingHtml('Publications', config)}
      ${items}
    </div>`;
  };

  const renderReferences = () => {
    if (!activeSections.includes('references') || !data.references?.length) return '';
    const items = data.references.map(r => `
      <div style="margin-bottom: ${config.spacing.itemGap}px;">
        <strong>${r.name}</strong>
        ${r.position && r.company ? `<div style="font-size: ${config.fonts.size.small}px; color: ${config.colors.secondary};">${r.position}, ${r.company}</div>` : ''}
        ${r.email ? `<div style="font-size: ${config.fonts.size.small}px;">${r.email}</div>` : ''}
        ${r.phone ? `<div style="font-size: ${config.fonts.size.small}px;">${r.phone}</div>` : ''}
      </div>
    `).join('');
    return `<div style="margin-bottom: ${config.spacing.sectionGap}px;">
      ${renderHeadingHtml('References', config)}
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: ${config.spacing.itemGap}px;">${items}</div>
    </div>`;
  };

  const renderDeclaration = () => {
    if (!activeSections.includes('declaration') || !data.declaration?.content) return '';
    return `<div style="margin-bottom: ${config.spacing.sectionGap}px;">
      ${renderHeadingHtml('Declaration', config)}
      <p style="margin: 0; font-style: italic; font-size: ${config.fonts.size.small}px;">${data.declaration.content}</p>
      ${(data.declaration.signatureText || data.declaration.date || data.declaration.place) ? `
        <div style="display: flex; justify-content: space-between; margin-top: 6px; font-size: ${config.fonts.size.small}px;">
          <span>${data.declaration.signatureText || data.declaration.place || ''}</span>
          <span>${data.declaration.date || ''}</span>
        </div>
      ` : ''}
    </div>`;
  };

  const renderInterests = (isSidebar = false) => {
    if (!activeSections.includes('interests') || !data.interests?.length) return '';
    const list = data.interests.map(i => i.name).filter(Boolean).join(' • ');
    return `<div style="margin-bottom: ${config.spacing.sectionGap}px;">
      ${renderHeadingHtml('Interests', config, isSidebar)}
      <p style="margin: 0; font-size: ${config.fonts.size.body}px;">${list}</p>
    </div>`;
  };

  const renderCustomSections = () => {
    const validSections = data.customSections?.filter(sec => activeSections.includes(sec.id));
    if (!validSections?.length) return '';
    return validSections.map(sec => `
      <div style="margin-bottom: ${config.spacing.sectionGap}px;">
        ${renderHeadingHtml(sec.title || 'Custom Section', config)}
        ${sec.items?.map(it => `
          <div style="margin-bottom: ${config.spacing.itemGap}px;">
            <div style="display: flex; justify-content: space-between;">
              <strong>${it.title}</strong>
              ${it.date ? `<span style="font-size: ${config.fonts.size.small}px; color: ${config.colors.secondary};">${it.date}</span>` : ''}
            </div>
            ${it.subtitle ? `<div style="font-size: ${config.fonts.size.small}px; color: ${config.colors.secondary};">${it.subtitle}</div>` : ''}
            ${it.description ? `<p style="margin: 2px 0 0;">${it.description}</p>` : ''}
          </div>
        `).join('')}
      </div>
    `).join('');
  };

  let bodyContent = '';

  if (isTwoCol) {
    const sidebarHtml = `
      <div style="width: ${sidebarRatio * 100}%; background: ${sidebarBg}; color: ${sidebarText}; padding: ${config.spacing.pageMargin}px 18px; box-sizing: border-box; flex-shrink: 0;">
        ${config.layout.headerPosition === 'sidebar' ? `
          <div style="text-align: center; margin-bottom: 20px;">
            ${photoHtml}
            <h1 style="font-family: '${config.fonts.heading}', sans-serif; font-size: ${config.fonts.size.name}px; font-weight: 700; margin: 0; color: ${sidebarText}; line-height: 1.2;">${fullName}</h1>
            ${p.jobTitle ? `<div style="font-size: ${config.fonts.size.sectionTitle}px; color: ${config.colors.primary}; margin-top: 4px; font-weight: 500;">${p.jobTitle}</div>` : ''}
          </div>
        ` : photoHtml ? `<div style="text-align: center; margin-bottom: 16px;">${photoHtml}</div>` : ''}

        <div style="margin-bottom: ${config.spacing.sectionGap}px;">
          ${renderHeadingHtml('Contact Details', config, true)}
          <div style="display: flex; flex-direction: column; gap: 6px; font-size: ${config.fonts.size.small}px; color: ${sidebarText}; opacity: 0.9;">
            ${contacts.join('')}
          </div>
        </div>

        ${renderSkills(true)}
        ${renderLanguages(true)}
        ${renderCertificates(true)}
        ${renderCourses(true)}
        ${renderAwards(true)}
        ${renderOrganisations(true)}
        ${renderInterests(true)}
      </div>
    `;

    const mainHtml = `
      <div style="width: ${mainRatio * 100}%; padding: ${config.spacing.pageMargin}px 24px; box-sizing: border-box; flex: 1;">
        ${config.layout.headerPosition !== 'sidebar' ? `
          <div style="margin-bottom: ${config.spacing.sectionGap}px;">
            <h1 style="font-family: '${config.fonts.heading}', sans-serif; font-size: ${config.fonts.size.name}px; font-weight: 700; margin: 0; color: ${config.colors.text}; line-height: 1.2;">${fullName}</h1>
            ${p.jobTitle ? `<div style="font-size: ${config.fonts.size.sectionTitle}px; color: ${config.colors.primary}; margin-top: 4px; font-weight: 500;">${p.jobTitle}</div>` : ''}
          </div>
        ` : ''}

        ${renderSummary()}
        ${renderWork()}
        ${renderProjects()}
        ${renderEducation()}
        ${renderPublications()}
        ${renderReferences()}
        ${renderDeclaration()}
        ${renderCustomSections()}
      </div>
    `;

    bodyContent = `
      <div style="display: flex; min-height: 100vh;">
        ${sidebarSide === 'left' ? sidebarHtml + mainHtml : mainHtml + sidebarHtml}
      </div>
    `;
  } else {
    const isCentered = config.layout.headerPosition === 'centered';
    const headerHtml = `
      <div style="margin-bottom: ${config.spacing.sectionGap}px; ${isCentered ? 'text-align: center;' : ''}">
        <div style="display: flex; ${isCentered ? 'flex-direction: column; align-items: center;' : 'align-items: center;'} gap: 16px;">
          ${photoHtml}
          <div>
            <h1 style="font-family: '${config.fonts.heading}', sans-serif; font-size: ${config.fonts.size.name}px; font-weight: 700; margin: 0; color: ${config.colors.text}; line-height: 1.2;">${fullName}</h1>
            ${p.jobTitle ? `<div style="font-size: ${config.fonts.size.sectionTitle}px; color: ${config.colors.primary}; margin-top: 4px; font-weight: 500;">${p.jobTitle}</div>` : ''}
            ${contacts.length ? `<div style="display: flex; flex-wrap: wrap; ${isCentered ? 'justify-content: center;' : ''} gap: 6px 12px; margin-top: 8px; font-size: ${config.fonts.size.small}px; color: ${config.colors.secondary};">${contacts.join('')}</div>` : ''}
          </div>
        </div>
      </div>
    `;

    bodyContent = `
      <div style="padding: ${config.spacing.pageMargin}px; box-sizing: border-box;">
        ${headerHtml}
        ${renderSummary()}
        ${renderWork()}
        ${renderProjects()}
        ${renderEducation()}
        ${renderSkills(false)}
        ${renderLanguages(false)}
        ${renderCertificates(false)}
        ${renderCourses(false)}
        ${renderAwards(false)}
        ${renderOrganisations(false)}
        ${renderPublications()}
        ${renderReferences()}
        ${renderInterests(false)}
        ${renderDeclaration()}
        ${renderCustomSections()}
      </div>
    `;
  }

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link href="https://fonts.googleapis.com/css2?family=${encodeURIComponent(config.fonts.body || 'Inter')}:wght@300;400;500;600;700&family=${encodeURIComponent(config.fonts.heading || 'Plus Jakarta Sans')}:wght@400;500;600;700;800&family=Playfair+Display:wght@600;700&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: '${config.fonts.body}', sans-serif;
      font-size: ${config.fonts.size.body}px;
      color: ${config.colors.text};
      background: ${config.colors.background};
      line-height: ${config.spacing.lineHeight};
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
  </style>
</head>
<body>
  ${bodyContent}
</body>
</html>`;
}

export async function generatePdf(
  resumeData: ResumeData,
  templateConfig: TemplateConfig
): Promise<Buffer> {
  const html = buildHtmlDocument(resumeData, templateConfig);
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'domcontentloaded' });
    const format = (templateConfig.pageFormat === 'Letter' ? 'Letter' : 'A4') as any;
    const pdfUint8Array = await page.pdf({
      format,
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
    });
    return Buffer.from(pdfUint8Array);
  } finally {
    await browser.close();
  }
}

export async function generatePreviewImage(
  resumeData: ResumeData,
  templateConfig: TemplateConfig
): Promise<Buffer> {
  const html = buildHtmlDocument(resumeData, templateConfig);
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 }); // A4 at 96 DPI * 2
    await page.setContent(html, { waitUntil: 'domcontentloaded' });
    const screenshot = await page.screenshot({
      type: 'png',
      fullPage: false,
    });
    return Buffer.from(screenshot);
  } finally {
    await browser.close();
  }
}

function buildCoverLetterHtml(data: CoverLetterData, config: CoverLetterConfig): string {
  const margin = config.spacing.pageMargin;
  const lineHeight = config.spacing.lineHeight;
  const paraGap = config.spacing.paragraphGap;
  const bodyParagraphs = data.bodyParagraphs.filter(Boolean).map(p =>
    `<p style="margin: 0 0 ${paraGap}px 0; line-height: ${lineHeight}; text-align: justify;">${p}</p>`
  ).join('');

  const senderContactLine = [
    data.senderEmail ? `<span>${SVG_ICONS.email}${data.senderEmail}</span>` : '',
    data.senderPhone ? `<span>${SVG_ICONS.phone}${data.senderPhone}</span>` : '',
    data.senderAddress ? `<span>${SVG_ICONS.location}${data.senderAddress}</span>` : '',
  ].filter(Boolean).join('<span style="margin: 0 8px; color: #cbd5e1;">|</span>');

  let headerHtml = '';

  switch (config.headerStyle) {
    case 'banner':
      headerHtml = `
        <div style="background: ${config.colors.headerBg}; color: ${config.colors.headerText}; padding: 28px ${margin}px; margin: -${margin}px -${margin}px ${margin}px -${margin}px;">
          <h1 style="font-family: '${config.fonts.heading}', sans-serif; font-size: ${config.fonts.size.name}px; font-weight: 700; margin: 0; line-height: 1.2;">${data.senderName}</h1>
          ${data.senderTitle ? `<div style="font-size: ${config.fonts.size.body + 1}px; margin-top: 4px; opacity: 0.9; font-weight: 500;">${data.senderTitle}</div>` : ''}
          <div style="display: flex; flex-wrap: wrap; gap: 8px 16px; margin-top: 10px; font-size: ${config.fonts.size.small}px; opacity: 0.85;">${senderContactLine}</div>
        </div>
      `;
      break;
    case 'sidebar':
      headerHtml = `
        <div style="background: ${config.colors.headerBg}; color: ${config.colors.headerText}; padding: 20px; margin: -${margin}px -${margin}px ${margin}px -${margin}px; display: flex; align-items: center; gap: 20px;">
          <div style="width: 52px; height: 52px; border-radius: 50%; background: ${config.colors.accent}; display: flex; align-items: center; justify-content: center; font-family: '${config.fonts.heading}', sans-serif; font-size: 20px; font-weight: 700; color: white;">${(data.senderName || 'U').charAt(0)}</div>
          <div>
            <h1 style="font-family: '${config.fonts.heading}', sans-serif; font-size: ${config.fonts.size.name}px; font-weight: 700; margin: 0;">${data.senderName}</h1>
            ${data.senderTitle ? `<div style="font-size: ${config.fonts.size.small + 1}px; margin-top: 2px; opacity: 0.85;">${data.senderTitle}</div>` : ''}
          </div>
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 6px 14px; margin-bottom: ${paraGap}px; font-size: ${config.fonts.size.small}px; color: ${config.colors.text};">${senderContactLine}</div>
      `;
      break;
    case 'modern':
      headerHtml = `
        <div style="border-bottom: 3px solid ${config.colors.primary}; padding-bottom: 16px; margin-bottom: ${paraGap}px;">
          <h1 style="font-family: '${config.fonts.heading}', sans-serif; font-size: ${config.fonts.size.name}px; font-weight: 700; margin: 0; color: ${config.colors.primary};">${data.senderName}</h1>
          ${data.senderTitle ? `<div style="font-size: ${config.fonts.size.body + 1}px; color: ${config.colors.text}; margin-top: 4px; font-weight: 500;">${data.senderTitle}</div>` : ''}
          <div style="display: flex; flex-wrap: wrap; gap: 6px 14px; margin-top: 8px; font-size: ${config.fonts.size.small}px; color: #64748b;">${senderContactLine}</div>
        </div>
      `;
      break;
    case 'minimal':
      headerHtml = `
        <div style="margin-bottom: ${paraGap}px;">
          <h1 style="font-family: '${config.fonts.heading}', sans-serif; font-size: ${config.fonts.size.name}px; font-weight: 700; margin: 0; color: ${config.colors.text};">${data.senderName}</h1>
          <div style="display: flex; flex-wrap: wrap; gap: 6px 14px; margin-top: 6px; font-size: ${config.fonts.size.small}px; color: #64748b;">${senderContactLine}</div>
        </div>
      `;
      break;
    case 'centered':
      headerHtml = `
        <div style="text-align: center; margin-bottom: ${paraGap}px; border-bottom: 1px solid #e2e8f0; padding-bottom: 16px;">
          <h1 style="font-family: '${config.fonts.heading}', sans-serif; font-size: ${config.fonts.size.name}px; font-weight: 700; margin: 0; color: ${config.colors.text};">${data.senderName}</h1>
          ${data.senderTitle ? `<div style="font-size: ${config.fonts.size.body + 1}px; color: ${config.colors.primary}; margin-top: 4px;">${data.senderTitle}</div>` : ''}
          <div style="display: flex; flex-wrap: wrap; gap: 6px 14px; margin-top: 8px; font-size: ${config.fonts.size.small}px; color: #64748b; justify-content: center;">${senderContactLine}</div>
        </div>
      `;
      break;
    case 'elegant':
      headerHtml = `
        <div style="border-left: 4px solid ${config.colors.primary}; padding-left: 16px; margin-bottom: ${paraGap}px;">
          <h1 style="font-family: '${config.fonts.heading}', serif; font-size: ${config.fonts.size.name}px; font-weight: 700; margin: 0; color: ${config.colors.text}; letter-spacing: 0.02em;">${data.senderName}</h1>
          ${data.senderTitle ? `<div style="font-size: ${config.fonts.size.body + 1}px; color: ${config.colors.primary}; margin-top: 4px; font-style: italic;">${data.senderTitle}</div>` : ''}
          <div style="display: flex; flex-wrap: wrap; gap: 6px 14px; margin-top: 8px; font-size: ${config.fonts.size.small}px; color: #64748b;">${senderContactLine}</div>
        </div>
      `;
      break;
    case 'corporate':
      headerHtml = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: ${paraGap}px; border-bottom: 2px solid ${config.colors.primary}; padding-bottom: 14px;">
          <div>
            <h1 style="font-family: '${config.fonts.heading}', sans-serif; font-size: ${config.fonts.size.name}px; font-weight: 700; margin: 0; color: ${config.colors.text};">${data.senderName}</h1>
            ${data.senderTitle ? `<div style="font-size: ${config.fonts.size.body + 1}px; color: ${config.colors.primary}; margin-top: 3px; font-weight: 600;">${data.senderTitle}</div>` : ''}
          </div>
          <div style="text-align: right; font-size: ${config.fonts.size.small}px; color: #64748b; line-height: 1.6;">
            ${data.senderEmail ? `<div>${SVG_ICONS.email}${data.senderEmail}</div>` : ''}
            ${data.senderPhone ? `<div>${SVG_ICONS.phone}${data.senderPhone}</div>` : ''}
            ${data.senderAddress ? `<div>${SVG_ICONS.location}${data.senderAddress}</div>` : ''}
          </div>
        </div>
      `;
      break;
    case 'classic':
    default:
      headerHtml = `
        <div style="margin-bottom: ${paraGap}px;">
          <h1 style="font-family: '${config.fonts.heading}', sans-serif; font-size: ${config.fonts.size.name}px; font-weight: 700; margin: 0; color: ${config.colors.text};">${data.senderName}</h1>
          ${data.senderTitle ? `<div style="font-size: ${config.fonts.size.body + 1}px; color: ${config.colors.primary}; margin-top: 4px; font-weight: 500;">${data.senderTitle}</div>` : ''}
          <div style="display: flex; flex-wrap: wrap; gap: 6px 14px; margin-top: 8px; font-size: ${config.fonts.size.small}px; color: #64748b;">${senderContactLine}</div>
          <div style="height: 1px; background: #e2e8f0; margin-top: 14px;"></div>
        </div>
      `;
      break;
  }

  const recipientBlock = (data.recipientName || data.companyName) ? `
    <div style="margin-bottom: ${paraGap}px; font-size: ${config.fonts.size.body}px; color: ${config.colors.text}; line-height: 1.6;">
      ${data.recipientName ? `<div style="font-weight: 600;">${data.recipientName}</div>` : ''}
      ${data.recipientTitle ? `<div>${data.recipientTitle}</div>` : ''}
      ${data.companyName ? `<div style="font-weight: 500;">${data.companyName}</div>` : ''}
      ${data.companyAddress ? `<div style="color: #64748b;">${data.companyAddress}</div>` : ''}
    </div>
  ` : '';

  const dateBlock = data.date ? `<div style="margin-bottom: ${paraGap}px; font-size: ${config.fonts.size.body}px; color: #64748b;">${data.date}</div>` : '';

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link href="https://fonts.googleapis.com/css2?family=${encodeURIComponent(config.fonts.body || 'Inter')}:wght@300;400;500;600;700&family=${encodeURIComponent(config.fonts.heading || 'Plus Jakarta Sans')}:wght@400;500;600;700;800&family=Playfair+Display:wght@400;600;700&family=Merriweather:wght@400;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: '${config.fonts.body}', sans-serif;
      font-size: ${config.fonts.size.body}px;
      color: ${config.colors.text};
      background: ${config.colors.background};
      line-height: ${config.spacing.lineHeight};
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
  </style>
</head>
<body>
  <div style="padding: ${margin}px; box-sizing: border-box; min-height: 100vh;">
    ${headerHtml}
    ${dateBlock}
    ${recipientBlock}
    ${data.salutation ? `<p style="margin: 0 0 ${paraGap}px 0; font-weight: 500;">${data.salutation}</p>` : ''}
    ${data.openingParagraph ? `<p style="margin: 0 0 ${paraGap}px 0; line-height: ${lineHeight}; text-align: justify;">${data.openingParagraph}</p>` : ''}
    ${bodyParagraphs}
    ${data.closingParagraph ? `<p style="margin: 0 0 ${paraGap}px 0; line-height: ${lineHeight}; text-align: justify;">${data.closingParagraph}</p>` : ''}
    ${data.closing ? `<p style="margin: ${paraGap * 1.5}px 0 4px 0; font-weight: 500;">${data.closing}</p>` : ''}
    ${data.signatureName ? `<p style="margin: 0; font-weight: 600; color: ${config.colors.primary}; font-size: ${config.fonts.size.body + 1}px;">${data.signatureName}</p>` : ''}
  </div>
</body>
</html>`;
}

export async function generateCoverLetterPdf(
  data: CoverLetterData,
  config: CoverLetterConfig
): Promise<Buffer> {
  const html = buildCoverLetterHtml(data, config);
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'domcontentloaded' });
    const format = (config.pageFormat === 'Letter' ? 'Letter' : 'A4') as any;
    const pdfUint8Array = await page.pdf({
      format,
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
    });
    return Buffer.from(pdfUint8Array);
  } finally {
    await browser.close();
  }
}

export async function generateCoverLetterPreview(
  data: CoverLetterData,
  config: CoverLetterConfig
): Promise<Buffer> {
  const html = buildCoverLetterHtml(data, config);
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
    await page.setContent(html, { waitUntil: 'domcontentloaded' });
    const screenshot = await page.screenshot({
      type: 'png',
      fullPage: false,
    });
    return Buffer.from(screenshot);
  } finally {
    await browser.close();
  }
}

