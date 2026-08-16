import React, { useState, useEffect } from 'react';
import StartScreen from './components/StartScreen';
import QuizCard from './components/QuizCard';
import ResultScreen from './components/ResultScreen';
import ReviewScreen from './components/ReviewScreen';
import EditScreen from './components/EditScreen';
import { questions as defaultQuestions } from './data/questions';

function App() {
  const [currentScreen, setCurrentScreen] = useState('start'); // start, quiz, result, review, edit
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [appQuestions, setAppQuestions] = useState(defaultQuestions);

  useEffect(() => {
    // Load from localStorage on mount
    const saved = localStorage.getItem('quizQuestions');
    if (saved) {
      try {
        setAppQuestions(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved questions", e);
      }
    }
  }, []);

  const handleStart = () => {
    setCurrentScreen('quiz');
    setCurrentQuestionIndex(0);
    setScore(0);
    setUserAnswers([]);
  };

  const handleEdit = () => {
    setCurrentScreen('edit');
  };

  const handleSaveQuestions = (newQuestions) => {
    setAppQuestions(newQuestions);
    localStorage.setItem('quizQuestions', JSON.stringify(newQuestions));
  };

  const handleRestoreDefaults = (defaults) => {
    setAppQuestions(defaults);
    localStorage.removeItem('quizQuestions');
  };

  const handleBackFromEdit = (force) => {
    // If force is true, we just go back. Confirm logic is in EditScreen.
    if (force) {
      setCurrentScreen('start');
    }
  };

  const handleNextQuestion = (selectedOption, isCorrect) => {
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    setUserAnswers(prev => [...prev, selectedOption]);

    if (currentQuestionIndex < appQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setCurrentScreen('result');
    }
  };

  const handleRestart = () => {
    setCurrentScreen('start'); 
    handleStart(); 
  };

  const handleReview = () => {
    setCurrentScreen('review');
  };

  return (
    <>
      {currentScreen === 'start' && <StartScreen onStart={handleStart} onEdit={handleEdit} />}
      
      {currentScreen === 'edit' && (
        <EditScreen 
          questions={appQuestions} 
          onSave={handleSaveQuestions} 
          onBack={handleBackFromEdit}
          onRestore={handleRestoreDefaults}
        />
      )}

      {currentScreen === 'quiz' && (
        <QuizCard 
          question={appQuestions[currentQuestionIndex]} 
          currentIndex={currentQuestionIndex} 
          total={appQuestions.length} 
          onNext={handleNextQuestion} 
        />
      )}
      
      {currentScreen === 'result' && (
        <ResultScreen 
          score={score} 
          total={appQuestions.length} 
          onRestart={handleRestart} 
          onReview={handleReview} 
        />
      )}

      {currentScreen === 'review' && (
        <ReviewScreen 
          questions={appQuestions}
          userAnswers={userAnswers}
          onRestart={handleRestart}
        />
      )}
    </>
  );
}

export default App;
