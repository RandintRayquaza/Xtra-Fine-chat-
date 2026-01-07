import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from "./redux/userSlice";
import { Routes, Route, useLocation } from "react-router-dom"; // ✅ FIX

import { Toaster } from "react-hot-toast";

/* hero */
import Header from "./componants/hero/Header.jsx";
import HomePage from "./componants/hero/HomePage.jsx";

/* auth */
import SignUP from "./componants/auth/SignUp.jsx";
import LogIn from "./componants/auth/LogIn.jsx";

/* routes */
import ProtectedRoute from "./componants/routes/ProtectedRoute.jsx";
import PublicRoute from "./componants/routes/PublicRoute.jsx";

/* chat */
import ChatLayout from "./componants/chat/ChatLayout.jsx";

/* ui */
import SmoothScroll from "./componants/ui/SmoothScroll.jsx";
import CustomCursor from "./componants/ui/CustomCursor.jsx";

function App() {
  const location = useLocation();
  const isChat = location.pathname.startsWith("/chat");
  const dispatch = useDispatch();

  useEffect(() => {
    const restoreUser = async () => {
      try {
        const res = await axios.get(
          "https://fictional-orbit-q7g69rj67ggpc96jg-8000.app.github.dev/api/v1/users/me",
          { withCredentials: true }
        );

        dispatch(setAuthUser(res.data.user));
      } catch {
        console.log("No active session");
      }
    };

    restoreUser();
  }, []);

  return (
    <>
      <Toaster position="top-right" />

      {!isChat && <Header />}
      {!isChat && <CustomCursor />}

      {!isChat ? (
        <SmoothScroll>
          <Routes>
            <Route
              path="/"
              element={
                <PublicRoute>
                  <HomePage />
                </PublicRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LogIn />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <SignUP />
                </PublicRoute>
              }
            />
          </Routes>
        </SmoothScroll>
      ) : (
        <Routes>
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <ChatLayout />
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;
