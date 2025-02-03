import React, { useState } from 'react';
import { X } from 'lucide-react';

// Base Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg mx-4">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X size={20} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

// Add Property Modal
export const AddPropertyModal = ({ isOpen, onClose, onSubmit }) => {
  const [propertyData, setPropertyData] = useState({
    name: '',
    address: '',
    units: '',
    type: 'apartment',
    rentAmount: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(propertyData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Property">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Property Name</label>
          <input
            type="text"
            value={propertyData.name}
            onChange={(e) => setPropertyData({...propertyData, name: e.target.value})}
            className="w-full p-2 border rounded focus:outline-none focus:border-black"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Address</label>
          <input
            type="text"
            value={propertyData.address}
            onChange={(e) => setPropertyData({...propertyData, address: e.target.value})}
            className="w-full p-2 border rounded focus:outline-none focus:border-black"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Number of Units</label>
          <input
            type="number"
            value={propertyData.units}
            onChange={(e) => setPropertyData({...propertyData, units: e.target.value})}
            className="w-full p-2 border rounded focus:outline-none focus:border-black"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Property Type</label>
          <select
            value={propertyData.type}
            onChange={(e) => setPropertyData({...propertyData, type: e.target.value})}
            className="w-full p-2 border rounded focus:outline-none focus:border-black"
          >
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Rent Amount</label>
          <input
            type="number"
            value={propertyData.rentAmount}
            onChange={(e) => setPropertyData({...propertyData, rentAmount: e.target.value})}
            className="w-full p-2 border rounded focus:outline-none focus:border-black"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Add Property
        </button>
      </form>
    </Modal>
  );
};

// Add Tenant Modal
export const AddTenantModal = ({ isOpen, onClose, onSubmit }) => {
  const [tenantData, setTenantData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    unit: '',
    moveInDate: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(tenantData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Tenant">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">First Name</label>
            <input
              type="text"
              value={tenantData.firstName}
              onChange={(e) => setTenantData({...tenantData, firstName: e.target.value})}
              className="w-full p-2 border rounded focus:outline-none focus:border-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input
              type="text"
              value={tenantData.lastName}
              onChange={(e) => setTenantData({...tenantData, lastName: e.target.value})}
              className="w-full p-2 border rounded focus:outline-none focus:border-black"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={tenantData.email}
            onChange={(e) => setTenantData({...tenantData, email: e.target.value})}
            className="w-full p-2 border rounded focus:outline-none focus:border-black"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <input
            type="tel"
            value={tenantData.phone}
            onChange={(e) => setTenantData({...tenantData, phone: e.target.value})}
            className="w-full p-2 border rounded focus:outline-none focus:border-black"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Unit Number</label>
          <input
            type="text"
            value={tenantData.unit}
            onChange={(e) => setTenantData({...tenantData, unit: e.target.value})}
            className="w-full p-2 border rounded focus:outline-none focus:border-black"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Move-in Date</label>
          <input
            type="date"
            value={tenantData.moveInDate}
            onChange={(e) => setTenantData({...tenantData, moveInDate: e.target.value})}
            className="w-full p-2 border rounded focus:outline-none focus:border-black"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Add Tenant
        </button>
      </form>
    </Modal>
  );
};

// Record Payment Modal
export const RecordPaymentModal = ({ isOpen, onClose, onSubmit }) => {
  const [paymentData, setPaymentData] = useState({
    tenant: '',
    amount: '',
    date: '',
    method: 'bank_transfer',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(paymentData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Record Payment">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Tenant/Unit</label>
          <input
            type="text"
            value={paymentData.tenant}
            onChange={(e) => setPaymentData({...paymentData, tenant: e.target.value})}
            className="w-full p-2 border rounded focus:outline-none focus:border-black"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Amount</label>
          <input
            type="number"
            value={paymentData.amount}
            onChange={(e) => setPaymentData({...paymentData, amount: e.target.value})}
            className="w-full p-2 border rounded focus:outline-none focus:border-black"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Payment Date</label>
          <input
            type="date"
            value={paymentData.date}
            onChange={(e) => setPaymentData({...paymentData, date: e.target.value})}
            className="w-full p-2 border rounded focus:outline-none focus:border-black"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Payment Method</label>
          <select
            value={paymentData.method}
            onChange={(e) => setPaymentData({...paymentData, method: e.target.value})}
            className="w-full p-2 border rounded focus:outline-none focus:border-black"
          >
            <option value="bank_transfer">Bank Transfer</option>
            <option value="cash">Cash</option>
            <option value="check">Check</option>
            <option value="credit_card">Credit Card</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={paymentData.description}
            onChange={(e) => setPaymentData({...paymentData, description: e.target.value})}
            className="w-full p-2 border rounded focus:outline-none focus:border-black"
            rows="3"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Record Payment
        </button>
      </form>
    </Modal>
  );
};

// Maintenance Request Modal
export const MaintenanceRequestModal = ({ isOpen, onClose, onSubmit }) => {
  const [requestData, setRequestData] = useState({
    unit: '',
    issue: '',
    priority: 'medium',
    description: '',
    accessInstructions: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(requestData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Maintenance Request">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Unit Number</label>
          <input
            type="text"
            value={requestData.unit}
            onChange={(e) => setRequestData({...requestData, unit: e.target.value})}
            className="w-full p-2 border rounded focus:outline-none focus:border-black"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Issue Type</label>
          <input
            type="text"
            value={requestData.issue}
            onChange={(e) => setRequestData({...requestData, issue: e.target.value})}
            className="w-full p-2 border rounded focus:outline-none focus:border-black"
            required
            placeholder="e.g., Plumbing, Electrical, HVAC"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Priority</label>
          <select
            value={requestData.priority}
            onChange={(e) => setRequestData({...requestData, priority: e.target.value})}
            className="w-full p-2 border rounded focus:outline-none focus:border-black"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="emergency">Emergency</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={requestData.description}
            onChange={(e) => setRequestData({...requestData, description: e.target.value})}
            className="w-full p-2 border rounded focus:outline-none focus:border-black"
            rows="3"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Access Instructions</label>
          <textarea
            value={requestData.accessInstructions}
            onChange={(e) => setRequestData({...requestData, accessInstructions: e.target.value})}
            className="w-full p-2 border rounded focus:outline-none focus:border-black"
            rows="2"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Submit Request
        </button>
      </form>
    </Modal>
  );
};

export const LeaseAgreementModal = ({ isOpen, onClose, onSubmit }) => {
  const [leaseData, setLeaseData] = useState({
    tenant: '',
    unit: '',
    startDate: '',
    endDate: '',
    rentAmount: '',
    depositAmount: '',
    terms: '',
    utilities: [],
    petPolicy: false,
    parkingSpots: '0'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(leaseData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Lease Agreement">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tenant Name</label>
            <input
              type="text"
              value={leaseData.tenant}
              onChange={(e) => setLeaseData({...leaseData, tenant: e.target.value})}
              className="w-full p-2 border rounded focus:outline-none focus:border-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Unit Number</label>
            <input
              type="text"
              value={leaseData.unit}
              onChange={(e) => setLeaseData({...leaseData, unit: e.target.value})}
              className="w-full p-2 border rounded focus:outline-none focus:border-black"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <input
              type="date"
              value={leaseData.startDate}
              onChange={(e) => setLeaseData({...leaseData, startDate: e.target.value})}
              className="w-full p-2 border rounded focus:outline-none focus:border-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">End Date</label>
            <input
              type="date"
              value={leaseData.endDate}
              onChange={(e) => setLeaseData({...leaseData, endDate: e.target.value})}
              className="w-full p-2 border rounded focus:outline-none focus:border-black"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Monthly Rent</label>
            <input
              type="number"
              value={leaseData.rentAmount}
              onChange={(e) => setLeaseData({...leaseData, rentAmount: e.target.value})}
              className="w-full p-2 border rounded focus:outline-none focus:border-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Security Deposit</label>
            <input
              type="number"
              value={leaseData.depositAmount}
              onChange={(e) => setLeaseData({...leaseData, depositAmount: e.target.value})}
              className="w-full p-2 border rounded focus:outline-none focus:border-black"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Lease Terms</label>
          <textarea
            value={leaseData.terms}
            onChange={(e) => setLeaseData({...leaseData, terms: e.target.value})}
            className="w-full p-2 border rounded focus:outline-none focus:border-black"
            rows="4"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Utilities Included</label>
          <div className="space-x-4">
            {['Water', 'Electricity', 'Gas', 'Internet'].map((utility) => (
              <label key={utility} className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={leaseData.utilities.includes(utility)}
                  onChange={(e) => {
                    const updatedUtilities = e.target.checked
                      ? [...leaseData.utilities, utility]
                      : leaseData.utilities.filter(u => u !== utility);
                    setLeaseData({...leaseData, utilities: updatedUtilities});
                  }}
                  className="mr-2"
                />
                {utility}
              </label>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Pet Policy</label>
            <select
              value={leaseData.petPolicy}
              onChange={(e) => setLeaseData({...leaseData, petPolicy: e.target.value === 'true'})}
              className="w-full p-2 border rounded focus:outline-none focus:border-black"
            >
              <option value="false">Not Allowed</option>
              <option value="true">Allowed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Parking Spots</label>
            <input
              type="number"
              value={leaseData.parkingSpots}
              onChange={(e) => setLeaseData({...leaseData, parkingSpots: e.target.value})}
              className="w-full p-2 border rounded focus:outline-none focus:border-black"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Create Lease Agreement
        </button>
      </form>
    </Modal>
  );
};