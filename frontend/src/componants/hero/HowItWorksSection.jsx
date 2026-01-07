import React, { useRef } from "react";
import { Users, Briefcase, Lock } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function HowItWorksSection() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.utils.toArray(".usecase").forEach((card) => {
        gsap.from(card, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative z-20 min-h-screen bg-white py-40"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-24 text-center">
          <h2 className="text-5xl font-extrabold text-gray-900 mb-6">
            How Xtra Fine Chat Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Simple by design. Powerful by nature.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="usecase rounded-3xl border border-black/10 p-8 space-y-5">
            <Users size={22} />
            <h3 className="text-2xl font-semibold">Connect Instantly</h3>
            <p>Log in and start real-time conversations instantly.</p>
          </div>

          <div className="usecase rounded-3xl border border-black/10 p-8 space-y-5">
            <Briefcase size={22} />
            <h3 className="text-2xl font-semibold">Stay Focused</h3>
            <p>No clutter. Just clean, meaningful communication.</p>
          </div>

          <div className="usecase rounded-3xl border border-black/10 p-8 space-y-5">
            <Lock size={22} />
            <h3 className="text-2xl font-semibold">Private & Secure</h3>
            <p>Your conversations stay yours.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;
