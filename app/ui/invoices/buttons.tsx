'use client'
import { PencilIcon, PlusIcon, PrinterIcon, TrashIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteInvoice } from '@/app/lib/invoices/actions';
import { useState } from 'react';

export function ActionInvoiceDDL({ id }: { id: string }) {
  const deleteInvoiceWithId = deleteInvoice.bind(null, id);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='relative flex flex-col items-center rounded-sm'>
      <button
        // className='bg-blue-400 p-2 w-full text-white flex items-center justify-between font-bold text-sm rounded-lg tracking-wider border-4 border-trasparent active:border-white duration-300 active:text-white'
        className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"

        onClick={() => setIsOpen((prev) => !prev)}
      >
        Action
        {!isOpen ? (
          <ArrowDownIcon className='h-3' />
        ) : (
          <ArrowUpIcon className='h-3' />
        )}
      </button>
      {isOpen && (
        <div className='bg-blue-400 absolute top-11 flex flex-col items-start rounded-lg p-2 w-full z-50'>
          <div className='w-full'>

            <Link href={`/dashboard/invoices/${id}/receipt`}
              className='flex w-full justify-between text-white hover:bg-blue-300 cursor-pointer rounded-r-lg border-l-transparent hover:border-l-white border-l-4 p-2'>
              <PrinterIcon className="w-4 " />
              <span className='font-bold'>Print</span></Link>
          </div>
          <div className='w-full'>
            <Link href={`/dashboard/invoices/${id}/edit`}
              className='flex w-full justify-between text-white hover:bg-blue-300 cursor-pointer rounded-r-lg border-l-transparent hover:border-l-white border-l-4 p-2'
            >
              <PencilIcon className="w-4 " />
              <span className='font-bold'>Edit</span>
            </Link>
          </div>
          <div className='w-full'>
            <form action={deleteInvoiceWithId}>
              <button className="flex w-full justify-between text-white hover:bg-blue-300 cursor-pointer rounded-r-lg border-l-transparent hover:border-l-white border-l-4 p-2">
                <span className="sr-only">Delete</span>
                <TrashIcon className="w-4" /> <h3 className='font-bold'>Delete</h3>
              </button>
            </form>
          </div>

        </div>
      )}
    </div>
  )
}

export function CreateInvoice() {
  return (
    <Link
      href="/dashboard/invoices/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Invoice</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateInvoice({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/invoices/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteInvoice({ id }: { id: string }) {
  const deleteInvoiceWithId = deleteInvoice.bind(null, id);
  return (
    <>
      <form action={deleteInvoiceWithId}>
        <button className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-4" />
        </button>
      </form>
    </>
  );
}

export function PrintInvoice({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/invoices/${id}/receipt`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PrinterIcon className="w-5" />
    </Link>
  );
}
