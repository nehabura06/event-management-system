import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "ATTENDEE"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {

      const response = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role
      });

      alert(response.data);

      navigate("/");

    } catch (error) {

      alert(
        error.response?.data ||
        "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100">

      <div className="bg-white w-[440px] px-8 py-5 rounded-3xl shadow-xl">

        <h1 className="text-4xl font-bold text-center text-indigo-700">
          EventSphere
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-5">
          Create your account and start exploring events.
        </p>

        <form
          className="space-y-3"
          onSubmit={handleSubmit}
        >

          {/* Full Name */}
          <div>
            <label className="block mb-2 font-medium">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              className="
                w-full border px-4 py-2.5 rounded-xl
                focus:outline-none
                focus:ring-2
                focus:ring-indigo-500
              "
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 font-medium">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              required
              className="
                w-full border px-4 py-2.5 rounded-xl
                focus:outline-none
                focus:ring-2
                focus:ring-indigo-500
              "
            />
          </div>

          {/* Passwords */}
          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="block mb-2 font-medium">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
                className="
                  w-full border px-4 py-2.5 rounded-xl
                  focus:outline-none
                  focus:ring-2
                  focus:ring-indigo-500
                "
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                required
                className="
                  w-full border px-4 py-2.5 rounded-xl
                  focus:outline-none
                  focus:ring-2
                  focus:ring-indigo-500
                "
              />
            </div>

          </div>

          {/* Role Dropdown */}
          <div>
            <label className="block mb-2 font-medium">
              Role
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="
                w-full border px-4 py-2.5 rounded-xl
                focus:outline-none
                focus:ring-2
                focus:ring-indigo-500
              "
            >
              <option value="ATTENDEE">
                ATTENDEE
              </option>

              <option value="ORGANIZER">
                ORGANIZER
              </option>
            </select>
          </div>

          {/* Terms */}
          <p className="text-sm text-center text-gray-600">
            I agree to the{" "}
            <span className="text-indigo-700 font-medium">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="text-indigo-700 font-medium">
              Privacy Policy
            </span>
          </p>

          {/* Register Button */}
          <button
            type="submit"
            className="
              w-full px-4 py-2.5 rounded-xl
              bg-gradient-to-r
              from-indigo-700
              to-purple-600
              text-white
              font-semibold
              text-lg
              hover:scale-105
              transition duration-300
            "
          >
            Register →
          </button>

          {/* Divider */}
          <div className="border-t my-6"></div>

          {/* Login Link */}
          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-700 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>

        </form>

      </div>

    </div>
  );
}

export default Register;