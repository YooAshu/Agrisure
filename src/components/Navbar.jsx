import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, Bell, User, LogOut } from "lucide-react";
import Button from "./Button";
import ThemeToggle from "./ThemeToggle";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext.jsx";
import axios from "axios";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const { isLoggedIn, logout } = useAuth();

  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleUserMenu = () => setUserMenuOpen(!userMenuOpen);

  const handleLogout = async () => {
    // Handle logout logic here
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/farmer/logout`,
      {},
      {
        withCredentials: true, // <--- Important
      }
    );
    console.log("Logout response:", response);
    if (response.status == 200) {
      logout();
      navigate("/login");
      console.log("Logging out");
    }
  };

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/insurance", label: "Schemes" },
    ...(isLoggedIn
      ? [
          { path: "/buy-insurance", label: "Buy Insurance" },
          { path: "/claims", label: "Claim" },
          { path: "/ai-agent", label: "AI Agent" },
        ]
      : []),
    { path: "/contact", label: "Contact Us" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-sm" : ""
      }`}
    >
      <div className="mx-auto px-4 container">
        <div className="flex justify-center items-center gap-6 h-20">
          {/* Logo in bubble */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center"
          >
            <Link
              to="/"
              className="bg-white dark:bg-neutral-900 shadow-lg dark:shadow-neutral-800/50 px-6 py-2 rounded-full"
            >
              <div className="flex items-center gap-2">
                <img src={logo} alt="AgriSure Logo" className="w-8 h-8" />
                <span className="font-heading text-green-600 dark:text-green-400 text-2xl">
                  AgriSure
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation - Center */}
          <div className="hidden md:flex items-center bg-white dark:bg-neutral-900 shadow-lg dark:shadow-neutral-800/50 px-3 py-3 rounded-full">
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={index !== navItems.length - 1 ? "mr-8" : ""}
              >
                <Link
                  to={item.path}
                  className={`text-black dark:text-white font-nav transition-all duration-300 px-3 py-2 rounded-full ${
                    location.pathname === item.path
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                      : "nav-link hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-500 "
                  }`}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* User Actions in bubble */}
          <div className="hidden md:flex items-center gap-4">
            <div className="bg-white dark:bg-neutral-900 shadow-lg dark:shadow-neutral-800/50 px-6 py-1 rounded-full">
              {isLoggedIn ? (
                <div className="flex items-center space-x-3">
                  {/* <Link to="/notifications" className="relative">
                    <Bell className="w-6 h-6 text-gray-700 hover:text-green-600 dark:hover:text-green-400 dark:text-neutral-300 transition-colors" />
                    <span className="top-0 right-0 absolute bg-red-500 rounded-full w-2 h-2"></span>
                  </Link> */}
                  <ThemeToggle />
                  <div className="relative">
                    <button
                      onClick={toggleUserMenu}
                      className="flex items-center focus:outline-none"
                    >
                      <div className="flex justify-center items-center bg-green-100 dark:bg-green-900 rounded-full w-8 h-8">
                        <User className="w-5 h-5 text-green-600 dark:text-green-400" />
                      </div>
                    </button>

                    {userMenuOpen && (
                      <div className="right-0 z-20 absolute bg-white dark:bg-neutral-900 shadow-xl dark:shadow-neutral-800/50 mt-8 py-2 rounded-lg w-48">
                        <Link
                          to="/profile"
                          className="block hover:bg-green-50 dark:hover:bg-neutral-800 px-4 py-2 text-gray-800 dark:text-neutral-200 transition-colors"
                        >
                          Profile
                        </Link>
                        <Link
                          to="/dashboard"
                          className="block hover:bg-green-50 dark:hover:bg-neutral-800 px-4 py-2 text-gray-800 dark:text-neutral-200 transition-colors"
                        >
                          Dashboard
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block hover:bg-green-50 dark:hover:bg-neutral-800 px-4 py-2 w-full text-gray-800 dark:text-neutral-200 text-left transition-colors"
                        >
                          <div className="flex items-center">
                            <LogOut className="mr-2 w-4 h-4" />
                            <span>Logout</span>
                          </div>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <ThemeToggle />
                  <Link
                    to="/login"
                    className={`text-base font-nav transition-all duration-300 px-3 py-0.5 rounded-full ${
                      location.pathname === "/login"
                        ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                        : "text-gray-600 dark:text-neutral-300 hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-500 hover:text-white"
                    }`}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className={`text-base font-nav transition-all duration-300 px-3 py-0.5 rounded-full ${
                      location.pathname === "/signup"
                        ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                        : "text-gray-600 dark:text-neutral-300 hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-500 hover:text-white"
                    }`}
                  >
                    Signup
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="md:hidden text-gray-600 dark:text-neutral-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{
            height: mobileMenuOpen ? "auto" : 0,
            opacity: mobileMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="space-y-4 bg-white dark:bg-neutral-900 shadow-lg dark:shadow-neutral-800/50 mt-2 px-4 py-4 rounded-2xl">
            <div className="flex justify-center mb-4">
              <ThemeToggle />
            </div>
            {navItems.map((item) => (
              <motion.div
                key={item.path}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to={item.path}
                  className={`block text-sm font-medium ${
                    location.pathname === item.path
                      ? "text-green-600 dark:text-green-400"
                      : "nav-link"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
            <div className="flex flex-col gap-3 pt-4">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  variant="outline"
                  className="bg-white dark:bg-neutral-900 text-green-600 dark:text-green-400"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                <Button className="bg-white dark:bg-neutral-900 text-green-600 dark:text-green-400">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
