import React, { useState } from "react";

function Question({ question, onAnswer }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onAnswer(option === question.correctAnswer, option);
  };

  const handleInputSubmit = () => {
    const isCorrect = parseInt(inputValue, 10) === question.correctAnswer;
    onAnswer(isCorrect, inputValue);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">{question.question}</h2>

      {question.type === "multiple-choice" ? (
        <ul className="space-y-2">
          {question.options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option)}
              className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors"
            >
              {option}
            </li>
          ))}
        </ul>
      ) : (
        <div className="space-y-2">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="p-2 border rounded-lg w-full"
            placeholder="Enter your answer"
          />
          <button
            onClick={handleInputSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Submit
          </button>
        </div>
      )}

      {selectedOption && question.type === "multiple-choice" && (
        <p className="text-sm text-gray-600">
          You selected: {selectedOption} (
          {selectedOption === question.correctAnswer ? "Correct" : "Incorrect"})
        </p>
      )}
    </div>
  );
}

export default Question;
