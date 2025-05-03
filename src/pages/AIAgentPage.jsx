import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Button from "../components/Button";
import ChatBubble from "../components/ChatBubble";
import {
  Send,
  HelpCircle,
  FileText,
  AlertTriangle,
  DollarSign,
} from "lucide-react";
import axios from "axios";
import { AgrisureInfo } from "../dummyData";

const AIAgentPage = () => {
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm your AgriSure AI assistant. How can I help you today?",
      isUser: false,
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Add language state
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  // Available languages
  const languages = [
    { name: "English", code: "en" },
    { name: "हिंदी", displayName: "हिंदी (Hindi)", code: "hi" },
    { name: "বাংলা", displayName: "বাংলা (Bengali)", code: "bn" },
    { name: "தமிழ்", displayName: "தமிழ் (Tamil)", code: "ta" },
  ];

  // System prompt to guide AI responses
  const getSystemPrompt = () => {
    const languageInstruction =
      selectedLanguage !== "English"
        ? `Respond in ${selectedLanguage} language. `
        : "";

    return `You are an AI assistant for AgriSure, a blockchain-powered crop insurance platform.
    ${languageInstruction}Respond in a clear, helpful manner to farmers' questions about insurance claims, weather alerts, and agricultural advice.
    Format important information with **bold text** for emphasis and use proper paragraph breaks for readability.
    Be direct and avoid unnecessary text markers like "**Key Features:**" or other markdown-style formatting that won't render properly.
    Use natural language and avoid showing asterisks (*) in the final response.`;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    // Add a system message to inform users that language has changed
    const langChangeMsg =
      language === "English"
        ? `Language changed to ${language}.`
        : `Language changed to ${language}. I'll respond in ${language} now.`;

    setMessages((prev) => [
      ...prev,
      { text: langChangeMsg, isUser: false, isSystemMessage: true },
    ]);
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return;

    // Add user message
    const userMessage = { text: inputMessage, isUser: true };
    setMessages([...messages, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    try {
      console.log(
        "Making request to Gemini API with key:",
        import.meta.env.VITE_GEMINI_API_KEY ? "Key exists" : "Key missing"
      );

      // Get current system prompt with language instructions
      const currentSystemPrompt = getSystemPrompt();

      const res = await axios.post(
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro-001:generateContent?key=${
          import.meta.env.VITE_GEMINI_API_KEY
        }`,
        {
          contents: [
            {
              role: "model",
              parts: [{ text: currentSystemPrompt }],
            },
            {
              role: "user",
              parts: [{ text: AgrisureInfo }],
            },
            {
              role: "user",
              parts: [{ text: inputMessage }],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            maxOutputTokens: 800,
          },
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Gemini API response:", res.data);

      const botReply =
        res.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't generate a response.";

      setMessages((prev) => [...prev, { text: botReply, isUser: false }]);
    } catch (err) {
      console.error("API error details:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });

      const errorMessage =
        err.response?.data?.error?.message ||
        "⚠️ Error: Failed to get a response. Please check your API key and try again.";

      setMessages((prev) => [...prev, { text: errorMessage, isUser: false }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    { id: 1, text: "What's my claim status?", icon: <FileText size={16} /> },
    { id: 2, text: "Explain insurance terms", icon: <HelpCircle size={16} /> },
    {
      id: 3,
      text: "Weather forecast for my area",
      icon: <AlertTriangle size={16} />,
    },
    { id: 4, text: "UPI payment help", icon: <DollarSign size={16} /> },
  ];

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isLoggedIn={true} />

      <div className="flex-grow bg-gradient-to-br from-green-50 dark:from-neutral-900 via-white dark:via-neutral-800 to-emerald-50 dark:to-neutral-950 pt-24 pb-10">
        <div className="relative flex justify-center items-start pt-8 min-h-screen overflow-hidden">
          {/* Animated background shapes */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="top-0 left-0 absolute bg-green-100 dark:bg-green-500/20 opacity-10 dark:opacity-50 blur-xl rounded-full w-96 h-96 animate-blob mix-blend-multiply filter"></div>
            <div className="top-0 right-0 absolute bg-emerald-100 dark:bg-neutral-800 opacity-20 dark:opacity-10 blur-xl rounded-full w-96 h-96 animate-blob animation-delay-2000 mix-blend-multiply filter"></div>
            <div className="-bottom-8 left-20 absolute bg-lime-100 dark:bg-neutral-800 opacity-20 dark:opacity-10 blur-xl rounded-full w-96 h-96 animate-blob animation-delay-4000 mix-blend-multiply filter"></div>
          </div>

          <div className="z-10 relative mx-auto px-4 container">
            <div className="flex md:flex-row flex-col gap-6">
              {/* Sidebar with FAQ Cards */}
              <div className="md:w-1/4">
                <div className="top-24 sticky">
                  <h2 className="mb-4 font-semibold text-gray-900 dark:text-neutral-100 text-xl">
                    Quick Help
                  </h2>

                  <div className="space-y-3">
                    {quickQuestions.map((question) => (
                      <Card
                        key={question.id}
                        className="bg-white/80 dark:bg-neutral-800/80 hover:shadow-md backdrop-blur-sm transition-all cursor-pointer"
                        onClick={() => handleQuickQuestion(question.text)}
                      >
                        <div className="flex items-center">
                          <div className="bg-green-100 dark:bg-green-500/20 mr-3 p-2 rounded-full">
                            {question.icon}
                          </div>
                          <p className="text-gray-700 dark:text-neutral-300 text-sm">
                            {question.text}
                          </p>
                        </div>
                      </Card>
                    ))}
                  </div>

                  <div className="mt-6">
                    <Card className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm">
                      <h3 className="mb-2 font-medium text-gray-900 dark:text-neutral-100">
                        Language Support
                      </h3>
                      <p className="mb-3 text-gray-600 dark:text-neutral-400 text-sm">
                        Switch to your preferred language:
                      </p>
                      <div className="gap-2 grid grid-cols-2">
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => handleLanguageChange(lang.name)}
                            className={`px-2 py-1 rounded-md text-sm transition-colors ${
                              selectedLanguage === lang.name
                                ? "bg-green-200 dark:bg-green-600 text-gray-800 dark:text-white font-medium"
                                : "bg-green-50 hover:bg-green-100 dark:bg-neutral-700 dark:hover:bg-neutral-600"
                            }`}
                          >
                            {lang.displayName || lang.name}
                          </button>
                        ))}
                      </div>
                    </Card>
                  </div>
                </div>
              </div>

              {/* Chat Interface */}
              <div className="md:w-3/4" ref={messagesEndRef}>
                <Card
                  className="flex flex-col bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm h-full"
                  padding="p-0"
                >
                  <div className="bg-green-50 dark:bg-neutral-700 p-4 rounded-t-xl">
                    <h2 className="font-semibold text-gray-900 dark:text-neutral-100 text-xl">
                      AgriSure AI Assistant
                    </h2>
                    <p className="text-gray-600 dark:text-neutral-400 text-sm">
                      Ask me anything about your insurance, claims, or farming
                      advice
                    </p>
                  </div>

                  <div className="flex-grow p-4 max-h-[60vh] overflow-y-auto">
                    {messages.map((message, index) => (
                      <ChatBubble
                        key={index}
                        message={message.text}
                        isUser={message.isUser}
                        isSystemMessage={message.isSystemMessage}
                      />
                    ))}
                    {isTyping && (
                      <div className="flex justify-start mb-4">
                        <div className="bg-white/70 dark:bg-neutral-700/70 backdrop-blur-sm px-4 py-3 border border-green-100 dark:border-neutral-600 rounded-2xl rounded-tl-none text-gray-800 dark:text-neutral-100">
                          <div className="flex space-x-2">
                            <div
                              className="bg-green-400 dark:bg-green-500 rounded-full w-2 h-2 animate-bounce"
                              style={{ animationDelay: "0ms" }}
                            ></div>
                            <div
                              className="bg-green-400 dark:bg-green-500 rounded-full w-2 h-2 animate-bounce"
                              style={{ animationDelay: "150ms" }}
                            ></div>
                            <div
                              className="bg-green-400 dark:bg-green-500 rounded-full w-2 h-2 animate-bounce"
                              style={{ animationDelay: "300ms" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div />
                  </div>

                  <div className="p-4 border-green-100 dark:border-neutral-600 border-t">
                    <div className="flex">
                      <textarea
                        value={inputMessage}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message here..."
                        className="flex-grow bg-white/50 dark:bg-neutral-700/50 px-4 py-2 border border-gray-200 focus:border-green-300 dark:border-neutral-600 dark:focus:border-green-400 rounded-l-xl outline-none focus:ring-2 focus:ring-green-200 dark:focus:ring-green-400/20 text-gray-900 dark:placeholder:text-neutral-400 dark:text-neutral-100 placeholder:text-gray-400 resize-none"
                        rows="2"
                        disabled={isTyping}
                      />
                      <Button
                        onClick={handleSendMessage}
                        className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 px-4 rounded-r-xl rounded-l-none"
                        disabled={inputMessage.trim() === "" || isTyping}
                      >
                        <Send size={20} />
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AIAgentPage;
