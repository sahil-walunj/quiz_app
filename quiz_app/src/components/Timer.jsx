import React from "react";

function Timer({ timeLeft }) {
  return (
    <div className="text-center text-red-400 font-semibold animate-pulse">
      ⏳ Time Left: {timeLeft} seconds
    </div>
  );
}

export default Timer;
