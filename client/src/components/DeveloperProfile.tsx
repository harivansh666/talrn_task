import React, { useEffect, useState } from "react";
import { useUserStore } from "../store/userStore";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import ProfileImage from "./ProfileImage";

type Developer = {
  _id: string;
  name: string;
  role: string;
  tech_Stack: string[];
  experience: string;
  createdAt?: string;
  imgUrl: string;
};

type FormData = {
  name: string;
  role: string;
  tech_Stack: string;
  experience: string;
};

const DeveloperProfile: React.FC = () => {
  const [currentDeveloper, setCurrentDeveloper] = useState<Developer | null>();
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    role: "",
    tech_Stack: "",
    experience: "",
  });

  const { developers, fetchDevelopers, updateDeveloper, authUser } =
    useUserStore();
  const { developerId } = useParams<{ developerId: string }>();

  useEffect(() => {
    console.log("developers", developers);
    if (developers.length <= 0) {
      fetchDevelopers();
    }
  }, [fetchDevelopers]);

  useEffect(() => {
    if (developers.length > 0 && developerId) {
      const dev = developers.find((d) => d._id === developerId);
      console.log("dev:::", dev);
      setCurrentDeveloper(dev);

      if (dev) {
        setFormData({
          name: dev.name,
          role: dev.role,
          tech_Stack: dev.tech_Stack.join(", "),
          experience: dev.experience,
        });
      }

      setLoading(false);
    }
  }, [developerId]);

  const getRoleBadgeColor = (role?: string) => {
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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!developerId) return;

    if (
      !formData.name ||
      !formData.role ||
      !formData.tech_Stack ||
      !formData.experience
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    const result = await updateDeveloper(developerId, formData);

    if (result.success) {
      setIsEditing(false);
      fetchDevelopers();
    }
  };

  const handleCancel = () => {
    if (currentDeveloper) {
      setFormData({
        name: currentDeveloper.name,
        role: currentDeveloper.role,
        tech_Stack: currentDeveloper.tech_Stack.join(", "),
        experience: currentDeveloper.experience,
      });
    }
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading developer profile...</p>
      </div>
    );
  }

  if (!currentDeveloper) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Developer Not Found
          </h2>
          <p className="text-gray-600">
            The developer profile you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <ProfileImage imgUrl={currentDeveloper.imgUrl} />

          {/* Edit Button */}

          {authUser?.isadmin && (
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              >
                Edit Profile
              </button>
            </div>
          )}

          {isEditing ? (
            /* Edit Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role *
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select a role</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Full-Stack">Full-Stack</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tech Stack * (comma separated)
                </label>
                <input
                  type="text"
                  name="tech_Stack"
                  value={formData.tech_Stack}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="React, Node.js, MongoDB"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Experience (years) *
                </label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="2.5"
                  required
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              {/* Head Section */}
              <div className="border-b border-gray-200 pb-6 mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {currentDeveloper.name
                    ? currentDeveloper.name.charAt(0).toUpperCase() +
                      currentDeveloper.name.slice(1).toLowerCase()
                    : "N/A"}
                </h1>
                <div className="flex items-center gap-3 flex-wrap">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleBadgeColor(
                      currentDeveloper.role
                    )}`}
                  >
                    {currentDeveloper.role}
                  </span>
                  <span className="text-gray-600 text-sm">
                    {currentDeveloper.experience} years experience
                  </span>
                </div>
              </div>

              {/* Tech sra*/}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  Tech Stack
                </h2>
                <div className="flex flex-wrap gap-2">
                  {currentDeveloper.tech_Stack &&
                  currentDeveloper.tech_Stack.length > 0 ? (
                    currentDeveloper.tech_Stack.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
                      >
                        {tech}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500">No tech stack specified</p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeveloperProfile;
