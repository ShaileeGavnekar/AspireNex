// App.js
import React, { useState } from 'react';
import './App.css';
import PopupInfo from './components/PopupInfo';
import QuizBox from './components/QuizBox';
import ResultBox from './components/ResultBox';
import { questions } from './questions'; // Import questions

function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [currentEnergy, setCurrentEnergy] = useState(2);
  const [userScore, setUserScore] = useState(0);

  const handleStartQuiz = () => {
    setCurrentSection('quiz');
  };

  const handleShowResult = () => {
    setCurrentSection('result');
  };

  const handleTryAgain = () => {
    setUserScore(0);
    setCurrentSection('quiz');
  };

  const handleGoHome = () => {
    setUserScore(0);
    setCurrentSection('home');
  };

  return (
    <div className="App">
      {currentSection === 'home' && (
        <div className="start-section">
          <button className="start-btn" onClick={handleStartQuiz}>Start</button>
        </div>
      )}
      {currentSection === 'popup' && (
        <PopupInfo onContinue={handleStartQuiz} onExit={() => setCurrentSection('home')} />
      )}
      {currentSection === 'quiz' && (
        <QuizBox
          questions={questions}
          userScore={userScore}
          setUserScore={setUserScore}
          onShowResult={handleShowResult}
        />
      )}
      {currentSection === 'result' && (
        <ResultBox
          userScore={userScore}
          totalQuestions={questions.length}
          onTryAgain={handleTryAgain}
          onGoHome={handleGoHome}
        />
      )}
    </div>
  );
}

export default App;
