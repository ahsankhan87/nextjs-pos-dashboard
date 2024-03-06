import Form from '@/app/ui/suppliers/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Create Product',
};

export default async function Page() {

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'suppliers', href: '/dashboard/suppliers' },
                    {
                        label: 'Create Supplier',
                        href: '/dashboard/suppliers/create',
                        active: true,
                    },
                ]}
            />
            <Form />
        </main>
    );
}