import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AlertTriangle, Layers, DollarSign, Calendar } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Button from "../components/Button";
import StatusBadge from "../components/StatusBadge";

// New dummy data structure
const dummyDashboardData = {
  farmer: {
    name: "Ramesh Kumar",
  },
  stats: {
    activePolicies: 1,
    totalPremiumAmount: 1600,
    totalAmountInsured: 16000,
  },
  weatherAlerts: [
    {
      type: "Heavy Rainfall",
      date: "2025-05-15",
      location: "Northern Region",
      impact: "Moderate",
    },
    {
      type: "Heatwave",
      date: "2025-05-18",
      location: "All Regions",
      impact: "High",
    },
  ],
  recentTransactions: [
    {
      transactionId: "TXN-001",
      type: "Premium Payment",
      amount: 1600,
      date: "2025-04-15",
      status: "Paid",
    },
  ],
};

// const getDashboard = async()=>{

// }

const DashboardPage = () => {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    // Future: Fetch from backend using Axios

    axios
      .get(`${import.meta.env.VITE_BACKEND_BASE_URL}/farmer/dashboard`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        setDashboard(response.data);
      })
      .catch((error) => console.error("Error fetching dashboard data", error));

    // Simulating with dummy data
    setDashboard(dummyDashboardData);
  }, []);

  if (!dashboard) {
    return <div className="p-10 text-gray-600 text-center">Loading...</div>;
  }

  const summaryData = [
    {
      label: "Active Policies",
      value: dashboard.stats.activePolicies,
      icon: <Layers size={24} className="text-green-600" />,
    },
    {
      label: "Total Premium Amount",
      value: `₹${dashboard.stats.totalPremiumAmount}`,
      icon: <Calendar size={24} className="text-green-600" />,
    },
    {
      label: "Total Amount Insured",
      value: `₹${dashboard.stats.totalAmountInsured}`,
      icon: <DollarSign size={24} className="text-green-600" />,
    },
  ];

  return (
    <div className="flex flex-col bg-gradient-to-br from-green-50 dark:from-neutral-900 via-white dark:via-neutral-800 to-emerald-50 dark:to-neutral-950 min-h-screen">
      {/* Background shapes */}
      <div className="-z-10 fixed inset-0 overflow-hidden">
        <div className="top-0 -left-4 absolute bg-green-200 dark:bg-green-900/30 opacity-70 blur-xl rounded-full w-72 h-72 animate-blob mix-blend-multiply filter"></div>
        <div className="top-0 -right-4 absolute bg-emerald-200 dark:bg-emerald-900/30 opacity-70 blur-xl rounded-full w-72 h-72 animate-blob animation-delay-2000 mix-blend-multiply filter"></div>
        <div className="-bottom-8 left-20 absolute bg-teal-200 dark:bg-teal-900/30 opacity-70 blur-xl rounded-full w-72 h-72 animate-blob animation-delay-4000 mix-blend-multiply filter"></div>
      </div>

      <Navbar isLoggedIn={true} />

      <div className="flex-grow pt-20 pb-10">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 container">
          {/* Header */}
          <div className="flex md:flex-row flex-col justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="font-bold text-gray-900 dark:text-neutral-100 text-2xl md:text-3xl">
                Farmer Dashboard
              </h1>
              <p className="mt-1 text-gray-600 dark:text-neutral-400">
                Welcome back, {dashboard.farmer.name}
              </p>
            </div>

            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/buy-insurance">
                <Button className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600">
                  Buy New Insurance
                </Button>
              </Link>
              <Link to="/claims">
                <Button
                  variant="outline"
                  className="hover:bg-green-50 dark:hover:bg-neutral-800 border-green-600 dark:border-green-500 text-green-600 dark:text-green-400"
                >
                  File a Claim
                </Button>
              </Link>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="gap-6 grid grid-cols-1 md:grid-cols-3 mb-8">
            {summaryData.map((item, index) => (
              <Card
                key={index}
                className="flex items-center bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm"
                animate={true}
              >
                <div className="bg-green-100/50 dark:bg-green-900/30 mr-4 p-3 rounded-full">
                  {item.icon}
                </div>
                <div>
                  <p className="text-gray-600 dark:text-neutral-400 text-sm">
                    {item.label}
                  </p>
                  <p className="font-bold text-gray-900 dark:text-neutral-100 text-2xl">
                    {item.value}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          {/* Weather Alerts */}
          <div className="mb-8">
            <h2 className="mb-4 font-semibold text-gray-900 dark:text-neutral-100 text-xl">
              Latest AI Weather Risk Alerts
            </h2>
            <Card className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border-green-400 dark:border-green-500 border-l-4">
              <div className="flex items-start">
                <div className="mr-4">
                  <AlertTriangle
                    size={24}
                    className="text-green-600 dark:text-green-400"
                  />
                </div>
                <div className="flex-1">
                  <div className="gap-4 grid grid-cols-1 lg:grid-cols-2">
                    {dashboard.weatherAlerts.map((alert, index) => (
                      <div
                        key={index}
                        className="bg-white/50 dark:bg-neutral-700/50 p-3 rounded-lg"
                      >
                        <div className="flex justify-between">
                          <h3 className="font-medium text-gray-900 dark:text-neutral-100">
                            {alert.type}
                          </h3>
                          <span className="text-gray-500 dark:text-neutral-400 text-sm">
                            {alert.date}
                          </span>
                        </div>
                        <p className="mt-1 text-gray-700 dark:text-neutral-300 text-sm">
                          Location: {alert.location}
                        </p>
                        <p className="text-gray-700 dark:text-neutral-300 text-sm">
                          Potential Impact:{" "}
                          <span className="font-medium text-green-600 dark:text-green-400">
                            {alert.impact}
                          </span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Transactions */}
          <div>
            <h2 className="mb-4 font-semibold text-gray-900 dark:text-neutral-100 text-xl">
              Recent Transactions
            </h2>
            <Card className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm">
              <div className="overflow-x-auto">
                <table className="divide-y divide-gray-200 dark:divide-neutral-700 min-w-full">
                  <thead>
                    <tr>
                      {[
                        "Transaction ID",
                        "Type",
                        "Amount",
                        "Date",
                        "Status",
                      ].map((heading) => (
                        <th
                          key={heading}
                          className="px-4 py-3 font-medium text-gray-500 dark:text-neutral-400 text-xs text-left uppercase tracking-wider"
                        >
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white/50 dark:bg-neutral-700/50 divide-y divide-gray-200 dark:divide-neutral-700">
                    {dashboard.recentTransactions.map((txn) => (
                      <tr
                        key={txn.transactionId}
                        className="hover:bg-green-50/50 dark:hover:bg-neutral-700/80"
                      >
                        <td className="px-4 py-4 font-medium text-gray-900 dark:text-neutral-100 text-sm whitespace-nowrap">
                          {txn.transactionId}
                        </td>
                        <td className="px-4 py-4 text-gray-700 dark:text-neutral-300 text-sm whitespace-nowrap">
                          {txn.type}
                        </td>
                        <td className="px-4 py-4 text-gray-700 dark:text-neutral-300 text-sm whitespace-nowrap">
                          ₹{txn.amount}
                        </td>
                        <td className="px-4 py-4 text-gray-700 dark:text-neutral-300 text-sm whitespace-nowrap">
                          {txn.date}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <StatusBadge status={txn.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-right">
                <Link
                  to="/transactions"
                  className="font-medium text-green-600 hover:text-green-700 dark:hover:text-green-300 dark:text-green-400 text-sm"
                >
                  View All Transactions →
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DashboardPage;
