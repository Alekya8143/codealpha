import React, { useState, useEffect } from "react";
import "./App.css";

const quotes = [
  {
    text: "Success is not final, failure is not fatal.",
    author: "Winston Churchill"
  },
  {
    text: "Stay hungry, stay foolish.",
    author: "Steve Jobs"
  },
  {
    text: "Dream big and dare to fail.",
    author: "Norman Vaughan"
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt"
  },
  {
    text: "Love is composed of a single soul inhabiting two bodies.",
    author: "	Aristotle"
  },
  {
    text: "Where there is love there is life.",
    author: "Mahatma Gandhi"
  },
];

function App() {
  const [quote, setQuote] = useState({});

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  };

  // Show random quote when app loads
  useEffect(() => {
    getRandomQuote();
  }, []);

  return (
    <div className="container">
      <div className="quote-card">
        <h2 className="quote-text">"{quote.text}"</h2>
        <p className="quote-author">— {quote.author}</p>

        <button className="btn" onClick={getRandomQuote}>
          New Quote
        </button>
      </div>
    </div>
  );
}

export default App;
