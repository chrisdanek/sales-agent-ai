import { CardCompact } from "@/components/card-compact";
import { ProductUpsertForm } from "@/features/product/components/product-form";

export default function NewProduct() {
  return (
    <CardCompact
      title="Create Product"
      description="A new product will be created"
      className="w-full max-w-[420px] self-center"
      content={<ProductUpsertForm />}
    />
  );
}
