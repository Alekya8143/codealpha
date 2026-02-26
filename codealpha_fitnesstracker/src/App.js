import React, { useState, useEffect } from "react";
import "./App.css";

function App() {

  const [workouts, setWorkouts] = useState(
    JSON.parse(localStorage.getItem("workouts")) || []
  );

  const [type, setType] = useState("");
  const [duration, setDuration] = useState("");
  const [calories, setCalories] = useState("");
  const [steps, setSteps] = useState("");

  const dailyCalorieGoal = 500;

  useEffect(() => {
    localStorage.setItem("workouts", JSON.stringify(workouts));
  }, [workouts]);

  const addWorkout = () => {
    if (type && duration && calories && steps) {
      setWorkouts([
        ...workouts,
        {
          type,
          duration: Number(duration),
          calories: Number(calories),
          steps: Number(steps)
        }
      ]);
      setType("");
      setDuration("");
      setCalories("");
      setSteps("");
    }
  };

  const deleteWorkout = (index) => {
    const updated = workouts.filter((_, i) => i !== index);
    setWorkouts(updated);
  };

  const totalCalories = workouts.reduce((sum, w) => sum + w.calories, 0);
  const totalDuration = workouts.reduce((sum, w) => sum + w.duration, 0);
  const totalSteps = workouts.reduce(
  (sum, w) => sum + (w.steps || 0),
  0
);

  const calorieProgress = Math.min(
    (totalCalories / dailyCalorieGoal) * 100,
    100
  );

  return (
    <div className="container">
      <h1>Fitness Tracker Dashboard</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Workout Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <input
          type="number"
          placeholder="Duration (minutes)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <input
          type="number"
          placeholder="Calories Burned"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
        />
        <input
          type="number"
          placeholder="Steps"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
        />
        <button onClick={addWorkout}>Add Workout</button>
      </div>

      <div className="dashboard">
        <h2>Daily Summary</h2>
        <p>Total Duration: {totalDuration} min</p>
        <p>Total Calories: {totalCalories} kcal</p>
        <p>Total Steps: {totalSteps}</p>

        <div className="progress-container">
          <div
            className="progress-bar"
            style={{ width: `${calorieProgress}%` }}
          ></div>
        </div>
        <p>{Math.round(calorieProgress)}% of {dailyCalorieGoal} kcal goal</p>
      </div>

      <div className="history">
        <h2>Workout History</h2>
        {workouts.map((w, index) => (
          <div key={index} className="workout-card">
            <div>
              <strong>{w.type}</strong>
              <p>{w.duration} min | {w.calories} kcal | {w.steps} steps</p>
            </div>
            <button
              className="delete-btn"
              onClick={() => deleteWorkout(index)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
