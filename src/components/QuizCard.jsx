import React, { useState, useEffect } from 'react';
import { Check, X, ArrowRight } from 'lucide-react';
import ProgressBar from './ProgressBar';

export default function QuizCard({ question, currentIndex, total, onAnswerSelected, onNextQuestion }) {
  const [selectedOption, setSelectedOption] = useState(null);

  // Reset local state when question changes
  useEffect(() => {
    setSelectedOption(null);
  }, [question.id]);

  const handleOptionClick = (index) => {
    if (selectedOption !== null) return; // Prevent multiple selections
    setSelectedOption(index);
    onAnswerSelected(index === question.correctAnswer);
  };

  return (
    <div className="card">
      <ProgressBar current={currentIndex + 1} total={total} />
      
      <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', lineHeight: '1.4' }}>
        {question.question}
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {question.options.map((option, index) => {
          const isSelected = selectedOption === index;
          const isCorrect = index === question.correctAnswer;
          const hasAnswered = selectedOption !== null;

          let btnClass = 'option-btn';
          if (hasAnswered) {
            if (isCorrect) {
              btnClass += ' correct';
            } else if (isSelected && !isCorrect) {
              btnClass += ' incorrect';
            }
          }

          const prefix = String.fromCharCode(65 + index); // A, B, C, D

          return (
            <button
              key={index}
              className={btnClass}
              onClick={() => handleOptionClick(index)}
              disabled={hasAnswered}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', textAlign: 'left' }}>
                <span style={{ fontWeight: 'bold' }}>{prefix}.</span>
                <span>{option}</span>
              </div>
              {hasAnswered && isCorrect && <Check size={24} style={{ flexShrink: 0 }} />}
              {hasAnswered && isSelected && !isCorrect && <X size={24} style={{ flexShrink: 0 }} />}
            </button>
          );
        })}
      </div>

      {selectedOption !== null && (
        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: selectedOption === question.correctAnswer ? 'var(--correct-text)' : 'var(--incorrect-text)' }}>
            {selectedOption === question.correctAnswer ? 'Chính xác! 🎉 (Hãy chọn đội để cộng điểm bên phải)' : 'Chưa chính xác!'}
          </div>
          <button className="btn" onClick={onNextQuestion}>
            CÂU TIẾP THEO <ArrowRight size={24} />
          </button>
        </div>
      )}
    </div>
  );
}
