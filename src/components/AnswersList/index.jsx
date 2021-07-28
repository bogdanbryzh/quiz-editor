import React from 'react';

const AnswersList = ({ answers }) => {
  return answers
    ? answers.map(answer => {
        return (
          <p key={answer._id}>
            {answer.answer}
            <span>{answer.correct === true ? '(*)' : null}</span>
          </p>
        );
      })
    : null;
};

export { AnswersList };
