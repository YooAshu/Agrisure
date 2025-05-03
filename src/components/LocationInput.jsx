import React, { useState, useEffect, useRef } from "react";

const LocationInput = ({ onLocationSelect }) => {
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState({
    latitude: "",
    longitude: "",
    address: "",
  });
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  // Initialize Leaflet map when component mounts
  useEffect(() => {
    // Create script element for Leaflet CSS
    const linkEl = document.createElement("link");
    linkEl.rel = "stylesheet";
    linkEl.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css";
    document.head.appendChild(linkEl);

    // Create script element for Leaflet JS
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js";
    script.async = true;
    script.onload = () => setMapLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.head.removeChild(linkEl);
      document.body.removeChild(script);
    };
  }, []);

  // Initialize the map once Leaflet is loaded
  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return;

    // Default location (center of map) if no location provided
    const defaultLat = location.latitude || 40.7128;
    const defaultLng = location.longitude || -74.0060;

    // Initialize the map
    const map = window.L.map(mapRef.current).setView([defaultLat, defaultLng], 13);
    mapInstanceRef.current = map;

    // Add tile layer (OpenStreetMap)
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add a marker if we have a location
    if (location.latitude && location.longitude) {
      markerRef.current = window.L.marker([location.latitude, location.longitude]).addTo(map);
    }

    // Add click handler to the map
    map.on('click', handleMapClick);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }
    };
  }, [mapLoaded]);

  // Update marker when location changes
  useEffect(() => {
    if (!mapLoaded || !mapInstanceRef.current || !location.latitude || !location.longitude) return;

    // If marker exists, update its position, otherwise create a new one
    if (markerRef.current) {
      markerRef.current.setLatLng([location.latitude, location.longitude]);
    } else {
      markerRef.current = window.L.marker([location.latitude, location.longitude]).addTo(mapInstanceRef.current);
    }

    // Center map on the marker
    mapInstanceRef.current.setView([location.latitude, location.longitude], 13);
  }, [location.latitude, location.longitude, mapLoaded]);

  const getLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
          );
          const data = await response.json();
          const address = data.display_name;

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
      }, (error) => {
        console.error("Geolocation error:", error);
        setLoading(false);
        alert("Error getting location: " + error.message);
      });
    } else {
      setLoading(false);
      alert("Geolocation not supported.");
    }
  };

  // Handle clicks on the map
  const handleMapClick = async (e) => {
    const { lat, lng } = e.latlng;
    setLoading(true);
    
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      const address = data.display_name;

      const locationData = {
        latitude: lat,
        longitude: lng,
        address: address,
      };

      setLocation(locationData);
      onLocationSelect(locationData);
      setLoading(false);
    } catch (error) {
      console.error("Reverse geocoding failed:", error);
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2 my-4">
      <button
        onClick={getLocation}
        className="bg-green-600 my-5 px-4 py-2 rounded-2xl text-white"
        disabled={loading}
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

      {/* Map container */}
      <div 
        ref={mapRef}
        className="mt-4 border border-gray-300 rounded-lg w-full h-64"
      >
        {!mapLoaded && (
          <div className="flex justify-center items-center bg-gray-100 w-full h-full">
            <span className="text-gray-500">Loading map...</span>
          </div>
        )}
      </div>

      {location.latitude && (
        <div className="mt-4 text-sm">
          <p>
            <strong>Address:</strong> {location.address}
          </p>
          <p className="mt-1 text-gray-500 text-xs">
            <span className="mr-3">Latitude: {parseFloat(location.latitude).toFixed(6)}</span>
            <span>Longitude: {parseFloat(location.longitude).toFixed(6)}</span>
          </p>
        </div>
      )}

      {mapLoaded && (
        <p className="mt-2 text-gray-500 text-xs">
          Click anywhere on the map to update the location
        </p>
      )}
    </div>
  );
};

export default LocationInput;