import Form from '@/app/ui/products/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchProductById } from '@/app/lib/products/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Edit product',
};

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [product] = await Promise.all([
        fetchProductById(id),

    ]);

    if (!product) {
        notFound();
    }

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Products', href: '/dashboard/products' },
                    {
                        label: 'Edit product',
                        href: `/dashboard/products/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <Form product={product} />
        </main>
    );
}