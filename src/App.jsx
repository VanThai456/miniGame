import React, { useState } from 'react';
import StartScreen from './components/StartScreen';
import QuizCard from './components/QuizCard';
import ResultScreen from './components/ResultScreen';
import ScoreBoard from './components/ScoreBoard';
import { questions } from './data/questions';

const INITIAL_SCORES = {
  '31': 0, '32': 0, '33': 0, '56': 0, '35': 0, '36': 0, '57': 0
};

function App() {
  const [currentScreen, setCurrentScreen] = useState('start'); // start, quiz, result
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState(INITIAL_SCORES);
  
  // Track if the current question has been answered correctly and point is awardable
  const [isAwardable, setIsAwardable] = useState(false);
  const [pointAwarded, setPointAwarded] = useState(false);

  const handleStart = () => {
    setCurrentScreen('quiz');
    setCurrentQuestionIndex(0);
    setScores(INITIAL_SCORES);
    setIsAwardable(false);
    setPointAwarded(false);
  };

  const handleAnswerSelected = (isCorrect) => {
    if (isCorrect) {
      setIsAwardable(true);
      setPointAwarded(false);
    } else {
      setIsAwardable(false);
    }
  };

  const handleAddPoint = (team) => {
    if (isAwardable && !pointAwarded) {
      setScores(prev => ({
        ...prev,
        [team]: prev[team] + 1
      }));
      setPointAwarded(true);
      setIsAwardable(false); // Can only award once per question
    }
  };

  const handleNextQuestion = () => {
    setIsAwardable(false);
    setPointAwarded(false);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setCurrentScreen('result');
    }
  };

  return (
    <div className={`app-container ${currentScreen !== 'start' ? 'with-sidebar' : ''}`}>
      <div className="main-content">
        {currentScreen === 'start' && <StartScreen onStart={handleStart} />}
        
        {currentScreen === 'quiz' && (
          <QuizCard 
            question={questions[currentQuestionIndex]} 
            currentIndex={currentQuestionIndex} 
            total={questions.length} 
            onAnswerSelected={handleAnswerSelected}
            onNextQuestion={handleNextQuestion} 
          />
        )}
        
        {currentScreen === 'result' && (
          <ResultScreen scores={scores} />
        )}
      </div>

      {currentScreen !== 'start' && (
        <div className="sidebar">
          <ScoreBoard 
            scores={scores} 
            onAddPoint={handleAddPoint}
            isAwardable={isAwardable && !pointAwarded}
          />
        </div>
      )}
    </div>
  );
}

export default App;
