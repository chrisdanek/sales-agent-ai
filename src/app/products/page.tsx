import { Heading } from "@/components/heading";
import { Spinner } from "@/components/spinner";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { ProductList } from "@/features/product/components/product-list";
import { Suspense } from "react";

const TicketsPage = async () => {
  await getAuthOrRedirect();
  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Heading>All Products</Heading>

      <Suspense fallback={<Spinner />}>
        <ProductList />
      </Suspense>
    </div>
  );
};

export default TicketsPage;
