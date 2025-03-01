import React, { useState } from "react";

interface OpenQuestionProps {
  onAnswer: (answer: string) => void;
}

const OpenQuestion: React.FC<OpenQuestionProps> = ({ onAnswer }) => {
  const [answer, setAnswer] = useState("");

  return (
    <div className="mt-2">
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        onBlur={() => onAnswer(answer)}
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Escribe tu respuesta..."
      />
    </div>
  );
};

export default OpenQuestion;
