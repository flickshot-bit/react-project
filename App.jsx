import React, { useState, useEffect } from 'react';
import { Check, X, RotateCcw, Trophy, Clock, Target, Play, Sparkles } from 'lucide-react';
import './App.css';

const questions = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correct: 2
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correct: 1
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correct: 1
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Van Gogh", "Picasso", "Leonardo da Vinci", "Michelangelo"],
    correct: 2
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correct: 3
  },
  {
    question: "Which programming language is known as the 'language of the web'?",
    options: ["Python", "Java", "JavaScript", "C++"],
    correct: 2
  },
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyper Tool Markup Language"],
    correct: 0
  },
  {
    question: "Which company developed React?",
    options: ["Google", "Microsoft", "Facebook (Meta)", "Apple"],
    correct: 2
  },
  {
    question: "What is the fastest land animal?",
    options: ["Lion", "Cheetah", "Leopard", "Tiger"],
    correct: 1
  },
  {
    question: "Which year was JavaScript created?",
    options: ["1993", "1995", "1997", "1999"],
    correct: 1
  }
];

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerActive, setTimerActive] = useState(false);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  // Timer effect
  useEffect(() => {
    if (timerActive && timeLeft > 0 && !quizCompleted && quizStarted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !quizCompleted && quizStarted) {
      handleTimeUp();
    }
  }, [timeLeft, timerActive, quizCompleted, quizStarted]);

  const handleTimeUp = () => {
    setTimerActive(false);
    setShowResult(true);
    setStreak(0); // Reset streak on timeout
    setTimeout(() => {
      handleNext();
    }, 1500);
  };

  const handleAnswerSelect = (answerIndex) => {
    if (showResult) return;
    
    setSelectedAnswer(answerIndex);
    setTimerActive(false);
    setShowResult(true);
    
    if (answerIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
      setStreak(streak + 1);
      setMaxStreak(Math.max(maxStreak, streak + 1));
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(30);
      setTimerActive(true);
    } else {
      setQuizCompleted(true);
      setTimerActive(false);
    }
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setTimerActive(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizCompleted(false);
    setQuizStarted(false);
    setTimeLeft(30);
    setTimerActive(false);
    setStreak(0);
    setMaxStreak(0);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 90) return "Outstanding! 🏆";
    if (percentage >= 80) return "Excellent! 🎉";
    if (percentage >= 70) return "Great job! 👏";
    if (percentage >= 60) return "Good work! 👍";
    if (percentage >= 50) return "Not bad! 😊";
    return "Keep practicing! 💪";
  };

  const getGradeColor = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 90) return "#fbbf24"; // Gold
    if (percentage >= 80) return "#34d399"; // Green
    if (percentage >= 70) return "#60a5fa"; // Blue
    if (percentage >= 60) return "#a78bfa"; // Purple
    return "#f87171"; // Red
  };

  // Welcome Screen
  if (!quizStarted) {
    return (
      <div className="quiz-container">
        <div className="quiz-card welcome-card">
          <div className="welcome-header">
            <div className="welcome-icon">
              <Sparkles className="sparkle-icon" />
            </div>
            <h1 className="welcome-title">Knowledge Quiz</h1>
            <p className="welcome-subtitle">Test your knowledge with 10 exciting questions!</p>
          </div>
          
          <div className="quiz-features">
            <div className="feature-item">
              <Clock className="feature-icon" />
              <div>
                <h3>Timed Questions</h3>
                <p>30 seconds per question</p>
              </div>
            </div>
            <div className="feature-item">
              <Target className="feature-icon" />
              <div>
                <h3>Track Progress</h3>
                <p>Real-time scoring</p>
              </div>
            </div>
            <div className="feature-item">
              <Trophy className="feature-icon" />
              <div>
                <h3>Streak Bonus</h3>
                <p>Build your winning streak</p>
              </div>
            </div>
          </div>
          
          <button onClick={startQuiz} className="start-btn">
            <Play className="btn-icon" />
            <span>Start Quiz</span>
          </button>
        </div>
      </div>
    );
  }

  // Results Screen
  if (quizCompleted) {
    return (
      <div className="quiz-container">
        <div className="quiz-card result-card">
          <div className="result-header">
            <Trophy className="trophy-icon" style={{ color: getGradeColor() }} />
            <h2 className="result-title">Quiz Complete!</h2>
            <p className="result-message">{getScoreMessage()}</p>
          </div>
          
          <div className="score-summary">
            <div className="score-item">
              <Target className="score-icon" />
              <div className="score-value">{score}</div>
              <div className="score-label">Correct</div>
            </div>
            <div className="score-item">
              <div className="score-value">{questions.length}</div>
              <div className="score-label">Total</div>
            </div>
            <div className="score-item">
              <div className="score-value" style={{ color: getGradeColor() }}>
                {Math.round((score / questions.length) * 100)}%
              </div>
              <div className="score-label">Score</div>
            </div>
          </div>

          {maxStreak > 1 && (
            <div className="streak-display">
              <Sparkles className="streak-icon" />
              <span>Best Streak: {maxStreak} questions!</span>
            </div>
          )}
          
          <div className="result-actions">
            <button onClick={resetQuiz} className="restart-btn">
              <RotateCcw className="btn-icon" />
              <span>Try Again</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Screen
  return (
    <div className="quiz-container">
      <div className="quiz-card">
        {/* Header */}
        <div className="quiz-header">
          <div className="quiz-info">
            <div className="quiz-logo">
              <Target className="logo-icon" />
            </div>
            <div>
              <h1 className="quiz-title">Knowledge Quiz</h1>
              <p className="quiz-subtitle">Question {currentQuestion + 1} of {questions.length}</p>
            </div>
          </div>
          <div className="score-display">
            <div className="score-label">Score</div>
            <div className="score-value">{score}/{questions.length}</div>
            {streak > 1 && (
              <div className="streak-indicator">
                🔥 {streak} streak
              </div>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="progress-section">
          <div className="progress-info">
            <span>Progress</span>
            <span>{currentQuestion + 1} of {questions.length}</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Timer */}
        <div className="timer-section">
          <div className={`timer-circle ${timeLeft <= 10 ? 'timer-urgent' : ''}`}>
            <Clock className="timer-icon" />
            <div className={`timer-value ${timeLeft <= 10 ? 'timer-warning' : ''}`}>
              {timeLeft}s
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="question-section">
          <h2 className="question-text">
            {questions[currentQuestion].question}
          </h2>

          <div className="options-list">
            {questions[currentQuestion].options.map((option, index) => {
              let buttonClass = "option-btn";
              
              if (showResult) {
                if (index === questions[currentQuestion].correct) {
                  buttonClass += " option-correct";
                } else if (index === selectedAnswer && index !== questions[currentQuestion].correct) {
                  buttonClass += " option-incorrect";
                } else {
                  buttonClass += " option-disabled";
                }
              } else if (selectedAnswer === index) {
                buttonClass += " option-selected";
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  className={buttonClass}
                >
                  <div className="option-content">
                    <span className="option-text">{option}</span>
                    {showResult && index === questions[currentQuestion].correct && (
                      <Check className="option-icon check-icon" />
                    )}
                    {showResult && index === selectedAnswer && index !== questions[currentQuestion].correct && (
                      <X className="option-icon x-icon" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Next Button */}
        {showResult && (
          <button onClick={handleNext} className="next-btn">
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'View Results'}
          </button>
        )}
      </div>
    </div>
  );
};

export default App;