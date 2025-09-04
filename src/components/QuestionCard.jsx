import React from 'react';

function QuestionCard({ question, onAnswerClick, questionNumber, totalQuestions }) {
  return (
    <div className="question-card">
      <h2>Question {questionNumber} / {totalQuestions}</h2>
      <p className="question-text">{question.text}</p>
      <div className="options-container">
        {question.options.map((option) => (
          <button
            key={option.id}
            onClick={() => onAnswerClick(option)}
            className="option-button"
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuestionCard;