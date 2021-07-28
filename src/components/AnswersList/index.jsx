import React, { useState } from 'react';

import styles from './AnswersList.module.css';

const Answer = ({ answer, editable, update }) => {
  const [answerText, setAnswerText] = useState(answer.answer);
  const answerId = answer._id;

  return (
    <p
      className={styles.answer}
      data-correct={answer.correct}
      key={answerId}
      contentEditable={editable}
      suppressContentEditableWarning={true}
      onBlur={e => {
        setAnswerText(e.target.textContent);
        update(answerId, e.target.textContent);
      }}
    >
      {answerText}
    </p>
  );
};

const AnswersList = ({ answers, editable, update }) => {
  return answers ? (
    <div className={styles.answers}>
      {answers.map(answer => {
        return (
          <Answer
            editable={editable}
            answer={answer}
            update={update}
            key={answer._id}
          />
        );
      })}
    </div>
  ) : null;
};

export { AnswersList };
