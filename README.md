<div align="center">

<img src="frontend/public/favicon.png" alt="Vidyalaya Logo" width="120" height="120" style="border-radius: 20px;"/>

# 🎓 Vidyalaya AI

### _Transform the Way You Study — Powered by Artificial Intelligence_

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

> **Vidyalaya** (విద్యాలయ) — _Sanskrit for "House of Knowledge"_  
> An AI-powered study platform that transforms any PDF into summaries, quizzes, and personalized study plans in seconds.

[🚀 Live Demo](#) &nbsp;|&nbsp; [📖 Docs](#) &nbsp;|&nbsp; [🐛 Report Bug](../../issues) &nbsp;|&nbsp; [💡 Request Feature](../../issues)

---

## 🏆 Achievement

> ### **🥉 Secured 3rd Prize — Team Varanasi**
> **"We are proud to announce that this project secured 3rd Prize at a hackathon, developed with excellence by Team Varanasi."**
> 
> *Vidyalaya AI was recognized for its exceptional innovation in educational technology, outperforming over 50 competing entries with its seamless AI-driven study workflows and premium user experience.*

---

## 📋 Table of Contents

- [🎯 Project Vision](#-project-vision)
- [🏃 Agile Methodology](#-agile-methodology)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🗄️ Database Schema](#️-database-schema)
- [🚀 Getting Started](#-getting-started)
- [📁 Project Structure](#-project-structure)
- [🔐 Environment Variables](#-environment-variables)
- [🗺️ Product Roadmap](#️-product-roadmap)
- [👥 Team](#-team)

---

## 🎯 Project Vision

Vidyalaya AI is built on a simple but powerful insight: **students shouldn't spend hours summarizing notes when AI can do it in seconds.** Our platform allows any student to upload their study material (PDF) and instantly receive:

- 📝 **AI-Generated Summaries** — Core concepts extracted and simplified
- 🧠 **Smart Quizzes** — Auto-generated questions to test understanding
- 📅 **Personalized Study Plans** — Tailored exam preparation schedules

---

## 🏃 Agile Methodology

Vidyalaya is developed following the **Agile Software Development** framework with **2-week Sprint cycles**. Below is a breakdown of our Sprints, User Stories, and Acceptance Criteria.

---

### 🗓️ Sprints Overview

```
Sprint 1 → Sprint 2 → Sprint 3 → Sprint 4 → Sprint 5 (Ongoing)
  Auth       Upload     AI Core    Quizzes    Polish &
 & Setup    & Library   Engine     & Plans     Release
```

---

### 📦 Sprint 1 — Foundation & Authentication

> _Goal: Establish the project architecture and secure user authentication._

| #     | User Story                                                                      | Priority    | Status  |
| ----- | ------------------------------------------------------------------------------- | ----------- | ------- |
| US-01 | As a student, I want to create an account so I can access my personal dashboard | 🔴 Critical | ✅ Done |
| US-02 | As a user, I want to log in securely so my study data remains private           | 🔴 Critical | ✅ Done |
| US-03 | As a user, I want my session to persist so I don't get logged out on refresh    | 🟠 High     | ✅ Done |
| US-04 | As a developer, I want a protected route system to prevent unauthorized access  | 🟠 High     | ✅ Done |

**Acceptance Criteria — US-01:**

- [x] User can register with email, full name, college/company
- [x] Password validation enforced (min 8 chars)
- [x] Successful registration redirects to Dashboard
- [x] Duplicate email shows a clear error message

---

### 📦 Sprint 2 — Document Upload & Knowledge Library

> _Goal: Enable users to upload PDFs and manage their study documents._

| #     | User Story                                                                     | Priority    | Status  |
| ----- | ------------------------------------------------------------------------------ | ----------- | ------- |
| US-05 | As a student, I want to upload a PDF so I can analyze my study material        | 🔴 Critical | ✅ Done |
| US-06 | As a student, I want a 10MB file size limit to be enforced for fast uploads    | 🟠 High     | ✅ Done |
| US-07 | As a student, I want to view all my previously uploaded documents in a Library | 🟠 High     | ✅ Done |
| US-08 | As a student, I want to delete documents I no longer need                      | 🟡 Medium   | ✅ Done |
| US-09 | As a student, I want to resume analysis on a previous document                 | 🟡 Medium   | ✅ Done |

**Definition of Done — Sprint 2:**

- PDF text is extracted using `pdfjs-dist` (up to 10 pages per document)
- Document metadata (name, size, date) is stored in `user_documents` table
- Library view displays cards with status, date and resume option
- Delete removes document and cascades to all related AI data

---

### 📦 Sprint 3 — AI Analysis Engine

> _Goal: Implement the core AI pipeline to generate study summaries from PDF text._

| #     | User Story                                                                     | Priority    | Status  |
| ----- | ------------------------------------------------------------------------------ | ----------- | ------- |
| US-10 | As a student, I want an AI summary of my uploaded document                     | 🔴 Critical | ✅ Done |
| US-11 | As a student, I want to see key concepts extracted from my notes               | 🟠 High     | ✅ Done |
| US-12 | As a student, I want the summary to be saved so I can review it later          | 🟠 High     | ✅ Done |
| US-13 | As a developer, I want the backend to gracefully handle malformed AI responses | 🟡 Medium   | ✅ Done |

**Technical Details:**

- Backend: `Express.js` → `OpenAI API (Gemini)` → JSON response
- AI prompt requests `{ summary, concepts, difficulty }` in structured JSON
- Malformed AI responses are handled with a fallback parser
- Results saved to `ai_analysis` table with FK to `user_documents`

---

### 📦 Sprint 4 — Quizzes & Study Planner

> _Goal: Extend AI capabilities to generate interactive quizzes and study plans._

| #     | User Story                                                              | Priority    | Status  |
| ----- | ----------------------------------------------------------------------- | ----------- | ------- |
| US-14 | As a student, I want AI-generated quiz questions to test my knowledge   | 🔴 Critical | ✅ Done |
| US-15 | As a student, I want each quiz question to have multiple choice options | 🟠 High     | ✅ Done |
| US-16 | As a student, I want an AI-generated exam preparation study plan        | 🟠 High     | ✅ Done |
| US-17 | As a student, I want my quiz results and plans saved for later review   | 🟡 Medium   | ✅ Done |

**API Endpoints Added:**

```http
POST /api/summarize   → AI Summary Generation
POST /api/quiz        → AI Quiz Generation
POST /api/plan        → AI Study Plan Generation
```

---

### 📦 Sprint 5 — UI Polish, Responsiveness & Performance

> _Goal: Deliver a premium, mobile-first experience across all devices._

| #     | User Story                                                                 | Priority    | Status  |
| ----- | -------------------------------------------------------------------------- | ----------- | ------- |
| US-18 | As a mobile user, I want the dashboard to work perfectly on my phone       | 🔴 Critical | ✅ Done |
| US-19 | As a tablet user, I want the sidebar to collapse and overlay smoothly      | 🟠 High     | ✅ Done |
| US-20 | As a user, I want clear, professional language throughout the app          | 🟠 High     | ✅ Done |
| US-21 | As a user, I want to see my login status reflected on the landing page CTA | 🟡 Medium   | ✅ Done |
| US-22 | As a user, I want a Rate-Limited backend to prevent abuse                  | 🟡 Medium   | ✅ Done |

---

### 📊 Sprint Velocity Chart

```
Sprint 1 ███████░░░ 70%  → Phase: Complete
Sprint 2 ██████████ 100% → Phase: Complete
Sprint 3 ██████████ 100% → Phase: Complete
Sprint 4 █████████░ 90%  → Phase: Near Complete
Sprint 5 ████████░░ 80%  → Phase: In Progress
```

---

## ✨ Features

<table>
  <tr>
    <td>📄 <strong>PDF Upload</strong></td>
    <td>Upload any study PDF (up to 10MB). Text is extracted automatically.</td>
  </tr>
  <tr>
    <td>🧠 <strong>AI Summary</strong></td>
    <td>Get a clean, concise summary of complex topics in seconds.</td>
  </tr>
  <tr>
    <td>📝 <strong>Auto Quiz</strong></td>
    <td>AI generates multiple-choice questions based on your document.</td>
  </tr>
  <tr>
    <td>📅 <strong>Study Planner</strong></td>
    <td>Receive a structured exam preparation schedule tailored to your content.</td>
  </tr>
  <tr>
    <td>📚 <strong>Knowledge Library</strong></td>
    <td>All your documents and analyses are saved for quick access anytime.</td>
  </tr>
  <tr>
    <td>📱 <strong>Fully Responsive</strong></td>
    <td>Works seamlessly on mobile, tablet, and desktop devices.</td>
  </tr>
  <tr>
    <td>🔐 <strong>Secure Auth</strong></td>
    <td>Session-based authentication with InsForge SDK (httpOnly cookies).</td>
  </tr>
</table>

---

## 🛠️ Tech Stack

### Frontend

| Technology          | Purpose                  |
| ------------------- | ------------------------ |
| **React 18**        | UI Component Framework   |
| **TypeScript**      | Type Safety              |
| **Vite**            | Build Tool & Dev Server  |
| **Tailwind CSS**    | Utility-First Styling    |
| **Framer Motion**   | Animations & Transitions |
| **pdfjs-dist**      | PDF Text Extraction      |
| **TanStack Query**  | Server State Management  |
| **React Router v6** | Client-Side Navigation   |
| **Sonner**          | Toast Notifications      |
| **Lucide React**    | Icon Library             |

### Backend

| Technology             | Purpose                   |
| ---------------------- | ------------------------- |
| **Node.js + Express**  | REST API Server           |
| **Open API**           | AI Model Gateway (Gemini) |
| **InsForge SDK**       | Database & Authentication |
| **CORS + Helmet**      | Security Middleware       |
| **express-rate-limit** | API Abuse Prevention      |
| **dotenv**             | Environment Management    |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- An [InsForge](https://insforge.app) account for database & auth
- An [OpenAI](https://openai.com) API key

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/vidyalaya.git
cd vidyalaya
```

### 2. Setup Backend

```bash
cd backend
npm install
cp .env.example .env   # Fill in your API keys
node index.js
```

### 3. Setup Frontend

```bash
cd frontend
npm install
cp .env.example .env   # Fill in your InsForge credentials
npm run dev
```

### 4. Database Setup

Run the following SQL in your InsForge dashboard:

```sql
CREATE TABLE user_documents ( ... );   -- See schema above
CREATE TABLE ai_analysis ( ... );
CREATE TABLE ai_quizzes ( ... );
CREATE TABLE ai_plans ( ... );
```

---

## 📁 Project Structure

```
vidyalaya/
├── 📁 frontend/
│   ├── 📁 src/
│   │   ├── 📁 components/       # Reusable UI components
│   │   │   ├── NavBar.tsx
│   │   │   ├── ProtectedRoute.tsx
│   │   │   └── ...
│   │   ├── 📁 pages/
│   │   │   ├── Index.tsx        # Landing Page
│   │   │   ├── Dashboard.tsx    # Main App Dashboard
│   │   │   └── Auth.tsx         # Login / Signup
│   │   ├── 📁 hooks/
│   │   │   └── useAuth.ts       # Auth state manager
│   │   └── 📁 lib/
│   │       ├── ai-service.ts    # AI API calls & DB persistence
│   │       └── insforge.ts      # Database client
│   └── 📁 public/
│       └── favicon.png
│
└── 📁 backend/
    ├── index.js                 # Express server & AI routes
    ├── .env                     # API keys (not committed)
    └── 📁 lib/
        └── insforge.js          # Server-side DB client
```

---

## 🗺️ Product Roadmap

```
✅ v1.0  — Core MVP (Auth, Upload, AI Summary)
✅ v1.1  — Quiz Generation & Study Planner
✅ v1.2  — Knowledge Library & Document Delete
✅ v1.3  — Mobile Responsiveness
🔄 v1.4  — Chat with PDF (Conversational AI)
📌 v1.5  — Collaborative Study Rooms
📌 v2.0  — Mobile App (React Native)
```

---

## 👥 Team

| Role                         | Contributor |
| ---------------------------- | ----------- |
| 👨‍💻 **Full Stack Developer**  | DV Prasad   |
| 🎨 **UI/UX Design**          | DV Prasad   |
| 🤖 **AI Integration**        | DV Prasad   |
| 🗄️ **Database Architecture** | DV Prasad   |

---

<div align="center">

### Made with ❤️ for students everywhere

_"Education is the most powerful weapon which you can use to change the world."_  
— Nelson Mandela

<br/>

⭐ **If this project helped you, please give it a star!** ⭐

[🔝 Back to Top](#-vidyalaya-ai)

</div>
