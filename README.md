# Creativa Training Filter System

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)

A high-performance, enterprise-grade internal management system designed for **Creativa Innovation Hub - Mansoura**. This platform streamlines training operations, including attendance tracking, multi-day program management, candidate filtering against blacklists, automated certificate generation, and comprehensive user administration.

---

## 📖 Table of Contents

- [🚀 Overview](#-overview)
- [✨ Core Features](#-core-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🏗️ Architecture](#️-architecture)
- [📁 Project Structure](#-project-structure)
- [⚙️ Configuration & Guidelines](#️-configuration--guidelines)
- [🎭 Role-Based Access Control](#-role-based-access-control)
- [🔄 Operational Workflows](#-operational-workflows)
- [🔐 Environment Variables](#-environment-variables)
- [🚀 Getting Started](#-getting-started)
- [📝 Deployment & Security](#-deployment--security)

---

## 🚀 Overview

The **Creativa Training Filter System** is an Arabic-first, RTL-optimized web application built to eliminate manual spreadsheet overhead. It centralizes repetitive training operations into a single, cohesive interface, ensuring data integrity and operational efficiency.

### Key Value Propositions:
- **Automation**: Automated blacklist enforcement and absentee tracking.
- **Scalability**: Handles large-scale certificate generation and multi-day attendance processing.
- **Auditability**: Complete tracking of administrative actions for transparency.
- **Experience**: Premium UI with dark mode support and smooth micro-interactions.

---

## ✨ Core Features

### 📊 Operational Dashboard
Real-time overview of training health, blacklist activity, and system-wide statistics. Includes dynamic charting via Recharts and quick-action shortcuts.

### 📝 Attendance Management
- **Standard Attendance**: Intelligent comparison between registration and attendance sheets to identify absentees.
- **Multi-Day Processing**: Sophisticated logic for multi-day programs, calculating attendance thresholds and automating "pass/fail" outcomes.

### 🚫 Blacklist & Filtering
- **Smart Filtering**: Cross-reference candidate lists against the system blacklist in seconds.
- **Management Console**: Full CRUD operations for blacklisted individuals with automatic 4-month expiry cleanup.

### 📜 Certificate Engine
Bulk PDF generation from visual templates. Features a drag-and-drop preview for precise name placement, adjustable typography, and batch ZIP exporting.

### 👥 User & Audit Administration
- **Granular Permissions**: Role management for Admins, Employees, and Viewers.
- **Audit Trails**: Detailed logs of all sensitive operations, filterable by performer, action, and date range.

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 (Vanilla CSS Strategy) |
| **Authentication** | Firebase Auth |
| **Database** | Cloud Firestore |
| **Server Operations** | Firebase Admin SDK |
| **Excel Logic** | SheetJS (xlsx) |
| **PDF/Files** | jsPDF, JSZip |
| **Analytics** | Recharts |
| **Theming** | next-themes |

---

## 🏗️ Architecture

The system follows a **client-heavy architecture** for maximum responsiveness. Data processing (Excel parsing, PDF generation) happens directly in the browser to reduce server load and latency.

### Key UI Components
We utilize custom-built, highly optimized components for a premium feel:
- **`CustomSelect.tsx`**: A fully accessible, RTL-ready dropdown with keyboard navigation support.
- **`ToggleSwitch.tsx`**: A performant, animated toggle for state management and theme switching.

---

## 📁 Project Structure

```text
├── 📁 app/                     # Next.js App Router Pages & API
│   ├── 📁 admin/               # Administrative interfaces (Audit, Users)
│   ├── 📁 api/                 # Server-side API routes (User Creation)
│   ├── 📁 attendance/          # Standard attendance workflow
│   ├── 📁 blacklist/           # Blacklist management console
│   ├── 📁 certificates/        # Bulk certificate generation engine
│   ├── 📁 filter/              # Candidate list filtering
│   ├── 📁 login/               # Authentication gateway
│   ├── 📁 multi-day-attendance/ # Multi-day program logic
│   ├── 🎨 globals.css          # Global styles & Tailwind directives
│   ├── 📄 layout.tsx           # Root layout with providers
│   └── 📄 page.tsx             # Main dashboard
├── 📁 components/              # Shared UI & Logic components
│   ├── 📁 ui/                  # Atom-level custom components
│   │   ├── 📄 CustomSelect.tsx
│   │   └── 📄 ToggleSwitch.tsx
│   ├── 📄 Navbar.tsx           # Main navigation with role checks
│   ├── 📄 RouteGuard.tsx       # RBAC client-side enforcement
│   └── 📄 ThemeProvider.tsx    # Light/Dark mode orchestrator
├── 📁 context/                 # React Context (Auth State)
├── 📁 hooks/                   # Custom React hooks (useAuth, useRequireAuth)
├── 📁 lib/                     # Core logic modules & SDK wrappers
│   ├── 📄 audit.ts             # Audit logging utilities
│   ├── 📄 excel.ts             # SheetJS parsing & generation
│   ├── 📄 firebase.ts          # Client-side Firebase init
│   └── 📄 firebase-admin.ts    # Secure server-side SDK init
├── 📁 public/                  # Static assets & icons
├── 📝 AGENTS.md                # AI Agent operational guidelines
├── 📝 CLAUDE.md                # Development & Command reference
├── 📄 eslint.config.mjs        # Modern Flat Config ESLint
├── 📄 firestore.rules          # Security rules for production
├── 📄 next.config.ts           # Next.js framework configuration
├── 📄 postcss.config.mjs       # CSS processing configuration
└── 📄 proxy.ts                 # Middleware/Proxy redirect logic
```

---

## ⚙️ Configuration & Guidelines

This project maintains high standards for code quality and AI-assisted development:

- **`AGENTS.md`**: Contains critical context and rules for AI coding assistants to ensure consistency and adherence to architectural patterns.
- **`CLAUDE.md`**: A comprehensive guide for development workflows, including common commands and project-specific conventions.
- **`eslint.config.mjs`**: Implements the modern ESLint "Flat Config" for robust linting and code style enforcement.
- **`postcss.config.mjs`**: Configures the PostCSS pipeline, optimized for **Tailwind CSS v4** features.

---

## 🎭 Role-Based Access Control

| Feature | Admin | Employee | Viewer |
| :--- | :---: | :---: | :---: |
| Dashboard & Analytics | ✅ | ✅ | ✅ |
| View Blacklist | ✅ | ✅ | ✅ |
| Edit/Modify Blacklist | ✅ | ✅ | ❌ |
| Attendance Processing | ✅ | ✅ | ❌ |
| Candidate Filtering | ✅ | ✅ | ❌ |
| Certificate Generation | ✅ | ✅ | ❌ |
| User Management | ✅ | ❌ | ❌ |
| Audit Logs | ✅ | ❌ | ❌ |

---

## 🔄 Operational Workflows

> [!TIP]
> All file processing happens client-side. Ensure your Excel files use standard headers (`Name`, `National ID`) for optimal parsing.

### 1. Attendance Verification
1. Upload the **Registration Sheet** and **Attendance Sheet**.
2. The system identifies discrepancies and flags new absentees.
3. One-click addition to the blacklist for all identified absentees.

### 2. Multi-Day Programs
- Enter the program duration and minimum attendance requirement.
- Upload a single sheet containing all attendance logs.
- The system automatically aggregates records by ID and generates "Passed" and "Failed" lists.

### 3. Certificate Generation
- Upload a background template (`.png` or `.jpg`).
- Upload the recipient list.
- Drag the name preview to the desired position and adjust the font size.
- Export as a high-quality ZIP containing individual PDFs.

---

## 🔐 Environment Variables

Create a `.env.local` file in the root directory:

### Client-Side (Public)
```env
NEXT_PUBLIC_FIREBASE_API_KEY=xxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxx
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xxx
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxx
NEXT_PUBLIC_FIREBASE_APP_ID=xxx
```

### Server-Side (Admin)
```env
FIREBASE_ADMIN_PROJECT_ID=xxx
FIREBASE_ADMIN_CLIENT_EMAIL=xxx
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm / pnpm / yarn
- Firebase Project with Firestore & Auth enabled

### Installation & Run
1. **Clone the repository**:
   ```bash
   git clone https://github.com/mahmoud-el-tohamy/creativa-filter.git
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start Development Server**:
   ```bash
   npm run dev
   ```

---

## 📝 Deployment & Security

- **Middleware Redirects**: The system uses `proxy.ts` and a lightweight `auth-session` cookie for rapid redirection of unauthenticated users.
- **Firestore Rules**: Deploy `firestore.rules` to enforce data-level security. Roles are verified on every read/write.
- **Production Build**: Always run `npm run lint` and `npm run build` before deploying to ensure type safety and code quality.

---

**Built with ❤️ for Creativa Innovation Hub - Mansoura.**
