import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage.tsx";
import AuthorsPage from "./components/pages/AuthorsPage.tsx";
import RegisterPage from "./components/pages/RegisterPage.tsx";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to={"/login"} />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/authors" element={<AuthorsPage />} />
            <Route path="*" element={<Navigate to={"/login"} />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
