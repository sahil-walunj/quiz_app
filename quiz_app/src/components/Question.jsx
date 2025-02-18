import React, { useState } from "react";

function Question({ question, onAnswer }) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const ahead=question.correctAnswer.toString();
    let mainIsCorrect=false;
    const handleOptionClick = (option) => {
        const isCorrect = option.toString() === question.correctAnswer.toString();
        mainIsCorrect=isCorrect;
        setSelectedOption(option);
        onAnswer(isCorrect, option);
    };

    const handleInputSubmit = () => {
        const isCorrect = parseInt(inputValue, 10) === question.correctAnswer;
        onAnswer(isCorrect, inputValue);
    };
    
    return (
        <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl  font-semibold text-black">{question.question}</h2>

            {question.type === "multiple-choice" ? (
                <ul className="space-y-3">
                    {question.options.map((option, index) => (
                        <li
                            key={index}
                            onClick={() => handleOptionClick(option)}
                            className={`p-4 bg-[#DECBFA] font-semibold rounded-lg cursor-pointer transition-all
              hover:bg-[#AB6DFD] ${selectedOption && selectedOption.toString() === question.correctAnswer.toString()
                                    ? "bg-green-600"
                                    : selectedOption === option
                                        ? "bg-red-600"
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
                        className="p-3 border rounded-lg w-full bg-[#F0E4FF] text-black"
                        placeholder="Enter your answer"
                    />
                    <button
                        onClick={handleInputSubmit}
                        className="bg-[#AB6DFD] hover:bg-[#783ED0] text-white px-4 py-2 rounded-lg"
                    >
                        Submit
                    </button>
                </div>
            )}
            
        </div>
    );
}

export default Question;
