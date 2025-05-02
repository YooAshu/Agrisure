import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Add axios import
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Button from "../components/Button";
import FormInput from "../components/FormInput";
import Dropdown from "../components/Dropdown";
import LoadingSpinner from "../components/LoadingSpinner";
import ProgressTracker from "../components/ProgressTracker";
import { motion } from "framer-motion";
import { Check, Minus, Plus } from "lucide-react";
import LocationInput from "../components/LocationInput";
import { insuranceSchemes } from "../dummyData";

// Simple premium calculation functions
function calculatePremium(acres, sumInsuredPerAcre, premiumRatePercent) {
  const coverageAmount = acres * sumInsuredPerAcre;
  const premium = (coverageAmount * premiumRatePercent) / 100;
  return premium;
}

function calculateCoverage(acres, sumInsuredPerAcre) {
  return acres * sumInsuredPerAcre;
}

// Internal components
const PolicyCard = ({ policy, selectedPolicy, onSelect }) => {
  // Get premium rate as a number
  const premiumRateNumber = parseFloat(policy.premiumRate.replace("%", ""));

  // Calculate premium per acre
  const premiumPerAcre = (policy.sumInsured * premiumRateNumber) / 100;

  return (
    <div
      className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
        selectedPolicy === policy.id
          ? "border-green-500 bg-green-50 dark:bg-green-900/20 shadow-md"
          : "border-gray-200 dark:border-neutral-700 hover:border-green-300 dark:hover:border-green-700"
      }`}
      onClick={() => onSelect(policy.id)}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center space-x-2">
          <div
            className={`w-5 h-5 rounded-full flex items-center justify-center ${
              selectedPolicy === policy.id
                ? "bg-green-500"
                : "border border-gray-400"
            }`}
          >
            {selectedPolicy === policy.id && (
              <Check size={12} className="text-white" />
            )}
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
            {policy.name}
          </h3>
        </div>
        <span className="font-bold text-green-600 dark:text-green-400">
          ₹{premiumPerAcre.toFixed(2)}/acre
        </span>
      </div>
      <div className="ml-7">
        <p className="mb-1 text-gray-500 dark:text-gray-400 text-sm">
          <span className="font-medium">Insurer:</span> {policy.insurer}
        </p>
        <p className="mb-2 text-gray-700 dark:text-gray-300 text-sm">
          {policy.description}
        </p>
        <div className="flex flex-wrap gap-1 mb-2">
          {Array.isArray(policy.coverage)
            ? policy.coverage.map((risk, idx) => (
                <span
                  key={idx}
                  className="bg-gray-100 dark:bg-neutral-700 px-2 py-1 rounded text-xs"
                >
                  {risk}
                </span>
              ))
            : policy.coverage &&
              typeof policy.coverage === "number" && (
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Coverage:{" "}
                  <span className="font-semibold">{policy.coverage}%</span> of
                  expected yield
                </p>
              )}
        </div>
        <div className="flex flex-wrap justify-between text-gray-600 dark:text-gray-300 text-sm">
          <p>
            Premium Rate:{" "}
            <span className="font-semibold">{policy.premiumRate}</span>
          </p>
          <p>
            Sum Insured:{" "}
            <span className="font-semibold">₹{policy.sumInsured}/acre</span>
          </p>
        </div>
        <p className="mt-1 text-gray-600 dark:text-gray-300 text-sm">
          Eligibility: <span className="font-medium">{policy.eligibility}</span>
        </p>
      </div>
    </div>
  );
};

const PremiumCalculation = ({ formData, policyOptions }) => {
  const selectedPolicy = policyOptions.find(
    (policy) => policy.id === formData.selectedPolicy
  );

  if (!selectedPolicy) return null;

  return (
    <div>
      <h2 className="mb-6 font-semibold text-gray-900 dark:text-neutral-100 text-xl">
        Premium Calculation
      </h2>
      <div className="bg-white dark:bg-neutral-700 shadow-md p-6 rounded-lg">
        <h3 className="mb-4 font-semibold text-gray-800 dark:text-white text-xl">
          {selectedPolicy.name} -{" "}
          {selectedPolicy.insurer || "Insurance Provider"}
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between py-2 border-gray-200 dark:border-neutral-600 border-b">
            <span className="text-gray-600 dark:text-gray-300">Crop Type:</span>
            <span className="font-medium text-gray-800 dark:text-white capitalize">
              {formData.cropType}
            </span>
          </div>
          <div className="flex justify-between py-2 border-gray-200 dark:border-neutral-600 border-b">
            <span className="text-gray-600 dark:text-gray-300">Land Size:</span>
            <span className="font-medium text-gray-800 dark:text-white">
              {formData.landSize} acres
            </span>
          </div>
          <div className="flex justify-between py-2 border-gray-200 dark:border-neutral-600 border-b">
            <span className="text-gray-600 dark:text-gray-300">
              Premium Rate:
            </span>
            <span className="font-medium text-gray-800 dark:text-white">
              {selectedPolicy.premiumRate}
            </span>
          </div>
          <div className="flex justify-between py-2 border-gray-200 dark:border-neutral-600 border-b">
            <span className="text-gray-600 dark:text-gray-300">
              Total Premium Amount:
            </span>
            <span className="font-bold text-green-600 dark:text-green-400">
              ₹{formData.premium}
            </span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-600 dark:text-gray-300">
              Coverage Amount:
            </span>
            <span className="font-bold text-green-600 dark:text-green-400">
              ₹{formData.coverageAmount}
            </span>
          </div>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 mt-6 p-4 border border-green-200 dark:border-green-800 rounded-lg">
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            This insurance policy provides coverage for your {formData.cropType}{" "}
            crop against various risks. The premium amount is calculated based
            on your land size and the selected policy's premium rate.
          </p>
        </div>
      </div>
    </div>
  );
};

const PolicySuccessDetails = ({ policyData, cropOptions, onNavigate }) => {
  return (
    <div>
      <h2 className="mb-6 font-semibold text-gray-900 dark:text-neutral-100 text-xl">
        Insurance Purchased Successfully
      </h2>
      <div className="bg-green-50 dark:bg-green-900/20 p-4 border border-green-200 dark:border-green-800 rounded-lg">
        <h3 className="mb-2 font-semibold text-lg">Policy Details</h3>
        <p>
          <span className="font-medium">Policy ID:</span> {policyData.policy_num}
        </p>
        <p>
          <span className="font-medium">Crop Type:</span>{" "}
          {cropOptions.find((c) => c.value === policyData.cropType)?.label ||
            policyData.cropType}
        </p>
        <p>
          <span className="font-medium">Land Size:</span> {policyData.landSize}{" "}
          acres
        </p>
        <p>
          <span className="font-medium">Premium Paid:</span> ₹
          {policyData.premium_amount}
        </p>
        <p>
          <span className="font-medium">Coverage Amount:</span> ₹
          {policyData.coverage_amount}
        </p>
        <p>
          <span className="font-medium">Policy Period:</span>{" "}
          {policyData.start_date} to {policyData.end_date}
        </p>
        <p>
          <span className="font-medium">Status:</span>{" "}
          <span className="font-semibold text-green-600">
            {policyData.status}
          </span>
        </p>
      </div>
      <Button
        onClick={onNavigate}
        className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 mt-6"
      >
        Go to Dashboard
      </Button>
    </div>
  );
};

const BuyInsurancePage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [estimating, setEstimating] = useState(false);
  const [formData, setFormData] = useState({
    cropType: "",
    landSize: "",
    premium_amount: "",
    coverage_amount: "",
    sowing_date: "",
    exp_yeild: "",
    location: {
      latitude: "",
      longitude: "",
      address: "",
    },
    selectedPolicy: null,
  });
  const [errors, setErrors] = useState({});
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [policyData, setPolicyData] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);
  const [apiError, setApiError] = useState(null);

  const cropOptions = [
    { value: "rice", label: "Rice" },
    { value: "wheat", label: "Wheat" },
    { value: "sugarcane", label: "Sugarcane" },
  ];

  const policyOptions = insuranceSchemes;

  const steps = [
    "Crop Selection",
    "Land Details",
    "Premium Calculation",
    "Payment",
    "Confirmation",
  ];

  const handleLocationSelect = (locationData) => {
    setFormData((prev) => ({
      ...prev,
      location: locationData,
    }));
  };

  const handlePolicySelect = (policyId) => {
    const selectedPolicy = policyOptions.find(
      (policy) => policy.id === policyId
    );

    if (selectedPolicy && formData.landSize) {
      // Get premium rate as a number
      const premiumRateNumber = parseFloat(
        selectedPolicy.premiumRate.replace("%", "")
      );

      // Calculate premium based on the simple function
      const premium = calculatePremium(
        parseFloat(formData.landSize),
        selectedPolicy.sumInsured,
        premiumRateNumber
      );

      const coverageAmount = calculateCoverage(
        parseFloat(formData.landSize),
        selectedPolicy.sumInsured
      );

      setFormData((prev) => ({
        ...prev,
        selectedPolicy: policyId,
        premium: premium.toFixed(2),
        coverageAmount: coverageAmount.toFixed(2),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        selectedPolicy: policyId,
      }));
    }
  };

  useEffect(() => {
    // Calculate premium when land size is provided and policy is selected
    if (formData.landSize > 0 && formData.selectedPolicy) {
      setEstimating(true);

      // Simulate API call
      const timer = setTimeout(() => {
        const selectedPolicy = policyOptions.find(
          (policy) => policy.id === formData.selectedPolicy
        );

        if (selectedPolicy) {
          // Get premium rate as a number
          const premiumRateNumber = parseFloat(
            selectedPolicy.premiumRate.replace("%", "")
          );

          // Calculate premium using the simple function
          const premium = calculatePremium(
            parseFloat(formData.landSize),
            selectedPolicy.sumInsured,
            premiumRateNumber
          );

          const coverageAmount = calculateCoverage(
            parseFloat(formData.landSize),
            selectedPolicy.sumInsured
          );

          setFormData((prev) => ({
            ...prev,
            premium: premium.toFixed(2),
            coverageAmount: coverageAmount.toFixed(2),
          }));
        }

        setEstimating(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [formData.landSize, formData.selectedPolicy]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }

    // Recalculate premium if changing land size and a policy is already selected
    if (name === "landSize" && formData.selectedPolicy && value > 0) {
      const selectedPolicy = policyOptions.find(
        (policy) => policy.id === formData.selectedPolicy
      );

      if (selectedPolicy) {
        // Get premium rate as a number
        const premiumRateNumber = parseFloat(
          selectedPolicy.premiumRate.replace("%", "")
        );

        const premium = calculatePremium(
          parseFloat(value),
          selectedPolicy.sumInsured,
          premiumRateNumber
        );

        const coverageAmount = calculateCoverage(
          parseFloat(value),
          selectedPolicy.sumInsured
        );

        setFormData((prev) => ({
          ...prev,
          [name]: value,
          premium: premium.toFixed(2),
          coverageAmount: coverageAmount.toFixed(2),
        }));
      }
    }
  };

  const validateStep = () => {
    let isValid = true;
    const newErrors = {};

    if (step === 1) {
      if (!formData.cropType) {
        newErrors.cropType = "Please select a crop type";
        isValid = false;
      }
      if (!formData.selectedPolicy) {
        newErrors.selectedPolicy = "Please select an insurance policy";
        isValid = false;
      }
    } else if (step === 2) {
      if (!formData.landSize) {
        newErrors.landSize = "Land size is required";
        isValid = false;
      } else if (
        isNaN(formData.landSize) ||
        parseFloat(formData.landSize) <= 0
      ) {
        newErrors.landSize = "Please enter a valid land size";
        isValid = false;
      }

      if (!formData.location || !formData.location.address) {
        newErrors.location = "Location is required";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  // Function to send API request after payment
  const sendInsuranceData = async (policyData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/insurance/buy-policy`,
        JSON.stringify(policyData), // convert to JSON string
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      
      console.log(response.data);

      // const apiUrl = 'https://api.example.com/insurance/policies'; // Replace with your actual API endpoint

      // Log the request body before sending
      console.log("Sending insurance policy data:", policyData);

      // const response = await axios.post(apiUrl, policyData);

      // Log the API response
      // console.log('API Response:', response.data);

      // setApiResponse(response.data);
      // return response.data;
    } catch (error) {
      console.error("Error sending insurance data:", error);
      setApiError(error.message || "Failed to submit insurance data");
      return null;
    }
  };

  const handlePayment = () => {
    setIsLoading(true);
    setApiError(null);

    // Calculate start and end dates
    const startDate = new Date().toISOString().split("T")[0]; // Today's date in YYYY-MM-DD format
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 6); // Add 6 months to current date
    const endDateFormatted = endDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD

    // Get selected policy details
    const selectedPolicy = policyOptions.find(
      (policy) => policy.id === formData.selectedPolicy
    );

    // Prepare policy data
    const newPolicyData = {
      policy_num: "POL-" + Math.floor(1000 + Math.random() * 9000),
      policyName: selectedPolicy?.name || "Crop Insurance Policy",
      insurer_id: selectedPolicy?.id || "",
      insurerName: selectedPolicy?.insurer || "",
      farmerId: "FARMER-" + Math.floor(1000 + Math.random() * 9000), // Mock farmer ID
      cropType: formData.cropType,
      landSize: parseFloat(formData.landSize),
      premium_amount: parseFloat(formData.premium),
      coverage_amount: parseFloat(formData.coverageAmount),
      premiumRate: selectedPolicy?.premiumRate || "",
      location: formData.location,
      start_date: startDate,
      end_date: endDateFormatted,
      status: "Active",
      paymentMethod: "UPI",
      paymentId: "PAY-" + Math.floor(10000000 + Math.random() * 90000000),
      transactionDate: new Date().toISOString(),
    };

    // Simulate payment processing and API call
    setTimeout(async () => {
      // Send data to API
      await sendInsuranceData(newPolicyData);

      // Update state with the policy data (regardless of API success)
      setPolicyData(newPolicyData);
      setPaymentComplete(true);
      setIsLoading(false);
      setStep(5); // Move to confirmation
    }, 2000);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h2 className="mb-6 font-semibold text-gray-900 dark:text-neutral-100 text-xl">
              Select Your Crop And Insurance Policy
            </h2>
            <Dropdown
              label="Crop Type"
              name="cropType"
              options={cropOptions}
              value={formData.cropType}
              onChange={handleChange}
              error={errors.cropType}
              required
            />
            <h2 className="mb-6 font-semibold text-gray-900 dark:text-neutral-100 text-xl">
              Select Insurance Policy
            </h2>
            {errors.selectedPolicy && (
              <p className="mb-2 text-red-500 text-sm">
                {errors.selectedPolicy}
              </p>
            )}
            <div className="space-y-4 mb-6">
              {policyOptions.map((policy) => (
                <PolicyCard
                  key={policy.id}
                  policy={policy}
                  selectedPolicy={formData.selectedPolicy}
                  onSelect={handlePolicySelect}
                />
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className="mb-6 font-semibold text-gray-900 dark:text-neutral-100 text-xl">
              Enter Land Details
            </h2>
            <FormInput
              label="Land Size (in acres)"
              type="number"
              name="landSize"
              placeholder="Enter land size"
              value={formData.landSize}
              onChange={handleChange}
              error={errors.landSize}
              required
            />
            <LocationInput onLocationSelect={handleLocationSelect} />
            {errors.location && (
              <p className="mt-1 text-red-500 text-sm">{errors.location}</p>
            )}
          </div>
        );
      case 3:
        return (
          <PremiumCalculation
            formData={formData}
            policyOptions={policyOptions}
          />
        );
      case 4:
        return (
          <div>
            <h2 className="mb-6 font-semibold text-gray-900 dark:text-neutral-100 text-xl">
              Payment
            </h2>
            {apiError && (
              <div className="bg-red-100 mb-4 p-3 border border-red-400 rounded text-red-700">
                {apiError}
              </div>
            )}
            <Button
              onClick={handlePayment}
              fullWidth
              className="my-8"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <LoadingSpinner size="sm" className="mr-2" />
                  <span>Processing Payment...</span>
                </div>
              ) : (
                "Pay Now with UPI"
              )}
            </Button>
          </div>
        );
      case 5:
        return (
          <PolicySuccessDetails
            policyData={policyData}
            cropOptions={cropOptions}
            onNavigate={() => navigate("/dashboard")}
          />
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
                Buy Crop Insurance
              </h1>
              <ProgressTracker steps={steps} currentStep={step} />
              <div className="bg-white/80 dark:bg-neutral-800/80 shadow-lg backdrop-blur-sm mb-8 p-6 rounded-lg">
                {renderStepContent()}
                <div className="flex justify-between">
                  {step > 1 && (
                    <Button
                      variant="outline"
                      onClick={prevStep}
                      className="hover:bg-green-50 dark:hover:bg-neutral-700 border-green-600 dark:border-green-400 text-green-600 dark:text-green-400"
                    >
                      Back
                    </Button>
                  )}
                  {step < 5 && step !== 4 && (
                    <Button
                      onClick={nextStep}
                      disabled={isLoading}
                      className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                    >
                      {isLoading ? <LoadingSpinner size="sm" /> : "Next"}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BuyInsurancePage;
