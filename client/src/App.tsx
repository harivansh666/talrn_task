import { Toaster } from "react-hot-toast";
import Form from "./components/Form";

function App() {
  return (
    <>
      <div className="w-full h-screen bg-blue-600">
        <Toaster />
        <Form />
        <div>Harivansh</div>
      </div>
    </>
  );
}

export default App;
