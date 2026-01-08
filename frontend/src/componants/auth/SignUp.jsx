import React, { useRef, useState, useEffect } from "react";
import { User, Lock, UserCircle, Eye, EyeOff } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import api from "../../lib/api";

import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "../../redux/userSlice";

function SignUp() {
  const cardRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { authUser } = useSelector((state) => state.user);

  // ✅ Redirect if already logged in
  useEffect(() => {
    if (authUser) {
      navigate("/chat");
    }
  }, [authUser, navigate]);

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ---------------- ANIMATION ---------------- */
  useGSAP(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
  });

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
      setLoading(true);

      const res = await api.post("/api/v1/users/signup", formData);


      dispatch(setAuthUser(res.data.user));
      toast.success("Account created 🎉");
      navigate("/chat");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#F7F5FF] px-4">
      <div
        ref={cardRef}
        className="w-full max-w-md bg-white border border-black/10 rounded-3xl p-8 sm:p-10"
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create your account
          </h1>
          <p className="text-gray-600">
            Join Xtra Fine Chat and start communicating
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            icon={<UserCircle size={18} />}
            name="fullName"
            placeholder="Full name"
            value={formData.fullName}
            onChange={handleChange}
          />

          <Input
            icon={<User size={18} />}
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />

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
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <Input
            icon={<Lock size={18} />}
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <div className="flex gap-4 mt-2">
            {["male", "female"].map((g) => (
              <label
                key={g}
                className={`flex-1 cursor-pointer rounded-xl border px-4 py-3 text-center text-sm font-medium ${
                  formData.gender === g
                    ? "border-black bg-black text-white"
                    : "border-black/10 text-gray-700 hover:border-black"
                }`}
              >
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  onChange={handleChange}
                  className="hidden"
                />
                {g.charAt(0).toUpperCase() + g.slice(1)}
              </label>
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 py-3.5 rounded-xl bg-black text-white font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>

          <p className="text-sm text-center text-purple-700">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-black underline">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

function Input({ icon, ...props }) {
  return (
    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        {icon}
      </span>
      <input
        {...props}
        className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white border border-black/10 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/10"
      />
    </div>
  );
}

export default SignUp;
