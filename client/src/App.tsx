import { Toaster } from "react-hot-toast";
import Form from "./components/Form";
import { Link, Route, Routes } from "react-router-dom";
import GetDevelopers from "./components/GetDevelopers";

function App() {
  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center bg-blue-600 gap-1.5">
        <Toaster />
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/getdevelopers" element={<GetDevelopers />} />
        </Routes>
        <div className="w-screen h-20 bg-white flex justify-center">
          <h1>
            For getting data Click on{" "}
            <span className="text-red-600">Get Data button</span>
          </h1>
        </div>
      </div>
    </>
  );
}

export default App;
