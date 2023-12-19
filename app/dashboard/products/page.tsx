import { fetchProducts } from '@/app/lib/products/data';
import { Metadata } from 'next';
import { lusitana } from '@/app/ui/fonts';
import {
    ProductsField
} from '../../lib/definitions';

export const metadata: Metadata = {
    title: 'Products',
};

export default async function Page() {
    const products: ProductsField[] = await fetchProducts();

    return (
        <div className="w-full">

            <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
                Products
            </h1>
            {/* <Search placeholder="Search customers..." /> */}
            <div className="mt-6 flow-root">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">

                            <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                                    <tr>
                                        <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                            Name
                                        </th>
                                        <th scope="col" className="px-3 py-5 font-medium">
                                            Email
                                        </th>
                                        <th scope="col" className="px-3 py-5 font-medium">
                                            Total Invoices
                                        </th>
                                        <th scope="col" className="px-3 py-5 font-medium">
                                            Total Pending
                                        </th>
                                        <th scope="col" className="px-4 py-5 font-medium">
                                            Total Paid
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-200 text-gray-900">
                                    {products?.map((item) => (
                                        <tr key={item.item_id} className="group">
                                            <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                                                <div className="flex items-center gap-3">
                                                    {/* <Image
                                                        src={customer.image_url}
                                                        className="rounded-full"
                                                        alt={`${customer.name}'s profile picture`}
                                                        width={28}
                                                        height={28}
                                                    /> */}
                                                    <p>{item.name}</p>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">

                                            </td>
                                            <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">

                                            </td>
                                            <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">

                                            </td>
                                            <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}