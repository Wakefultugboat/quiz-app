import React, { useState, useEffect } from 'react';
import QuestionCard from './components/QuestionCard.jsx';
import Results from './components/Results';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  // Fetch questions from the local JSON file
  useEffect(() => {
    fetch('/questions.json')
      .then(res => res.json())
      .then(data => setQuestions(data));
  }, []);

  const handleAnswerClick = (selectedOption) => {
    // Track the user's answer
    const currentQuestion = questions[currentQuestionIndex];
    setUserAnswers([
        ...userAnswers,
        {
            question: currentQuestion.text,
            selected: selectedOption.text,
            correct: currentQuestion.options.find(opt => opt.isCorrect).text,
            isCorrect: selectedOption.isCorrect,
        },
    ]);

    // Check if the answer is correct and update the score
    if (selectedOption.isCorrect) {
      setScore(score + 1);
    }

    // Move to the next question or show results
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };
  
  const handleRestartQuiz = () => {
    // Reset state to start the quiz again
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResults(false);
    setUserAnswers([]);
  };

  if (questions.length === 0) {
    return <div>Loading quiz...</div>;
  }

  return (
    <div className="app-container">
      <h1>Quiz App</h1>
      {showResults ? (
        <Results
          score={score}
          totalQuestions={questions.length}
          userAnswers={userAnswers}
          onRestart={handleRestartQuiz}
        />
      ) : (
        <QuestionCard
          question={questions[currentQuestionIndex]}
          onAnswerClick={handleAnswerClick}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
        />
      )}
    </div>
  );
}

export default App;
