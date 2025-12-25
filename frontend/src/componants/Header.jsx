import React from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { useState } from "react";

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-black/5">
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center">
        {/* LEFT: LOGO */}
        <div className="flex items-center gap-2 text-lg font-semibold text-purple-600 flex-1">
          <MessageCircle size={22} />
          <span>Xtra Fine</span>
        </div>

        {/* CENTER: NAV */}
        <nav className="hidden md:flex gap-10 text-sm font-medium text-gray-700">
          {["Home", "Team", "Services", "Works"].map((item) => (
            <a
              key={item}
              href="#"
              className="hover:text-purple-600 transition"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* RIGHT: CTA */}
        <div className="flex-1 flex justify-end items-center gap-4">
          <a
            href="#"
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
            Let’s Chat!
          </a>

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
        <div className="md:hidden px-6 pb-6 bg-white">
          <nav className="flex flex-col gap-4 text-sm text-gray-700">
            {["Home", "Team", "Services", "Works"].map((item) => (
              <a
                key={item}
                href="#"
                onClick={() => setOpen(false)}
                className="hover:text-purple-600"
              >
                {item}
              </a>
            ))}
            <a
              href="#"
              className="mt-2 inline-flex px-5 py-2 rounded-md border border-purple-500 text-purple-600 font-medium w-fit"
            >
              Let’s Talk!
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
