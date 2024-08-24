import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import CVPage from "./components/CVPage";
import Admin from "./components/Admin";
import Header from "./components/Header";

const App: React.FC = () => (
  <AppProvider>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<CVPage />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  </AppProvider>
);

export default App;
