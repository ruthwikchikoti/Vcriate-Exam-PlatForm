import React from 'react';
import '../styles/MCQuestions.css';
const MCQuestions = ({ onAnswerSubmit }) => {
  const questions = [
    {
      id: 1,
      topic: "Component-based architecture",
      question: "Which of the following best describes a React component?",
      options: [
        "A JavaScript function or class that optionally accepts inputs and returns a React element",
        "A CSS file that styles a specific part of the user interface",
        "A HTML template that defines the structure of a webpage",
        "A database query that fetches data for the user interface"
      ],
      correctAnswer: 0
    },
    {
      id: 2,
      topic: "State and props management",
      question: "What is the main difference between state and props in React?",
      options: [
        "State is immutable, while props are mutable",
        "Props are managed by the component itself, while state is passed from the parent",
        "State can change over time, while props are read-only",
        "Props are used for styling, while state is used for data management"
      ],
      correctAnswer: 2
    },
    {
      id: 3,
      topic: "Hooks and lifecycle methods",
      question: "Which hook would you use to perform side effects in a function component?",
      options: [
        "useState",
        "useEffect",
        "useContext",
        "useReducer"
      ],
      correctAnswer: 1
    },
    {
      id: 4,
      topic: "JSX syntax and rendering",
      question: "In JSX, how do you embed a JavaScript expression?",
      options: [
        "Using double quotes: \"expression\"",
        "Using single quotes: 'expression'",
        "Using curly braces: {expression}",
        "Using parentheses: (expression)"
      ],
      correctAnswer: 2
    },
    {
      id: 5,
      topic: "React ecosystem and best practices",
      question: "Which of the following is NOT typically part of the React ecosystem?",
      options: [
        "Redux for state management",
        "React Router for navigation",
        "Webpack for bundling",
        "Angular for component creation"
      ],
      correctAnswer: 3
    }
  ];

  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [selectedAnswers, setSelectedAnswers] = React.useState({});

  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerIndex
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // All questions answered, submit results
      const score = calculateScore();
      onAnswerSubmit(score, questions.length);
    }
  };

  const calculateScore = () => {
    return questions.reduce((score, question) => {
      return selectedAnswers[question.id] === question.correctAnswer ? score + 1 : score;
    }, 0);
  };

  const currentQ = questions[currentQuestion];

  return (
    <div className="mc-questions">
      <div className="question-number">Question {currentQuestion + 1} of {questions.length}</div>
      <h2>{currentQ.topic}</h2>
      <p>{currentQ.question}</p>
      <div className="options">
        {currentQ.options.map((option, index) => (
          <label key={index} className={selectedAnswers[currentQ.id] === index ? 'selected' : ''}>
            <input
              type="radio"
              name={`question-${currentQ.id}`}
              checked={selectedAnswers[currentQ.id] === index}
              onChange={() => handleAnswerSelect(currentQ.id, index)}
            />
            {option}
          </label>
        ))}
      </div>
      <button 
        onClick={handleNextQuestion}
        disabled={selectedAnswers[currentQ.id] === undefined}
      >
        {currentQuestion < questions.length - 1 ? "Next Question" : "Submit"}
      </button>
    </div>
  );
};

export default MCQuestions;