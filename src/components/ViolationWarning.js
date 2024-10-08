import React from 'react';
import '../styles/ViolationWarning.css';

const ViolationWarning = ({ count }) => {
  return (
    <div className="violation-warning">
      {count === 1 ? (
        <p>Warning: Attempting to exit full-screen mode. Second violation will terminate the exam.</p>
      ) : (
        <p>Exam terminated due to multiple exit attempts.</p>
      )}
    </div>
  );
};

export default ViolationWarning;
