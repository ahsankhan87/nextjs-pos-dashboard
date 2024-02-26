// PopupComponent.tsx

import React, { useState } from 'react';

interface Customer {
  name: string;
  email: string;
}

interface PopupProps {
  addCustomer: (newCustomer: Customer) => void;
}

const PopupComponent: React.FC<PopupProps> = ({ addCustomer }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add validation if needed
    addCustomer({ name, email });
    // Reset form fields
    setName('');
    setEmail('');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Add New Customer</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 mb-4"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 mb-4"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add Customer
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupComponent;
