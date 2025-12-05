import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import { Trash2 } from "lucide-react";

type Developer = {
  _id: string;
  name: string;
  role: string;
  tech_Stack: string[];
  experience: string;
};

function GetDevelopers() {
  const {
    isLoding,
    developers,
    fetchDevelopers,
    DeleteDeveloper,
    getFilterData,
  } = useUserStore();

  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const [filteredDevelopers, setFilteredDevelopers] = useState<Developer[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchDevelopers();
  }, [fetchDevelopers]);

  useEffect(() => {
    console.log("Developers updated:", developers);
  }, [developers, getFilterData]);

  useEffect(() => {
    if (!developers) {
      setFilteredDevelopers([]);
      return;
    }

    if (query.trim() === "") {
      setFilteredDevelopers(developers);
    } else {
      const searchQuery = query.toLowerCase().trim();
      const filtered = developers.filter((dev) => {
        try {
          const searchWords = searchQuery.split(/\s+/);

          return searchWords.every((word) => {
            const nameMatch = dev.name?.toLowerCase().includes(word);
            const roleMatch = dev.role?.toLowerCase().includes(word);
            const expMatch = dev.experience
              ?.toString()
              .toLowerCase()
              .includes(word);
            const techMatch = dev.tech_Stack.some((tech) =>
              tech?.trim().toLowerCase().includes(word)
            );

            return nameMatch || roleMatch || expMatch || techMatch;
          });
        } catch (error) {
          console.error("Error filtering developer:", error);
          return false;
        }
      });
      setFilteredDevelopers(filtered);
    }
  }, [query, developers]);

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this developer?"
      );
      if (confirmed) {
        await DeleteDeveloper(id);
      }
    } catch (error) {
      console.error("Error deleting developer:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuery(value);
  };

  return (
    <div className="h-screen py-8">
      <div className="flex justify-center items-center flex-col mb-4">
        <h1 className="text-white text-2xl font-bold uppercase mb-4">
          Get Developers
        </h1>
        <input
          type="text"
          ref={inputRef}
          value={query}
          onChange={handleChange}
          placeholder="Search by name, role, tech stack, or experience..."
          className="w-full placeholder:text-white placeholder:opacity-40 max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
        {query && (
          <p className="text-gray-300 text-sm mt-2">
            Found {filteredDevelopers.length} developer(s)
          </p>
        )}
        <div className="flex flex-row mt-2 gap-4 ">
          <button
            name="role"
            className={
              isLoding
                ? "w-18 h-12 bg-white rounded-lg  font-normal"
                : "w-18 h-12 bg-white rounded-lg hover:bg-gray-200 font-medium "
            }
            onClick={(e) => getFilterData("All")}
          >
            All
          </button>
          <button
            name="role"
            className={
              isLoding
                ? "w-18 h-12 bg-white rounded-lg  font-normal scale-50"
                : "w-18 h-12 bg-white rounded-lg hover:bg-gray-200 font-medium  "
            }
            onClick={(e) => getFilterData("Full-Stack")}
          >
            Fullstack
          </button>
          <button
            name="role"
            className={
              isLoding
                ? "w-18 h-12 bg-white rounded-lg  font-normal"
                : "w-18 h-12 bg-white rounded-lg hover:bg-gray-200 font-medium "
            }
            onClick={(e) => getFilterData("Backend")}
          >
            Backend
          </button>

          <button
            name="role"
            className={
              isLoding
                ? "w-18 h-12 bg-white rounded-lg  font-normal"
                : "w-18 h-12 bg-white rounded-lg hover:bg-gray-200 font-medium "
            }
            onClick={(e) => getFilterData("Frontend")}
          >
            Frontend
          </button>
          <button
            name="Sort"
            className={
              isLoding
                ? "w-24 h-12 bg-white rounded-lg  font-normal"
                : "w-24 h-12 bg-white rounded-lg hover:bg-gray-200 font-medium "
            }
            onClick={(e) => getFilterData("sort")}
          >
            Sorting by experience
          </button>
        </div>
      </div>

      {isLoding && (
        <p className="text-center text-orange-400 font-semibold">Loading...</p>
      )}

      <div className="w-screen p-4 flex flex-row flex-wrap justify-center">
        {filteredDevelopers && filteredDevelopers.length > 0 ? (
          filteredDevelopers.map((user) => (
            <div
              key={user._id}
              onClick={() => {
                navigate(`developer-detail/${user._id}`);
              }}
              className="w-64 bg-orange-400 text-white p-4 rounded-lg m-2 cursor-pointer hover:bg-orange-500 transition shadow-lg"
            >
              <div className="mb-3">
                <p className="font-bold text-lg mb-1">
                  {user.name
                    ? user.name.charAt(0).toUpperCase() + user.name.slice(1)
                    : "Unknown"}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Role:</span>{" "}
                  {user.role || "n/a"}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Experience:</span>{" "}
                  {user.experience || "n/a"} years
                </p>
                <p className="text-sm mt-2">
                  <span className="font-semibold">Tech Stack:</span>
                </p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {user.tech_Stack && user.tech_Stack.length > 0 ? (
                    user.tech_Stack.map((tech, index) => (
                      <span
                        key={index}
                        className="text-xs bg-white text-orange-600 px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs">No tech stack</span>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center mt-3 pt-3 border-t border-orange-300">
                <p className="text-xs">Click for full profile</p>
                <Trash2
                  className={
                    isLoding
                      ? "animate-pulse text-yellow-300"
                      : "text-red-600 hover:text-red-800 transition"
                  }
                  size={20}
                  onClick={(e) => handleDelete(e, user._id)}
                />
              </div>
            </div>
          ))
        ) : !isLoding ? (
          <div className="text-center">
            <h2 className="w-60 h-16 p-3 bg-red-600 text-center text-white text-xl font-bold uppercase rounded">
              {query ? "No developers found" : "Not available"}
            </h2>
            {query && (
              <p className="text-gray-400 mt-2">
                Try searching with different keywords
              </p>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default GetDevelopers;

// useEffect(() => {
//   if (!developers) {
//     setFilteredDevelopers([]);
//     return;
//   }

//   // Filter developers whenever query or developers list changes
//   if (query.trim() === "") {
//     setFilteredDevelopers(developers); // sare aa jande aa developers jo array vich aa type kran te filter hunde aa
//   } else {
//     const searchQuery = query.toLowerCase();
//     const filtered = developers.filter((dev) => {
//       try {
//         return (
//           dev.name?.toLowerCase().includes(searchQuery) ||
//           dev.role?.toLowerCase().includes(searchQuery) ||
//           dev.experience?.includes(searchQuery) ||
//           dev.tech_Stack.some((tech) =>
//             tech?.toLowerCase().includes(searchQuery.toLowerCase())
//           )
//         );
//       } catch (error) {
//         console.error("Error filtering developer:", error);
//         return false;
//       }
//     });
//     setFilteredDevelopers(filtered);
//   }
// }, [query, developers]);
