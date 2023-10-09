import { useCarritoStore } from "@/store";
import Image from "next/image";
import { useEffect } from "react";

interface ProductType {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  count: number;
}

export const CartPageItem = (props: ProductType) => {
  const { removeFromCart } = useCarritoStore();

  useEffect(() => {
    void useCarritoStore.persist.rehydrate();
  }, []);

  return (
    <div className="flex w-full gap-4 p-4">
      <Image
        src={props.image}
        alt=""
        width={500}
        height={500}
        className="h-64 w-64 rounded object-cover"
      />

      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-gray-900">
          <a href={`/product/${props.id}`}>{props.name}</a>
          <strong>x({props.count})</strong>
        </h3>

        <div className="px-2 py-4 font-semibold">
          ${(props.price * props.count).toFixed(2)}
        </div>

        <p className="mt-0.5 space-y-px text-gray-600">{props.description}</p>
      </div>
      <div>
        <button
          className="rounded bg-red-600 p-1 text-white"
          onClick={() => removeFromCart(props)}
        >
          <svg
            className="h-4 w-4 fill-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};
