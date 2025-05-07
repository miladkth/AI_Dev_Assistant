import React, { useState, useEffect, useRef } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("dark-mode") === "true";
  });

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [dbHistory, setDbHistory] = useState<{ id: number; question: string; created_at: string }[]>([]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("dark-mode", String(darkMode));
  }, [darkMode]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    fetch('http://localhost:3001/api/history')
      .then(res => res.json())
      .then(setDbHistory)
      .catch(() => setDbHistory([]));
  };

  const askQuestion = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setAnswer('');
    setError('');
    setCopied(false);

    try {
      const response = await fetch('http://localhost:3001/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();

      if (data.answer) {
        setAnswer(data.answer);
        loadHistory(); // Ladda om efter ny fråga
      } else {
        setError('Inget svar från AI:n.');
      }
    } catch {
      setError('Kunde inte kontakta servern.');
    }

    setLoading(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(answer);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleExampleClick = (text: string) => {
    setQuestion(text);
    setAnswer('');
    setError('');
    setCopied(false);
    textareaRef.current?.focus();
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm('Vill du verkligen ta bort frågan?');
    if (!confirmed) return;

    await fetch(`http://localhost:3001/api/history/${id}`, {
      method: 'DELETE',
    });

    loadHistory();
  };

  const exampleQuestions = [
    {
      id: 1,
      label: "AI inom fordonsdiagnostik",
      text: "Hur kan AI användas för att förbättra fordonens felsökning hos Scania?"
    },
    {
      id: 2,
      label: "Hållbar produktion",
      text: "Vilka AI-metoder kan bidra till en mer hållbar produktion inom fordonsindustrin?"
    },
    {
      id: 3,
      label: "Fjärrövervakning av lastbilar",
      text: "Hur kan fjärrövervakning med AI hjälpa Scania att minska driftstopp?"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-600 via-purple-700 to-pink-600 dark:from-gray-900 dark:via-gray-800 dark:to-black text-black dark:text-white p-6 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-white/20">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-yellow-400">
            AI Dev Assistant
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-xl bg-white dark:bg-gray-800 p-2 rounded-full shadow hover:scale-110 transition"
            title="Växla tema"
          >
            <i className={`fas ${darkMode ? "fa-sun" : "fa-moon"}`}></i>
          </button>
        </div>

        {/* Exempelknappar */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Exempel (Scania-relaterade):</h2>
          <div className="flex flex-wrap gap-4">
            {exampleQuestions.map(example => (
              <button
                key={example.id}
                onClick={() => handleExampleClick(example.text)}
                className="px-4 py-2 bg-gradient-to-r from-pink-500 to-yellow-400 text-white rounded-full shadow-md hover:brightness-110 transition text-sm"
              >
                {example.label}
              </button>
            ))}
          </div>
        </div>

        {/* Formulär */}
        <div className="space-y-6">
          <textarea
            ref={textareaRef}
            rows={4}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Skriv din fråga till AI:n..."
            className="w-full rounded-xl p-4 bg-white dark:bg-gray-800 text-black dark:text-white border dark:border-gray-700"
          />

          <button
            onClick={askQuestion}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold shadow-lg transition disabled:opacity-50"
          >
            {loading ? 'Tänker...' : 'Fråga AI:n'}
          </button>

          {/* Svar */}
          {answer && (
            <div className="mt-6 p-4 rounded-xl bg-pink-100 dark:bg-gray-800 text-gray-900 dark:text-white">
              <div className="flex justify-between items-center mb-2">
                <strong className="text-lg">Svar från AI:</strong>
                <button
                  onClick={handleCopy}
                  className="text-sm text-pink-600 dark:text-pink-300 hover:underline"
                >
                  {copied ? "Kopierat!" : "Kopiera"}
                </button>
              </div>
              <p className="whitespace-pre-wrap">{answer}</p>
            </div>
          )}

          {/* Historik */}
          {dbHistory.length > 0 && (
            <div className="mt-10">
              <h3 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-400 mb-4 select-none">
                📘 Senaste frågor
              </h3>

              <ul className="space-y-2 text-sm">
                {dbHistory.map((entry) => (
                  <li
                    key={entry.id}
                    className="relative bg-white/80 dark:bg-gray-800 text-black dark:text-white p-4 rounded-xl shadow border border-white/20 dark:border-gray-700"
                  >
                    <div className="font-medium mb-1 cursor-pointer hover:underline" onClick={() => handleExampleClick(entry.question)}>
                      {entry.question}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{entry.created_at}</div>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="absolute top-2 right-2 text-sm text-red-400 hover:text-red-600"
                      title="Ta bort"
                    >
                      ✖
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
