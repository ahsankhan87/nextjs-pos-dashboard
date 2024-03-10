import { Metadata } from 'next';
import InvoiceReceipt from '@/app/ui/invoices/invoice-receipt';
import { fetchInvoiceById, fetchInvoiceDetailBySaleId } from '@/app/lib/invoices/data';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
    title: 'Invoice Receipt',
};

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [invoiceHeader, invoiceDetail] = await Promise.all([
        fetchInvoiceById(id),
        fetchInvoiceDetailBySaleId(id),
    ]);

    if (!invoiceHeader) {
        notFound();
    }

    return (
        <>
            <InvoiceReceipt invoice={invoiceHeader} invoiceDetail={invoiceDetail} />
        </>
    );
}