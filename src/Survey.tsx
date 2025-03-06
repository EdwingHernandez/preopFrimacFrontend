import React, { useEffect, useState } from "react";
import Question from "./Question";

interface QuestionData {
  id: number;
  question: string;
  idSurvey: number;
  idQuestiontype: number;
  options?: string[];
}

const Survey: React.FC = () => {
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {  
      try {
        const res = await fetch("http://localhost:8080/questions");
        const data: QuestionData[] = await res.json();

        const questionsWithOptions = await Promise.all(
          data.map(async (q) => {
            if (q.idQuestiontype === 2) {
              const optionsRes = await fetch(`http://localhost:8080/options/question/${q.id}`);
              const optionsData = await optionsRes.json();
              return { ...q, options: optionsData.map((opt: any) => opt.text) };
            }
            return q;
          }, [])
        );

        setQuestions(questionsWithOptions);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  if (loading) return <p>Cargando...</p>;

  return (
    // <div>
    //   <h1>Encuesta Preoperacional Vehicular Diaria</h1>
    //   <p>Evalúe el estado de su vehículo diariamente, antes de iniciar su viaje. La presente encuesta tiene como objetivo dar cumplimiento a la Resolución 315 de 2013 y Resolución 40595 de 2022</p>
    //   {questions.map((q) => (
    //     <Question key={q.id} id={q.id} type={q.idQuestiontype === 2 ? "multiple_choice" : "text"} text={q.question} options={q.options} onAnswer={(answer) => console.log(`Respuesta a ${q.id}:`, answer)} />
    //   ))}
    // </div>
            <section id="login_section">
            {/* <div className="image_logo">
                <img src={logoSinLetras} alt="" /> 
            </div> */}

              <h2 className="login_title">Encuesta Preoperacional Vehicular Diaria</h2>
              <p>Evalúe el estado de su vehículo diariamente, antes de iniciar su viaje. La presente encuesta tiene como objetivo dar cumplimiento a la Resolución 315 de 2013 y Resolución 40595 de 2022</p>

              {questions.map((q) => (
                <Question key={q.id} id={q.id} type={q.idQuestiontype === 2 ? "multiple_choice" : "text"} text={q.question} options={q.options} onAnswer={(answer) => console.log(`Respuesta a ${q.id}:`, answer)} />
              ))}
        </section>
  );
};

export default Survey;
