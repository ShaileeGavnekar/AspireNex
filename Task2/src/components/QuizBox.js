// QuizBox.js
import React, { useState } from 'react';

function QuizBox({ questions, userScore, setUserScore, onShowResult }) {
  const [questionIndex, setQuestionIndex] = useState(0);

  const handleOptionClick = (option) => {
    if (option === questions[questionIndex].answer) {
      setUserScore(userScore + 1);
    }
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      onShowResult();
    }
  };

  return (
    <div className="quiz-box active">
      <h2 className="question-text">{questions[questionIndex].numb}. {questions[questionIndex].question}</h2>
      <div className="option-list">
        {questions[questionIndex].options.map((option, index) => (
          <div className="option" key={index} onClick={() => handleOptionClick(option)}>
            <span>{option}</span>
          </div>
        ))}
      </div>
      <div className="quiz-footer">
        <span className="question-total">{questionIndex + 1} of {questions.length} Questions</span>
        {questionIndex < questions.length - 1 && (
          <button className="next-btn" onClick={() => setQuestionIndex(questionIndex + 1)}>Next</button>
        )}
      </div>
    </div>
  );
}

export default QuizBox;
