import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function FeaturesSection() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.utils.toArray(".feature").forEach((feature) => {
        const heading = feature.querySelector(".heading");
        const paragraph = feature.querySelector(".paragraph");
        const image = feature.querySelector(".image");

        // Text animation
        gsap.from([heading, paragraph], {
          y: 40,
          opacity: 0,
          stagger: 0.15,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: feature,
            start: "top 80%",
          },
        });

        // Image animation
        gsap.from(image, {
          x: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: feature,
            start: "top 80%",
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative z-20 min-h-screen bg-[#F1EEFF] py-40"
    >
      <div className="max-w-7xl mx-auto px-6 space-y-40">

        {/* FEATURE 1 */}
        <div className="feature grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="heading text-4xl font-bold text-gray-900 mb-6">
              Real-Time Messaging
            </h2>
            <p className="paragraph text-xl leading-relaxed text-gray-700">
              Messages are delivered instantly, creating conversations that feel
              natural, responsive, and uninterrupted across devices.
            </p>
          </div>
          <div className="image h-80 bg-white rounded-3xl shadow-sm flex items-center justify-center p-6">
            <img
              src="/Real-time.jpg"
              alt="Real-time messaging"
              className="max-h-full object-contain"
            />
          </div>
        </div>

        {/* FEATURE 2 */}
        <div className="feature grid md:grid-cols-2 gap-16 items-center">
          <div className="image order-2 md:order-1 h-80 bg-white rounded-3xl shadow-sm flex items-center justify-center p-6">
            <img
              src="/Privacy.jpg"
              alt="Privacy"
              className="max-h-full object-contain"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="heading text-4xl font-bold text-gray-900 mb-6">
              Privacy Comes First
            </h2>
            <p className="paragraph text-xl leading-relaxed text-gray-700">
              Your conversations stay yours. We don’t track, sell, or analyze
              your messages — privacy is built in by default.
            </p>
          </div>
        </div>

        {/* FEATURE 3 */}
        <div className="feature grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="heading text-4xl font-bold text-gray-900 mb-6">
              Clean & Focused Interface
            </h2>
            <p className="paragraph text-xl leading-relaxed text-gray-700">
              A distraction-free design that lets you focus on what matters —
              communication, not clutter.
            </p>
          </div>
          <div className="image h-80 bg-white rounded-3xl shadow-sm flex items-center justify-center p-6">
            <img
              src="/Clean-Ui.jpg"
              alt="Clean UI"
              className="max-h-full object-contain"
            />
          </div>
        </div>

        {/* FEATURE 4 */}
        <div className="feature grid md:grid-cols-2 gap-16 items-center">
          <div className="image order-2 md:order-1 h-80 bg-white rounded-3xl shadow-sm flex items-center justify-center p-6">
            <img
              src="/Secure-auth.jpg"
              alt="Secure authentication"
              className="max-h-full object-contain"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="heading text-4xl font-bold text-gray-900 mb-6">
              Secure Authentication
            </h2>
            <p className="paragraph text-xl leading-relaxed text-gray-700">
              Robust authentication ensures your account stays protected while
              remaining fast and easy to access.
            </p>
          </div>
        </div>

        {/* FEATURE 5 */}
        <div className="feature grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="heading text-4xl font-bold text-gray-900 mb-6">
              Fast Across Devices
            </h2>
            <p className="paragraph text-xl leading-relaxed text-gray-700">
              Optimized performance keeps everything smooth — whether you’re on
              desktop, tablet, or mobile.
            </p>
          </div>
          <div className="image h-80 bg-white rounded-3xl shadow-sm flex items-center justify-center p-6">
            <img
              src="/Real-time.jpg"
              alt="Fast performance"
              className="max-h-full object-contain"
            />
          </div>
        </div>

      </div>
    </section>
  );
}

export default FeaturesSection;
