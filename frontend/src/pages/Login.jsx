import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { loginUser } from "../services/authService";
import { getRoleFromToken } from "../utils/jwtUtils";

function Login() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response =
        await loginUser(loginData);

      const token =
        response.data;

      // Store JWT in localStorage
      localStorage.setItem(
        "token",
        token
      );
    // Extract role from JWT
        const role =
          getRoleFromToken();

  localStorage.setItem(
    "role",
    role
  );

  alert("Login successful");

      if (role === "ADMIN") {

        navigate("/admin");

      } else if (role === "ORGANIZER") {

        navigate("/organizer");

      } else {

        navigate("/attendee");

      }

    } catch (error) {

      alert(
        error.response?.data ||
        "Invalid email or password"
      );

    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100">

      <div className="w-[420px] bg-white p-8 rounded-3xl shadow-xl">

        <h1 className="text-5xl font-bold text-indigo-700 text-center">
          EventSphere
        </h1>

        <p className="text-center text-gray-500 mt-3">
          Welcome back! Sign in to continue.
        </p>

        <form
          className="mt-8"
          onSubmit={handleSubmit}
        >

          {/* Email */}
          <div className="mb-5">

            <label className="block mb-2">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              required
              className="
                w-full border p-3 rounded-xl
                focus:outline-none
                focus:ring-2
                focus:ring-indigo-500
              "
            />

          </div>

          {/* Password */}
          <div className="mb-6">

            <label className="block mb-2">
              Password
            </label>

            <div className="relative">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                value={loginData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
                className="
                  w-full border p-3 pr-12 rounded-xl
                  focus:outline-none
                  focus:ring-2
                  focus:ring-indigo-500
                "
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="
                  absolute right-4 top-1/2
                  -translate-y-1/2
                  text-gray-500
                "
              >
                {
                  showPassword
                    ? <FaEyeSlash />
                    : <FaEye />
                }
              </button>

            </div>

          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="
              w-full bg-gradient-to-r
              from-indigo-600
              to-purple-600
              text-white py-3
              rounded-xl
              font-semibold
              hover:scale-105
              transition duration-300
            "
          >
            Login
          </button>

          {/* Divider */}
          <div className="my-6 border-t"></div>

          {/* Signup Link */}
          <p className="text-center text-gray-600">
            Don't have an account?{" "}

            <Link
              to="/register"
              className="
                text-indigo-600
                font-semibold
                hover:underline
              "
            >
              Sign Up
            </Link>

          </p>

        </form>

      </div>

    </div>
  );
}

export default Login;