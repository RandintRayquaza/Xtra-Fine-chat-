import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function FeaturesSection() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      // Start features BELOW the viewport
      gsap.set(sectionRef.current, {
        y: "100vh",
      });

      // Move features up to cover hero on scroll
      gsap.to(sectionRef.current, {
        y: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
      });

      // Content reveal (optional but nice)
      gsap.from(".feature", {
        y: 60,
        opacity: 0,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="
        fixed inset-0
        z-30
        min-h-screen
        bg-[#F1EEFF]
        flex items-center
      "
    >
      <div className="max-w-7xl mx-auto px-6 space-y-32 w-full py-32">
        {/* FEATURE 1 */}
        <div className="feature grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Real-Time Messaging
            </h2>
            <p className="text-gray-700">
              Messages are delivered instantly so conversations feel natural and fluid.
            </p>
          </div>
          <div className="h-72 bg-white rounded-2xl shadow-sm flex items-center justify-center">
            Illustration
          </div>
        </div>

        {/* FEATURE 2 */}
        <div className="feature grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 h-72 bg-white rounded-2xl shadow-sm flex items-center justify-center">
            Illustration
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Clean & Intuitive UI
            </h2>
            <p className="text-gray-700">
              Designed to disappear so users focus on conversation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
