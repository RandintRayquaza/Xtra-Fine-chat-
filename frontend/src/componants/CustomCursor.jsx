import { useEffect, useRef } from "react";
import gsap from "gsap";

function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;

    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
    });

    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="
        fixed top-0 left-0
        w-4 h-4
        rounded-full
        bg-purple-600
        pointer-events-none
        z-[9999]
        hidden md:block
      "
    />
  );
}

export default CustomCursor;
