import React from 'react';
import { IoInformationCircle } from 'react-icons/io5';
import styles from './QuestionsList.module.css';
import { QuestionCard } from '../QuestionCard';

const QuestionsList = ({ questions, update }) => {
  return Array.isArray(questions) && questions.length > 0 ? (
    <div className={styles.list}>
      {questions.map(question => {
        return (
          <QuestionCard
            key={question._id}
            question={question}
            update={update}
          />
        );
      })}
    </div>
  ) : (
    <div className={styles.notfound}>
      <div>
        <IoInformationCircle style={{ marginRight: 10 }} />
        No questions yet
      </div>
    </div>
  );
};

export { QuestionsList };
