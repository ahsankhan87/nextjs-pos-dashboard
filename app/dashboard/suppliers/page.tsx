import { Metadata } from "next";
import { lusitana } from "@/app/ui/fonts";
import { Suspense } from "react";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import Search from "@/app/ui/search";
import Pagination from "@/app/ui/suppliers/pagination";
import SuppliersTable from "@/app/ui/suppliers/table";
import { fetchSuppliersPages } from "@/app/lib/suppliers/data";
import { CreateSupplier } from "@/app/ui/suppliers/buttons";

export const metadata: Metadata = {
  title: "Suppliers",
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchSuppliersPages(query);

  // const Suppliers : SuppliersTable_1= JSON.parse(data);
  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
        Suppliers
      </h1>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search Suppliers..." />
        <CreateSupplier />
      </div>

      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <SuppliersTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
