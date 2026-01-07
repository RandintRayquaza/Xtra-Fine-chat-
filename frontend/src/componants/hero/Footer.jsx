import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#0B0B0F] text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-12">
        
        {/* BRAND */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">
            Xtra Fine Chat
          </h3>
          <p className="text-sm leading-relaxed">
            A modern chat platform focused on clarity, privacy, and
            distraction-free communication.
          </p>
        </div>

        {/* LINKS */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-4">
            Product
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white transition">
                Features
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-white transition">
                How It Works
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-white transition">
                Privacy
              </Link>
            </li>
          </ul>
        </div>

        {/* LEGAL */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-4">
            Legal
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/terms" className="hover:text-white transition">
                Terms
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-white transition">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-white/10 py-6 text-center text-sm">
        © {new Date().getFullYear()} Xtra Fine Chat. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
