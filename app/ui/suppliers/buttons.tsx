// import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
// import Link from 'next/link';
import { activateCompany, deactivateCompany } from '@/app/lib/products/actions';

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