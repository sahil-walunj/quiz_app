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
    <div className="bg-gray-900 text-white flex items-center justify-center">
      <div className="w-full max-w-3xl bg-gray-800 p-8 rounded-lg shadow-lg transition-all">
        <h1 className="text-4xl font-bold text-center text-blue-400 mb-8">
          🚀 Interactive Quiz Platform
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
