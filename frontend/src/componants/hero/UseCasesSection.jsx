import React, { useRef } from "react";
import { Users, Briefcase, Lock } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function UseCasesSection() {
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
      ref={sectionRef}
      className="
        relative z-20
        min-h-screen
        bg-white
        py-40
      "
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* SECTION HEADING */}
        <div className="mb-24 text-center">
          <h2 className="text-5xl font-extrabold text-gray-900 mb-6">
            Built for the way you actually communicate
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Whether it’s casual conversations or focused discussions, Xtra Fine
            Chat adapts naturally to how you connect.
          </p>
        </div>

        {/* USE CASES */}
        <div className="grid md:grid-cols-3 gap-10">
          
          {/* USE CASE 1 */}
          <div className="usecase rounded-3xl border border-black/10 p-8 space-y-5">
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <Users size={22} />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900">
              Friends & Communities
            </h3>
            <p className="text-lg leading-relaxed text-gray-700">
              Stay connected with friends and groups through fast, expressive,
              and effortless conversations that feel natural and alive.
            </p>
          </div>

          {/* USE CASE 2 */}
          <div className="usecase rounded-3xl border border-black/10 p-8 space-y-5">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <Briefcase size={22} />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900">
              Focused Work & Teams
            </h3>
            <p className="text-lg leading-relaxed text-gray-700">
              Keep discussions clear and distraction-free with a clean interface
              designed for productivity and thoughtful collaboration.
            </p>
          </div>

          {/* USE CASE 3 */}
          <div className="usecase rounded-3xl border border-black/10 p-8 space-y-5">
            <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
              <Lock size={22} />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900">
              Private Conversations
            </h3>
            <p className="text-lg leading-relaxed text-gray-700">
              Communicate with confidence knowing your conversations are private,
              protected, and handled with care.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default UseCasesSection;
