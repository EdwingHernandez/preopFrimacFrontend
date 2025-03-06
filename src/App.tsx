import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Survey from "./Survey";
import LoginSurvey from "./LoginSurvey";
import SigninUser from "./SigninUser";

const App: React.FC = () => {
  return (
    // <div>
    //     {/* <h1 className="text-2xl font-bold text-center mb-4">Encuesta</h1> */}
    //     <SigninUser />
    // </div>
    <Router basename="/preopFrimacFrontend">
    <Routes>
      <Route path="/" element={<Navigate to="/Survey" />} />
      <Route path="/LoginSurvey" element={<LoginSurvey />} />
      <Route path="/SigninUser" element={<SigninUser />} />
      <Route path="/Survey" element={<Survey />} />
    </Routes>
  </Router>
  );
};

export default App;
