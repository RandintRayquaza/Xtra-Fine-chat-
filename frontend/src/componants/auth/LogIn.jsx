import React, { useRef, useState, useEffect } from "react";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import api from "../../lib/api";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "../../redux/userSlice";

function LogIn() {
  const cardRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state.user);

  // 🔐 Redirect if already logged in
  useEffect(() => {
    if (authUser) {
      navigate("/chat");
    }
  }, [authUser, navigate]);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

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
    const { username, password } = formData;

    if (!username || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);
    const res = await api.post("/api/v1/users/login", formData);
      dispatch(setAuthUser(res.data.user));
      toast.success("Welcome back 👋");
      navigate("/chat");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#F7F5FF] px-4">
      <div
        ref={cardRef}
        className="w-full max-w-md bg-white border border-black/10 rounded-3xl p-8"
      >
        <h1 className="text-3xl font-bold text-center mb-6">Log in</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
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

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-black text-white font-semibold"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>

          <p className="text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <Link to="/signup" className="underline font-medium">
              Sign up
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
        className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-black/10"
      />
    </div>
  );
}

export default LogIn;
