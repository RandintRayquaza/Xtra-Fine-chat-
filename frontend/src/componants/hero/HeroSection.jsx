import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

gsap.registerPlugin(ScrollTrigger);

function HeroSection() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const navigate = useNavigate();
  const { authUser } = useSelector((state) => state.user);

  useGSAP(() => {
    gsap.from(contentRef.current.children, {
      y: 60,
      opacity: 0,
      stagger: 0.15,
      duration: 1,
      ease: "power3.out",
    });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom top",
      pin: true,
      pinSpacing: false,
    });
  });

  const handleCTA = () => {
    navigate(authUser ? "/chat" : "/login");
  };

  return (
    <section ref={sectionRef} className="min-h-screen bg-white flex items-center">
      <div ref={contentRef} className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold">
            Seamless Conversations.
            <span className="block text-purple-600">Built for Real Connection.</span>
          </h1>

          <p className="text-lg text-gray-600 max-w-xl">
            Communicate faster, clearer, and without distractions.
          </p>

          <button
            onClick={handleCTA}
            className="inline-flex px-6 py-3 rounded-md bg-purple-600 text-white font-medium hover:bg-purple-700"
          >
            {authUser ? "Open Chat" : "Get Started"}
          </button>
        </div>

        <div className="flex justify-center">
          <img src="/hero.jpg" alt="Chat illustration" className="max-w-md" />
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <ArrowDown className="animate-bounce text-purple-600" />
      </div>
    </section>
  );
}

export default HeroSection;
