import Image from "next/image";
import type { Product } from "@prisma/client";
import { resizeImage } from "@/lib/utils";
import Link from "next/link";

export interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="group relative block overflow-hidden">
      <Link
        href={`/mug/${product.id}`}
        className="group relative block overflow-hidden"
      >
        <div className="h-64 w-full">
          <Image
            src={resizeImage(product.image, 400, 320)}
            alt=""
            fill
            className="object-cover transition duration-500 group-hover:scale-105 sm:h-72"
          />
        </div>
      </Link>

      <div className="mt-3 flex justify-between text-sm">
        <Link
          href={`/mug/${product.id}`}
          className="group relative block overflow-hidden"
        >
          <h3 className="text-gray-900 group-hover:underline group-hover:underline-offset-4">
            {product.name}
          </h3>
        </Link>

        <p className="text-lg text-gray-700">${product.price}</p>
      </div>
    </div>
  );
};
