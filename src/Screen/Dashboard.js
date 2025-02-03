import React, { useEffect, useRef, useState } from 'react';
import {
  DollarSign,
  Users,
  Wrench,
  FileText,
  Home,
  AlertCircle,
  ChevronDown,
  Plus,
  Search,
  User,
  LogOut
} from 'lucide-react';
import {
  AddPropertyModal,
  AddTenantModal,
  RecordPaymentModal,
  MaintenanceRequestModal,
  LeaseAgreementModal
} from '../Components/DashboardModals';
import { addLeaseToFirestore, addMaintenanceRequestToFirestore, addPaymentToFirestore, addPropertyToFirestore, addTenantToFirestore } from '../Database/methods';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef(null);
  const [modals, setModals] = useState({
    addProperty: false,
    addTenant: false,
    recordPayment: false,
    maintenance: false,
    lease: false
  });

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  
  const handleSignOut = () => {
    // Add your sign out logic here
    console.log('Signing out...');
  };


  // Sample data - replace with real data from your backend
  const financialData = {
    totalIncome: 45000,
    pendingPayments: 2500,
    maintenanceCosts: 1200,
    occupancyRate: 92
  };

  const recentActivities = [
    { type: 'payment', desc: 'Rent payment received - Unit 101', amount: 1500 },
    { type: 'maintenance', desc: 'New maintenance request - Unit 204', status: 'pending' },
    { type: 'lease', desc: 'Lease renewal due - Unit 305', dueDate: '2025-02-15' }
  ];

  const toggleModal = (modalName) => {
    setModals(prev => ({
      ...prev,
      [modalName]: !prev[modalName]
    }));
  };

  
  // In AddPropertyModal
const handleSubmitProperty = async (e) => {
  e.preventDefault();
  const result = await addPropertyToFirestore(userId, propertyData);
  if (result.success) {
    onSubmit(propertyData);
    onClose();
  } else {
    // Handle error - maybe show an error message to user
    console.error('Failed to add property:', result.error);
  }
};

// In AddTenantModal
const handleSubmitTenant = async (e) => {
  e.preventDefault();
  const result = await addTenantToFirestore(userId, tenantData);
  if (result.success) {
    onSubmit(tenantData);
    onClose();
  } else {
    console.error('Failed to add tenant:', result.error);
  }
};

// In RecordPaymentModal
const handleSubmitRecord = async (e) => {
  e.preventDefault();
  const result = await addPaymentToFirestore(userId, paymentData);
  if (result.success) {
    onSubmit(paymentData);
    onClose();
  } else {
    console.error('Failed to record payment:', result.error);
  }
};

// In MaintenanceRequestModal
const handleSubmitMaintenance = async (e) => {
  e.preventDefault();
  const result = await addMaintenanceRequestToFirestore(userId, requestData);
  if (result.success) {
    onSubmit(requestData);
    onClose();
  } else {
    console.error('Failed to add maintenance request:', result.error);
  }
};

// In LeaseAgreementModal
const handleSubmitLeaseAgreement = async (e) => {
  e.preventDefault();
  const result = await addLeaseToFirestore(userId, leaseData);
  if (result.success) {
    onSubmit(leaseData);
    onClose();
  } else {
    console.error('Failed to create lease:', result.error);
  }
};

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-black text-white p-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <h1 className="text-xl font-bold">PropertyManager Pro</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-800 rounded-lg">
              <AlertCircle size={20} />
            </button>
            <div className="relative" ref={profileMenuRef}>
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-2 p-2 hover:bg-gray-800 rounded-lg"
              >
                <img 
                  src="/api/placeholder/32/32"
                  alt="Profile" 
                  className="w-8 h-8 rounded-full"
                />
                <ChevronDown size={16} className={`transition-transform duration-200 ${showProfileMenu ? 'transform rotate-180' : ''}`} />
              </button>

              {/* Profile Dropdown Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 text-gray-800">
                  <button 
                    className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
                    onClick={() => {
                      // Add profile action here
                      console.log('Navigate to profile');
                    }}
                  >
                    <User size={16} />
                    <span>Profile</span>
                  </button>
                  <button 
                    className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 w-full text-left text-red-600"
                    onClick={handleSignOut}
                  >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Total Income</p>
                <p className="text-2xl font-bold">KES{financialData.totalIncome}</p>
              </div>
              <DollarSign className="text-green-500" size={24} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Pending Payments</p>
                <p className="text-2xl font-bold">KES{financialData.pendingPayments}</p>
              </div>
              <AlertCircle className="text-yellow-500" size={24} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Maintenance Costs</p>
                <p className="text-2xl font-bold">KES{financialData.maintenanceCosts}</p>
              </div>
              <Wrench className="text-blue-500" size={24} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Occupancy Rate</p>
                <p className="text-2xl font-bold">{financialData.occupancyRate}%</p>
              </div>
              <Home className="text-purple-500" size={24} />
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="lg:w-2/3 space-y-8">
            {/* Actions Bar */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex flex-wrap gap-4">
                <button 
                className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                onClick={() => toggleModal('addProperty')}
                >
                  <Plus size={20} />
                  <span>Add Property</span>
                </button>
                <button onClick={() => toggleModal('addTenant')} className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
                  <Users size={20} />
                  <span>Add Tenant</span>
                </button>
                <button onClick={() => toggleModal('lease')} className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
                  <FileText size={20} />
                  <span>New Lease</span>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border-b">
                    <div className="flex items-center space-x-4">
                      {activity.type === 'payment' && <DollarSign className="text-green-500" />}
                      {activity.type === 'maintenance' && <Wrench className="text-blue-500" />}
                      {activity.type === 'lease' && <FileText className="text-purple-500" />}
                      <div>
                        <p className="font-medium">{activity.desc}</p>
                        <p className="text-sm text-gray-500">
                          {activity.amount ? `$${activity.amount}` : activity.status || `Due: ${activity.dueDate}`}
                        </p>
                      </div>
                    </div>
                    <button className="text-black hover:underline">View</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:w-1/3 space-y-8">
            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
              <div className="space-y-4">
                <button onClick={() => toggleModal('recordPayment')} className="w-full text-left p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <DollarSign className="text-green-500" />
                    <span>Record Payment</span>
                  </div>
                </button>
                <button   onClick={() => toggleModal('maintenance')} className="w-full text-left p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <Wrench className="text-blue-500" />
                    <span>Create Maintenance Request</span>
                  </div>
                </button>
                <button className="w-full text-left p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <Home className="text-purple-500" />
                    <span>Post Vacancy</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <p className="font-medium">Lease Renewal - Unit 305</p>
                  <p className="text-sm text-gray-500">Due in 25 days</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="font-medium">Property Inspection - Unit 101</p>
                  <p className="text-sm text-gray-500">Scheduled for next week</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddPropertyModal 
        isOpen={modals.addProperty}
        onClose={() => toggleModal('addProperty')}
        onSubmit={handleSubmitProperty}
      />
      <AddTenantModal 
        isOpen={modals.addTenant}
        onClose={() => toggleModal('addTenant')}
        onSubmit={handleSubmitTenant}
      />
      <RecordPaymentModal 
        isOpen={modals.recordPayment}
        onClose={() => toggleModal('recordPayment')}
        onSubmit={handleSubmitRecord}
      />
      <MaintenanceRequestModal 
        isOpen={modals.maintenance}
        onClose={() => toggleModal('maintenance')}
        onSubmit={handleSubmitMaintenance}
      />
      <LeaseAgreementModal 
        isOpen={modals.lease}
        onClose={() => toggleModal('lease')}
        onSubmit={handleSubmitLeaseAgreement}
      />
    </div>
  );
};

export default Dashboard;