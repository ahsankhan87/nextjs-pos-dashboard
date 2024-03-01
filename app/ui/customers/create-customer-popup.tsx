// PopupComponent.tsx

import React, { useState, FormEvent } from 'react';
import { CustomerField } from '../../lib/definitions';
import { createCustomerModal, getLastInsertID } from '@/app/lib/customers/actions';
import { useFormState } from 'react-dom';

interface PopupProps {
  addCustomer: (newCustomer: CustomerField) => void;
  onClose: () => void; // New prop for handling close event
}

const CustomerPopupComponent: React.FC<PopupProps> = ({ addCustomer, onClose }) => {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createCustomerModal, initialState);

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const [customerId, setCustomerId] = useState('');
  const [first_name, setFirst_name] = useState('');
  const [email, setEmail] = useState('');
  const [phone_no, setPhone_no] = useState('');
  const [address, setAddress] = useState('');

  const handleCustomerSubmit = async (formData: FormData) => {
    // e.preventDefault();

    setIsLoading(true)
    setError(null) // Clear previous errors when a new request starts
    try {
      // const formData = new FormData(e.currentTarget)

      await dispatch(formData);
      const lastInsertID = await getLastInsertID();//last Insert ID of customer insert

      addCustomer({
        customerId: lastInsertID, first_name, email
      });
      // Reset form fields
      setCustomerId('');
      setFirst_name('');
      setEmail('');
      setPhone_no('');
      setAddress('');
    } catch (error: any) {
      // Capture the error message to display to the user
      setError(error.message)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none transition-colors"
      >
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none shadow transition-all scale-100 opacity-100">
            <form action={handleCustomerSubmit}>
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                <h3 className="text-3xl font-semibold">
                  Add New Customer
                </h3>

              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">
                <input
                  type="text"
                  placeholder="Name"
                  value={first_name}
                  name="first_name"
                  onChange={(e) => setFirst_name(e.target.value)}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 mb-4"
                  required
                  autoFocus
                />
                {/* <div id="customer-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.first_name &&
                    state.errors.first_name.map((error: string) => (
                      <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                      </p>
                    ))}
                </div> */}

                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 mb-4"

                />
                <input
                  type="text"
                  placeholder="Phone No."
                  name="phone_no"
                  value={phone_no}
                  onChange={(e) => setPhone_no(e.target.value)}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 mb-4"

                />
                <input
                  type="text"
                  placeholder="address"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 mb-4"

                />
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={onClose}
                >
                  Close
                </button>
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? 'Loading...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div >
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>

  );
};

export default CustomerPopupComponent;
