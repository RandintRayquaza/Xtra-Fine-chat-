import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Header from "./componants/Header.jsx";
import HomePage from "./componants/HomePage.jsx";
import SignUP from "./componants/SignUp.jsx";
import LogIn from "./componants/LogIn.jsx";
import SmoothScroll from "./componants/SmoothScroll.jsx";
import CustomCursor from "./componants/CustomCursor.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/signup",
    element: <SignUP />,
  },
  {
    path: "/login",
    element: <LogIn />,
  },
]);

function App() {
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

      {/* Global Header */}
      <Header />

{/* Custom Cursor */}
      <CustomCursor />
      {/* Smooth scrolling + routing */}
      <SmoothScroll>
        <RouterProvider router={router} />
      </SmoothScroll>
    </>
  );
}

export default App;
