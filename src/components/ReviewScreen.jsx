import React from 'react';
import { RotateCcw, ArrowLeft } from 'lucide-react';

export default function ReviewScreen({ questions, userAnswers, onRestart }) {
  return (
    <div className="card" style={{ padding: '2rem', textAlign: 'left' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ margin: 0 }}>Xem Lại Đáp Án</h2>
        <button className="btn" style={{ padding: '0.5rem 1rem', fontSize: '1rem' }} onClick={onRestart}>
          <RotateCcw size={16} /> LÀM LẠI
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {questions.map((q, index) => {
          const userAnswerIndex = userAnswers[index];
          const isCorrect = userAnswerIndex === q.correctAnswer;

          return (
            <div key={q.id} className="review-item">
              <h4>Câu {index + 1}: {q.question}</h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div className={`review-option ${isCorrect ? 'correct' : 'incorrect'}`}>
                  <strong>Bạn chọn: </strong> 
                  {userAnswerIndex !== null ? `${String.fromCharCode(65 + userAnswerIndex)}. ${q.options[userAnswerIndex]}` : 'Không trả lời'}
                  {isCorrect ? ' (Đúng)' : ' (Sai)'}
                </div>
                
                {!isCorrect && (
                  <div className="review-option correct">
                    <strong>Đáp án đúng: </strong>
                    {String.fromCharCode(65 + q.correctAnswer)}. {q.options[q.correctAnswer]}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-8 text-center">
        <button className="btn" onClick={onRestart}>
          <RotateCcw size={20} /> LÀM LẠI
        </button>
      </div>
    </div>
  );
}
