import React, { useState } from "react";
import { Plus, Minus, ArrowUpRight } from "lucide-react";
import blockchainImage from "../assets/blockchain-1.jpg";
import smartContractImage from "../assets/blockchain-2.jpg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const FAQSection = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [openQuestion, setOpenQuestion] = useState(0);

  const faqs = [
    {
      question: "How does blockchain ensure transparency in insurance claims?",
      answer:
        "Our blockchain technology creates an immutable record of all insurance claims and transactions. Every step of the claim process is recorded on the blockchain, allowing farmers to track their claims in real-time and ensuring complete transparency in payouts.",
    },
    {
      question: "What makes our smart contracts secure?",
      answer:
        "Our smart contracts are audited by leading security firms and use automated weather data feeds to trigger instant payouts. The code is open-source and verifiable, eliminating manual intervention and ensuring trustless execution of insurance policies.",
    },
    {
      question: "How are claim payouts processed through blockchain?",
      answer:
        "When predefined conditions are met (like weather events verified by oracle data), smart contracts automatically initiate payouts. The process is instant, removing traditional waiting periods and reducing administrative overhead.",
    },
    {
      question: "Can farmers verify their policy terms on blockchain?",
      answer:
        "Yes, all policy terms are stored on the blockchain and can be verified by farmers at any time. The immutable nature of blockchain ensures that terms cannot be altered once the policy is issued, providing complete security and trust.",
    },
  ];

  return (
    <section className="relative bg-gradient-to-br from-green-50 dark:from-neutral-900 via-white dark:via-neutral-800 to-emerald-50 dark:to-neutral-950 py-24 overflow-hidden">
      {/* Decorative dots pattern */}

      <div className="mx-auto px-4 container">
        <div className="flex lg:flex-row flex-col items-start gap-16">
          {/* Left side content */}
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="top-[30px] left-[550px] z-10 absolute">
                <div className="gap-4 grid grid-cols-6 w-[100px]">
                  {[...Array(72)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-green-500/70 dark:bg-green-500 rounded-full w-1 h-1"
                    ></div>
                  ))}
                </div>
              </div>
              {/* Main image */}
              <div className="relative">
                <div
                  className="left-[430px] z-2 absolute flex justify-center items-center bg-white rounded-2xl w-[70px] h-[60px] cursor-pointer"
                  onClick={() => {
                    if (!isLoggedIn) navigate("/login");
                    else navigate("/ai-agent");
                  }}
                >
                  <ArrowUpRight className="stroke-[2] w-12 h-12 text-black" />
                </div>
                <img
                  src={blockchainImage}
                  alt="Blockchain Technology"
                  className="top_right shadow-lg dark:shadow-neutral-800 rounded-2xl w-[500px] object-cover"
                />
              </div>
              {/* Secondary image */}
              <div className="right-8 -bottom-12 z-10 absolute w-[300px] h-[250px]">
                <img
                  src={smartContractImage}
                  alt="Smart Contracts"
                  className="shadow-lg dark:shadow-neutral-800 rounded-2xl w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right side content */}
          <div className="lg:w-1/2">
            <div className="mb-8">
              <span className="block mb-2 font-medium text-green-600 dark:text-green-400">
                ASKED QUESTIONS
              </span>
              <h2 className="mb-4 font-bold text-gray-900 dark:text-neutral-100 text-4xl lg:text-5xl">
                Do You Have Any Questions?
              </h2>
              <p className="text-gray-600 dark:text-neutral-400">
                Learn how our blockchain technology revolutionizes agricultural
                insurance with transparency, security, and instant payouts.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`border dark:border-neutral-700 rounded-xl overflow-hidden ${
                    openQuestion === index
                      ? "bg-green-50 dark:bg-neutral-800"
                      : "bg-white/50 dark:bg-neutral-800/50"
                  }`}
                >
                  <button
                    onClick={() =>
                      setOpenQuestion(openQuestion === index ? -1 : index)
                    }
                    className="flex justify-between items-center p-6 w-full text-left"
                  >
                    <span className="font-semibold text-gray-900 dark:text-neutral-100">
                      {faq.question}
                    </span>
                    <span className="ml-6">
                      {openQuestion === index ? (
                        <Minus className="w-5 h-5 text-green-600 dark:text-green-400" />
                      ) : (
                        <Plus className="w-5 h-5 text-gray-400 dark:text-neutral-500" />
                      )}
                    </span>
                  </button>
                  {openQuestion === index && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-600 dark:text-neutral-300">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
