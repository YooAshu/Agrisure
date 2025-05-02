import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import LoadingSpinner from "../components/LoadingSpinner";
import ProgressTracker from "../components/ProgressTracker";
import { Check, Upload } from "lucide-react";
import axios from "axios";

const SignupPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [landDocument, setLandDocument] = useState(null);
  const [signupComplete, setSignupComplete] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
    getValues,
  } = useForm({
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      address: "",
      language_pref: "",
      aadhaar_number: "",
      upi_id: "",
    },
  });

  const languageOptions = [
    { value: "english", label: "English" },
    { value: "hindi", label: "Hindi" },
    { value: "marathi", label: "Marathi" },
    { value: "gujarati", label: "Gujarati" },
    { value: "punjabi", label: "Punjabi" },
    { value: "tamil", label: "Tamil" },
    { value: "telugu", label: "Telugu" },
    { value: "kannada", label: "Kannada" },
    { value: "malayalam", label: "Malayalam" },
    { value: "bengali", label: "Bengali" },
  ];

  const steps = ["Personal Details", "Document Upload", "Confirmation"];

  const nextStep = async () => {
    const isValid = await trigger();

    if (isValid) {
      if (step === 1) {
        setStep(2);
      } else if (step === 2) {
        if (!landDocument) {
          return;
        }
        onSubmit(getValues());
      }
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === "application/pdf") {
        setLandDocument(file);
        setUploadComplete(true);
      } else {
        alert("Please upload a PDF file");
      }
    }
  };

  const onSubmit = (data) => {
    setIsLoading(true);

    // Create FormData object to handle file upload
    // const submissionData = new FormData();

    // // Add all form fields
    // submissionData.append("full_name", data.full_name);
    // submissionData.append("email", data.email);
    // submissionData.append("password", data.password);
    // submissionData.append("phone", data.phone);
    // submissionData.append("address", data.address);
    // submissionData.append("language_pref", data.language_pref);
    // submissionData.append("aadhaar_number", data.aadhaar_number);
    // submissionData.append("upi_id", data.upi_id);
    const submissionData = {
      full_name: data.full_name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      address: data.address,
      language_pref: data.language_pref,
      aadhaar_number: data.aadhaar_number,
      upi_id: data.upi_id,
      // landDocument: landDocument, // Only if you plan to handle this as base64 or external upload
    };

    // Add file if it exists
    // if (landDocument) {
    //   submissionData.append("landDocument", landDocument);
    // }

    // Log the form data for development purposes
    // for (let pair of submissionData.entries()) {
    //   console.log(pair[0], pair[1]); // Prints key-value pairs
    // }

    // Simulating API call
    // setTimeout(() => {
    // You would normally use this:
    handleSignup(submissionData);

    setIsLoading(false);
    setSignupComplete(true);
    setStep(3);
  };

  const handleSignup = async (submissionData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/farmer/signup`,
        submissionData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("Response from server:", response.data);
      setIsLoading(false);
      setSignupComplete(true);
      setStep(3);
    } catch (error) {
      console.error("Error signing up:", error);
      setIsLoading(false);
      alert("Failed to sign up. Please try again.");
    }
  };

  const renderStepContent = () => {
    const watchedValues = getValues();

    switch (step) {
      case 1:
        return (
          <div>
            <h2 className="mb-6 font-semibold text-gray-900 dark:text-neutral-100 text-xl">
              Personal Details
            </h2>
            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700 dark:text-neutral-300 text-sm">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.full_name
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 dark:border-neutral-600 focus:border-green-500 focus:ring-green-500"
                } focus:outline-none focus:ring-2 focus:ring-opacity-50 dark:bg-neutral-800 dark:text-white`}
                placeholder="Enter your full name"
                {...register("full_name", {
                  required: "Full name is required",
                })}
              />
              {errors.full_name && (
                <p className="mt-1 text-red-600 dark:text-red-400 text-sm">
                  {errors.full_name.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700 dark:text-neutral-300 text-sm">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.email
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 dark:border-neutral-600 focus:border-green-500 focus:ring-green-500"
                } focus:outline-none focus:ring-2 focus:ring-opacity-50 dark:bg-neutral-800 dark:text-white`}
                placeholder="Enter your email address"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Please enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="mt-1 text-red-600 dark:text-red-400 text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700 dark:text-neutral-300 text-sm">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.password
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 dark:border-neutral-600 focus:border-green-500 focus:ring-green-500"
                } focus:outline-none focus:ring-2 focus:ring-opacity-50 dark:bg-neutral-800 dark:text-white`}
                placeholder="Create a password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                })}
              />
              {errors.password && (
                <p className="mt-1 text-red-600 dark:text-red-400 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700 dark:text-neutral-300 text-sm">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.confirmPassword
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 dark:border-neutral-600 focus:border-green-500 focus:ring-green-500"
                } focus:outline-none focus:ring-2 focus:ring-opacity-50 dark:bg-neutral-800 dark:text-white`}
                placeholder="Confirm your password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (val) => {
                    if (watch("password") !== val) {
                      return "Passwords do not match";
                    }
                  },
                })}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-red-600 dark:text-red-400 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700 dark:text-neutral-300 text-sm">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.phone
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 dark:border-neutral-600 focus:border-green-500 focus:ring-green-500"
                } focus:outline-none focus:ring-2 focus:ring-opacity-50 dark:bg-neutral-800 dark:text-white`}
                placeholder="Enter your 10-digit mobile number"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[6-9]\d{9}$/,
                    message: "Please enter a valid 10-digit mobile number",
                  },
                })}
              />
              {errors.phone && (
                <p className="mt-1 text-red-600 dark:text-red-400 text-sm">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700 dark:text-neutral-300 text-sm">
                Aadhaar Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.aadhaar_number
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 dark:border-neutral-600 focus:border-green-500 focus:ring-green-500"
                } focus:outline-none focus:ring-2 focus:ring-opacity-50 dark:bg-neutral-800 dark:text-white`}
                placeholder="Enter your 12-digit Aadhaar number"
                {...register("aadhaar_number", {
                  required: "Aadhaar number is required",
                  pattern: {
                    value: /^\d{12}$/,
                    message: "Please enter a valid 12-digit Aadhaar number",
                  },
                })}
              />
              {errors.aadhaar_number && (
                <p className="mt-1 text-red-600 dark:text-red-400 text-sm">
                  {errors.aadhaar_number.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700 dark:text-neutral-300 text-sm">
                Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.address
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 dark:border-neutral-600 focus:border-green-500 focus:ring-green-500"
                } focus:outline-none focus:ring-2 focus:ring-opacity-50 dark:bg-neutral-800 dark:text-white`}
                placeholder="Enter your full address"
                {...register("address", { required: "Address is required" })}
              />
              {errors.address && (
                <p className="mt-1 text-red-600 dark:text-red-400 text-sm">
                  {errors.address.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700 dark:text-neutral-300 text-sm">
                UPI ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.upi_id
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 dark:border-neutral-600 focus:border-green-500 focus:ring-green-500"
                } focus:outline-none focus:ring-2 focus:ring-opacity-50 dark:bg-neutral-800 dark:text-white`}
                placeholder="Enter your UPI ID"
                {...register("upi_id", { required: "UPI ID is required" })}
              />
              {errors.upi_id && (
                <p className="mt-1 text-red-600 dark:text-red-400 text-sm">
                  {errors.upi_id.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700 dark:text-neutral-300 text-sm">
                Preferred Language <span className="text-red-500">*</span>
              </label>
              <select
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.language_pref
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 dark:border-neutral-600 focus:border-green-500 focus:ring-green-500"
                } focus:outline-none focus:ring-2 focus:ring-opacity-50 dark:bg-neutral-800 dark:text-white`}
                {...register("language_pref", {
                  required: "Please select your preferred language",
                })}
              >
                <option value="">Select a language</option>
                {languageOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.language_pref && (
                <p className="mt-1 text-red-600 dark:text-red-400 text-sm">
                  {errors.language_pref.message}
                </p>
              )}
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className="mb-6 font-semibold text-gray-900 dark:text-neutral-100 text-xl">
              Upload Land Document
            </h2>
            <div className="mb-6">
              <label className="block mb-1 font-medium text-gray-700 dark:text-neutral-300 text-sm">
                Land Document (PDF) <span className="text-red-500">*</span>
              </label>
              <div
                className={`border-2 border-dashed ${
                  !landDocument && isLoading
                    ? "border-red-300 dark:border-red-700"
                    : "border-gray-300 dark:border-neutral-600"
                } rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-neutral-800/50`}
              >
                <input
                  type="file"
                  id="landDocument"
                  name="landDocument"
                  accept="application/pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label htmlFor="landDocument" className="cursor-pointer">
                  {uploadComplete ? (
                    <div className="flex flex-col items-center">
                      <div className="flex justify-center items-center bg-green-100 dark:bg-green-900/50 mb-2 rounded-full w-12 h-12">
                        <Check className="w-6 h-6 text-green-600 dark:text-green-400" />
                      </div>
                      <span className="font-medium text-green-600 dark:text-green-400 text-sm">
                        {landDocument?.name}
                      </span>
                      <span className="mt-1 text-gray-500 dark:text-neutral-400 text-xs">
                        Click to replace file
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Upload className="mx-auto w-12 h-12 text-gray-400 dark:text-neutral-500" />
                      <p className="mt-2 text-gray-700 dark:text-neutral-300 text-sm">
                        <span className="font-medium text-green-600 dark:text-green-400">
                          Click to upload
                        </span>{" "}
                        or drag and drop
                      </p>
                      <p className="mt-1 text-gray-500 dark:text-neutral-400 text-xs">
                        PDF file only (max 5MB)
                      </p>
                    </div>
                  )}
                </label>
              </div>
              {!landDocument && isLoading && (
                <p className="mt-1 text-red-600 dark:text-red-400 text-sm">
                  Please upload your land document
                </p>
              )}
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h2 className="mb-6 font-semibold text-gray-900 dark:text-neutral-100 text-xl">
              Registration Complete, Wait for Document Verification
            </h2>
            <div className="bg-green-50 dark:bg-green-900/30 p-6 rounded-lg">
              <div className="flex justify-center mb-4">
                <div className="flex justify-center items-center bg-green-100 dark:bg-green-900/50 rounded-full w-16 h-16">
                  <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <h3 className="mb-2 font-medium text-green-800 dark:text-green-200 text-lg text-center">
                Your account has been successfully created! Wait 24hrs for
                document verification
              </h3>
              <p className="mb-6 text-gray-600 dark:text-neutral-300 text-center">
                Thank you for registering with us. Your details have been
                submitted successfully.
              </p>
              <div className="bg-white/50 dark:bg-neutral-700/50 mb-4 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 dark:text-neutral-300">
                    Name:
                  </span>
                  <span className="font-medium text-gray-900 dark:text-neutral-100">
                    {watchedValues.full_name}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 dark:text-neutral-300">
                    Email:
                  </span>
                  <span className="font-medium text-gray-900 dark:text-neutral-100">
                    {watchedValues.email}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 dark:text-neutral-300">
                    Phone:
                  </span>
                  <span className="font-medium text-gray-900 dark:text-neutral-100">
                    {watchedValues.phone}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 dark:text-neutral-300">
                    Aadhaar:
                  </span>
                  <span className="font-medium text-gray-900 dark:text-neutral-100">
                    {watchedValues.aadhaar_number.substring(0, 4) +
                      "XXXX" +
                      watchedValues.aadhaar_number.substring(8)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-neutral-300">
                    Document:
                  </span>
                  <span className="font-medium text-gray-900 dark:text-neutral-100">
                    {landDocument?.name || "Document uploaded"}
                  </span>
                </div>
              </div>
              <Button
                onClick={() => {
                  navigate("/login");
                }}
                fullWidth
                className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
              >
                Go to Login Page
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow bg-gradient-to-br from-green-50 dark:from-neutral-900 via-white dark:via-neutral-800 to-emerald-50 dark:to-neutral-950 pt-24 pb-10">
        <div className="relative flex justify-center items-start min-h-screen overflow-hidden">
          {/* Animated background shapes */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="top-0 left-0 absolute bg-green-100 dark:bg-neutral-800 opacity-10 dark:opacity-10 blur-xl rounded-full w-96 h-96 animate-blob mix-blend-multiply filter"></div>
            <div className="top-0 right-0 absolute bg-emerald-100 dark:bg-neutral-800 opacity-20 dark:opacity-10 blur-xl rounded-full w-96 h-96 animate-blob animation-delay-2000 mix-blend-multiply filter"></div>
            <div className="-bottom-8 left-20 absolute bg-lime-100 dark:bg-neutral-800 opacity-20 dark:opacity-10 blur-xl rounded-full w-96 h-96 animate-blob animation-delay-4000 mix-blend-multiply filter"></div>
          </div>

          <div className="z-10 relative mx-auto px-4 container">
            <div className="mx-auto max-w-3xl">
              <h1 className="mb-8 font-bold text-gray-900 dark:text-neutral-100 text-3xl text-center">
                Create Your Account
              </h1>
              <ProgressTracker steps={steps} currentStep={step} />
              <div className="bg-white/80 dark:bg-neutral-800/80 shadow-lg backdrop-blur-sm mb-8 p-6 rounded-lg">
                <form onSubmit={handleSubmit(onSubmit)}>
                  {renderStepContent()}
                  {step < 3 && (
                    <div className="flex justify-between mt-6">
                      {step > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={prevStep}
                          className="hover:bg-green-50 dark:hover:bg-neutral-700 border-green-600 dark:border-green-400 text-green-600 dark:text-green-400"
                        >
                          Back
                        </Button>
                      )}
                      <Button
                        type="button"
                        onClick={nextStep}
                        disabled={isLoading}
                        className={`${
                          step === 1 || (step > 1 && step < 3) ? "ml-auto" : ""
                        } bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600`}
                      >
                        {isLoading ? (
                          <div className="flex justify-center items-center">
                            <LoadingSpinner size="sm" className="mr-2" />
                            <span>Processing...</span>
                          </div>
                        ) : step === 2 ? (
                          "Complete Registration"
                        ) : (
                          "Next"
                        )}
                      </Button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignupPage;
