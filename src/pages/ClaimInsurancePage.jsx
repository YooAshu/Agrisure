import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Added axios import
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import Dropdown from '../components/Dropdown';
import FileUploadButton from '../components/FileUploadButton';
import LoadingSpinner from '../components/LoadingSpinner';
import ProgressTracker from '../components/ProgressTracker';

const ClaimInsurancePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    policyId: '',
    incidentDate: '',
    description: '',
    photo: null,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [claimId, setClaimId] = useState('');

  // Mock active policies for dropdown
  const policyOptions = [
    { value: 'POL-1234', label: 'Rice - North Field (POL-1234)' },
    { value: 'POL-5678', label: 'Wheat - East Field (POL-5678)' },
    { value: 'POL-9012', label: 'Sugarcane - South Field (POL-9012)' },
  ];

  const claimSteps = [
    "Submitted",
    "AI Verification",
    "Smart Contract Trigger",
    "Paid"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, photo: e.target.files[0] });
      // Clear error when file is selected
      if (errors.photo) {
        setErrors({ ...errors, photo: '' });
      }
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.policyId) {
      newErrors.policyId = 'Please select an active policy';
      isValid = false;
    }

    if (!formData.incidentDate) {
      newErrors.incidentDate = 'Incident date is required';
      isValid = false;
    }

    if (!formData.description) {
      newErrors.description = 'Description is required';
      isValid = false;
    } else if (formData.description.length < 20) {
      newErrors.description = 'Please provide a more detailed description (at least 20 characters)';
      isValid = false;
    }

    if (!formData.photo) {
      newErrors.photo = 'Please upload evidence photo';
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
        // Create FormData object for file upload
        const submitData = new FormData();
        submitData.append('policyId', formData.policyId);
        submitData.append('incidentDate', formData.incidentDate);
        submitData.append('description', formData.description);
        submitData.append('photo', formData.photo);
        
        // Moved logging AFTER all data is appended
        for (let pair of submitData.entries()) {
          console.log(pair[0] + ', ' + pair[1]);
        }
        
        // Send POST request to API endpoint
        // const response = await axios.post('/api/claims', submitData, {
        //   headers: {
        //     'Content-Type': 'multipart/form-data'
        //   }
        // });
        
        // // Handle successful response
        // const generatedClaimId = response.data.claimId || 'CLM-' + Math.floor(1000 + Math.random() * 9000);
        // setClaimId(generatedClaimId);
        setIsSubmitted(true);
      } catch (error) {
        // Handle errors
        console.error('Error submitting claim:', error);
        // You could set an error state here to show to the user
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isLoggedIn={true} />

      <div className="flex-grow bg-gradient-to-br from-green-50 dark:from-neutral-900 via-white dark:via-neutral-800 to-emerald-50 dark:to-neutral-950 pt-24 pb-10">
        <div className="relative flex justify-center items-start min-h-screen overflow-hidden">
          {/* Animated background shapes */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="top-0 left-0 absolute bg-green-100 dark:bg-green-500/20 opacity-10 dark:opacity-50 blur-xl rounded-full w-96 h-96 animate-blob mix-blend-multiply filter"></div>
            <div className="top-0 right-0 absolute bg-emerald-100 dark:bg-neutral-800 opacity-20 dark:opacity-10 blur-xl rounded-full w-96 h-96 animate-blob animation-delay-2000 mix-blend-multiply filter"></div>
            <div className="-bottom-8 left-20 absolute bg-lime-100 dark:bg-neutral-800 opacity-20 dark:opacity-10 blur-xl rounded-full w-96 h-96 animate-blob animation-delay-4000 mix-blend-multiply filter"></div>
          </div>

          <div className="z-10 relative mx-auto px-4 container">
            <div className="mx-auto max-w-3xl">
              <h1 className="mb-8 font-bold text-gray-900 dark:text-neutral-100 text-3xl text-center">
                File an Insurance Claim
              </h1>
              
              <div className="bg-white/80 dark:bg-neutral-800/80 shadow-lg backdrop-blur-sm p-6 rounded-lg">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit}>
                    <Dropdown
                      label="Select Active Policy"
                      name="policyId"
                      options={policyOptions}
                      value={formData.policyId}
                      onChange={handleChange}
                      error={errors.policyId}
                      required
                    />
                    
                    <FormInput
                      label="Date of Incident"
                      type="date"
                      name="incidentDate"
                      value={formData.incidentDate}
                      onChange={handleChange}
                      error={errors.incidentDate}
                      required
                    />
                    
                    <FormInput
                      label="Description of Crop Damage"
                      type="textarea"
                      name="description"
                      placeholder="Please describe the damage in detail (e.g., flooding, pest infestation, disease)"
                      value={formData.description}
                      onChange={handleChange}
                      error={errors.description}
                      required
                      className="h-32 resize-none"
                      as="textarea"
                    />
                    
                    <FileUploadButton
                      label="Upload Evidence Photo"
                      name="photo"
                      onChange={handleFileChange}
                      accept="image/*"
                      error={errors.photo}
                      required
                    />
                    
                    <div className="bg-warning-50 dark:bg-neutral-700 my-6 p-4 border-warning-400 dark:border-warning-500 border-l-4 rounded-lg">
                      <p className="text-gray-700 dark:text-neutral-300 text-sm">
                        Please ensure all information is accurate. False claims may result in rejection 
                        and possible penalties as per terms of service.
                      </p>
                    </div>
                    
                    <Button 
                      type="submit" 
                      fullWidth 
                      disabled={isLoading}
                      className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                    >
                      {isLoading ? (
                        <div className="flex justify-center items-center">
                          <LoadingSpinner size="sm" className="mr-2" />
                          <span>Submitting Claim...</span>
                        </div>
                      ) : 'Submit Claim'}
                    </Button>
                  </form>
                ) : (
                  <div>
                    <div className="mb-6 text-center">
                      <div className="flex justify-center items-center bg-green-100 dark:bg-green-500/20 mx-auto mb-4 rounded-full w-16 h-16">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h2 className="font-bold text-gray-900 dark:text-neutral-100 text-2xl">Claim Submitted Successfully!</h2>
                      <p className="mt-2 text-gray-600 dark:text-neutral-300">Your claim ID is {claimId}</p>
                    </div>
                    
                    <div className="bg-white/50 dark:bg-neutral-700/50 mb-6 p-4 rounded-lg">
                      <h3 className="mb-3 font-semibold text-gray-900 dark:text-neutral-100 text-lg">Claim Status Timeline</h3>
                      <ProgressTracker steps={claimSteps} currentStep={0} />
                    </div>
                    
                    <div className="bg-green-50 dark:bg-neutral-700 mb-6 p-4 border-green-400 dark:border-green-500 border-l-4 rounded-lg">
                      <p className="text-gray-700 dark:text-neutral-300 text-sm">
                        Your claim has been registered on the blockchain. Our AI system will verify the evidence
                        and assess the damage. You will receive SMS updates as your claim progresses through each stage.
                      </p>
                    </div>
                    
                    <div className="flex sm:flex-row flex-col sm:space-x-3 space-y-3 sm:space-y-0">
                      <Link to="/dashboard">
                        <Button variant="primary" fullWidth className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600">Go to Dashboard</Button>
                      </Link>
                      <Link to="/claims">
                        <Button variant="outline" fullWidth className="hover:bg-green-50 dark:hover:bg-neutral-700 border-green-600 dark:border-green-400 text-green-600 dark:text-green-400">View All Claims</Button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ClaimInsurancePage;