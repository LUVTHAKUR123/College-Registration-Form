// App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import RegisterationForm from "./pages/RegisterationForm";
import StudentData from "./pages/StudentData";
import { ToastContainer } from "react-toastify";
import { CombineContext } from "./context";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <CombineContext>
        <BrowserRouter>
          <Routes>
            <Route path="/registerationForm" element={<RegisterationForm />} />
            <Route path="/" element={<StudentData />} />
          </Routes>
        </BrowserRouter>
      </CombineContext>
    </>
  );
}

export default App;
