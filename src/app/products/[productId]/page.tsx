import { Heading } from "@/components/heading";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { getProduct } from "@/features/product/queries/get-product";
import { productsPath } from "@/paths";
import { toCurrencyFromCent } from "@/utils/currency";

import { notFound } from "next/navigation";

type ProductPageProps = {
  params: Promise<{
    productId: string;
  }>;
};

const ProductPage = async ({ params }: ProductPageProps) => {
  await getAuthOrRedirect();
  const { productId: productId } = await params;
  const product = await getProduct(productId);

  if (!product) {
    notFound();
  }

  return (
    <div className="animate-fade-from-top flex flex-col gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={productsPath()}>All Products</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <hr />
      <Heading>{product.name}</Heading>
      <p>{product.description}</p>
      <p className="text-sm text-muted-foreground">
        {toCurrencyFromCent(product.price)}
      </p>
    </div>
  );
};

export default ProductPage;
