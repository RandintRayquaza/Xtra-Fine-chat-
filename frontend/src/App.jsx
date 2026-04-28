import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "./redux/userSlice";
import { connectSocket } from "./socket/socket";
import api from "./lib/api";

import Header from "./componants/hero/Header.jsx";
import HomePage from "./componants/hero/HomePage.jsx";

import AboutPage from "./componants/About/AboutPage.jsx";

import SignUP from "./componants/auth/SignUp.jsx";
import LogIn from "./componants/auth/LogIn.jsx";

import ChatLayout from "./componants/chat/ChatLayout.jsx";

import ProtectedRoute from "./componants/routes/ProtectedRoute.jsx";
import PublicRoute from "./componants/routes/PublicRoute.jsx";

import SmoothScroll from "./componants/ui/SmoothScroll.jsx";
import CustomCursor from "./componants/ui/CustomCursor.jsx";

const App = () => {
  const location = useLocation();
  const isChat = location.pathname.startsWith("/chat");

  const dispatch = useDispatch();
  const { authUser, authChecked } = useSelector((state) => state.user);

  
  useEffect(() => {
    const restoreUser = async () => {
      try {
        const res = await api.get("/api/v1/users/me");
        dispatch(setAuthUser(res.data.user));
      } catch {
        dispatch(setAuthUser(null));
      }
    };

    restoreUser();
  }, [dispatch]);

  useEffect(() => {
    if (!authChecked) return;
    if (authUser?._id) {
      connectSocket(authUser._id);
    }
  }, [authUser, authChecked]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && authUser?._id) {
        connectSocket(authUser._id);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [authUser]);

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "rgba(0,0,0,0.7)",
            color: "#fff",
            backdropFilter: "blur(10px)",
          },
        }}
      />

      {!isChat && <Header />}
      {!isChat && <CustomCursor />}

      {!isChat ? (
        <SmoothScroll>
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/about" element={<AboutPage />} />

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
