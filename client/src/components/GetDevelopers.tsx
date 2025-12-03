import axios from "axios";
import React, { useEffect, useState } from "react";

interface User {
  name: string;
  role: string;
  tech_Stack: string;
  Experience: string;
}

function GetDevelopers() {
  const [res, setRes] = useState<User[]>([]);

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/developers");
        setRes(response.data.response);
        console.log(response.data.response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDevelopers();
  }, []);

  return (
    <div>
      <div className="flex justify-center items-center">
        <h1 className=" text-white text-2xl font-bold uppercase">
          GetDevelopers
        </h1>
      </div>
      <div className="w-screen p-4 flex flex-row">
        {res.length > 0 ? (
          res.map((user, index) => (
            <div
              key={index}
              className="w-60 bg-orange-400 text-white p-2 rounded m-2"
            >
              <p>Name: {user.name}</p>
              <p>Role: {user.role}</p>
              <p>Tech Stack: {user.tech_Stack}</p>
              <p>Experience: {user.Experience}</p>
            </div>
          ))
        ) : (
          <h2 className="w-60 h-16 p-3 bg-red-600 text-center text-white text-2xl font-bold uppercase">
            Not available
          </h2>
        )}
      </div>
    </div>
  );
}

export default GetDevelopers;
