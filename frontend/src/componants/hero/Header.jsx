import React, { useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const { authUser } = useSelector((state) => state.user);

  const handleChatClick = () => {
    if (!authUser) {
      navigate("/login");
    } else {
      navigate("/chat");
    }
    setOpen(false);
  };

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "Features", to: "/#features" },
    { name: "Use Cases", to: "/#use-cases" },
    { name: "About", to: "/#about" },
  ];

  return (
    <header className="w-full bg-white border-b border-black/5 fixed top-0 z-50">
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center">
        {/* LEFT: LOGO */}
        <div className="flex items-center gap-2 text-lg font-semibold text-purple-600 flex-1">
          <MessageCircle size={22} />
          <Link to="/">Xtra Fine</Link>
        </div>

        {/* CENTER: NAV */}
        <nav className="hidden md:flex gap-10 text-sm font-medium text-gray-700">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className="hover:text-purple-600 transition"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* RIGHT: CTA */}
        <div className="flex-1 flex justify-end items-center gap-4">
          <button
            onClick={handleChatClick}
            className="
              hidden md:inline-flex
              px-5 py-2
              rounded-md
              border border-purple-500
              text-purple-600
              text-sm font-medium
              hover:bg-purple-50
              transition
            "
          >
            {authUser ? "Open Chat" : "Let’s Chat"}
          </button>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-black"
            aria-label="Toggle menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden px-6 pb-6 bg-white border-t border-black/5">
          <nav className="flex flex-col gap-4 text-sm text-gray-700">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                onClick={() => setOpen(false)}
                className="hover:text-purple-600"
              >
                {item.name}
              </Link>
            ))}

            <button
              onClick={handleChatClick}
              className="
                mt-2 inline-flex
                px-5 py-2
                rounded-md
                border border-purple-500
                text-purple-600
                font-medium
                w-fit
              "
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
