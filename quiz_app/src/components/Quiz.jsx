import React, { useState, useEffect } from "react";
import Question from "./Question";
import Timer from "./Timer";
import Scoreboard from "./Scoreboard";
import { quizData } from "../data/quizData";
import { saveAttempt, getAttempts,clearAttempts } from "../utils/indexedDB";

function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [attempts, setAttempts] = useState([]);

  useEffect(() => {
    getAttempts().then(setAttempts);
  }, []);

  const handleAnswer = (isCorrect, answer) => {
    if (isCorrect) setScore((prev) => prev + 1);

    saveAttempt({ 
      question: quizData[currentQuestionIndex].question, 
      givenAnswer: answer, 
      correctAnswer: quizData[currentQuestionIndex].correctAnswer 
    });

    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimeLeft(30);
    } else {
      setQuizCompleted(true);
      getAttempts().then(setAttempts);
    }
  };

  const handleRestart = async () => {
    // Clear previous attempts
    await clearAttempts(); // Ensure you implement this function in IndexedDB utility
  
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimeLeft(30);
    setQuizCompleted(false);
    setAttempts([]); // Reset the attempts state
  };
  

  useEffect(() => {
    if (timeLeft === 0) {
      if (currentQuestionIndex < quizData.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setTimeLeft(30);
      } else {
        setQuizCompleted(true);
      }
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, currentQuestionIndex]);

  return (
    <div className="p-3 flex items-center justify-center text-black">
      <div className="w-full max-w-2xl p-6 rounded-lg shadow-lg">
        {quizCompleted ? (
          <Scoreboard 
            score={score} 
            totalQuestions={quizData.length} 
            onRestart={handleRestart} 
            attempts={attempts} 
          />
        ) : (
          <>
            <Timer timeLeft={timeLeft} />
            <Question 
              question={quizData[currentQuestionIndex]} 
              onAnswer={handleAnswer} 
            />
            <p className="text-black text-center mt-4">
              Question {currentQuestionIndex + 1} of {quizData.length}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Quiz;
