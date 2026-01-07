import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

function AboutHero() {
  const navigate = useNavigate();
  const { authUser } = useSelector((state) => state.user);

  const handleCTA = () => {
    navigate(authUser ? "/chat" : "/login");
  };

  return (
    <section className="min-h-screen flex items-center">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center"
      >
        {/* TEXT */}
        <motion.div variants={item} className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Built by one person.
            <span className="block text-purple-600">
              Crafted with intention.
            </span>
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed">
            Hi, I’m Aryan.
            <br />
            <br />
            Xtra Fine is a personal project I built to make conversations feel
            simpler, faster, and more human — without noise, clutter, or
            distractions.
          </p>

          <p className="text-gray-600">
            Designed, developed, and maintained independently under{" "}
            <span className="font-medium text-gray-900">XF</span>.
          </p>

          <button
            onClick={handleCTA}
            className="inline-flex px-6 py-3 rounded-md bg-purple-600 text-white font-medium hover:bg-purple-700 transition"
          >
            {authUser ? "Open Chat" : "Get Started"}
          </button>
        </motion.div>

        {/* IMAGE */}
       <motion.div
  variants={item}
  className="flex justify-center"
>
  <div className="
    w-[280px] 
    h-[420px] 
    md:w-[320px] 
    md:h-[480px]
    rounded-3xl 
    overflow-hidden 
  ">
    <img
      src="/jonngun.png"
      alt="Gun Park – Lookism"
      className="w-full h-full object-cover object-top"
    />
  </div>
</motion.div>

      </motion.div>
    </section>
  );
}

export default AboutHero;
