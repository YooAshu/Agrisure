import React from "react";
import { useForm } from "react-hook-form";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Button from "../components/Button";

const ContactUsPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    // Simulate API request
    console.log("Form Submitted:", data);
    await new Promise((r) => setTimeout(r, 1000));
    reset();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isLoggedIn={true} />

      <div className="flex-grow bg-gradient-to-br from-green-50 dark:from-neutral-900 via-white dark:via-neutral-800 to-emerald-50 dark:to-neutral-950 pt-24 pb-10">
        <div className="relative flex flex-col justify-center items-center pt-10">
          {/* Background blobs */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="top-0 left-0 absolute bg-green-100 dark:bg-green-900/10 opacity-10 dark:opacity-50 blur-3xl rounded-full w-96 h-96"></div>
            <div className="top-0 right-0 absolute bg-emerald-100 dark:bg-neutral-800 opacity-20 dark:opacity-10 blur-xl rounded-full w-96 h-96"></div>
            <div className="-bottom-8 left-20 absolute bg-lime-100 dark:bg-neutral-800 opacity-20 dark:opacity-10 blur-3xl rounded-full w-96 h-96"></div>
          </div>

          <div className="z-10 px-4 w-full max-w-3xl">
            <Card className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm">
              <h2 className="mb-2 font-semibold text-gray-900 dark:text-neutral-100 text-2xl">
                Contact Us
              </h2>
              <p className="mb-6 text-gray-600 dark:text-neutral-400 text-sm">
                We'd love to hear from you! Fill out the form below and our team
                will get back to you shortly.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <label className="block font-medium text-gray-700 dark:text-neutral-300 text-sm">
                    Name
                  </label>
                  <input
                    {...register("name", { required: "Name is required" })}
                    type="text"
                    className="bg-white/50 dark:bg-neutral-700/50 mt-1 px-4 py-2 border border-gray-300 dark:border-neutral-600 rounded-md outline-none focus:ring-2 focus:ring-green-300 dark:focus:ring-green-400/30 w-full text-gray-900 dark:text-neutral-100"
                    placeholder="Your Name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block font-medium text-gray-700 dark:text-neutral-300 text-sm">
                    Email
                  </label>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email address",
                      },
                    })}
                    type="email"
                    className="bg-white/50 dark:bg-neutral-700/50 mt-1 px-4 py-2 border border-gray-300 dark:border-neutral-600 rounded-md outline-none focus:ring-2 focus:ring-green-300 dark:focus:ring-green-400/30 w-full text-gray-900 dark:text-neutral-100"
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block font-medium text-gray-700 dark:text-neutral-300 text-sm">
                    Subject
                  </label>
                  <input
                    {...register("subject", {
                      required: "Subject is required",
                    })}
                    type="text"
                    className="bg-white/50 dark:bg-neutral-700/50 mt-1 px-4 py-2 border border-gray-300 dark:border-neutral-600 rounded-md outline-none focus:ring-2 focus:ring-green-300 dark:focus:ring-green-400/30 w-full text-gray-900 dark:text-neutral-100"
                    placeholder="Subject of your message"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-red-500 text-sm">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block font-medium text-gray-700 dark:text-neutral-300 text-sm">
                    Message
                  </label>
                  <textarea
                    {...register("message", {
                      required: "Message cannot be empty",
                    })}
                    rows="4"
                    className="bg-white/50 dark:bg-neutral-700/50 mt-1 px-4 py-2 border border-gray-300 dark:border-neutral-600 rounded-md outline-none focus:ring-2 focus:ring-green-300 dark:focus:ring-green-400/30 w-full text-gray-900 dark:text-neutral-100 resize-none"
                    placeholder="Write your message..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-red-500 text-sm">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <div className="text-right">
                  <Button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </div>

                {isSubmitSuccessful && (
                  <p className="mt-4 text-green-600 dark:text-green-400 text-sm text-center">
                    Thank you! Your message has been sent successfully.
                  </p>
                )}
              </form>
            </Card>
          </div>
          <div className="mt-10 px-44 w-full">
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-neutral-100 text-xl text-center">
              Our Location
            </h3>
            <div className="w-full h-64">
              <iframe
                title="Our Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.689456789123!2d88.431489315022!3d22.572646985179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0277d0f0f0f0f0%3A0x0!2sSector%205%2C%20Kolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1681234567890!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactUsPage;
