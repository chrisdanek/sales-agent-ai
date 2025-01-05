import { productPath } from "@/paths";
import { toCurrencyFromCent } from "@/utils/currency";
import Image from "next/image";
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
          {product.photos[0]?.url && (
            <div className="relative mb-4 aspect-square">
              <Image
                src={product.photos[0].url}
                alt={product.name}
                className="aspect-square h-auto object-cover"
                priority={true}
                width={240}
                height={240}
              />
            </div>
          )}
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
