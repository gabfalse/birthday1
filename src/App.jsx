import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Page/HomePage";
import LoginPage from "./Page/LoginPage";
import AdminPage from "./Page/AdminPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/halamandaftarhadir" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}
