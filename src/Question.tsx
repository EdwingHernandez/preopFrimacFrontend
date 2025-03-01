import React from "react";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import OpenQuestion from "./OpenQuestion";

interface QuestionProps {
  id: number;
  type: "multiple_choice" | "text";
  text: string;
  options?: string[];
  onAnswer: (answer: string) => void;
}

const Question: React.FC<QuestionProps> = ({ id, type, text, options, onAnswer }) => {
  return (
    <div className="p-4 border rounded bg-white shadow-md">
      <p className="font-semibold text-gray-700">{text}</p>
      {type === "multiple_choice" && options ? (
        <MultipleChoiceQuestion options={options} onAnswer={onAnswer} />
      ) : (
        <OpenQuestion onAnswer={onAnswer} />
      )}
    </div>
  );
};

export default Question;
