import { Routes, BrowserRouter, Route, Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./frontEnd/Home";
import "./App.css";
import Addinfo from "./frontEnd/Addinfo";
import View from "./frontEnd/View";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/addContact" element={<Addinfo />} />
        <Route path="/Update/:id" element={<Addinfo />} />
        <Route path="/View/:id" element={<View />} />
      </Routes>
    </BrowserRouter>
  );
} 

export default App;
