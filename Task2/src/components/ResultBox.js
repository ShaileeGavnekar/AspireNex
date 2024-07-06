import React, { useEffect, useState } from 'react';

function ResultBox({ userScore, totalQuestions, onTryAgain, onGoHome }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const endValue = (userScore / totalQuestions) * 100;
    let startValue = 0;
    const speed = 20;
    const duration = Math.abs(endValue - startValue) * speed;

    if (endValue === 0) {
      setProgress(0);
      return;
    }

    const interval = setInterval(() => {
      startValue += 1;
      setProgress(startValue);
      if (startValue >= endValue) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [userScore, totalQuestions]);

  return (
    <div className="result-box active">
      <h2>Quiz Result</h2>
      <div className="percentage-container">
        <div className="circular-progress">
          <span className="progress-value">{Math.min(progress, 100).toFixed()}%</span>
          <div className="circle">
            <div className="mask full">
              <div className="fill"></div>
            </div>
            <div className="mask half">
              <div className="fill"></div>
            </div>
          </div>
        </div>
        <span className="score-text">Your Score {userScore} out of {totalQuestions}</span>
      </div>
      <div className="buttons">
        <button className="tryagain-btn" onClick={onTryAgain}>Try Again</button>
        <button className="goHome-btn" onClick={onGoHome}>Go Home</button>
      </div>
    </div>
  );
}

export default ResultBox;
