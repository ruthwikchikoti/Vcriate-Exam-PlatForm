import React, { useState, useEffect, useRef } from 'react';
import Timer from '../components/Timer';
import ViolationWarning from '../components/ViolationWarning';
import '../styles/ExamWindow.css';
import Results from './Results';
import EmailService from './EmailService';
import MCQuestions from '../components/MCQuestions';
import UserDetails from '../components/UserDetails'; 

const ExamWindow = () => {
  const [examState, setExamState] = useState('welcome');
  const [violationCount, setViolationCount] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [showReenterFullScreenButton, setShowReenterFullScreenButton] = useState(false);
  const [userDetails, setUserDetails] = useState({ name: '', email: '' });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSubmitConfirmation, setShowSubmitConfirmation] = useState(false);
  const [formError, setFormError] = useState('');
  const [score, setScore] = useState(0);
  const examRef = useRef(null);
  const totalQuestions = 5;

  useEffect(() => {
    const handleFullScreenChange = () => {
      if (examState === 'ongoing' && !document.fullscreenElement) {
        handleViolation();
      }
    };

    const handleVisibilityChange = () => {
      if (examState === 'ongoing' && document.hidden) {
        handleViolation();
      }
    };

    const handleKeyDown = (event) => {
      if (examState === 'ongoing' && (event.key === 'Escape' || event.key === 'F11')) {
        event.preventDefault();
        handleViolation();

        if (event.key === 'Escape') {
          setExamState('hidden'); 
        }
      }
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [examState]);

  const handleViolation = () => {
    setViolationCount((prevCount) => {
      const newCount = prevCount + 1;

      if (newCount === 1) {
        setShowWarning(true);
        setShowReenterFullScreenButton(true);
        setExamState('hidden'); 
      } else if (newCount >= 2) {
        terminateExam();
      }

      return newCount;
    });
  };

  const startExam = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
    setExamState('ongoing');
    setShowConfirmation(false);
  };

  const handleReenterFullScreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }

    setShowWarning(false);
    setShowReenterFullScreenButton(false);
    setExamState('ongoing'); 
  };

  const terminateExam = () => {
    setExamState('terminated');
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };

  const handleTimerEnd = () => {
    setExamState('completed');
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };

  const handleSubmitExam = (score, totalQuestions) => {
    setScore(score);
    setShowSubmitConfirmation(true);
  };

  const confirmSubmitExam = async () => {
    setExamState('completed');
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    setShowSubmitConfirmation(false);
    try {
      await EmailService.sendResultEmail(userDetails.email, userDetails.name, score, totalQuestions);
      alert('Email sent successfully');
    } catch (error) {
      alert('Error sending email:', error);
    }
  };

  const resetExam = () => {
    setExamState('welcome');
    setViolationCount(0);
    setShowReenterFullScreenButton(false);
    setShowWarning(false);
    setUserDetails({ name: '', email: '' });
    setFormError('');
    setScore(0);
  };

  const validateForm = () => {
    if (!userDetails.name || !userDetails.email) {
      setFormError('Please fill in all fields');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(userDetails.email)) {
      setFormError('Please enter a valid email address');
      return false;
    }
    setFormError('');
    return true;
  };

  const handleContinue = () => {
    if (validateForm()) {
      setShowConfirmation(true);
    }
  };

  const renderContent = () => {
    switch (examState) {
      case 'welcome':
        return (
          <div className="welcome-screen">
            <h1 className="animate-text">Welcome to Vcriate Exam Platform</h1>
            <button onClick={() => setExamState('details')}>Start Exam</button>
          </div>
        );
      case 'details':
        return (
          <UserDetails 
            userDetails={userDetails}
            setUserDetails={setUserDetails}
            formError={formError}
            handleContinue={handleContinue}
          />
        );
      case 'ongoing':
        return (
          <div className="exam-window">
            <div className="exam-header">
              <h2>Exam in Progress</h2>
              <Timer duration={3600} onTimerEnd={handleTimerEnd} />
            </div>
            {showWarning && <ViolationWarning count={violationCount} />}
            {showReenterFullScreenButton && (
              <div className="reenter-fullscreen">
                <button onClick={handleReenterFullScreen}>Re-enter Full-Screen</button>
              </div>
            )}
            <MCQuestions onAnswerSubmit={handleSubmitExam} />
            <button className="submit-button" onClick={() => setShowSubmitConfirmation(true)}>
              Submit Exam
            </button>
          </div>
        );
      case 'hidden':
        return (
          <div className="hidden-content">
            <h2>Full-Screen Mode Required</h2>
            <p>
              You have exited full-screen mode. Please re-enter full-screen to continue the exam.
            </p>
            {showReenterFullScreenButton && (
              <button onClick={handleReenterFullScreen}>Re-enter Full-Screen</button>
            )}
          </div>
        );
      case 'terminated':
        return (
          <div className="exam-terminated">
            <h2>Exam Terminated</h2>
            <p>You have been disqualified due to multiple violations.</p>
            <button onClick={resetExam}>Restart Exam</button>
          </div>
        );
      case 'completed':
        return (
          <Results 
            score={score} 
            onRestart={() => {
              setExamState('welcome');
              setScore(0);
            }} 
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={`exam-container ${examState === 'ongoing' ? 'fullscreen' : ''}`} ref={examRef}>
      {renderContent()}
      {showConfirmation && (
        <div className="confirmation-dialog">
          <h3>Confirm Exam Start</h3>
          <p>
            Are you sure you want to start the exam? Once started, you cannot pause or exit without
            consequences.
          </p>
          <button onClick={() => setShowConfirmation(false)}>Cancel</button>
          <button onClick={startExam}>Start Exam</button>
        </div>
      )}
      {showSubmitConfirmation && (
        <div className="confirmation-dialog">
          <h3>Confirm Submission</h3>
          <p>Are you sure you want to submit your exam? This action cannot be undone.</p>
          <button onClick={() => setShowSubmitConfirmation(false)}>Cancel</button>
          <button onClick={confirmSubmitExam}>Submit Exam</button>
        </div>
      )}
    </div>
  );
};

export default ExamWindow;
