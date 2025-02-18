import React, { useState } from "react";
import Quiz from "./components/Quiz";
import Scoreboard from "./components/Scoreboard";
import { quizData } from "./data/quizData";

function App() {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const handleQuizCompletion = (finalScore) => {
    setScore(finalScore);
    setQuizCompleted(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Interactive Quiz Platform
        </h1>
        {!quizCompleted ? (
          <Quiz onQuizCompletion={handleQuizCompletion} />
        ) : (
          <Scoreboard score={score} totalQuestions={quizData.length} />
        )}
      </div>
    </div>
  );
}

export default App;