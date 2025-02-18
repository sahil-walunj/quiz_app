import React from "react";

function Scoreboard({ score, totalQuestions, onRestart, attempts }) {
  return (
    <div className="text-center space-y-4">
      <h2 className="text-2xl font-bold text-green-600">Quiz Completed!</h2>
      <p className="text-lg text-gray-700">
        Your Score: {score} / {totalQuestions}
      </p>

      <h3 className="text-xl font-semibold">Attempt History</h3>
      <ul className="text-left max-w-md mx-auto bg-gray-100 p-4 rounded-lg">
        {attempts.map((attempt, index) => (
          <li key={index} className="border-b py-2">
            <p className="font-medium">{attempt.question}</p>
            <p>Your Answer: {attempt.givenAnswer}</p>
            <p>Correct Answer: {attempt.correctAnswer}</p>
          </li>
        ))}
      </ul>

      <button
        onClick={onRestart}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Restart Quiz
      </button>
    </div>
  );
}

export default Scoreboard;
