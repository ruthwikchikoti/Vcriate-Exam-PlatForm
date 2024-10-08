import React, { useEffect, useState } from 'react';
import '../styles/Timer.css';

const instructionsList = [
  "Read the questions properly.",
  "Manage your time wisely.",
  "Double-check your answers.",
  "Stay calm and focused.",
  "Don't spend too much time on one question.",
  "Use the process of elimination.",
  "Review your answers if you have time.",
  "Stay positive and confident."
];

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(3600); 
  const [instruction, setInstruction] = useState(instructionsList[0]);

  useEffect(() => {
    const updateClock = () => {
      setTimeLeft(prevTime => {
        if (prevTime <= 0) {
          clearInterval(intervalId);
          return 0;
        }
        return prevTime - 1;
      });
    };

    const updateInstruction = () => {
      const randomIndex = Math.floor(Math.random() * instructionsList.length);
      setInstruction(instructionsList[randomIndex]);
    };

    const intervalId = setInterval(updateClock, 1000);
    const instructionIntervalId = setInterval(updateInstruction, 10000); 

    updateClock(); 
    updateInstruction(); 

    return () => {
      clearInterval(intervalId);
      clearInterval(instructionIntervalId);
    };
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="timer-container">
      {formatTime(timeLeft)}
      <div className="instructions">{instruction}</div>
    </div>
  );
};

export default Timer;