import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import farmer1 from "../assets/farmer1.png";
import farmer2 from "../assets/farmer2.png";
import farmer3 from "../assets/farmer3.png";
import farmer4 from "../assets/farmer4.png";

// Testimonial slider component with prominently featured rotated image cards
export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      quote:
        "Consectetur adipiscing elit. Integer nunc viverra laoreet est the is porta pretium metus aliquam eget maecenas porta is nunc viverra Aenean pulvinar maximus leo",
      name: "Alex Rony",
      title: "Fresh Design",
      image: "/images/testimonials/farmer1.jpg",
    },
    {
      quote:
        "Consectetur adipiscing elit. Integer nunc viverra laoreet est the is porta pretium metus aliquam eget maecenas porta is nunc viverra Aenean pulvinar maximus leo",
      name: "Sarah Johnson",
      title: "Farm Owner",
      image: "/images/testimonials/farmer2.jpg",
    },
    {
      quote:
        "Consectetur adipiscing elit. Integer nunc viverra laoreet est the is porta pretium metus aliquam eget maecenas porta is nunc viverra Aenean pulvinar maximus leo",
      name: "Michael Chen",
      title: "Agricultural Expert",
      image: "/images/testimonials/farmer3.jpg",
    },
    {
      quote:
        "Consectetur adipiscing elit. Integer nunc viverra laoreet est the is porta pretium metus aliquam eget maecenas porta is nunc viverra Aenean pulvinar maximus leo",
      name: "Emma Davis",
      title: "Crop Specialist",
      image: "/images/testimonials/farmer4.jpg",
    },
  ];

  // Auto scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextSlide = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex(
      (current) => (current - 1 + testimonials.length) % testimonials.length
    );
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  return (
    <section className="relative bg-white dark:bg-neutral-900 p-24 overflow-hidden">
      <div className="relative bg-gradient-to-br from-green-50 dark:from-neutral-900 via-white dark:via-neutral-800 to-emerald-50 dark:to-black py-24 rounded-2xl overflow-hidden">
        {/* Decorative mint leaves */}
        <div className="top-20 left-20 absolute opacity-70 w-16 h-16">
          <div className="bg-green-200 dark:bg-green-900/30 rounded-full w-16 h-16 rotate-45 transform"></div>
        </div>
        <div className="right-20 bottom-20 absolute opacity-70 w-24 h-24">
          <div className="bg-green-200 dark:bg-green-900/30 rounded-full w-24 h-24 -rotate-15 transform"></div>
        </div>

        {/* World map background */}
        <div className="absolute inset-0 opacity-5">
          <div className="bg-gray-800 dark:bg-neutral-800 opacity-5 w-full h-full"></div>
        </div>

        <div className="z-10 relative mx-auto px-4 container">
          {/* Header */}
          <div className="mb-4 text-center">
            <div className="flex justify-center items-center mb-2 font-medium text-green-600 dark:text-green-400">
              <span className="inline-block mr-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 17L12 12L7 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13 17L18 12L13 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              OUR TESTIMONIALS
            </div>
            <h2 className="font-bold text-gray-900 dark:text-neutral-100 text-4xl md:text-5xl">
              Hear What Our
              <br />
              Clients Say
            </h2>
          </div>

          <div className="relative mx-auto max-w-5xl">
            {/* Left side images */}
            <div className="top-[-50px] -left-16 z-10 absolute -rotate-12 transform">
              <img
                src={farmer1}
                alt="Farmer at sunset"
                className="shadow-lg dark:shadow-neutral-800 rounded-2xl w-52 h-60 object-cover"
              />
            </div>
            <div className="top-24 left-8 z-10 absolute rotate-6 transform">
              <img
                src={farmer2}
                alt="Smiling woman farmer"
                className="shadow-lg dark:shadow-neutral-800 rounded-2xl w-40 h-40 object-cover"
              />
            </div>

            {/* Right side images */}
            <div className="top-[-40px] -right-16 z-10 absolute rotate-12 transform">
              <img
                src={farmer3}
                alt="Person with vegetables"
                className="shadow-lg dark:shadow-neutral-800 rounded-2xl w-40 h-40 object-cover"
              />
            </div>
            <div className="top-24 right-8 z-10 absolute -rotate-6 transform">
              <img
                src={farmer4}
                alt="Farmer with produce box"
                className="shadow-lg dark:shadow-neutral-800 rounded-2xl w-52 h-60 object-cover"
              />
            </div>

            {/* Testimonial slider in center */}
            <div className="relative mx-auto mt-16 px-4 py-10 max-w-3xl">
              <div className="relative overflow-hidden">
                <div
                  className="transition-transform duration-500 ease-in-out transform"
                  style={{
                    transform: `translateX(-${activeIndex * 100}%)`,
                    display: "flex",
                  }}
                >
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="flex-shrink-0 px-4 w-full">
                      <div className="text-center">
                        <p className="mb-8 text-gray-700 dark:text-neutral-300 text-lg md:text-xl italic">
                          "{testimonial.quote}"
                        </p>
                        <div className="mb-2">
                          <h3 className="font-bold text-gray-900 dark:text-neutral-100 text-xl">
                            {testimonial.name}
                          </h3>
                          <p className="text-green-600 dark:text-green-400">
                            {testimonial.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation dots */}
              <div className="flex justify-center space-x-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full ${
                      index === activeIndex
                        ? "bg-green-600 dark:bg-green-500"
                        : "bg-gray-300 dark:bg-neutral-700"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Navigation arrows */}
              <button
                onClick={prevSlide}
                className="top-1/2 left-0 absolute bg-white/80 hover:bg-white dark:bg-neutral-800/80 dark:hover:bg-neutral-700 shadow-md dark:shadow-neutral-800 p-2 rounded-full -translate-y-1/2 transform"
                aria-label="Previous testimonial"
              >
                <ChevronLeft
                  size={24}
                  className="text-gray-700 dark:text-neutral-300"
                />
              </button>
              <button
                onClick={nextSlide}
                className="top-1/2 right-0 absolute bg-white/80 hover:bg-white dark:bg-neutral-800/80 dark:hover:bg-neutral-700 shadow-md dark:shadow-neutral-800 p-2 rounded-full -translate-y-1/2 transform"
                aria-label="Next testimonial"
              >
                <ChevronRight
                  size={24}
                  className="text-gray-700 dark:text-neutral-300"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
