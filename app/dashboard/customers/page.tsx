import { fetchCustomers } from '@/app/lib/customers/data';
import { Metadata } from 'next';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import CustomersTable from '@/app/ui/customers/table';

import {
    FormattedCustomersTable
} from '../../lib/definitions';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Customers',
};

export default async function Page() {
    const customers: FormattedCustomersTable[] | any[] = await fetchCustomers();
    // const customers : CustomersTable_1= JSON.parse(data);
    return (
        <Suspense>
            <CustomersTable customers={customers} />
        </Suspense>
    );
}