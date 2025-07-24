# Stunning Technical Challenge

## Objective
Demonstrate debugging, clean architecture, critical thinking, and use of AI-powered development tools (Cursor).

## Tech Stack
- **Frontend:** Next.js (App Router)
- **Backend:** NestJS
- **Database:** MongoDB (Mongoose)
- **AI Tooling:** Cursor & GitHub Copilot

---

##  Task Overview

A simple idea-to-preview flow:
1. User submits a website idea via a form in **Next.js**.
2. The idea is sent to a **NestJS API**.
3. The API responds with **3 dummy sections** (e.g., "Hero", "About", "Contact").
4. These sections are stored in **MongoDB**.
5. Fetched sections are then rendered as a **preview**.
6. Includes **loading states** and **basic error handling**.

---

## 📁 Project Structure

```bash
📦 root/
├── frontend/            
│   └── app/             
       
├── backend/             
│   └── src/
│       └── ideas/       
│       └── app.module.ts
│   └── tests/                 

##  Setup Instructions 

### 1. Clone the Repo 
```bash
git clone https://github.com/Muawia24/webidea-generator.git
cd stunning-challenge

### 2. Setup Backend  
```bash
cd backend
npm install
npm run start:dev
```

### 3. Setup Frontend  
```bash
cd ../frontend
npm install
npm run dev
```