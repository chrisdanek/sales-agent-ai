import { productPath } from "@/paths";
import { toCurrencyFromCent } from "@/utils/currency";
import Link from "next/link";
import { getProducts } from "../queries/get-products";

const ProductList = async () => {
  const products = await getProducts();

  return (
    <div className="animate-fade-from-top grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
      {products.map((product) => (
        <Link
          href={productPath(product.id)}
          className="border p-6"
          key={product.id}
        >
          <h3 className="text-lg font-bold">{product.name}</h3>
          <p className="text-sm text-gray-500">{product.description}</p>
          <p className="text-sm text-gray-500">
            {toCurrencyFromCent(product.price)}
          </p>
        </Link>
      ))}
    </div>
  );
};

export { ProductList };
