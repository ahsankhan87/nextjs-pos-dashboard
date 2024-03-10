'use client';

import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
  TrashIcon, CalendarIcon,
} from '@heroicons/react/24/outline';
import { PlusCircleIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import { createInvoice } from '@/app/lib/invoices/actions';
import { fetchProductById } from '@/app/lib/products/data';
import { useFormState, useFormStatus } from 'react-dom';
import { useState } from 'react';
import { ProductsTable } from '../../lib/products/definitions';
import { InvoiceForm, CustomerField } from '../../lib/definitions';
import CustomerPopupComponent from '../customers/create-customer-popup';
import { number } from 'zod';

export default function Form({ customers, products }: { customers: CustomerField[], products: ProductsTable[] }) {

  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createInvoice, initialState);

  const [allCustomers, setAllCustomers] = useState<CustomerField[]>(customers);
  const [showCustomerCreateModal, setShowCustomerCreateModal] = useState(false);

  const addCustomer = async (newCustomer: CustomerField) => {
    // Simulated function to add customer
    // Replace with actual API call to add customer
    //console.log(JSON.stringify(newCustomer));

    try {
      const data = newCustomer;
      setAllCustomers([...allCustomers, data]);
      setShowCustomerCreateModal(false);

    } catch (error) {
      console.error('Failed to add customer', error);
    }
  };

  const [rows, setRows] = useState([{ id: 1, productId: '', quantity: 1, costPrice: 0, unitPrice: 0 }]);

  //set status checkbox checked by default
  const [selectedProductStatus, setSelectedProductStatus] = useState('pending');
  const handleProductStatusChange = (event: any) => {
    setSelectedProductStatus(event.target.value);
  };

  const handleDeleteRow = (targetIndex: number) => {
    console.log(targetIndex);
    setRows(rows.filter((_, index) => index !== targetIndex))
  }

  const handleAddRow = () => {
    //setRows([...rows, { id: rows.length + 1, product: selectedProduct, quantity: 1 }])
    const newRow = { id: rows.length + 1, productId: '', quantity: 1, costPrice: 0, unitPrice: 0 };
    setRows([...rows, newRow]);
  }
  // Function to handle changing quantity
  const handleQuantityChange = (index: number, quantity: number) => {
    const updatedRows = [...rows];
    updatedRows[index].quantity = quantity;
    setRows(updatedRows);
  };
  const handleUnitPriceChange = (index: number, unitPrice: number) => {
    const updatedRows = [...rows];
    updatedRows[index].unitPrice = unitPrice;
    setRows(updatedRows);
  };
  // Function to handle changing quantity
  const handleProductChange = async (index: number, productId: string) => {
    if (productId) {
      const resultProduct = await fetchProductById(productId);

      const updatedRows = [...rows];
      updatedRows[index].productId = productId;
      updatedRows[index].unitPrice = resultProduct.unit_price;
      updatedRows[index].costPrice = resultProduct.avg_cost;

      setRows(updatedRows);
    } else {
      const updatedRows = [...rows];
      updatedRows[index].productId = '';
      updatedRows[index].unitPrice = 0;
      updatedRows[index].costPrice = 0;

      setRows(updatedRows);
    }
  };

  const [totalTaxAmount, setTotalTaxAmount] = useState(0);
  const handleTaxChange = async (taxRate: string) => {
    let total_tax: number = (parseFloat(taxRate) * total_amount / 100);
    total_tax = (total_tax ? total_tax : 0);
    setTotalTaxAmount(total_tax);
  };

  const total_amount = (rows.map((product) => {
    return product.unitPrice * product.quantity
  }).reduce((a, b) => a + b, 0));

  const handleSubmit = async (formData: FormData) => {

    try {

      if (rows.length > 0 && rows[0].productId) {
        const formData_1: InvoiceForm | any = {
          customerId: formData.get('customerId'),
          //amount: formData.get('amount'),
          status: formData.get('status'),
          sale_date: formData.get('sale_date'),
          due_date: formData.get('due_date'),
          total_amount: formData.get('total_amount'),
          total_tax: formData.get('totalTaxAmount'),
          details: rows,
        };
        // // Call server action to create invoice
        await dispatch(formData_1);

      } else {
        alert('Please select products');
      }
      // Redirect to another page or display a success message

    } catch (error) {
      // Handle error if necessary
      console.error(error)
    } finally {

    }
  };
  const handleCustomer = (event: any) => {

    if (event.target.value === 'NEW-CUSTOMER') {
      setShowCustomerCreateModal(true);

    }
  }
  return (
    <>
      {((showCustomerCreateModal) ? <CustomerPopupComponent addCustomer={addCustomer} onClose={() => setShowCustomerCreateModal(false)} /> : null)}

      <form action={handleSubmit}>
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
          {/* Customer Name */}
          <div className="mb-4">
            <label htmlFor="customer" className="mb-2 block text-sm font-medium">
              Choose customer
            </label>
            <div className="relative">
              <select
                id="customer"
                name="customerId"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue=""
                aria-describedby="customer-error"
                onChange={handleCustomer}
              >
                <option value="" disabled>
                  Select a customer
                </option>
                <option value="NEW-CUSTOMER" className='text-blue-500 font-bold'>Add New Customer</option>
                {allCustomers.map((customer) => (
                  <option key={customer.customerId} value={customer.customerId}>
                    {customer.first_name}
                  </option>
                ))}
              </select>
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
            {/* <button
              type='button'
              onClick={() => setShowCustomerCreateModal(true)}
              className="flex bg-blue-500 text-white px-2 py-2 rounded-md hover:bg-blue-600"
            >
              <PlusCircleIcon className='h-[18px] w-[18px] mt-1' />
              Add New Customer
            </button> */}

            <div id="customer-error" aria-live="polite" aria-atomic="true">
              {state.errors?.customerId &&
                state.errors.customerId.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          {/* Sale Date */}
          <div className="mb-4">
            <label htmlFor="sale_date" className="mb-2 block text-sm font-medium">
              Choose an sale date
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="sale_date"
                  name="sale_date"
                  type="date"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  required
                  value={new Date().toISOString().split('T')[0]}
                />
                <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>
          {/* Due Date */}
          <div className="mb-4">
            <label htmlFor="due_date" className="mb-2 block text-sm font-medium">
              Choose an due date
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="due_date"
                  name="due_date"
                  type="date"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"

                />
                <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>

          {/* Invoice Status */}
          <fieldset>
            <legend className="mb-2 block text-sm font-medium">
              Set the invoice status
            </legend>
            <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
              <div className="flex gap-4">
                <div className="flex items-center">
                  <input
                    id="pending"
                    name="status"
                    type="radio"
                    value="pending"
                    checked={selectedProductStatus == "pending"}
                    onChange={handleProductStatusChange}
                    className="h-4 w-4 border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600"
                  />
                  <label
                    htmlFor="pending"
                    className="ml-2 flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300"
                  >
                    Pending <ClockIcon className="h-4 w-4" />
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="paid"
                    name="status"
                    type="radio"
                    value="paid"
                    checked={selectedProductStatus == "paid"}
                    onChange={handleProductStatusChange}
                    className="h-4 w-4 border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600"
                  />
                  <label
                    htmlFor="paid"
                    className="ml-2 flex items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white dark:text-gray-300"
                  >
                    Paid <CheckIcon className="h-4 w-4" />
                  </label>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
          <table className="min-w-full text-center text-sm font-light">
            <thead className='border-b font-medium dark:border-neutral-500'>
              <tr>
                <th className='border border-slate-300'>S.no</th>
                <th className='border border-slate-300'>Product</th>
                <th className='border border-slate-300'>Qty</th>
                <th className='border border-slate-300'>Price</th>
                <th className='border border-slate-300'>Total</th>
                <th className='border border-slate-300'>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                rows?.map((row, index) => (
                  <tr key={index} className="border-b dark:border-neutral-500">
                    <td className="whitespace-nowrap px-6 py-2 font-medium">{row.id}</td>
                    <td className="whitespace-nowrap px-6 py-2">
                      <select
                        onChange={(e) => handleProductChange(index, e.target.value)}
                        id="productId"
                        name="productId"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        defaultValue=""
                        aria-describedby="product-error"
                      >
                        <option value="">Select a product</option>
                        {products.map((product) => (
                          <option key={product.id} value={product.id}>
                            {product.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="whitespace-nowrap px-6 py-2">
                      <input
                        id="quantity"
                        name="quantity"
                        type="number"
                        step="0.0001"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        value={row.quantity}
                        onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                      />
                    </td>
                    <td className="whitespace-nowrap px-6 py-2">
                      <input name='costPrice' type='hidden' value={row.costPrice} />
                      <input
                        id="unitPrice"
                        name="unitPrice"
                        type="number"
                        step="0.0001"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        value={row.unitPrice}
                        onChange={(e) => handleUnitPriceChange(index, parseFloat(e.target.value))}
                      />
                    </td>
                    <td className="whitespace-nowrap px-6 py-2">
                      {row.quantity * row.unitPrice}
                    </td>
                    <td className="whitespace-nowrap px-6 py-2" >
                      <TrashIcon onClick={() => handleDeleteRow(index)} className="text-red-500  h-[18px] w-[18px]" />
                    </td>
                  </tr>

                ))
              }
              <tr>
                <th colSpan={4} className='text-right'>
                  <select
                    onChange={(e) => handleTaxChange(e.target.value)}
                    id="tax"
                    name="tax"
                    className="peer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    aria-describedby="tax-error"
                  >
                    <option value="0">No Tax</option>
                    <option value="15">15% GST</option>
                    <option value="7.5">7.5% GST</option>
                  </select>
                  {state.errors?.total_tax &&
                    state.errors.total_tax.map((error: string) => (
                      <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                      </p>
                    ))}
                </th>
                <th>{totalTaxAmount}</th>
                <th><input type="hidden" name='totalTaxAmount' value={totalTaxAmount} /></th>
              </tr>
              <tr>
                <th colSpan={4} className='text-right'>Total
                  {state.errors?.total_amount &&
                    state.errors.total_amount.map((error: string) => (
                      <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                      </p>
                    ))}
                </th>
                <th>{total_amount}</th>
                <th><input type="hidden" name='total_amount' value={total_amount} /></th>
              </tr>
            </tbody>
          </table>
          <Button type='button' className='bg-purple-500 px-4 text-sm' onClick={() => handleAddRow()}>Add New</Button>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/invoices"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>

          <SubmitButton />
        </div>
      </form >
    </>

  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" aria-disabled={pending}>
      {pending ? 'Loading...' : 'Create Invoice'}
    </Button>
  );
}
