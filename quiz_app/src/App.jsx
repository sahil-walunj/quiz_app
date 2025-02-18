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
    <div className="h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="w-full max-w-3xl bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col h-[90vh]">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-400 pb-4">
          🚀 Interactive Quiz
        </h1>
        
        {/* Quiz Content - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          {!quizCompleted ? (
            <Quiz onQuizCompletion={handleQuizCompletion} />
          ) : (
            <Scoreboard score={score} totalQuestions={quizData.length} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
