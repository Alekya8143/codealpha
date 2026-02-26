import React, { useState, useEffect } from "react";
import "./App.css";

function App() {

  const [cards, setCards] = useState(
    JSON.parse(localStorage.getItem("cards")) || [
      { question: "What is React?", answer: "A JavaScript library for UI." },
      { question: "What is HTML?", answer: "HyperText Markup Language." },
      { question: "Which CSS property changes text color?", answer: "color." },
      { question: "How do you make text bold in CSS?", answer: "font-weight: bold;." },
      { question: "What does URL stand for?", answer: "Uniform Resource Locator." }

    ]
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify(cards));
  }, [cards]);

  const nextCard = () => {
    setCurrentIndex((currentIndex + 1) % cards.length);
    setShowAnswer(false);
  };

  const prevCard = () => {
    setCurrentIndex(
      (currentIndex - 1 + cards.length) % cards.length
    );
    setShowAnswer(false);
  };

  const addCard = () => {
    if (newQuestion && newAnswer) {
      setCards([...cards, { question: newQuestion, answer: newAnswer }]);
      setNewQuestion("");
      setNewAnswer("");
    }
  };

  const deleteCard = () => {
    if (cards.length === 1) {
      alert("You must have at least one card!");
      return;
    }

    const updatedCards = cards.filter((_, index) => index !== currentIndex);
    setCards(updatedCards);
    setCurrentIndex(0);
    setShowAnswer(false);
  };

  const startEdit = () => {
    setNewQuestion(cards[currentIndex].question);
    setNewAnswer(cards[currentIndex].answer);
    setIsEditing(true);
  };

  const saveEdit = () => {
    const updatedCards = [...cards];
    updatedCards[currentIndex] = {
      question: newQuestion,
      answer: newAnswer
    };
    setCards(updatedCards);
    setIsEditing(false);
    setNewQuestion("");
    setNewAnswer("");
  };

  return (
    <div className="app-container">
      <h1>Flashcard Quiz App</h1>

      <div className="card">
        <h3>{cards[currentIndex].question}</h3>

        {showAnswer && <p>{cards[currentIndex].answer}</p>}

        <button className="show-btn" onClick={() => setShowAnswer(true)}>
          Show Answer
        </button>

        <br /><br />

        <button className="edit-btn" onClick={startEdit}>
          Edit Card
        </button>

        <button className="delete-btn" onClick={deleteCard}>
          Delete Card
        </button>
      </div>

      <br />

      <button className="nav-btn" onClick={prevCard}>Previous</button>
      <button className="nav-btn" onClick={nextCard}>Next</button>

      <br /><br />

      <h2>
        {isEditing ? "Edit Card" : "Add New Card"}
      </h2>

      <input
        type="text"
        placeholder="Enter Question"
        value={newQuestion}
        onChange={(e) => setNewQuestion(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter Answer"
        value={newAnswer}
        onChange={(e) => setNewAnswer(e.target.value)}
      />

      <br />

      {isEditing ? (
        <button className="show-btn" onClick={saveEdit}>
          Save Changes
        </button>
      ) : (
        <button className="show-btn" onClick={addCard}>
          Add Card
        </button>
      )}
    </div>
  );
}

export default App;
