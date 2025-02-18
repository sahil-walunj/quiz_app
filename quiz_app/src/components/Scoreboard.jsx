import React from "react";

function Scoreboard({ score, totalQuestions, onRestart, attempts }) {
  return (
    <div className="text-center space-y-6">
      <h2 className="text-3xl font-bold text-green-400">Quiz Completed!</h2>
      <p className="text-lg text-gray-300">
        Your Score: <span className="text-blue-400">{score} / {totalQuestions}</span>
      </p>

      <h3 className="text-xl font-semibold text-gray-200">Attempt History</h3>
      <ul className="text-left max-w-md mx-auto bg-gray-700 p-4 rounded-lg">
        {attempts.map((attempt, index) => (
          <li key={index} className="border-b border-gray-600 py-2">
            <p className="font-medium text-gray-300">{attempt.question}</p>
            <p className={`text-sm ${
              attempt.givenAnswer == attempt.correctAnswer ? "text-green-400" : "text-red-400"
            }`}>
              Your Answer: {attempt.givenAnswer}
            </p>
            <p className="text-gray-400">Correct Answer: {attempt.correctAnswer}</p>
          </li>
        ))}
      </ul>

      <button
        onClick={onRestart}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Restart Quiz
      </button>
    </div>
  );
}

export default Scoreboard;
