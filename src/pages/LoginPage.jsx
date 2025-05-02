import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import Card from "../components/Card";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);

      try {
        // Send login request to backend
        console.log("Logging in with data:", formData);

        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/farmer/login`,
          {
            email: formData.email,
            password: formData.password,
          },
          {
            withCredentials: true, // <--- Important
          }
        );
        console.log("Login response:", response);

        // Handle successful login
        if (response.status == 200) {
          login(); // You might want to pass user data or token to your auth context
          navigate("/profile"); // Redirect to profile page
        }
      } catch (error) {
        console.error("Login error:", error);

        // Handle login errors
        if (error.response && error.response.data) {
          // Server returned an error message
          setErrors({
            submit:
              error.response.data.message ||
              "Invalid email or password. Please try again.",
          });
        } else {
          // Network or other error
          setErrors({
            submit: "Login failed. Please check your connection and try again.",
          });
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <section className="flex flex-grow justify-center items-center bg-green-50 dark:bg-neutral-900 py-12 h-[80vh]">
        <div className="mx-auto px-4 container">
          <div className="mx-auto max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 text-center"
            >
              <h1 className="mb-2 font-bold text-gray-900 dark:text-neutral-100 text-3xl">
                Welcome Back
              </h1>
              <p className="text-gray-600 dark:text-neutral-400">
                Sign in to your AgriSure account
              </p>
            </motion.div>

            <Card className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-1 font-medium text-gray-700 dark:text-neutral-300 text-sm"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className="bg-white/50 dark:bg-neutral-700/50 px-4 py-2 border border-gray-300 focus:border-green-500 dark:border-neutral-600 dark:focus:border-green-400 rounded-lg focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400/20 w-full text-gray-900 dark:placeholder:text-neutral-400 dark:text-neutral-100 placeholder:text-gray-400"
                    required
                  />
                  {errors.email && (
                    <p className="mt-1 text-red-600 dark:text-red-400 text-sm">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block mb-1 font-medium text-gray-700 dark:text-neutral-300 text-sm"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="bg-white/50 dark:bg-neutral-700/50 px-4 py-2 border border-gray-300 focus:border-green-500 dark:border-neutral-600 dark:focus:border-green-400 rounded-lg focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400/20 w-full text-gray-900 dark:placeholder:text-neutral-400 dark:text-neutral-100 placeholder:text-gray-400"
                    required
                  />
                  {errors.password && (
                    <p className="mt-1 text-red-600 dark:text-red-400 text-sm">
                      {errors.password}
                    </p>
                  )}
                </div>

                {errors.submit && (
                  <div className="bg-red-50 dark:bg-red-900/20 p-3 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-red-600 dark:text-red-400 text-sm">
                      {errors.submit}
                    </p>
                  </div>
                )}

                <Button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>

                <div className="flex justify-end">
                  <Link
                    to="/forgot-password"
                    className="font-medium text-green-600 hover:text-green-700 dark:hover:text-green-300 dark:text-green-400 text-sm"
                  >
                    Forgot password?
                  </Link>
                </div>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600 dark:text-neutral-400 text-sm">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="font-medium text-green-600 hover:text-green-700 dark:hover:text-green-300 dark:text-green-400"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LoginPage;
