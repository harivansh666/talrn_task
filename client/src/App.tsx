import { Toaster } from "react-hot-toast";
import { useUserStore } from "../src/store/userStore";
import RoutesCom from "./components/RoutesCom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./components/Footer";

function App() {
  const { authUser } = useUserStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!authUser) {
      navigate("/signup");
    }
  }, [authUser]);

  return (
    <>
      <div className="w-full h-screen  flex flex-col md:flex-col justify-center items-center bg-blue-600 gap-1.5">
        <Toaster />

        <RoutesCom />
        <Footer />
      </div>
    </>
  );
}

export default App;
