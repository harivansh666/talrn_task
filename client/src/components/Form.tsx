import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { axiosInstance } from "../config/axios";

function Form() {
  const [developer, setdeveloper] = useState({
    name: "",
    role: "",
    tech_Stack: "",
    experience: "",
  });

  const [isLoding, setLoding] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setdeveloper({ ...developer, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!developer.name || !developer.role || !developer.tech_Stack) {
      toast.error("Please filll all details");
    }
    if (Number(developer.experience) <= 0) {
      toast.error("Please enter above 0 experience");
      return;
    }

    try {
      setLoding(true);

      const response = await axiosInstance.post("/developers", developer, {
        withCredentials: true,
      });

      if (response.data.success) {
        toast.success("Data saved");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error during saving");
    } finally {
      setdeveloper({
        name: "",
        role: "",
        tech_Stack: "",
        experience: "",
      });
      setLoding(false);
    }
    console.log(developer);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" flex flex-col items-center rounded-lg "
    >
      <div className="flex w-[600px] rounded-lg  bg-white flex-col justify-between gap-4 m-2 items-center">
        <h1 className="font-medium text-2xl p-2">Add Developer</h1>
        <div className="flex justify-start flex-col">
          <label htmlFor="name" className="text-xl font-mono ">
            Name
          </label>
          <input
            type="text"
            name="name"
            className="w-50 bg-green-600 rounded-lg text-white  p-2 border-green-800 border-2"
            value={developer.name}
            onChange={handleChange}
            placeholder="Your Name"
          />
        </div>
        <div className="flex justify-start flex-col">
          <label htmlFor="role" className="text-xl font-mono">
            Role
          </label>
          <select
            name="role"
            onChange={handleChange}
            id="role"
            className="bg-green-600 w-50  text-white rounded-lg p-2 border-green-800 border-2"
          >
            <option
              className="bg-green-600 w-50  text-white rounded-lg  "
              value=""
            >
              Select a role
            </option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend </option>
            <option value="Full-Stack">Full-Stack</option>
          </select>
        </div>
        <div className="flex justify-start flex-col">
          <label htmlFor="tech_Stack" className="text-xl font-mono">
            Tech Stack
          </label>
          <input
            type="text"
            name="tech_Stack"
            className="w-50 bg-green-600 rounded-lg text-white  p-2 border-green-800 border-2"
            value={developer.tech_Stack}
            onChange={handleChange}
            placeholder="Your Tech Stack"
          />
        </div>
        <div className="flex justify-start flex-col">
          <label htmlFor="Experience" className="text-xl font-mono ">
            Experience
          </label>
          <input
            type="text"
            name="experience"
            className="w-50 bg-green-600 rounded-lg text-white  p-2 border-green-800 border-2"
            value={developer.experience}
            onChange={handleChange}
            placeholder="Your Tech Stack"
          />
        </div>

        <button
          type="submit"
          className="w-30 h-12 flex justify-center items-center bg-green-500 p-lg text-white rounded-xl"
        >
          {isLoding ? (
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-neutral-tertiary animate-spin fill-brand "
                viewBox="0 0 100 101"
                fill="grey"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="white"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
          ) : (
            <span className="w-30 font-mono text-center text-1xl">Submit</span>
          )}
        </button>

        <Link
          className="flex w-22 h-12 text-2xl font-medium text-white justify-center  items-center bg-rose-600 rounded-lg"
          to={"/profile"}
        >
          Profile
        </Link>
        <div className="pb-1.5">
          <Link
            to={"/getdevelopers"}
            className=" flex justify-center items-center w-30 h-12 bg-orange-300  rounded-md"
          >
            Check in Db
          </Link>
        </div>
      </div>
    </form>
  );
}

export default Form;
