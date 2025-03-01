import React from "react";

interface MultipleChoiceProps {
  options: string[];
  onAnswer: (answer: string) => void;
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceProps> = ({ options, onAnswer }) => {
  return (
    <div className="mt-2">
      <select
        onChange={(e) => onAnswer(e.target.value)}
        className="w-full p-2 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Selecciona una opción...</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MultipleChoiceQuestion;
