'use client';

import InvoiceStatus from '@/app/ui/invoices/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { InvoiceDetailForm, InvoiceForm } from '@/app/lib/definitions';

export default function InvoiceReceipt({
    invoice,
    invoiceDetail,
}: {
    invoice: InvoiceForm;
    invoiceDetail: InvoiceDetailForm[];
}) {
    return (
        <>
            <div className="bg-white rounded-lg shadow-lg px-8 py-10 max-w-xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center">
                        <img className="h-8 w-8 mr-2" src="https://tailwindflex.com/public/images/logos/favicon-32x32.png"
                            alt="Logo" />
                        <div className="text-gray-700 font-semibold text-lg">Your Company Name</div>
                    </div>
                    <div className="text-gray-700">
                        <div className="font-bold text-xl mb-2">INVOICE</div>
                        <div className="text-sm">Date: {formatDateToLocal(invoice.sale_date)}</div>
                        <div className="text-sm">Due Date: {formatDateToLocal(invoice.due_date)}</div>
                        <div className="text-sm">Invoice #: {invoice.sale_id}</div>
                        <div className="text-sm">Status #: <InvoiceStatus status={invoice.status} /></div>
                    </div>
                </div>
                <div className="border-b-2 border-gray-300 pb-8 mb-8">
                    <h2 className="text-2xl font-bold mb-4">Bill To:</h2>
                    <div className="text-gray-700 mb-2">{invoice.first_name}</div>
                    <div className="text-gray-700 mb-2">{invoice.address}</div>
                    <div className="text-gray-700 mb-2">{invoice.phone_no}</div>
                    <div className="text-gray-700">{invoice.email}</div>
                </div>
                <table className="w-full text-left mb-8">
                    <thead>
                        <tr>
                            <th className="text-gray-700 font-bold uppercase py-2">Description</th>
                            <th className="text-gray-700 font-bold uppercase py-2">Quantity</th>
                            <th className="text-gray-700 font-bold uppercase py-2">Price</th>
                            <th className="text-gray-700 font-bold uppercase py-2">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoiceDetail?.map((detail) => (
                            <tr>
                                <td className="py-1 text-gray-700">{detail.item_name}</td>
                                <td className="py-1 text-gray-700">{detail.quantity}</td>
                                <td className="py-1 text-gray-700">{formatCurrency(detail.item_unit_price * 1)}</td>
                                <td className="py-1 text-gray-700">{formatCurrency(detail.quantity * detail.item_unit_price)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-end mb-1">
                    <div className="text-gray-700 mr-2">Subtotal:</div>
                    <div className="text-gray-700">{formatCurrency(invoice.total_amount * 1)}</div>
                </div>
                <div className="flex justify-end mb-1">
                    <div className="text-gray-700 mr-2">Tax:</div>
                    <div className="text-gray-700">{formatCurrency(invoice.total_tax * 1)}</div>

                </div>
                <div className="flex justify-end mb-1">
                    <div className="text-gray-700 font-bold mr-2">Total:</div>
                    <div className="text-gray-700 font-bold text-xl">{formatCurrency(invoice.net_amount * 1)}</div>
                </div>
                <div className="border-t-2 border-gray-300 pt-8 mb-8">
                    <div className="text-gray-700 mb-2">Payment is due within 30 days. Late payments are subject to fees.</div>
                    <div className="text-gray-700 mb-2">Please make checks payable to Your Company Name and mail to:</div>
                    <div className="text-gray-700">123 Main St., Anytown, USA 12345</div>
                </div>
            </div>
        </>
    );
}