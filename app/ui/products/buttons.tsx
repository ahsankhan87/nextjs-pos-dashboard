import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { activateCompany, deactivateCompany } from '@/app/lib/products/actions';

export function CreateProduct() {
    return (
        <Link
            href="/dashboard/products/create"
            className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
            <span className="hidden md:block">Create Product</span>{' '}
            <PlusIcon className="h-5 md:ml-4" />
        </Link>
    );
}

export function ActivateCompanyBtn({ id }: { id: string }) {
    const activateCompanyWithId = activateCompany.bind(null, id);
    return (
        <>
            <form action={activateCompanyWithId}>
                <button className="rounded-md border p-2 hover:bg-gray-100">
                    <span className="sr-only">Activate</span>
                    Activate
                </button>
            </form>
        </>
    );
}

export function DeactivateCompanyBtn({ id }: { id: string }) {
    const deactivateCompanyWithId = deactivateCompany.bind(null, id);
    return (
        <>
            <form action={deactivateCompanyWithId}>
                <button className="rounded-md border p-2 hover:bg-gray-100">
                    <span className="sr-only">De-activate</span>
                    De-activate
                </button>
            </form>
        </>
    );
}