import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, FileText, AlertTriangle, LogOut, Search, User, FileCheck, Settings } from 'lucide-react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import Dropdown from '../components/Dropdown';
import StatusBadge from '../components/StatusBadge';

const AdminDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('farmers');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const farmers = [
    { id: 1, name: 'Rajesh Kumar', phone: '9876543210', location: 'Amritsar, Punjab', policies: 3, claims: 1 },
    { id: 2, name: 'Meena Devi', phone: '8765432109', location: 'Kolkata, West Bengal', policies: 2, claims: 0 },
    { id: 3, name: 'Venkat Reddy', phone: '7654321098', location: 'Hyderabad, Telangana', policies: 1, claims: 1 },
    { id: 4, name: 'Suresh Patel', phone: '6543210987', location: 'Ahmedabad, Gujarat', policies: 2, claims: 2 },
    { id: 5, name: 'Lakshmi Naidu', phone: '5432109876', location: 'Chennai, Tamil Nadu', policies: 1, claims: 0 },
  ];

  const claims = [
    { id: 'CLM-1234', farmer: 'Rajesh Kumar', crop: 'Rice', amount: '₹15,000', date: '2025-05-02', status: 'Pending' },
    { id: 'CLM-5678', farmer: 'Venkat Reddy', crop: 'Sugarcane', amount: '₹22,500', date: '2025-04-28', status: 'Pending' },
    { id: 'CLM-9012', farmer: 'Suresh Patel', crop: 'Cotton', amount: '₹18,000', date: '2025-04-15', status: 'Approved' },
    { id: 'CLM-3456', farmer: 'Suresh Patel', crop: 'Wheat', amount: '₹12,000', date: '2025-03-22', status: 'Paid' },
  ];

  const [alertForm, setAlertForm] = useState({
    alertType: '',
    region: '',
    message: '',
    severity: '',
  });

  const alertTypeOptions = [
    { value: 'weather', label: 'Weather Alert' },
    { value: 'pest', label: 'Pest Outbreak' },
    { value: 'disease', label: 'Crop Disease' },
    { value: 'market', label: 'Market Price Alert' },
  ];

  const regionOptions = [
    { value: 'all', label: 'All Regions' },
    { value: 'north', label: 'Northern Region' },
    { value: 'south', label: 'Southern Region' },
    { value: 'east', label: 'Eastern Region' },
    { value: 'west', label: 'Western Region' },
  ];

  const severityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
  ];

  const handleAlertChange = (e) => {
    const { name, value } = e.target;
    setAlertForm({ ...alertForm, [name]: value });
  };

  const handleSendAlert = (e) => {
    e.preventDefault();
    // Simulate sending alert
    alert('Alert sent successfully!');
    setAlertForm({
      alertType: '',
      region: '',
      message: '',
      severity: '',
    });
  };

  const handleClaimAction = (claimId, action) => {
    // Simulate claim action
    alert(`Claim ${claimId} ${action === 'approve' ? 'approved' : 'rejected'}`);
  };

  const filteredFarmers = farmers.filter(farmer => 
    farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    farmer.phone.includes(searchTerm) ||
    farmer.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredClaims = claims.filter(claim => 
    claim.farmer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    claim.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
    claim.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex">
      {/* Admin Sidebar */}
      <div className="w-64 bg-primary-900 text-white fixed inset-y-0 z-10">
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <span className="text-primary-900 font-bold text-lg">A</span>
            </div>
            <div>
              <h2 className="font-bold">AgriSure</h2>
              <p className="text-xs text-primary-200">Admin Dashboard</p>
            </div>
          </div>
          
          <nav>
            <button 
              onClick={() => setActiveTab('farmers')}
              className={`flex items-center w-full p-3 rounded-lg mb-2 ${
                activeTab === 'farmers' ? 'bg-primary-700' : 'hover:bg-primary-800'
              }`}
            >
              <Users size={18} className="mr-3" />
              <span>Farmers</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('claims')}
              className={`flex items-center w-full p-3 rounded-lg mb-2 ${
                activeTab === 'claims' ? 'bg-primary-700' : 'hover:bg-primary-800'
              }`}
            >
              <FileCheck size={18} className="mr-3" />
              <span>Claims</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('alerts')}
              className={`flex items-center w-full p-3 rounded-lg mb-2 ${
                activeTab === 'alerts' ? 'bg-primary-700' : 'hover:bg-primary-800'
              }`}
            >
              <AlertTriangle size={18} className="mr-3" />
              <span>Risk Alerts</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('settings')}
              className={`flex items-center w-full p-3 rounded-lg mb-2 ${
                activeTab === 'settings' ? 'bg-primary-700' : 'hover:bg-primary-800'
              }`}
            >
              <Settings size={18} className="mr-3" />
              <span>Settings</span>
            </button>
          </nav>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="border-t border-primary-700 pt-4 mb-4">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-primary-200 flex items-center justify-center mr-2">
                <User size={16} className="text-primary-900" />
              </div>
              <div>
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-primary-300">admin@agrisure.com</p>
              </div>
            </div>
            
            <Link to="/login" className="flex items-center text-primary-200 hover:text-white">
              <LogOut size={16} className="mr-2" />
              <span>Logout</span>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="ml-64 flex-grow bg-gray-50">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-900">
              {activeTab === 'farmers' && 'Registered Farmers'}
              {activeTab === 'claims' && 'Claims Management'}
              {activeTab === 'alerts' && 'Risk Alert Manager'}
              {activeTab === 'settings' && 'System Settings'}
            </h1>
            
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </header>
        
        <main className="p-6">
          {activeTab === 'farmers' && (
            <Card>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Phone
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Policies
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Claims
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredFarmers.map((farmer) => (
                      <tr key={farmer.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                              <User size={16} className="text-primary-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{farmer.name}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                          {farmer.phone}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                          {farmer.location}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                          {farmer.policies}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                          {farmer.claims}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm">
                          <Button size="sm" variant="glass" className="mr-2">View</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
          
          {activeTab === 'claims' && (
            <Card>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Claim ID
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Farmer
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Crop
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredClaims.map((claim) => (
                      <tr key={claim.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 whitespace-nowrap font-medium text-gray-900">
                          {claim.id}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                          {claim.farmer}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                          {claim.crop}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                          {claim.amount}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                          {claim.date}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <StatusBadge status={claim.status} />
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          {claim.status === 'Pending' && (
                            <div className="flex space-x-2">
                              <Button 
                                size="sm" 
                                variant="success" 
                                className="bg-success-300"
                                onClick={() => handleClaimAction(claim.id, 'approve')}
                              >
                                Approve
                              </Button>
                              <Button 
                                size="sm" 
                                variant="error" 
                                className="bg-error-300"
                                onClick={() => handleClaimAction(claim.id, 'reject')}
                              >
                                Reject
                              </Button>
                            </div>
                          )}
                          {claim.status !== 'Pending' && (
                            <Button size="sm" variant="glass">View</Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
          
          {activeTab === 'alerts' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Send Risk Alert</h2>
                <form onSubmit={handleSendAlert}>
                  <Dropdown
                    label="Alert Type"
                    name="alertType"
                    options={alertTypeOptions}
                    value={alertForm.alertType}
                    onChange={handleAlertChange}
                    required
                  />
                  
                  <Dropdown
                    label="Region"
                    name="region"
                    options={regionOptions}
                    value={alertForm.region}
                    onChange={handleAlertChange}
                    required
                  />
                  
                  <FormInput
                    label="Alert Message"
                    type="textarea"
                    name="message"
                    value={alertForm.message}
                    onChange={handleAlertChange}
                    placeholder="Enter detailed alert message"
                    required
                    className="resize-none h-32"
                    as="textarea"
                  />
                  
                  <Dropdown
                    label="Severity"
                    name="severity"
                    options={severityOptions}
                    value={alertForm.severity}
                    onChange={handleAlertChange}
                    required
                  />
                  
                  <div className="mt-4">
                    <Button type="submit">Send Alert</Button>
                  </div>
                </form>
              </Card>
              
              <Card>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Alerts</h2>
                <div className="space-y-4">
                  <div className="bg-warning-50 p-3 rounded-lg border-l-4 border-warning-400">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-gray-900">Heavy Rainfall Warning</h3>
                      <span className="text-xs text-gray-500">2025-05-10</span>
                    </div>
                    <p className="text-sm text-gray-700 my-1">
                      Region: Northern Region
                    </p>
                    <p className="text-sm text-gray-700">
                      Heavy rainfall expected over the next 48 hours. Farmers advised to secure crops and ensure proper drainage.
                    </p>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-xs bg-warning-200 text-warning-800 px-2 py-1 rounded-full">
                        High Severity
                      </span>
                      <span className="text-xs text-gray-500">
                        Sent to 156 farmers
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-success-50 p-3 rounded-lg border-l-4 border-success-400">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-gray-900">Market Price Alert</h3>
                      <span className="text-xs text-gray-500">2025-05-05</span>
                    </div>
                    <p className="text-sm text-gray-700 my-1">
                      Region: All Regions
                    </p>
                    <p className="text-sm text-gray-700">
                      Rice prices expected to increase by 15% in the coming month due to export demands.
                    </p>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-xs bg-success-200 text-success-800 px-2 py-1 rounded-full">
                        Low Severity
                      </span>
                      <span className="text-xs text-gray-500">
                        Sent to 428 farmers
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-error-50 p-3 rounded-lg border-l-4 border-error-400">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-gray-900">Pest Outbreak Alert</h3>
                      <span className="text-xs text-gray-500">2025-04-28</span>
                    </div>
                    <p className="text-sm text-gray-700 my-1">
                      Region: Southern Region
                    </p>
                    <p className="text-sm text-gray-700">
                      Army worm outbreak detected in neighboring areas. Farmers advised to monitor crops and apply preventive measures.
                    </p>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-xs bg-error-200 text-error-800 px-2 py-1 rounded-full">
                        Medium Severity
                      </span>
                      <span className="text-xs text-gray-500">
                        Sent to 92 farmers
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
          
          {activeTab === 'settings' && (
            <Card>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">System Settings</h2>
              <p className="text-gray-600 mb-4">
                Configure system parameters and blockchain settings
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Blockchain Configuration</h3>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Network</span>
                      <span className="text-sm font-medium">Polygon Mainnet</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Smart Contract Address</span>
                      <span className="text-sm font-medium">0x1234...5678</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Gas Price (Gwei)</span>
                      <span className="text-sm font-medium">35</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Payment Settings</h3>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Payment Gateway</span>
                      <span className="text-sm font-medium">UPI Gateway</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Transaction Fee</span>
                      <span className="text-sm font-medium">0.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Auto-Payout</span>
                      <span className="text-sm font-medium">Enabled</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">AI Verification Settings</h3>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">AI Model</span>
                      <span className="text-sm font-medium">CropDamageNet v2.1</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Confidence Threshold</span>
                      <span className="text-sm font-medium">85%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Manual Review Threshold</span>
                      <span className="text-sm font-medium">70%</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">System Information</h3>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Version</span>
                      <span className="text-sm font-medium">v1.2.3</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Last Updated</span>
                      <span className="text-sm font-medium">2025-04-15</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Maintenance Mode</span>
                      <span className="text-sm font-medium">Disabled</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Button>Save Settings</Button>
              </div>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardPage;