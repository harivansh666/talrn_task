import { Routes, Route } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import GetDevelopers from "./GetDevelopers";
import Profile from "../pages/Profile";
import Signup from "../pages/Signup";
import Signin from "../pages/Signin";
import Nav from "./Nav";
import Form from "./Form";
import Usertasks from "../pages/Usertasks";
import DeveloperProfile from "./DeveloperProfile";
import NotFound from "./NotFound";

function RoutesCom() {
  const { authUser } = useUserStore();

  return (
    <div className="w-full h-screen">
      <Nav />

      <Routes>
        <Route path="/" element={<Profile />} />

        <Route
          path="/adddeveloper"
          element={authUser?.isadmin ? <Form /> : " "}
        />

        <Route
          path="/developers"
          element={authUser?.isadmin ? <GetDevelopers /> : <Usertasks />}
        />

        <Route
          path="/developers/developer-detail/:developerId"
          element={<DeveloperProfile />}
        />
        <Route path="/tasks" element={<Usertasks />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default RoutesCom;
