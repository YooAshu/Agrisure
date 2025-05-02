import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SpotlightCard from "./SpotlightCard";
import {
  ShieldCheck,
  Coins,
  Clock,
  CloudLightning,
  BarChart3,
  Phone,
  Database,
} from "lucide-react";

const FeatureCard = ({ icon, title, description, color, delay }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <SpotlightCard
      className="bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800"
      spotlightColor="rgba(0, 229, 255, 0.2)"
    >
      <motion.div
        ref={ref}
        initial={{ y: 50, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
        transition={{ duration: 0.6, delay }}
        className="group relative hover:shadow-xl backdrop-blur-sm p-6 rounded-xl overflow-hidden transition-all hover:-translate-y-2 duration-300 feature-card"
      >
        {/* Background Pattern */}
        <div
          className="-right-8 -bottom-8 absolute bg-gradient-to-br from-current to-transparent opacity-10 rounded-full w-24 h-24 group-hover:scale-150 transition-transform duration-700"
          style={{ color }}
        ></div>

        {/* Icon */}
        <motion.div
          className="flex justify-center items-center mb-4 rounded-lg w-14 h-14"
          style={{ backgroundColor: `${color}15` }} // Very light background
          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.5 }}
        >
          {React.cloneElement(icon, {
            size: 28,
            className: "transition-colors duration-300",
            style: { color },
          })}
        </motion.div>

        {/* Content */}
        <h3 className="z-10 relative mb-2 font-bold text-gray-900 dark:text-gray-100 text-xl">
          {title}
        </h3>
        <p className="z-10 relative pb-4 text-gray-600 dark:text-gray-300">
          {description}
        </p>

        {/* Bottom Indicator */}
        {/* <div
          className="bottom-0 left-0 absolute w-full h-1 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 transform"
          style={{ backgroundColor: color }}
        ></div> */}
      </motion.div>
    </SpotlightCard>
  );
};

const FeaturesSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: <ShieldCheck />,
      title: "Smart Contract Payouts",
      description:
        "Automated payouts triggered by verified weather events and crop damage without delays or paperwork.",
      color: "#16a34a", // green-600
    },
    {
      icon: <Coins />,
      title: "Blockchain Transparency",
      description:
        "All transactions and claims recorded on blockchain for complete transparency and security.",
      color: "#2563eb", // blue-600
    },
    {
      icon: <Clock />,
      title: "24/7 AI Support",
      description:
        "AI-powered assistance in multiple languages to help with claims, questions, and support.",
      color: "#9333ea", // purple-600
    },
    {
      icon: <CloudLightning />,
      title: "Risk Alerts via AI",
      description:
        "Receive timely alerts about potential weather risks to better protect your crops.",
      color: "#ea580c", // orange-600
    },
    {
      icon: <BarChart3 />,
      title: "Data-Driven Premiums",
      description:
        "Fair insurance rates based on actual risk data and historical crop performance.",
      color: "#0891b2", // cyan-600
    },
    {
      icon: <Database />,
      title: "Immutable Records",
      description:
        "Your policy and claim history securely stored on blockchain, accessible forever.",
      color: "#be123c", // rose-700
    },
  ];

  return (
    <section className="bg-gradient-to-br from-green-50 dark:from-neutral-900 via-white dark:via-neutral-800 to-emerald-50 dark:to-black py-24">
      <div className="mx-auto px-4 container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-4xl text-center"
        >
          <h2 className="mb-4 font-bold text-gray-900 dark:text-gray-100 text-3xl md:text-4xl">
            Why Choose AgriSure?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Our blockchain-powered platform brings transparency, speed, and
            security to crop insurance.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              color={feature.color}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
