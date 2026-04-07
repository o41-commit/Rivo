import React from "react";
import { useState, useEffect } from "react";
import Spinner from "../../componnent/Spinner";
import { IoPersonOutline, IoMailOutline, IoCallOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const getUser = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/user/allusers", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 403 || res.status === 401 || !token) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error, "error fetching data");
    } finally {
      setLoading(false);
    }
  };

  const makeStaff = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8080/user/update/${id}`, {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      getUser();
    } catch (error) {
      console.error(error, "error fetching data");
    } finally {
      setLoading(false);
    }
  };

  const RemoveStaff = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8080/user/disable/${id}`, {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      getUser();
    } catch (error) {
      console.error(error, "error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="min-h-screen bg-[#f6fff9] p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-green-900">
            User Management
          </h2>
          <p className="text-green-800/70 text-sm mt-1">
            Manage your platform users, roles, and communication
          </p>
        </div>

        {/* USERS LIST */}
        <div className="flex flex-col gap-4">
          {loading && <Spinner />}
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm hover:shadow-md transition flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
            >
              {/* USER INFO */}
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className="bg-green-100 p-3 rounded-full">
                  <IoPersonOutline size={22} className="text-green-900" />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-green-900">
                    {user.name}
                  </h3>

                  <div className="flex flex-col text-sm text-green-800/70 mt-1">
                    <span className="flex items-center gap-2">
                      <IoMailOutline size={14} />
                      {user.email}
                    </span>

                    <span className="flex items-center gap-2">
                      <IoCallOutline size={14} />
                      {user.phone}
                    </span>
                    <span>{user.role}</span>
                  </div>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={() => makeStaff(user._id)}
                  className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-green-900 text-white font-medium shadow hover:opacity-90 active:scale-95 transition"
                >
                  Make Staff
                </button>
                <button
                  onClick={() => RemoveStaff(user._id)}
                  className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-red-500 text-white font-medium shadow hover:opacity-90 active:scale-95 transition"
                >
                  Remove Staff
                </button>

                <button className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-white border border-green-900 text-green-900 font-medium hover:bg-green-50 transition">
                  Message
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {users.length === 0 && (
          <div className="text-center mt-10 text-green-800/70">
            No users found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
