import React from 'react';

function Results({ score, totalQuestions, userAnswers, onRestart }) {
  return (
    <div className="results-card">
      <h2>Quiz Completed!</h2>
      <p className="final-score">You scored {score} out of {totalQuestions}</p>

      <div className="answer-summary">
        <h3>Answer Summary:</h3>
        <ul>
          {userAnswers.map((answer, index) => (
            <li key={index} className={answer.isCorrect ? 'correct' : 'incorrect'}>
              <strong>Q: {answer.question}</strong>
              <br />
              Your answer: {answer.selected}
              <br />
              Correct answer: {answer.correct}
            </li>
          ))}
        </ul>
      </div>

      <button onClick={onRestart} className="restart-button">
        Restart Quiz
      </button>
    </div>
  );
}

export default Results;