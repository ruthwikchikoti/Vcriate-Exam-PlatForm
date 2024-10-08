import React, { useState, useEffect } from 'react';
import '../styles/Results.css';

const Results = ({ score, onRestart }) => {
  const [previousScores, setPreviousScores] = useState([]);

  useEffect(() => {
    const storedScores = JSON.parse(localStorage.getItem('examScores')) || [];
    setPreviousScores(storedScores);

    const updatedScores = [...storedScores, score];
    localStorage.setItem('examScores', JSON.stringify(updatedScores));
    setPreviousScores(updatedScores);
  }, [score]);

  const deleteScore = (index) => {
    const updatedScores = previousScores.filter((_, i) => i !== index);
    localStorage.setItem('examScores', JSON.stringify(updatedScores));
    setPreviousScores(updatedScores);
  };

  return (
    <div className="results-container">
      <h2>Exam Results</h2>
      <p>Your score: {score}</p>
      <button onClick={onRestart}>Restart Exam</button>

      <h3>Previous Scores</h3>
      {previousScores.length > 0 ? (
        <ul>
          {previousScores.map((prevScore, index) => (
            <li key={index}>
              Score: {prevScore}
              <button onClick={() => deleteScore(index)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No previous scores</p>
      )}
    </div>
  );
};

export default Results;