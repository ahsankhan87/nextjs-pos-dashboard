// import { Products } from '@/app/lib/products/definitions';
import { UpdateProduct, DeleteProduct } from '@/app/ui/products/buttons'
import { fetchFilteredProducts } from "@/app/lib/products/data";
import { formatCurrency } from '@/app/lib/utils';

export default async function ProductsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {

  const Products = await fetchFilteredProducts(query, currentPage);
  return (

    <div className="mt-6 flow-root">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
            <div className="md:hidden">
              {Products?.map((product) => (
                <div
                  key={product.id}
                  className="mb-2 w-full rounded-md bg-white p-4"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="mb-2 flex items-center">
                        <div className="flex items-center gap-3">
                          <p>{product.name}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">
                        {product.quantity}
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
                    Quantity
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Cost Price
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Unit Price
                  </th>
                  <th scope="col" className="px-4 py-5 font-medium">
                    Expiry Date
                  </th>
                  <th scope="col" className="relative py-3 pl-6 pr-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white">
                {Products.map((product) => (
                  <tr key={product.id} className="group">
                    <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                      <div className="flex items-center gap-3">
                        {/* <Image
                            src={product.image_url}
                            className="rounded-full"
                            alt={`${product.name}'s profile picture`}
                            width={28}
                            height={28}
                          /> */}
                        <p>{product.name}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                      {product.quantity}
                    </td>
                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                      {/* Convert into cent */}
                      {formatCurrency(product.cost_price)}
                    </td>
                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                      {formatCurrency(product.unit_price)}
                    </td>

                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">

                    </td>
                    <td className="whitespace-nowrap py-1 pr-3">
                      <div className="flex justify-end gap-2">
                        <UpdateProduct id={product.id} />
                        <DeleteProduct id={product.id} />
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
