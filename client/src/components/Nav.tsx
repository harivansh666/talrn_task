import { Link } from "react-router-dom";
import { useUserStore } from "../store/userStore";

const Nav = () => {
  const { authUser } = useUserStore();

  return (
    <nav className="w-full bg-blue-500 text-white p-4 flex items-center gap-6">
      <Link to={"/"} className="text-xl font-semibold">
        {" "}
        Developer Directory{" "}
      </Link>

      <ul className="flex gap-5">
        {/* Admin links */}
        {authUser?.isadmin && (
          <>
            <li>
              <Link to="/adddeveloper">Add Developer</Link>
            </li>
            <li>
              <Link to="/developers">List</Link>
            </li>
          </>
        )}

        {/* Always visible */}
        <li>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
