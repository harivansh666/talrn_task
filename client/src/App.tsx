import { Toaster } from "react-hot-toast";
import RoutesCom from "./components/RoutesCom";

function App() {
  return (
    <>
      <div className="w-full h-screen  flex flex-col md:flex-col justify-center items-center bg-blue-600 gap-1.5">
        <Toaster />

        <RoutesCom />

        <div className="w-screen h-28 overflow-y-auto bg-white flex justify-center gap-6 ">
          <h1>
            For getting data Click on{" "}
            <span className="text-red-600">Get Data button</span>
          </h1>
          <div className="flex flex-col md:flex-row gap-2 md:gap-6">
            <h1>Name: Harivansh</h1>
            <h1>email: jazzz1815@gmail.com</h1>

            <h1>Mobile no: 98154 01912</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
