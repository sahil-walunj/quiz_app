import React, { useState } from "react";
import Quiz from "./components/Quiz";
import Scoreboard from "./components/Scoreboard";
import { quizData } from "./data/quizData";
import quizBg from './assets/quizbg.png';
import quizBg_flipped from './assets/quizfliped.png';

function App() {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const handleQuizCompletion = (finalScore) => {
    setScore(finalScore);
    setQuizCompleted(true);
  };

  return (
    <div 
    className="h-screen bg-cover bg-center text-white flex items-center justify-center" 
    style={{ backgroundImage: `url(${quizBg})` }}
    >
      <div className="w-full bg-[#E3D5FF] max-w-3xl  p-6 border-[#865BBE] border-2 rounded-3xl shadow-lg flex flex-col h-[90vh]" >
        <h1 className="text-3xl md:text-4xl font-bold text-center text-black pb-4">
          Quiz
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
