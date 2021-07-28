import React, { useState } from 'react';
import axios from 'axios';
import { URI } from '../../config';
import {
  IoTrashOutline,
  IoPencilOutline,
  IoCloseOutline,
  IoCloudUploadOutline,
  IoCloudDoneOutline,
} from 'react-icons/io5';

import styles from './QuestionCard.module.css';

import { AnswersList } from '../AnswersList';

const Loader = () => {
  return <div className={styles.loader}></div>;
};

const QuestionCard = ({ question, update }) => {
  const [contentEditable, setContentEditable] = useState(false);
  const [deleting, setDeleting] = useState('no');
  const [saving, setSaving] = useState('saved');

  const [title, setTitle] = useState(question.question);
  const [answers, setAnswers] = useState(question.answers);

  const questionId = question._id;

  const handleChange = e => {
    setTitle(e.target.textContent);

    setSaving('no');
  };

  const handleAnswerChange = (id, answer) => {
    const newAnswers = answers.map(a => {
      if (a._id === id) {
        a.answer = answer;
        return a;
      }
      return a;
    });
    setAnswers(newAnswers);
    setSaving('no');
  };

  const handleDelete = () => {
    setDeleting('deleting');

    axios
      .delete(`${URI}/questions/${questionId}`)
      .then(() => {
        setDeleting('done');
        update(true);
      })
      .catch(console.error);
  };

  const handleSave = () => {
    setSaving('saving');

    axios
      .patch(`${URI}/questions/${questionId}`, {
        _id: questionId,
        question: title,
        answers: answers,
      })
      .then(() => {
        setSaving('saved');
        setTimeout(() => {
          setContentEditable(false);
          update(true);
        }, 1000);
      });
  };

  return (
    <div className={styles.card} data-question-id={questionId}>
      <div className={styles.header}>
        <h4
          contentEditable={contentEditable}
          suppressContentEditableWarning={true}
          className={styles.title}
          onBlur={handleChange}
        >
          {title}
        </h4>
        <div className={styles.controls}>
          {contentEditable && saving === 'no' ? (
            <IoCloudUploadOutline size='20px' onClick={handleSave} />
          ) : contentEditable && saving === 'saving' ? (
            <Loader />
          ) : contentEditable && saving === 'saved' ? (
            <IoCloudDoneOutline size='20px' />
          ) : null}

          {contentEditable ? (
            <IoCloseOutline
              size='20px'
              onClick={() => setContentEditable(false)}
            />
          ) : (
            <IoPencilOutline
              size='20px'
              onClick={() => setContentEditable(true)}
            />
          )}
          {deleting === 'no' ? (
            <IoTrashOutline size='20px' onClick={handleDelete} />
          ) : deleting === 'deleting' ? (
            <Loader />
          ) : deleting === 'done' ? (
            <IoCloudDoneOutline size='20px' />
          ) : null}
        </div>
      </div>

      <AnswersList
        answers={answers}
        editable={contentEditable}
        update={handleAnswerChange}
      />
    </div>
  );
};

export { QuestionCard };
