import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Button from "../components/Button";
import ToastNotification from "../components/ToastNotification";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const ProfilePage = () => {
  const [notification, setNotification] = useState(null);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { isLoggedIn, logout } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  useEffect(() => {
    const fetchedUser = {
      full_name: "",
      phone: "",
      address: "",
      language_pref: "",
      upi_id: "",
    };
    setUser(fetchedUser);
  }, []);

  const navigate = useNavigate();

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/farmer/profile`,
        { withCredentials: true }
      );
      console.log(response.data);
      setUser(response.data.profile);
      if (response.status == 401) {
        navigate("/login");
      }
    } catch (error) {
      if (error.status == 401) {
        navigate("/login");
        logout();
      }
      console.error("Error fetching user profile:", error);
    }
  };
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handlePasswordSubmit = (data) => {
    if (data.newPassword !== data.confirmNewPassword) {
      setNotification({
        type: "error",
        message: "Passwords do not match!",
      });
      return;
    }

    setTimeout(() => {
      reset();
      setShowModal(false);
      setNotification({
        type: "success",
        message: "Password changed successfully!",
      });
    }, 1500);
  };

  const handleUpdateProfile = async (data) => {
    console.log(data);

    try {
      // const response = await axios.post(
      //   `${import.meta.env.VITE_BACKEND_BASE_URL}/farmer/update-profile`,
      //   {
      //     full_name: data.full_name,
      //     Address: data.Address,
      //     language_pref: data.language_pref,
      //     upi_id: data.upi_id,
      //   }
      // );
      // console.log(response.data);
      setNotification({
        type: "success",
        message: "Profile updated successfully!",
      });
      setShowModal(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      setNotification({
        type: "error",
        message: "Failed to update profile. Please try again.",
      });
    }
  };

  if (!user) return null;

  return (
    <div className="flex flex-col bg-gradient-to-br from-primary-50 dark:from-neutral-900 via-white dark:via-neutral-800 to-secondary-50 dark:to-neutral-950 min-h-screen">
      <Navbar isLoggedIn={true} />

      {notification && (
        <ToastNotification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="flex-grow pt-24 pb-10">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 container">
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-8 font-bold text-gray-900 dark:text-white text-3xl">
              Account Profile
            </h1>

            <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
              {/* Personal Info */}
              <Card className="bg-white/80 dark:bg-neutral-800/80 shadow-lg backdrop-blur-sm p-6 rounded-xl">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-gray-800 dark:text-white text-xl">
                    👤 Personal Info
                  </h2>
                  <button
                    className="text-primary-600 hover:text-primary-800 dark:hover:text-green-600 dark:text-green-500"
                    onClick={() => {
                      reset();
                      setShowModal(true);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </button>
                </div>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p>
                    <strong>Name:</strong> {user.full_name}
                  </p>
                  <p>
                    <strong>Phone:</strong> {user.phone}
                  </p>
                  <p>
                    <strong>Address:</strong> {user.address}
                  </p>
                  <p>
                    <strong>Language:</strong> {user.language_pref}
                  </p>
                </div>
              </Card>

              {/* Land Info */}
              {/* <Card className="bg-white/80 dark:bg-neutral-800/80 shadow-lg backdrop-blur-sm p-6 rounded-xl">
                <h2 className="mb-4 font-semibold text-gray-800 dark:text-white text-xl">🌾 Land Info</h2>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p><strong>Farm Size:</strong> {user.farmSize} </p>
                </div>
              </Card> */}

              {/* Payment Info */}
              <Card className="bg-white/80 dark:bg-neutral-800/80 shadow-lg backdrop-blur-sm p-6 rounded-xl">
                <h2 className="mb-4 font-semibold text-gray-800 dark:text-white text-xl">
                  💳 Payment Info
                </h2>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p>
                    <strong>UPI ID:</strong> {user.upi_id}
                  </p>
                </div>
              </Card>

              {/* Settings */}
              {/* <Card className="bg-white/80 dark:bg-neutral-800/80 shadow-lg backdrop-blur-sm p-6 rounded-xl">
                <h2 className="mb-4 font-semibold text-gray-800 dark:text-white text-xl">
                  🔐 Security
                </h2>
                <Button
                  onClick={() => {
                    reset();
                    setShowModal(true);
                  }}
                  className="bg-primary-600 hover:bg-primary-700 dark:bg-green-500 dark:hover:bg-green-600"
                >
                  Change Password
                </Button>
              </Card> */}
              {/* <Card className="bg-white/80 dark:bg-neutral-800/80 shadow-lg backdrop-blur-sm p-6 rounded-xl">
                <h2 className="mb-4 font-semibold text-gray-800 dark:text-white text-xl">
                  ✏️ Update Profile Information
                </h2>
                <Button
                  onClick={() => {
                    reset();
                    setShowModal(true);
                  }}
                  className="bg-primary-600 hover:bg-primary-700 dark:bg-green-500 dark:hover:bg-green-600"
                >
                  Update
                </Button>
              </Card> */}
            </div>
          </div>
        </div>
      </div>

      {/* Update Profile Modal Modal */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)} title="Update Profile">
          <form
            onSubmit={handleSubmit(handleUpdateProfile)}
            className="flex flex-col space-y-4"
          >
            <label className="text-white">Full Name</label>
            <input
              type="text"
              {...register("full_name", {
                required: "Current password is required",
              })}
              defaultValue={user.full_name}
              placeholder={`${user.full_name}`}
              className="bg-transparent p-3 border border-[#717171] rounded-lg text-white"
            />

            <label className="text-white">New Address</label>
            <input
              type="Location"
              {...register("Address", {
                required: "adress is required",
              })}
              defaultValue={user.Address}
              placeholder={`${user.Address}`}
              className="bg-transparent p-3 border border-[#717171] rounded-lg text-white"
            />

            <label className="text-white"> New Language Preference</label>
            <input
              type="text"
              {...register("language_pref", {
                required: "Please set your new language preference",
              })}
              placeholder={`${user.language_pref}`}
              defaultValue={user.language_pref}
              className="bg-transparent p-3 border border-[#717171] rounded-lg text-white"
            />
            <label className="text-white"> New UPI id</label>
            <input
              type="text"
              {...register("upi_id", {
                required: "Please set your new upi_id",
              })}
              placeholder={`${user.upi_id}`}
              defaultValue={user.upi_id}
              className="bg-transparent p-3 border border-[#717171] rounded-lg text-white"
            />

            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update Profile"}
              </Button>
            </div>
          </form>
        </Modal>
      )}

      <Footer />
    </div>
  );
};

const Modal = ({ onClose, title, children }) => {
  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-neutral-900 shadow-2xl p-6 rounded-xl w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-gray-800 dark:text-white text-lg">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-white"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default ProfilePage;
