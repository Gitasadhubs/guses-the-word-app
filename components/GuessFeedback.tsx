import React from 'react';
import { SparklesIcon, LoaderIcon } from './icons';

interface GuessFeedbackProps {
  feedback: string;
  aiFeedback: string;
  isLoading: boolean;
}

export const GuessFeedback: React.FC<GuessFeedbackProps> = ({ feedback, aiFeedback, isLoading }) => {
  if (!feedback && !isLoading) return null;

  return (
    <div>
      {feedback && <p>{feedback}</p>}
      
      <div>
        {isLoading ? (
          <>
            <LoaderIcon />
            <span>The AI is thinking...</span>
          </>
        ) : aiFeedback ? (
          <>
            <SparklesIcon />
            <span>"{aiFeedback}"</span>
          </>
        ) : null}
      </div>
    </div>
  );
};