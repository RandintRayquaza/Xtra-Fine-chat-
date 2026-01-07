import React, { useState } from "react";
import { MessageCircle, LogOut, Search } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const { authUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  // 🔹 Mock online users (replace with backend/socket later)
  const onlineUsers = [
    { id: 1, username: "alex" },
    { id: 2, username: "sara" },
    { id: 3, username: "john" },
    { id: 4, username: "maria" },
  ];

  const filteredUsers = onlineUsers.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase())
  );

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <aside className="w-72 h-full bg-white border-r border-black/10 flex flex-col">
      
      {/* HEADER */}
      <div className="p-5 border-b border-black/10 flex items-center gap-3">
        <MessageCircle />
        <span className="font-semibold text-lg">Chats</span>
      </div>

      {/* USER INFO */}
      <div className="px-5 py-4 border-b border-black/10">
        <p className="text-sm text-gray-500">Logged in as</p>
        <p className="font-medium text-gray-900">
          {authUser?.username || "Guest"}
        </p>
      </div>

      {/* SEARCH BAR */}
      <div className="p-4 border-b border-black/10">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full pl-9 pr-3 py-2.5
              rounded-xl
              border border-black/10
              text-sm
              focus:outline-none focus:ring-2 focus:ring-black/10
            "
          />
        </div>
      </div>

      {/* ONLINE USERS */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className="
                flex items-center gap-3
                p-3 rounded-xl cursor-pointer
                hover:bg-black/5 transition
              "
            >
              {/* Online indicator */}
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <p className="font-medium text-gray-900">
                {user.username}
              </p>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 text-center mt-6">
            No users found
          </p>
        )}
      </div>

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        className="m-4 mt-auto flex items-center gap-2 text-sm text-red-600 hover:underline"
      >
        <LogOut size={16} />
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;
