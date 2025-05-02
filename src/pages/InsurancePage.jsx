import React from "react";
import {
  ShieldCheck,
  PercentCircle,
  IndianRupee,
  UsersRound,
  CalendarClock,
  Sparkles,
} from "lucide-react";
import Navbar from "../components/Navbar";
import { insuranceSchemes } from "../dummyData";

// Glassmorphism-style info box
const DetailBox = ({ icon: Icon, label, value, color }) => (
  <div className="flex flex-col justify-center items-center gap-2 bg-white/20 dark:bg-neutral-700/30 shadow-sm backdrop-blur-sm px-4 py-3 rounded-xl w-full sm:w-1/4 text-gray-800 dark:text-neutral-200 text-sm">
    <Icon className={`w-7 h-7 ${color}`} />
    
      <p className="font-semibold text-2xl">{label}</p>
      <p className="text-base text-center">{value}</p>
    
  </div>
);

// Single insurance scheme card
const InsuranceCard = ({ scheme }) => {
  return (
    <div className="bg-gradient-to-tr from-green-200/30 dark:from-neutral-800 to-green-100/10 dark:to-neutral-900 shadow-xl border border-neutral-200 dark:border-neutral-700 rounded-2xl overflow-hidden">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-green-500 dark:from-green-600 via-green-600 dark:via-green-700 to-green-500 dark:to-green-400 p-6 text-white">
        <h2 className="flex items-center gap-3 font-semibold text-xl">
          <ShieldCheck className="w-6 h-6 text-yellow-300" />
          {scheme.name}
        </h2>
        <p className="opacity-90 mt-1 text-sm">{scheme.description}</p>
      </div>

      {/* Detail Row */}
      <div className="flex flex-wrap sm:flex-nowrap justify-between gap-4 px-6 py-5">
        <DetailBox
          icon={PercentCircle}
          label="Premium Rate"
          value={scheme.premiumRate}
          color="text-blue-500"
        />
        <DetailBox
          icon={IndianRupee}
          label="Sum Insured"
          value={scheme.sumInsured}
          color="text-green-600"
        />
        <DetailBox
          icon={UsersRound}
          label="Eligibility"
          value={scheme.eligibility}
          color="text-purple-500"
        />
        <DetailBox
          icon={CalendarClock}
          label="Duration"
          value={scheme.duration}
          color="text-red-500"
        />
      </div>

      {/* Coverage Section */}
      <div className="flex justify-center items-center gap-4 px-6 pb-6">
        <div className="flex justify-center items-center gap-2 text-gray-800 dark:text-neutral-200 text-sm">
          <Sparkles className="w-4 h-4 text-orange-500" />
          <strong>Coverage:</strong>
        </div>
        <div className="flex flex-wrap gap-2">
          {scheme.coverage.map((item, idx) => (
            <span
              key={idx}
              className="bg-green-100 dark:bg-green-600 shadow-sm px-3 py-1 rounded-full font-medium text-green-800 dark:text-green-100 text-xs"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// Full Insurance Page
const InsurancePage = () => {
  const schemes = insuranceSchemes

  return (
    <div className="flex flex-col bg-gradient-to-br from-green-50 dark:from-neutral-900 via-white dark:via-neutral-800 to-emerald-50 dark:to-neutral-950 min-h-screen">
      {/* Animated background shapes */}
      <div className="-z-10 fixed inset-0 overflow-hidden">
        <div className="top-0 -left-4 absolute bg-green-200 dark:bg-green-900/30 opacity-70 blur-xl rounded-full w-72 h-72 animate-blob mix-blend-multiply filter"></div>
        <div className="top-0 -right-4 absolute bg-emerald-200 dark:bg-emerald-900/30 opacity-70 blur-xl rounded-full w-72 h-72 animate-blob animation-delay-2000 mix-blend-multiply filter"></div>
        <div className="-bottom-8 left-20 absolute bg-teal-200 dark:bg-teal-900/30 opacity-70 blur-xl rounded-full w-72 h-72 animate-blob animation-delay-4000 mix-blend-multiply filter"></div>
      </div>
      <Navbar />
      {/* Main Content */}
      <div className="bg-white dark:bg-neutral-900 mx-auto px-8 py-8 pt-20 w-full min-h-screen text-gray-900 dark:text-neutral-100">
        <h1 className="mb-10 font-bold text-3xl text-center">
          🌾 Insurance Schemes
        </h1>
        <div className="space-y-10">
          {schemes.map((scheme) => (
            <InsuranceCard key={scheme.id} scheme={scheme} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InsurancePage;
