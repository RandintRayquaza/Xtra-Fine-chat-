import { useEffect, useState } from "react";
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

  // 🔥 FETCH USERS ONCE
  useEffect(() => {
    axios
      .get(
        "https://fictional-orbit-q7g69rj67ggpc96jg-8000.app.github.dev/api/v1/users/other-users",
        { withCredentials: true }
      )
      .then((res) => setUsers(res.data.users));
  }, []);

  // 🔴 LOGOUT
  const handleLogout = async () => {
    await axios.get(
      "https://fictional-orbit-q7g69rj67ggpc96jg-8000.app.github.dev/api/v1/users/logout",
      { withCredentials: true }
    );

    dispatch(logoutUser());
    navigate("/");
  };

  const filteredUsers = users.filter((u) =>
    u.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <aside className="h-screen flex flex-col bg-white border-r border-black/10">
      {/* HEADER */}
      <div className="p-4 border-b font-semibold text-lg">
        Chats
      </div>

      {/* SEARCH */}
      <div className="p-3 border-b">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm"
            placeholder="Search users…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* USERS LIST (SCROLLABLE) */}
      <div className="flex-1 overflow-y-auto">
        {filteredUsers.map((user) => (
          <div
            key={user._id}
            onClick={() => onSelectUser(user)}
            className="flex items-center gap-3 px-4 py-3 hover:bg-black/5 cursor-pointer"
          >
            <img
              src={user.profilePhoto}
              alt={user.username}
              className="w-9 h-9 rounded-full object-cover bg-gray-200"
              onError={(e) => {
                e.currentTarget.src =
                  "https://ui-avatars.com/api/?name=" +
                  encodeURIComponent(user.username) +
                  "&background=000&color=fff";
              }}
            />
            <span className="font-medium">{user.username}</span>
          </div>
        ))}
      </div>

      {/* LOGOUT — ALWAYS VISIBLE (MOBILE + DESKTOP) */}
      <div className="sticky bottom-0 bg-white border-t">
        <button
          onClick={handleLogout}
          className="w-full p-4 flex items-center justify-center gap-2 text-sm text-red-600 hover:bg-red-50"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
