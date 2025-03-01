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
          })
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
    <div>
      {questions.map((q) => (
        <Question key={q.id} id={q.id} type={q.idQuestiontype === 2 ? "multiple_choice" : "text"} text={q.question} options={q.options} onAnswer={(answer) => console.log(`Respuesta a ${q.id}:`, answer)} />
      ))}
    </div>
  );
};

export default Survey;
