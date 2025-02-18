import React, { useState, useEffect } from "react";
import Question from "./Question";
import Timer from "./Timer";
import Scoreboard from "./Scoreboard";
import { quizData } from "../data/quizData";
import { saveAttempt, getAttempts } from "../utils/indexedDB";

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

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimeLeft(30);
    setQuizCompleted(false);
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
    <div className="p-3 flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-2xl p-6 bg-gray-800 rounded-lg shadow-lg">
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
            <p className="text-gray-400 text-center mt-4">
              Question {currentQuestionIndex + 1} of {quizData.length}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Quiz;
