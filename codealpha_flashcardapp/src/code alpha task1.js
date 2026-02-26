import React, { useState, useEffect } from "react";

function App() {

  const [cards, setCards] = useState(
    JSON.parse(localStorage.getItem("cards")) || [
      { question: "What is React?", answer: "A JavaScript library" },
      { question: "What is HTML?", answer: "Markup language" }
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
    <div style={{ textAlign: "center", marginTop: "50px", fontFamily: "Arial" }}>
      <h1>Flashcard Quiz App</h1>

      <div
        style={{
          border: "2px solid black",
          padding: "20px",
          width: "300px",
          margin: "auto"
        }}
      >
        <h3>{cards[currentIndex].question}</h3>

        {showAnswer && <p>{cards[currentIndex].answer}</p>}

        <button onClick={() => setShowAnswer(true)}>
          Show Answer
        </button>

        <br /><br />

        <button onClick={startEdit} style={{ marginRight: "10px" }}>
          Edit Card
        </button>

        <button
          onClick={deleteCard}
          style={{ backgroundColor: "red", color: "white" }}
        >
          Delete Card
        </button>
      </div>

      <br />

      <button onClick={prevCard}>Previous</button>
      <button onClick={nextCard}>Next</button>

      <br /><br />

      <h2>{isEditing ? "Edit Card" : "Add New Card"}</h2>

      <input
        type="text"
        placeholder="Enter Question"
        value={newQuestion}
        onChange={(e) => setNewQuestion(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Enter Answer"
        value={newAnswer}
        onChange={(e) => setNewAnswer(e.target.value)}
      />

      <br /><br />

      {isEditing ? (
        <button onClick={saveEdit}>Save Changes</button>
      ) : (
        <button onClick={addCard}>Add Card</button>
      )}

    </div>
  );
}

export default App;
