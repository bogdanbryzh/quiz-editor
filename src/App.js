import React, { useState, useEffect } from 'react';
import Protect from 'react-app-protect';
import 'react-app-protect/dist/index.css';

import styles from './editor.module.css';

import axios from 'axios';
import { URI } from './config';

import { QuestionEditor } from './components/QuestionEditor';
import { QuestionsList } from './components/QuestionsList';

const Loading = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.loading}></div>
    </div>
  );
};

const Editor = ({ questions, update }) => {
  return (
    <Protect
      sha512='b109f3bbbc244eb82441917ed06d618b9008dd09b3befd1b5e07394c706a8bb980b1d7785e5976ec049b46df5f1326af5a2ea6d103fd07c95385ffab0cacbc86'
      blur={true}
    >
      <div className={styles.editor}>
        <QuestionEditor update={update} />
        <QuestionsList questions={questions} />
      </div>
    </Protect>
  );
};

function App() {
  const [loading, setLoading] = useState(true);
  const [questionsVersion, setQuestionsVersion] = useState('0.0.0');
  const [questionsJSON, setQuestionsJSON] = useState({});
  const [updateQuestions, setUpdateQuestions] = useState(false);

  useEffect(() => {
    axios
      .get(`${URI}/version`)
      .then(version => {
        setQuestionsVersion(version.data.version);
      })
      .catch(console.error)
      .finally(console.log);
    axios
      .get(`${URI}/questions`)
      .then(questions => {
        setQuestionsJSON(questions.data);
        setLoading(false);
      })
      .catch(error => {
        if (error.response.status === 404) {
          setQuestionsJSON({});
          return setLoading(false);
        }
        console.error(error);
      })
      .finally(console.log);
  }, []);

  useEffect(() => {
    axios
      .get(`${URI}/version`)
      .then(version => {
        setQuestionsVersion(version.data.version);
      })
      .catch(console.error)
      .finally(console.log);
    updateQuestions &&
      axios
        .get(`${URI}/questions`)
        .then(questions => {
          setQuestionsJSON(questions.data);
          setLoading(false);
        })
        .catch(error => {
          if (error.response.status === 404) {
            setQuestionsJSON({});
            return setLoading(false);
          }
          console.error(error);
        })
        .finally(() => {
          setUpdateQuestions(false);
        });
  }, [updateQuestions]);

  return loading ? (
    <Loading />
  ) : (
    <>
      <div className={styles.version}>
        <code>v: {questionsVersion}</code>
      </div>
      <Editor questions={questionsJSON} update={setUpdateQuestions} />
    </>
  );
}

export { App };
