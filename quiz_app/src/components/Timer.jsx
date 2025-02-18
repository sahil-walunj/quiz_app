import React from "react";

function Timer({ timeLeft }) {
  return (
    <div className="text-center text-red-500 font-medium">
      Time Left: {timeLeft} seconds
    </div>
  );
}

export default Timer;