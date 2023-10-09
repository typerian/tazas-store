import { DeleteIcon } from "./Icon";
import { resizeImage } from "@/lib/utils";
import { useCarritoStore } from "@/store";
import Image from "next/image";

interface ProductType {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  count: number;
}

export const CartListItem = (props: ProductType) => {
  const { removeFromCart } = useCarritoStore();
  return (
    <div className="flex w-full items-center gap-4 p-4">
      <Image
        src={resizeImage(props.image, 50, 50)}
        alt=""
        width={500}
        height={500}
        className="h-16 w-16 rounded object-cover"
      />

      <div className=" flex-1">
        <h3 className="text-sm text-gray-900">
          {props.name} <strong>x({props.count})</strong>
        </h3>
      </div>
      <div>
        <button
          className="rounded bg-red-600 p-1 text-white"
          onClick={() => removeFromCart(props)}
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};
