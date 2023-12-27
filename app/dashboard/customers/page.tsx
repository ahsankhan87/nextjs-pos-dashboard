import { fetchCustomers } from '@/app/lib/customers/data';
import { Metadata } from 'next';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import CustomersTable from '@/app/ui/customers/table';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';

import {
    CompaniesTable
} from '../../lib/definitions';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Customers',
};

export default async function Page() {
    const customers: CompaniesTable[] | any[] = await fetchCustomers();
    // const customers : CustomersTable_1= JSON.parse(data);
    return (
        <Suspense fallback={<InvoicesTableSkeleton />}>
            < CustomersTable customers={customers} />
        </Suspense >
    );
}