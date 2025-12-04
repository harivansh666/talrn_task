import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="p-4 bg-red-100 text-red-500 rounded text-center">
      <h2 className="font-bold text-1xl">404 - Page Not Found</h2>
      <p className="mt-2">The page you are looking for doesn’t exist.</p>

      <button
        onClick={() => navigate("/signup")}
        className="mt-4 px-3 py-1 bg-blue-600 text-white rounded"
      >
        Go to Signup
      </button>
    </div>
  );
}
