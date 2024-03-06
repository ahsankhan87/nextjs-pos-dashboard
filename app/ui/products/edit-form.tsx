'use client';

import { ProductsTable } from '@/app/lib/products/definitions';
import {
    CurrencyDollarIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateProduct } from '@/app/lib/products/actions';
import { useFormState } from 'react-dom';

export default function EditproductForm({
    product,
}: {
    product: ProductsTable[];
}) {
    const initialState = { message: null, errors: {} };
    const updateProductWithId = updateProduct.bind(null, product.id);
    const [state, dispatch] = useFormState(updateProductWithId, initialState);

    return (
        <form action={dispatch}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                {/* product Name */}
                <div className="mb-4">
                    <label htmlFor="product" className="mb-2 block text-sm font-medium">
                        Choose product
                    </label>
                    <div className="relative">
                        <input
                            id="name"
                            name="name"
                            type="text"
                            defaultValue={product.name}
                            placeholder="Enter Product Name"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            required
                        />
                        <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                    <div id="product-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.name &&
                            state.errors.name.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>

                {/* product Email */}
                <div className="mb-4">
                    <label htmlFor="email" className="mb-2 block text-sm font-medium">
                        Enter product Email
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="cost_price"
                                name="cost_price"
                                type="number"
                                step="0.01"
                                defaultValue={product.cost_price}
                                placeholder="Enter Cost Price"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                required
                            />
                            <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                    <div id="product-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.cost_price &&
                            state.errors.cost_price.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>
                {/* product Phone no */}
                <div className="mb-4">
                    <label htmlFor="phone_no" className="mb-2 block text-sm font-medium">
                        Enter product Phone no
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="unit_price"
                                name="unit_price"
                                type="number"
                                step="0.01"
                                defaultValue={product.unit_price}
                                placeholder="Enter Unit Price"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                required
                            />
                            <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>

                    </div>
                    <div id="product-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.unit_price &&
                            state.errors.unit_price.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>

            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/dashboard/products"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <Button type="submit">Edit Invoice</Button>
            </div>
        </form >
    );
}
