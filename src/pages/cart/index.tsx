import { CartPageItem } from "@/components/CartPageItem";
import { useCarritoStore } from "@/store";
import React, { useEffect } from "react";

const CartIndex = () => {
  useEffect(() => {
    void useCarritoStore.persist.rehydrate();
  }, []);

  const { carrito } = useCarritoStore();
  return (
    <div className="flex flex-col space-y-4">
      {carrito.length ? (
        carrito.map((item) => <CartPageItem key={item.id} {...item} />)
      ) : (
        <div className="flex w-full items-center gap-4 p-4">
          Your cart is empty, continue shopping!
        </div>
      )}
    </div>
  );
};

export default CartIndex;
