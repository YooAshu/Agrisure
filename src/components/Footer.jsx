import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-neutral-900">
      <div className="mx-auto px-4 container">
        <div className="gap-8 grid md:grid-cols-4 py-16">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-heading text-gray-900 dark:text-neutral-100 text-2xl">
                AgriSure
              </span>
            </Link>
            <p className="text-gray-600 dark:text-neutral-300">
              Blockchain-powered crop insurance for modern farmers.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-gray-700 dark:hover:text-neutral-200 dark:text-neutral-400 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 dark:hover:text-neutral-200 dark:text-neutral-400 transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 dark:hover:text-neutral-200 dark:text-neutral-400 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 dark:hover:text-neutral-200 dark:text-neutral-400 transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-neutral-100 text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-4 mt-4">
              <li>
                <Link to="/" className="text-gray-600 hover:text-gray-900 dark:hover:text-neutral-100 dark:text-neutral-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/buy-insurance" className="text-gray-600 hover:text-gray-900 dark:hover:text-neutral-100 dark:text-neutral-300">
                  Buy Insurance
                </Link>
              </li>
              <li>
                <Link to="/claims" className="text-gray-600 hover:text-gray-900 dark:hover:text-neutral-100 dark:text-neutral-300">
                  File a Claim
                </Link>
              </li>
              <li>
                <Link to="/ai-agent" className="text-gray-600 hover:text-gray-900 dark:hover:text-neutral-100 dark:text-neutral-300">
                  AI Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-neutral-100 text-sm uppercase tracking-wider">
              Resources
            </h3>
            <ul className="space-y-4 mt-4">
              <li>
                <Link to="/privacy-policy" className="text-gray-600 hover:text-gray-900 dark:hover:text-neutral-100 dark:text-neutral-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-gray-900 dark:hover:text-neutral-100 dark:text-neutral-300">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-gray-900 dark:hover:text-neutral-100 dark:text-neutral-300">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-neutral-100 text-sm uppercase tracking-wider">
              Subscribe to our newsletter
            </h3>
            <p className="mt-4 text-gray-600 dark:text-neutral-300">
              Get the latest updates on crop insurance and farming technology.
            </p>
            <form className="mt-4">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-white dark:bg-neutral-800 px-4 py-2 border border-gray-300 dark:border-neutral-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 text-gray-900 dark:text-neutral-100"
                />
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 px-4 py-2 rounded-r-md text-white transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-gray-200 dark:border-neutral-800 border-t">
          <div className="flex md:flex-row flex-col justify-between items-center">
            <p className="text-gray-500 dark:text-neutral-400">
              © 2024 AgriSure. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy-policy" className="text-gray-500 hover:text-gray-700 dark:hover:text-neutral-200 dark:text-neutral-400">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-500 hover:text-gray-700 dark:hover:text-neutral-200 dark:text-neutral-400">
                Terms of Service
              </Link>
              <Link to="/faq" className="text-gray-500 hover:text-gray-700 dark:hover:text-neutral-200 dark:text-neutral-400">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;