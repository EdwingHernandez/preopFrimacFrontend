import React from "react";
import Survey from "./Survey";
import LoginSurvey from "./LoginSurvey";

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
        {/* <h1 className="text-2xl font-bold text-center mb-4">Encuesta</h1> */}
        <LoginSurvey />
      </div>
    </div>
  );
};

export default App;
