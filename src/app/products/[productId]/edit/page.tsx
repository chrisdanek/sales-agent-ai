import { CardCompact } from "@/components/card-compact";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { ProductUpsertForm } from "@/features/product/components/product-form";
import { getProduct } from "@/features/product/queries/get-product";
import { notFound } from "next/navigation";

type ProductEditPageProps = {
  params: Promise<{
    productId: string;
  }>;
};

const ProductEditPage = async ({ params }: ProductEditPageProps) => {
  await getAuthOrRedirect();
  const { productId } = await params;
  const product = await getProduct(productId);

  const isProductFound = !!product;

  if (!isProductFound) {
    notFound();
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <CardCompact
        title="Edit Product"
        description="Edit an existing product"
        className="animate-fade-from-top w-full max-w-[420px]"
        content={<ProductUpsertForm product={product} />}
      />
    </div>
  );
};

export default ProductEditPage;
