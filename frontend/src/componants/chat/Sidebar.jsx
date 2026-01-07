import React, { useEffect, useState } from "react";
import { Search, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/userSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Sidebar({ onSelectUser }) {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://fictional-orbit-q7g69rj67ggpc96jg-8000.app.github.dev/api/v1/users/other-users", {
        withCredentials: true,
      })
      .then((res) => setUsers(res.data.users))
      .catch(console.error);
  }, []);

  const handleLogout = async () => {
    await axios.get(
      "https://fictional-orbit-q7g69rj67ggpc96jg-8000.app.github.dev/api/v1/users/logout",
      { withCredentials: true }
    );
    dispatch(logoutUser());
    navigate("/");
  };

  const filtered = users.filter((u) =>
    u.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <aside className="h-full bg-white border-r border-black/10 flex flex-col">
      <div className="p-4 border-b font-semibold">Chats</div>

      <div className="p-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filtered.map((user) => (
          <div
            key={user._id}
            onClick={() => onSelectUser(user)}
            className="flex items-center gap-3 px-4 py-3 hover:bg-black/5 cursor-pointer"
          >
            <img
              src={user.profilePhoto}
              alt=""
              className="w-9 h-9 rounded-full"
            />
            <span>{user.username}</span>
          </div>
        ))}
      </div>

      <button
        onClick={handleLogout}
        className="m-4 flex items-center gap-2 text-sm text-red-600"
      >
        <LogOut size={16} /> Logout
      </button>
    </aside>
  );
}

export default Sidebar;
