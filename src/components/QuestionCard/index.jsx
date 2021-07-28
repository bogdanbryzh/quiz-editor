import React, { useState } from 'react';

import { AnswersList } from '../AnswersList';

const QuestionCard = ({ question }) => {
  const [contentEditable, setContentEditable] = useState(false);

  const { answers } = question;

  return (
    <div>
      <button>delete</button>
      <button
        onClick={() => {
          setContentEditable(true);
        }}
      >
        edit
      </button>
      {contentEditable && (
        <button
          onClick={() => {
            setContentEditable(false);
          }}
        >
          save
        </button>
      )}
      <h3 contentEditable={contentEditable}>{question.question}</h3>
      <AnswersList answers={answers} editable={contentEditable} />
    </div>
  );
};

export { QuestionCard };
