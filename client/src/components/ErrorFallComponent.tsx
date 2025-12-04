function ErrorFallComponent({ error }) {
  const handleTO = () => {
    window.location.href = "/signin";
  };
  return (
    <div role="alert" className="p-4 bg-red-100 text-red-700 rounded">
      <h2 className="font-bold text-black">Something went wrong</h2>
      <p>{error.message}</p>

      <button
        onClick={handleTO}
        className="mt-2 px-3 py-1 bg-blue-600 text-white rounded"
      >
        Try again
      </button>
    </div>
  );
}

export default ErrorFallComponent;
