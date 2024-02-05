import { CustomersTable, CompaniesTable } from '@/app/lib/definitions';
import { ActivateCompanyBtn, DeactivateCompanyBtn } from '@/app/ui/customers/buttons'
import { fetchFilteredCustomers } from "@/app/lib/customers/data";
import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default async function CustomersTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {

  const customers = await fetchFilteredCustomers(query, currentPage);
  return (

    <div className="mt-6 flow-root">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
            <div className="md:hidden">
              {customers?.map((customer) => (
                <div
                  key={customer.id}
                  className="mb-2 w-full rounded-md bg-white p-4"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="mb-2 flex items-center">
                        <div className="flex items-center gap-3">
                          <p>{customer.name}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">
                        {new Date(customer.expire * 1000).toDateString()}
                      </p>
                    </div>
                  </div>

                </div>
              ))}
            </div>
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
                    Phone
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Status
                  </th>
                  <th scope="col" className="px-4 py-5 font-medium">
                    Expiry Date
                  </th>
                  <th scope="col" className="relative py-3 pl-6 pr-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 text-gray-900">
                {customers.map((customer) => (
                  <tr key={customer.id} className="group">
                    <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                      <div className="flex items-center gap-3">
                        {/* <Image
                            src={customer.image_url}
                            className="rounded-full"
                            alt={`${customer.name}'s profile picture`}
                            width={28}
                            height={28}
                          /> */}
                        <p>{customer.name}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                      {customer.email}
                    </td>
                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                      {customer.contact_no}
                    </td>
                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                      <span
                        className={clsx(
                          'inline-flex items-center rounded-full px-2 py-1 text-xs',
                          {
                            'bg-green-500 text-white': !customer.locked,
                            'bg-red-500 text-white': customer.locked,
                          },
                        )}
                      >
                        {customer.locked ? (
                          <>
                            In-active
                          </>
                        ) : null}
                        {!customer.locked ? (
                          <>
                            Active
                          </>
                        ) : null}
                      </span>
                    </td>
                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                      {new Date(customer.expire * 1000).toDateString()}

                    </td>
                    <td className="whitespace-nowrap py-1 pr-3">
                      <div className="flex justify-end gap-2">
                        <ActivateCompanyBtn id={customer.id} />
                        <DeactivateCompanyBtn id={customer.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

  );
}
