import {useEffect, useState} from "react";
import {api} from "../api";
import {Loading} from "./utils";

/**
 * Quizzz Session of the course.
 * It's asking the questions one by one.
 * @param course
 */
export function Session({course}) {
  const [session, setSession] = useState({
    questionIndex: 0,
    results: Array(course.questions.length).fill(false)
  });
  // const [questionIndex, setQuestionIndex] = useState(0);
  // const [results, setResults] = useState(Array(course.questions.length).fill(false));

  async function onAnswer(answer) {
    const result = await api.checkAnswer(course.questions[session.questionIndex], answer);
    setSession(prevSession => {
      const results = prevSession.results.slice();
      results[prevSession.questionIndex] = result;
      return {results, questionIndex: prevSession.questionIndex + 1};
    });
  }

  if (session.questionIndex >= course.questions.length)
    return <Done results={session.results}/>;
  return <>
    <Question course={course} questionIndex={session.questionIndex} onAnswer={onAnswer} />
  </>;
}


function useQuestion(questionId) {
  const [question, setQuestion] = useState(null);
  useEffect(() => {
    api.getQuestion(questionId).then(data => setQuestion(data));
  }, [questionId]);
  return question;
}

function Question({course, questionIndex, onAnswer}) {
  const questionId = course.questions[questionIndex];
  const question = useQuestion(questionId);

  if (!question)
    return <Loading/>;

  return <>
    <h3>{questionIndex + 1} of {course.questions.length}: {question.title}</h3>
    <p>{question.description}</p>
    <SelectOptions options={question.options} onAnswer={onAnswer}/>
  </>;
}

function SelectOptions({id, options, onAnswer}) {
  return <>
    <ul>{options.items.map((item, i) => (
      <li key={`${i}-${item}`}>
        <input
          type="radio"
          name="questionOptions"
          value={i}
          checked=""
          onChange={() => onAnswer({index: i})} />
        {item}
      </li>
    ))}</ul>
  </>;
}

function Done({results}) {
  return <>
    <h3>Done!</h3>
    <p>{`You answered
      ${results.filter(a => a).length}
      of
      ${results.length}
      questions correctly.`}
    </p>
  </>;
}
