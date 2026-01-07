import { motion } from "framer-motion";

function AboutFuture() {
  return (
    <section className="py-32 bg-[#F7F5FF]">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-4xl mx-auto px-6 text-center space-y-6"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
          Looking Ahead
        </h2>

        <p className="text-lg text-gray-600 leading-relaxed">
          Xtra Fine is actively evolving.
          <br />
          <br />
          Planned improvements include group conversations, friend management,
          blocking and reporting tools, and better moderation — all introduced
          gradually, without compromising simplicity or privacy.
        </p>
      </motion.div>
    </section>
  );
}

export default AboutFuture;
