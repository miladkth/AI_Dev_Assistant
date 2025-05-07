# AI Dev Assistant

This is a fullstack developer assistant built using **TypeScript**, **React**, **Express.js**, **LangChain**, and **OpenAI API**. 
The app lets users ask technical questions and get AI-generated answers in real-time.

---

## 💡 Features

- Ask questions to an LLM (via OpenAI)
- Receive intelligent, contextual answers
- View your latest question history
- Delete individual entries
- Dark/light mode toggle
- Backend API with Express + LangChain
- SQLite database for storing queries
- Backend containerized with Docker

---

## 🧠 Tech Stack

- **Frontend:** React (TypeScript)
- **Backend:** Express (TypeScript) + LangChain
- **Database:** SQLite (via better-sqlite3)
- **LLM:** OpenAI GPT-4 (or GPT-3.5)
- **Containerization:** Docker (for backend only)

---

## 🧰 Prerequisites

- Node.js (v18 or later)
- Docker running on your system
- OpenAI API key

---

## 🛠️ Installation & Usage

### 1. Set up backend (Dockerized)

**Create `.env` file in `backend/` folder:**

```env
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxx
```

**Then run:**

```bash
docker build -t ai-backend ./backend
docker run -d -p 3001:3001 --env-file ./backend/.env --name ai-backend-container ai-backend
```

✅ Backend will now run at: `http://localhost:3001`

---

### 2. Set up frontend (locally)

```bash
cd frontend
npm install
npm start
```

Frontend will open at: `http://localhost:3000` and automatically connect to backend on port 3001.

---

## 📁 Project Structure

```
.
├── backend/             # Express + LangChain + SQLite
│   ├── ai/              # OpenAI call via LangChain
│   ├── db.ts            # SQLite DB setup
│   ├── index.ts         # Main backend server
│   └── Dockerfile       # Docker config
│
├── frontend/            # React frontend
│   ├── src/App.tsx      # Main app logic
│   ├── public/          
│   └── ...
│
└── README.md            # You are here :)
```

---

## 🚫 Ignore These

Make sure you have this in your `.gitignore` to avoid pushing unwanted files:

```
node_modules/
.env
dist/
```

---

## 💭 Thought Process

- Kept the UI clean and intuitive.
- Chose SQLite for ease and zero setup during testing.
- Docker used only for backend to isolate API & DB dependencies.
- Error handling and loading states for better UX.
- Prompts stored directly in code (per instruction – no need for Langfuse or similar).

---

## 📦 Future Improvements (if more time)

- Add Docker for frontend
- Persist all history (not just recent)
- Deploy to cloud platform
- Add support for alternative LLM providers (like Ollama)

---

## ✅ Summary

This project demonstrates a fully functional fullstack app with:

- Modular and maintainable code
- LLM integration using LangChain
- Containerized backend
- Simple and responsive UI
- SQLite query logging
- Clear setup steps in README
