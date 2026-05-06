# 🎓 Amaanitvam Foundation: The Future of Internship Management

[![Selection Round Project](https://img.shields.io/badge/Selection-Round%20Submission-blueviolet?style=for-the-badge)](https://github.com/krish/amaanitvam-portal)
[![MERN Stack](https://img.shields.io/badge/Stack-MERN-green?style=for-the-badge)](https://mongodb.com)

> **A premium, high-performance portal bridging the gap between ambitious students and industry-leading employers.**

---

## 🎯 The Problem
Finding and managing internships is often a fragmented and chaotic process. Students struggle with opaque application statuses, while employers are overwhelmed by unorganized submissions and rigid management tools.

## 💡 Our Solution
**Amaanitvam Foundation** is a centralized, state-of-the-art platform designed to streamline the entire internship lifecycle. With a focus on **UX Excellence** and **Technical Scalability**, we provide a professional environment where opportunities meet talent seamlessly.

---

## ✨ Key Highlights

### 🚀 For Students (The Talent)
*   **Dynamic Discovery**: Real-time search and smart filtering to find the perfect role.
*   **One-Click Applications**: Seamlessly apply with persistent profiles and secure resume uploads.
*   **Live Status Tracking**: Transparent pipeline showing exactly where you stand (Test, Shortlisted, Selected, etc.).
*   **Premium UI**: A clean, modern interface designed for focus and productivity.

### 🏢 For Employers (The Recruiters)
*   **Comprehensive Command Center**: A unified dashboard to manage multiple internship postings.
*   **Applicant Pipeline**: Manage the entire recruitment funnel from a single, intuitive interface.
*   **One-Click Status Management**: Move candidates through the pipeline with optimized UI updates.
*   **Cross-Platform Document Handling**: Integrated PDF viewing with high-compatibility path resolution.

---

## 🛠️ Technical Architecture

### Core Technologies
- **Frontend**: `React 19` (Vite) for blazing-fast performance.
- **Styling**: `Tailwind CSS` for a bespoke, premium design system.
- **Backend**: `Node.js` & `Express.js` for a robust RESTful API.
- **Database**: `MongoDB` (Mongoose) for flexible, scalable data modeling.
- **Security**: `JWT` + `Bcrypt.js` for industry-standard authentication.
- **Media**: `Multer` for secure, optimized file handling.

---

## ⚙️ Quick Start

### 1. Environment Configuration
**Backend (`backend/.env`):**
```env
PORT=5000
# Example MongoDB Atlas URI
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/vantage_db?retryWrites=true&w=majority
JWT_SECRET=your_secure_secret_key
```

**Frontend (`frontend/.env`):**
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### 2. Installation & Launch
```bash
# Install dependencies for both environments
cd backend && npm install
cd ../frontend && npm install

# Start the Backend Engine
cd ../backend && npm start

# Start the Frontend Experience
cd ../frontend && npm run dev
```

---

## 📁 Project Blueprint

```text
├── backend/
│   ├── controllers/      # Business logic & API handlers
│   ├── middleware/       # Role-based access control (RBAC)
│   ├── models/           # Scalable Data Schemas
│   ├── routes/           # RESTful API Endpoints
│   └── uploads/          # Secure document storage
└── frontend/
    ├── src/
    │   ├── components/   # Reusable Atomic UI Components
    │   ├── pages/        # High-fidelity View Layers
    │   ├── services/     # Modular API integration
    │   └── assets/       # Optimized media resources
```

---

## 🤝 Conclusion
Amaanitvam Foundation is more than just a task tracker; it's a professional-grade tool built with the future of work in mind. Created for the **Selection Round**, this project demonstrates technical proficiency in full-stack development, UI/UX design, and complex state management.

---
*Developed with ❤️ for the Selection Round.*
