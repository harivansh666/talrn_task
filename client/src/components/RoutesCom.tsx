import { Routes, Route } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import GetDevelopers from "./GetDevelopers";
import Profile from "../pages/Profile";
import Signup from "../pages/Signup";
import Signin from "../pages/Signin";
import Nav from "./Nav";
import Form from "./Form";
import Usertasks from "../pages/Usertasks";

function RoutesCom() {
  const { authUser } = useUserStore();
  console.log(authUser);

  return (
    <div className="w-full h-screen">
      <Nav />

      <Routes>
        <Route path="/" element={<Profile />} />

        <Route
          path="/adddeveloper"
          element={authUser?.isadmin ? <Form />: " "}
        />

        <Route
          path="/developers"
          element={authUser?.isadmin ? <GetDevelopers /> : <Usertasks />}
        />

        <Route path="/tasks" element={<Usertasks />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default RoutesCom;
