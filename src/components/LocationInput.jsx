import React, { useState } from "react";
import axios from "axios";

const LocationInput = ({ onLocationSelect }) => {
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState({
    latitude: "",
    longitude: "",
    address: "",
  });

  const getLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
          );
          const address = response.data.display_name;

          const locationData = {
            latitude: lat,
            longitude: lon,
            address: address,
          };

          setLocation(locationData);
          onLocationSelect(locationData); // Send to parent
          setLoading(false);
        } catch (error) {
          console.error("Reverse geocoding failed:", error);
          setLoading(false);
        }
      });
    } else {
    //   setLoading(false);
      alert("Geolocation not supported.");
    }
  };

  return (
    <div className="space-y-2 my-4">
      <button
        onClick={getLocation}
        className="bg-green-600 my-5 px-4 py-2 rounded-2xl text-white"
      >
        {loading ? (
          <span className="flex justify-center items-center">
            <svg
              className="mr-3 w-5 h-5 text-white animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                fill="none"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12zm2.5-1h9a2.5 2.5 0 1 1-9 0z"
              ></path>
            </svg>
            Loading...
          </span>
        ) : (
          "Get Current Location"
        )}
      </button>

      {location.latitude && (
        <div className="mt-4 text-sm">
          {/* <p><strong>Latitude:</strong> {location.latitude}</p> */}
          {/* <p><strong>Longitude:</strong> {location.longitude}</p> */}
          <p>
            <strong>Address:</strong> {location.address}
          </p>
        </div>
      )}
    </div>
  );
};

export default LocationInput;
