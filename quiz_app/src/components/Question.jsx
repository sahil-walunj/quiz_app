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
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-300">{question.question}</h2>

      {question.type === "multiple-choice" ? (
        <ul className="space-y-3">
          {question.options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option)}
              className={`p-4 bg-gray-700 rounded-lg cursor-pointer transition-all
                          hover:bg-blue-600 ${
                            selectedOption === option 
                            ? selectedOption === question.correctAnswer 
                              ? "bg-green-600" 
                              : "bg-red-600"
                            : ""
                          }`}
            >
              {option}
            </li>
          ))}
        </ul>
      ) : (
        <div className="space-y-3">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="p-3 border rounded-lg w-full bg-gray-700 text-white"
            placeholder="Enter your answer"
          />
          <button
            onClick={handleInputSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Submit
          </button>
        </div>
      )}

      {selectedOption && question.type === "multiple-choice" && (
        <p className="text-sm text-gray-400">
          You selected: {selectedOption} (
          {selectedOption === question.correctAnswer ? "Correct" : "Incorrect"})
        </p>
      )}
    </div>
  );
}

export default Question;
