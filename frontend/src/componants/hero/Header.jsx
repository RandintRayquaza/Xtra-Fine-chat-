import React, { useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { authUser } = useSelector((state) => state.user);

  const handleChatClick = () => {
    navigate(authUser ? "/chat" : "/login");
    setOpen(false);
  };

  const scrollToSection = (id) => {
    setOpen(false);

    // If not on home, go home first
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
      return;
    }

    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="w-full bg-white border-b border-black/5 fixed top-0 z-50">
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center">
        {/* LOGO */}
        <div className="flex items-center gap-2 text-lg font-semibold text-purple-600 flex-1">
          <MessageCircle size={22} />
          <Link to="/">Xtra Fine</Link>
        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex gap-10 text-sm font-medium text-gray-700">
          <button onClick={() => scrollToSection("features")} className="hover:text-purple-600">
            Features
          </button>
          <button onClick={() => scrollToSection("how-it-works")} className="hover:text-purple-600">
            How It Works
          </button>
          <Link to="/about" className="hover:text-purple-600">
            About
          </Link>
        </nav>

        {/* CTA */}
        <div className="flex-1 flex justify-end items-center gap-4">
          <button
            onClick={handleChatClick}
            className="hidden md:inline-flex px-5 py-2 rounded-md border border-purple-500 text-purple-600 text-sm font-medium hover:bg-purple-50 transition"
          >
            {authUser ? "Open Chat" : "Let’s Chat"}
          </button>

          {/* MOBILE MENU */}
          <button onClick={() => setOpen(!open)} className="md:hidden">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* MOBILE NAV */}
      {open && (
        <div className="md:hidden px-6 pb-6 bg-white border-t border-black/5">
          <nav className="flex flex-col gap-4 text-sm text-gray-700">
            <button onClick={() => scrollToSection("features")}>Features</button>
            <button onClick={() => scrollToSection("how-it-works")}>How It Works</button>
            <Link to="/about" onClick={() => setOpen(false)}>About</Link>

            <button
              onClick={handleChatClick}
              className="mt-2 px-5 py-2 rounded-md border border-purple-500 text-purple-600 font-medium w-fit"
            >
              {authUser ? "Open Chat" : "Let’s Chat"}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
