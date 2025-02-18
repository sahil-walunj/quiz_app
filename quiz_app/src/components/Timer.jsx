import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglass } from "@fortawesome/free-solid-svg-icons";

function Timer({ timeLeft, totalTime }) {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prevRotation) => (prevRotation + 180) % 360); // Rotate by 180 degrees every 2 seconds
    }, 2000); // Update rotation every 2 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center justify-center">
        {/* Hourglass icon */}
        <FontAwesomeIcon
          icon={faHourglass}
          className="text-[#8585DE]"
          style={{ 
            transform: `rotate(${rotation}deg)`,
            transition: "transform 2s linear", // Smooth rotation transition (2 seconds)
            fontSize: "1.3rem", // Smaller icon size
            marginRight: "0.5rem", // Add spacing between icon and text
          }}
        />
        {/* Time Left text */}
        <div className="text-black font-regular">
          Time Left: {timeLeft} seconds
        </div>
      </div>
    </div>
  );
}

export default Timer;