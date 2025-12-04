import { useState } from "react";
import { useUserStore } from "../store/userStore";
import toast from "react-hot-toast";

export default function Signup() {
  const { signup } = useUserStore();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    tech_Stack: "",
    experience: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.email ||
      !form.password ||
      !form.description ||
      !form.name ||
      !form.role ||
      !form.tech_Stack ||
      !form.experience
    ) {
      toast.error("Please fill all details");
      return; // Add return here
    }

    if (Number(form.experience) <= 0) {
      toast.error("Please enter above 0 experience");
      return;
    }

    setLoading(true);

    try {
      const result = await signup(form);
      console.log(result);
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-4 md:p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={form.name}
              autoComplete="name"
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              placeholder="Your full name"
              required
            />
          </div>

          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Role
          </label>
          <select
            name="role"
            onChange={handleChange}
            id="role"
            className=" w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          >
            <option className="" value="">
              Select a role
            </option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend </option>
            <option value="Full-Stack">Full-Stack</option>
          </select>
          <label
            htmlFor="tech_Stack"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Tech Stack
          </label>
          <input
            type="text"
            name="tech_Stack"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            value={form.tech_Stack}
            onChange={handleChange}
            placeholder="Your Tech Stack"
          />
          <label
            htmlFor="Experience"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Experience
          </label>
          <input
            type="text"
            name="experience"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            value={form.experience}
            onChange={handleChange}
            placeholder="Experience"
          />
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <input
            type="text"
            name="description"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
          />

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              placeholder="example@gmail.com"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              autoComplete="new-password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/signin"
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
