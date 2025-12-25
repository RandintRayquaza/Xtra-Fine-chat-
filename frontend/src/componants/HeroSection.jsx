import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function HeroSection() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(
    () => {
      // Entrance animation
      gsap.from(contentRef.current.children, {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
      });

      // Pin hero WITHOUT spacing (key fix)
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false, // 🔥 CRITICAL
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
  ref={sectionRef}
      className="min-h-screen bg-white relative z-10 flex items-center"
    >
      <div
        ref={contentRef}
        className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
      >
        {/* LEFT */}
        <div className="space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900">
            Seamless Conversations.
            <span className="block text-purple-600">
              Built for Real Connection.
            </span>
          </h1>

          <p className="text-lg text-gray-600 max-w-xl">
            Xtra Fine Chat helps you communicate faster, clearer, and more
            naturally — without distractions.
          </p>

          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-purple-600 text-white font-medium hover:bg-purple-700 transition">
            Get Started
          </button>
        </div>

        {/* RIGHT */}
        <div className="flex justify-center">
          <img
            src="/hero.jpg"
            alt="Chat illustration"
            className="w-full max-w-md"
          />
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <ArrowDown className="text-purple-600 animate-bounce" />
      </div>
    </section>
  );
}

export default HeroSection;
