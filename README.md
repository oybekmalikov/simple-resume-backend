# ⚙️ Simple Resume — Backend API & PDF Rendering Service

Node.js, Express, and Puppeteer service providing high-resolution PDF generation, template registries, and AI integrations (Gemini).

---

## 🛠 Tech Stack

- **Runtime**: Node.js 18+ (ES Modules)
- **Framework**: Express.js + TypeScript
- **PDF Engine**: Headless Chromium (Puppeteer)
- **AI Integration**: Google Gemini 1.5 Flash API with smart local fallbacks

---

## 🔌 API Endpoints

### 📄 Resume PDF & Preview
- `POST /api/pdf/generate` — Generate downloadable A4 PDF resume
- `POST /api/pdf/preview-image` — Generate high-resolution PNG preview image

### ✉️ Cover Letter API
- `GET /api/cover-letter/templates` — List 8 Cover Letter templates
- `POST /api/cover-letter/generate` — Generate Cover Letter PDF
- `POST /api/cover-letter/preview-image` — Generate Cover Letter PNG preview

### 🤖 AI Endpoints
- `POST /api/ai/generate` — Generate summary, improve experience, draft cover letters, check spelling, translate, or score ATS
- `POST /api/ai/suggest-skills` — Return top 10 recommended skills for a given job title

### 🎨 Templates & Utilities
- `GET /api/templates` — List all 14 Resume templates
- `GET /api/health` — Service health check

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Setup environment
cp .env.example .env
# Set PORT=3001, AI_PROVIDER=gemini, GEMINI_API_KEY=...

# 3. Start development
npm run dev

# 4. Build TypeScript
npm run build
```

---

## 🐳 Deployment (Render / Docker)

Use the included `backend/Dockerfile` which automatically installs all system Chromium dependencies for Puppeteer.
Set environment variables:
- `PORT=3001`
- `NODE_ENV=production`
- `GEMINI_API_KEY=your_key`
