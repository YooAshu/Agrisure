import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col bg-gradient-to-br from-primary-50 dark:from-neutral-900 via-white dark:via-neutral-800 to-warning-50 dark:to-neutral-950 min-h-screen">
      <Navbar />
      
      <div className="flex flex-grow justify-center items-center mt-24 px-4 py-12">
        <div className="max-w-md text-center">
          <div className="relative mb-6">
            <div className="top-1/2 left-1/2 absolute bg-warning-100 dark:bg-warning-500/20 rounded-full w-32 h-32 -translate-x-1/2 -translate-y-1/2 animate-pulse-slow transform"></div>
            <div className="relative flex justify-center items-center bg-white dark:bg-neutral-800 shadow-lg mx-auto rounded-full w-40 h-40">
              <MapPin size={64} className="text-warning-400 dark:text-warning-500" />
            </div>
          </div>
          
          <h1 className="mb-4 font-bold text-gray-900 dark:text-neutral-100 text-4xl">404</h1>
          <h2 className="mb-4 font-semibold text-gray-800 dark:text-neutral-200 text-2xl">Lost in the Fields?</h2>
          <p className="mb-8 text-gray-600 dark:text-neutral-400">
            The page you're looking for can't be found. Let's help you find your way back.
          </p>
          
          <Link to="/">
            <Button className="dark:bg-green-500 dark:hover:bg-green-600">Return Home</Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NotFoundPage;