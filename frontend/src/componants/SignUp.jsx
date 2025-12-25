import React, { useEffect, useRef, useState } from "react";
import { User, Lock, UserCircle, Eye, EyeOff } from "lucide-react";
import gsap from "gsap";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const cardRef = useRef(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  /* ---------------- ANIMATION ---------------- */
  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    );
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullName, username, password, confirmPassword, gender } = formData;

    if (!fullName || !username || !password || !confirmPassword || !gender) {
      toast.error("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await axios.post(
        "https://fictional-orbit-q7g69rj67ggpc96jg-8000.app.github.dev/api/v1/users/register",
        formData,
        { withCredentials: true }
      );

      toast.success("Account created 🎉");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div
        ref={cardRef}
        className="
          w-full max-w-md
          bg-white dark:bg-black
          border border-black/10 dark:border-white/10
          rounded-2xl
          p-8
        "
      >
        <h1 className="text-2xl font-semibold text-center text-black dark:text-white mb-6">
          Create your account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* FULL NAME */}
          <Input
            icon={<UserCircle size={18} />}
            name="fullName"
            placeholder="Full name"
            value={formData.fullName}
            onChange={handleChange}
          />

          {/* USERNAME */}
          <Input
            icon={<User size={18} />}
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />

          {/* PASSWORD */}
          <div className="relative">
            <Input
              icon={<Lock size={18} />}
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-black/60 dark:text-white/60"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {/* CONFIRM PASSWORD */}
          <Input
            icon={<Lock size={18} />}
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          {/* GENDER */}
          <div className="flex gap-6 text-sm text-black dark:text-white mt-2">
            {["male", "female"].map((g) => (
              <label key={g} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  onChange={handleChange}
                  className="accent-black dark:accent-white"
                />
                {g.charAt(0).toUpperCase() + g.slice(1)}
              </label>
            ))}
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="
              w-full mt-6
              py-3 rounded-xl
              bg-black text-white
              dark:bg-white dark:text-black
              font-medium
            "
          >
            Sign Up
          </button>

          <p className="text-sm text-center text-black/70 dark:text-white/70">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

/* ---------------- REUSABLE INPUT ---------------- */
function Input({ icon, ...props }) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-black/50 dark:text-white/50">
        {icon}
      </span>
      <input
        {...props}
        className="
          w-full pl-10 pr-4 py-3
          rounded-xl
          bg-transparent
          border border-black/10 dark:border-white/10
          text-black dark:text-white
          placeholder:text-black/40 dark:placeholder:text-white/40
          focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white
        "
      />
    </div>
  );
}

export default SignUp;
