import React, { useState, type FormEvent } from "react";

function Form() {
  const [developer, setdeveloper] = useState({
    name: "",
    role: "",
    tech_Stack: "",
    Experience: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;

    setdeveloper({ ...developer, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className=" w-full h-screen flex justify-center items-center bg-blue-600 ">
      <form
        onSubmit={handleSubmit}
        className="w-[600px] h-90 bg-white flex flex-col items-center rounded-lg"
      >
        <h1 className="font-medium text-2xl">Add Developer</h1>
        <div className=" flex flex-row justify-between gap-4 p-8 items-center">
          <label htmlFor="name" className="">Name</label>
          <input
            type="text"
            name="name"
            className="w-50 h-12 bg-green-600 rounded-lg text-white  p-2"
            value={developer.name}
            onChange={handleChange}
          />
          <label htmlFor="name">Role</label>
          <select
            name="role"
            onChange={handleChange}
            id="role"
            className="bg-green-600 w-40  text-white rounded-lg p-2"
          >
            <option
              className="bg-green-600 w-40  text-white rounded-lg border-green-800 border-2 "
              value=""
            >
              Select a role
            </option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend </option>
            <option value="Full-Stack">Full-Stack</option>
          </select>
        </div>
      </form>
    </div>
  );
}

export default Form;
