import React, { useEffect, useState, useRef } from "react";
import Question from "./Question";
import logoSinLetras from "./assets/logo-frimac_sin_letras.webp"
import { useParams } from "react-router-dom";

const Survey: React.FC = () => {
  const { surveyId } = useParams();
  const [dataSurvey, setDataSurvey] = useState<any>({});
  const [questions, setQuestions] = useState<[]>([]);

  const effectRan = useRef(false);

  useEffect(() => {
    if (!effectRan.current) {
      effectRan.current = true;
  
      fetch("http://Localhost:8080/surveys/withQuestionsOptions/" + surveyId)
        .then((responseSurveys) => responseSurveys.json())
        .then((dataSurvey) => {
          const questions = dataSurvey.questionsDTO;
          setDataSurvey(dataSurvey);
          setQuestions(questions);
        });
    }
  }, []);

  return (
    <section id="login_section">
      <img src={logoSinLetras}></img>
      <h2 className="login_title">{dataSurvey.nameSurvey}</h2>
      <p>{dataSurvey.descriptionSurvey}</p>

      {Array.isArray(questions) && questions.map((q: any) => (
        <Question key={String(q.id)} id={q.id} type={q.idQuestiontype === 2 ? "multiple_choice" : "text"} text={q.question} options={q.optionsDTO || []} onAnswer={(answer) => console.log(`Respuesta a ${q.id}:`, answer)} />
      ))}
    </section>
  );
};

export default Survey;
