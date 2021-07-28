import React, { useState } from 'react';
import { IoAddOutline, IoCloseOutline } from 'react-icons/io5';

import axios from 'axios';
import { URI } from '../../config';

import styles from './QuestionEditor.module.css';

const QuestionEditor = ({ update }) => {
  const [answersList, setAnswersList] = useState([
    { answer: '', correct: true },
  ]);
  const [question, setQuestion] = useState('');
  const [saveBtn, setSaveBtn] = useState('save');

  const handleQuestionChange = e => {
    const { value } = e.target;

    setQuestion(value);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;

    const list = [...answersList];
    list[index][name] = value;

    setAnswersList(list);
  };

  const handleRadioChange = index => {
    let list = [...answersList];
    list = list.map(answer => {
      answer.correct = false;
      return answer;
    });
    list[index]['correct'] = true;

    setAnswersList(list);
  };

  const handleAddClick = () => {
    setAnswersList(actualList => [
      ...actualList,
      { answer: '', correct: false },
    ]);
  };

  const handleRemoveClick = index => {
    const list = [...answersList];
    list.splice(index, 1);

    list.length === 1
      ? setAnswersList([{ answer: '', correct: true }])
      : setAnswersList(list);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSaveBtn('saving');

    const list = [...answersList];

    if (list.every(({ answer }) => answer !== '') && question) {
      const response = {
        question: question,
        answers: list.map(answer => answer),
      };

      axios
        .post(`${URI}/questions`, response)
        .then(resp => {
          update(true);
          setQuestion('');
          setSaveBtn('save');
          setAnswersList([{ answer: '', correct: true }]);
        })
        .catch(console.error);

      console.log(JSON.stringify(response));
    }
  };

  const handleClear = e => {
    e.preventDefault()
    setQuestion('');
    setAnswersList([{ answer: '', correct: true }]);
  };

  return (
    <form className={styles.new} onSubmit={handleSubmit}>
      <h3>New question</h3>
      <input
        type='text'
        required={true}
        name='question'
        placeholder='Question'
        value={question}
        onChange={handleQuestionChange}
      />
      {answersList.map((x, i) => {
        return (
          <div className={styles.newanswer} key={i}>
            <input
              type='text'
              required={true}
              name='answer'
              placeholder='Answer'
              value={x.answer}
              onChange={e => handleInputChange(e, i)}
            />
            <div className={styles.answercontrols}>
              <input
                type='radio'
                tabIndex='0'
                name='correct'
                id={`correct${i}`}
                checked={x.correct}
                onChange={() => {
                  console.log(i);
                  handleRadioChange(i);
                }}
              />

              {answersList.length - 1 === i && (
                <IoAddOutline
                  className={styles.add}
                  tabIndex='0'
                  size='1.5em'
                  color='#ffffff'
                  onClick={handleAddClick}
                  onKeyPress={e => {
                    e.preventDefault();
                    handleAddClick(e);
                  }}
                />
              )}
              {answersList.length !== 1 && (
                <IoCloseOutline
                  className={styles.remove}
                  tabIndex='0'
                  size='1.5em'
                  color='#ffffff'
                  onClick={() => handleRemoveClick(i)}
                  onKeyPress={e => {
                    e.preventDefault();
                    handleRemoveClick(i);
                  }}
                />
              )}
            </div>
          </div>
        );
      })}
      <div className={styles.buttons}>
        <p
          className={styles.clear}
          data-active={
            question || answersList.length > 1 || answersList[0].answer !== ''
              ? 'true'
              : 'false'
          }
          onClick={handleClear}
        >
          clear
        </p>
        <input
          type='submit'
          value={saveBtn}
          disabled={saveBtn === 'saving' ? true : false}
        />
      </div>
    </form>
  );
};

export { QuestionEditor };
