import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <Navbar />
      
      <div className="pt-24 pb-10 flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Privacy Policy
            </h1>
            
            <Card>
              <div className="prose max-w-none">
                <h2>Introduction</h2>
                <p>
                  At AgriSure, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our blockchain-powered crop insurance platform.
                </p>
                
                <h2>Information We Collect</h2>
                <p>
                  We collect information that you provide directly to us, including:
                </p>
                <ul>
                  <li>Personal identification information (name, phone number, address)</li>
                  <li>Farm details (location, size, crop types)</li>
                  <li>Financial information (UPI ID for payouts)</li>
                  <li>Insurance claim details and supporting evidence</li>
                  <li>Communication preferences and language settings</li>
                </ul>
                
                <h2>How We Use Your Information</h2>
                <p>
                  We use the information we collect for various purposes, including:
                </p>
                <ul>
                  <li>Providing and managing insurance services</li>
                  <li>Processing and verifying insurance claims</li>
                  <li>Sending important notifications and alerts</li>
                  <li>Improving our services and developing new features</li>
                  <li>Complying with legal obligations and preventing fraud</li>
                </ul>
                
                <h2>Blockchain Data</h2>
                <p>
                  AgriSure uses blockchain technology to ensure transparency and security. Please be aware that:
                </p>
                <ul>
                  <li>Insurance policy and claim data is recorded on the blockchain</li>
                  <li>Blockchain data is immutable and cannot be deleted</li>
                  <li>Personal identifying information is never stored directly on the blockchain</li>
                  <li>We use secure hash functions to reference your data on the blockchain</li>
                </ul>
                
                <h2>Information Sharing</h2>
                <p>
                  We may share your information with:
                </p>
                <ul>
                  <li>Service providers who assist in delivering our services</li>
                  <li>Regulatory authorities when required by law</li>
                  <li>Government agencies for subsidy verification (with your consent)</li>
                  <li>Our AI verification partners (anonymized data only)</li>
                </ul>
                
                <h2>Data Security</h2>
                <p>
                  We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the internet or electronic storage is 100% secure.
                </p>
                
                <h2>Your Rights</h2>
                <p>
                  Depending on your location, you may have the right to:
                </p>
                <ul>
                  <li>Access the personal information we have about you</li>
                  <li>Correct inaccurate or incomplete information</li>
                  <li>Request deletion of your personal information (where applicable)</li>
                  <li>Object to certain processing of your information</li>
                  <li>Data portability</li>
                </ul>
                
                <h2>Updates to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Revised" date and will be effective as soon as it is accessible.
                </p>
                
                <h2>Contact Us</h2>
                <p>
                  If you have questions about this Privacy Policy, please contact us at:
                </p>
                <p>
                  Email: privacy@agrisure.com<br />
                  Phone: +91 98765 43210<br />
                  Address: 123 AgriTech Park, Bangalore, India 560001
                </p>
                
                <p className="text-sm text-gray-500 mt-8">
                  Last Updated: May 1, 2025
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;