import React, { useState, useEffect } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("dark-mode") === "true";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("dark-mode", String(darkMode));
  }, [darkMode]);

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
        <p className="text-gray-700 dark:text-gray-300 text-lg">
          Skriv en fråga till AI-assistenten!
        </p>
      </div>
    </div>
  );
}

export default App;
