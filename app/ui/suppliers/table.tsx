import { SuppliersTable } from '@/app/lib/suppliers/definitions';
import { ActivateCompanyBtn, DeactivateCompanyBtn } from '@/app/ui/suppliers/buttons'
import { fetchFilteredSuppliers } from "@/app/lib/suppliers/data";

export default async function SuppliersTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {

  const Suppliers = await fetchFilteredSuppliers(query, currentPage);
  return (

    <div className="mt-6 flow-root">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
            <div className="md:hidden">
              {Suppliers?.map((supplier) => (
                <div
                  key={supplier.id}
                  className="mb-2 w-full rounded-md bg-white p-4"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="mb-2 flex items-center">
                        <div className="flex items-center gap-3">
                          <p>{supplier.name}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">

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
                    Address
                  </th>
                  <th scope="col" className="relative py-3 pl-6 pr-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 text-gray-900">
                {Suppliers.map((supplier) => (
                  <tr key={supplier.id} className="group">
                    <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                      <div className="flex items-center gap-3">
                        {/* <Image
                            src={supplier.image_url}
                            className="rounded-full"
                            alt={`${supplier.name}'s profile picture`}
                            width={28}
                            height={28}
                          /> */}
                        <p>{supplier.name}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                      {supplier.email}
                    </td>
                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                      {supplier.contact_no}
                    </td>
                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                      {supplier.status}
                    </td>
                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                      {supplier.address}
                    </td>
                    <td className="whitespace-nowrap py-1 pr-3">
                      <div className="flex justify-end gap-2">

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
