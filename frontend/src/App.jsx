import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "./redux/userSlice";
import { connectSocket, disconnectSocket } from "./socket/socket";

import ChatLayout from "./componants/chat/ChatLayout";
import ProtectedRoute from "./componants/routes/ProtectedRoute";
import PublicRoute from "./componants/routes/PublicRoute";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { authUser, authChecked } = useSelector((state) => state.user);

  // 🔄 Restore login
  useEffect(() => {
    const restoreUser = async () => {
      try {
        const res = await axios.get(
          "https://fictional-orbit-q7g69rj67ggpc96jg-8000.app.github.dev/api/v1/users/me",
          { withCredentials: true }
        );
        dispatch(setAuthUser(res.data.user));
      } catch {
        dispatch(setAuthUser(null));
      }
    };

    restoreUser();
  }, [dispatch]);

  // 🔌 Connect socket ONLY after auth check
  useEffect(() => {
    if (!authChecked) return;

    if (authUser?._id) {
      connectSocket(authUser._id);
    }

    return () => {
      disconnectSocket();
    };
  }, [authUser, authChecked]);

  return (
    <Routes>
      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <ChatLayout />
          </ProtectedRoute>
        }
      />

      <Route
        path="/login"
        element={
          <PublicRoute>
            <div>Login Page</div>
          </PublicRoute>
        }
      />
    </Routes>
  );
}

export default App;
