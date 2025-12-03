import React from "react";
import { useUserStore } from "../store/userStore";

// interface ProfileData {
//   name: string;
//   role: "Frontend" | "Backend" | "Full-Stack";
//   techStack: string[];
//   experience: string;
//   description: string;
//   joiningDate: string;
// }

const Profile: React.FC = () => {
  const { authUser } = useUserStore();
  // Sample data - replace with your actual data

  console.log(authUser);

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "Frontend":
        return "bg-blue-100 text-blue-700";
      case "Backend":
        return "bg-green-100 text-green-700";
      case "Full-Stack":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="h-screen  py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* Header Section */}
          <div className="border-b border-gray-200 pb-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {authUser?.name}
            </h1>
            <div className="flex items-center gap-3 flex-wrap">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleBadgeColor(
                  authUser?.role
                )}`}
              >
                {authUser?.role}
              </span>
              <span className="text-gray-600 text-sm">
                {authUser?.experience} experience
              </span>
            </div>
          </div>

          {/* tech stack */}
          {/* <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {authUser?.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div> */}

          {/* about section */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">About</h2>
            <p className="text-gray-700 leading-relaxed">
              {authUser?.description}
            </p>
          </div>

          {/* joining date */}
          <div className="pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Joined {authUser?.joiningDate}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
