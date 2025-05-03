import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Shield } from "lucide-react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const CtaSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  return (
    <section
      ref={sectionRef}
      className="relative py-24 overflow-hidden cta-section"
    >
      {/* Animated background patterns */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center " />
        <div
          className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 brighn"
          style={{ backdropFilter: "brightness(.4)" }}
        />
      </div>

      <div className="relative mx-auto px-6 container">
        <motion.div style={{ y, opacity }} className="mx-auto max-w-4xl">
          {/* Main content */}
          <div className="mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 mb-6 px-4 py-1.5 border border-white/10 rounded-full"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400 font-medium text-transparent text-sm">
                Limited Time Offer
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6 font-bold text-white text-4xl md:text-5xl leading-tight"
            >
              Start Protecting Your Crops Today
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12 text-gray-300 text-xl"
            >
              Join thousands of farmers who trust our blockchain-powered
              insurance platform
            </motion.p>

            {/* Feature cards */}
            <div className="gap-6 grid grid-cols-1 md:grid-cols-3 mb-12">
              {[
                {
                  icon: <Shield className="w-6 h-6 text-emerald-400" />,
                  title: "Instant Coverage",
                  description: "Get protected in minutes",
                },
                {
                  icon: <Zap className="w-6 h-6 text-blue-400" />,
                  title: "Smart Payouts",
                  description: "Automated claim processing",
                },
                {
                  icon: <ArrowRight className="w-6 h-6 text-purple-400" />,
                  title: "Easy Setup",
                  description: "Simple 3-step registration",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="group relative bg-white/5 hover:bg-white/10 p-6 rounded-2xl overflow-hidden transition-colors duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 group-hover:from-emerald-500/10 via-blue-500/0 group-hover:via-blue-500/10 to-purple-500/0 group-hover:to-purple-500/10 transition-all duration-500" />
                  <div className="relative">
                    <div className="mb-4">{feature.icon}</div>
                    <h3 className="mb-2 font-semibold text-white text-xl">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="inline-block"
            >
              {/* <Button className="group relative bg-gradient-to-r from-emerald-500 hover:from-emerald-600 to-blue-500 hover:to-blue-600 shadow-lg hover:shadow-2xl px-8 py-4 rounded-xl font-medium text-white text-lg hover:scale-105 transition-all duration-300"> */}

              <button
                type="submit"
                onClick={() => {
                  if (isLoggedIn) {
                    navigate("buy-insurance");
                  }
                  else{
                    navigate("/login")
                  }
                }}
                class="group before:-left-full before:hover:left-0 z-10 before:-z-10 isolation-auto before:absolute relative flex justify-center items-center gap-2 bg-gray-50 before:bg-emerald-500 shadow-xl backdrop-blur-md mx-auto px-4 py-2 border-2 border-gray-50 rounded-full before:rounded-full before:hover:w-full before:w-full before:aspect-square overflow-hidden lg:font-semibold text-black hover:text-gray-50 text-lg before:hover:scale-150 before:transition-all before:duration-700 before:hover:duration-700"
              >
                Get Started Now
                <svg
                  class="justify-end group-hover:bg-gray-50 p-2 border border-gray-700 group-hover:border-none rounded-full w-8 h-8 text-gray-50 rotate-45 group-hover:rotate-90 duration-300 ease-linear"
                  viewBox="0 0 16 19"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                    class="fill-gray-800 group-hover:fill-gray-800"
                  ></path>
                </svg>
              </button>
              {/* </Button> */}
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap justify-center items-center gap-6 mt-16"
            >
              {[
                "Built for Farmers",
                "Innovation in Progress",
                "24/7 Support",
              ].map((badge, index) => (
                <div
                  key={index}
                  className="bg-white/5 px-4 py-2 border border-white/10 rounded-full text-white text-sm"
                >
                  {badge}
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
