import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import Farmer from "../assets/farm-hero.png";
import {
  ShieldCheck,
  Coins,
  Clock,
  CloudLightning,
  ArrowRight,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import Card from "../components/Card";
import FeaturesSection from "../components/FeaturesSection";
import TestimonialsSection from "../components/TestimonialsSection";
import CtaSection from "../components/CtaSection";
import BlurText from "../components/BlurText";
import FAQSection from "../components/FAQSection";
import { useAuth } from "../context/AuthContext.jsx";
import FEATURES from "../assets/FEATURES.png";

const HomePage = () => {
  const navigate = useNavigate();
  const containerRef = useRef();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const { isLoggedIn, logout } = useAuth();

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };

  return (
    <div className="flex flex-col min-h-screen" ref={containerRef}>
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex justify-center items-center dark:bg-neutral-900 min-h-screen overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div className="relative rounded-b-[30px] w-full h-full overflow-hidden">
            <img
              src={Farmer}
              alt="Farm background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-[2px]" />
          </div>
        </div>

        <div className="z-10 relative mx-auto px-4 container">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6">
              <h1 className="mb-6 font-bold text-5xl md:text-6xl">
                <span className="flex justify-center mx-auto">
                  <BlurText
                    text="Secure Your Harvest"
                    delay={150}
                    animateBy="words"
                    direction="top"
                    onAnimationComplete={handleAnimationComplete}
                    className="drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] font-heading text-white"
                  />
                </span>
                <br />
                <span className="drop-shadow-[0_0_10px_rgba(255,255,255,0.4)] text-white/90 text-5xl">
                  With{" "}Blockchain
                  {/* <span className="bg-green-700 dark:bg-green-600 backdrop-blur-sm px-2 py-1 rounded-md italic">
                   
                  </span> */}
                  -Powered Insurance
                </span>
              </h1>
              <p className="mb-8 font-body text-white/80 text-xl">
                Instant payouts, transparent claims, and farmer-first platform.
                Protect your crops and secure your future with AgriSure's
                innovative blockchain technology.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex sm:flex-row flex-col justify-center gap-4"
            >
              <Button
                size="lg"
                className="shadow__btn"
                onClick={() => {
                  if (isLoggedIn) {
                    navigate("/buy-insurance");
                  } else {
                    navigate("/login");
                  }
                }}
              >
                Buy Insurance
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border-white text-white"
                style={{ borderRadius: "100px" }}
                onClick={() => {
                  if (isLoggedIn) {
                    navigate("/claims");
                  } else {
                    navigate("/login");
                  }
                }}
              >
                Claim insurance
              </Button>
            </motion.div>

            {/* Floating stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="relative mt-12"
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="-top-8 -left-8 z-10 absolute bg-white/90 dark:bg-neutral-800/90 shadow-lg dark:shadow-neutral-800/50 backdrop-blur-sm p-6 border border-green-100 dark:border-green-800 rounded-xl"
              >
                <div className="mb-2 font-stats text-green-600 dark:text-green-400 text-3xl">
                  98%
                </div>
                <div className="font-body text-gray-600 dark:text-neutral-300">
                  Claim Success Rate
                </div>
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5,
                }}
                className="-top-8 -right-8 z-10 absolute bg-white/90 dark:bg-neutral-800/90 shadow-lg dark:shadow-neutral-800/50 backdrop-blur-sm p-6 border border-green-100 dark:border-green-800 rounded-[20px] w-[200px] h-[120px]"
              >
                <div className="mb-2 font-stats text-green-600 dark:text-green-400 text-3xl">
                  24h
                </div>
                <div className="font-body text-gray-600 dark:text-neutral-300">
                  Average Payout Time
                </div>
              </motion.div>

              {/* Decorative background for stats */}
              <div className="-top-12 -left-12 absolute bg-green-100 dark:bg-neutral-900 opacity-20 blur-xl rounded-full w-32 h-32 animate-pulse-slow" />
              <div className="-right-12 -bottom-12 absolute bg-emerald-100 dark:bg-neutral-800 opacity-20 blur-xl rounded-full w-32 h-32 animate-pulse-slow" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      <div className="relative flex justify-center items-center dark:bg-neutral-900 min-h-screen overflow-hidden">
        <img
          src={FEATURES}
          alt="Farm background"
          className="w-full h-full object-cover"
        />
      </div>
      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <CtaSection />

      <FAQSection />

      <Footer />
    </div>
  );
};

export default HomePage;
