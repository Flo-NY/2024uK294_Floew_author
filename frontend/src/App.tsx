import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage.tsx";
import AuthorsPage from "./components/pages/AuthorsPage.tsx";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to={"login"} />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="authors" element={<AuthorsPage />} />
            <Route path="*" element={<div>not Found</div>} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
