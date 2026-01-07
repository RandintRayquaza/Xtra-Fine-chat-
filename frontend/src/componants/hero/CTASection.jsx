import React, { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function CTASection() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(".cta-item", {
        y: 40,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="
        relative z-20
        min-h-[80vh]
        bg-[#0F0F14]
        flex items-center
      "
    >
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="cta-item text-5xl font-extrabold text-white mb-6">
          Start conversations without distractions
        </h2>

        <p className="cta-item text-xl text-gray-300 mb-10 leading-relaxed">
          Xtra Fine Chat is built for clarity, privacy, and speed —
          everything modern communication should feel like.
        </p>

        <div className="cta-item flex justify-center gap-4">
          {/* SIGN UP */}
          <Link
            to="/signup"
            className="
              px-8 py-4
              rounded-xl
              bg-purple-600
              text-white
              text-lg font-semibold
              hover:bg-purple-700
              transition
            "
          >
            Get Started
          </Link>

          {/* LOGIN */}
          <Link
            to="/login"
            className="
              px-8 py-4
              rounded-xl
              border border-white/20
              text-white
              text-lg font-semibold
              hover:bg-white/10
              transition
            "
          >
            Log In
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
