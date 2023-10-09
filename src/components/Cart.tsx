import { useEffect, useState } from "react";
import { CartIcon } from "./Icon";
import { CartListItem } from "./CartListItem";
import Link from "next/link";
import { useCarritoStore } from "@/store";

interface ProductType {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  count: number;
}

export const Cart = () => {
  const [showCart, setShowCart] = useState(false);
  const { carrito } = useCarritoStore();

  const toggleCart = () => {
    setShowCart((s) => !s);
  };

  useEffect(() => {
    void useCarritoStore.persist.rehydrate();
  }, []);

  const reducer = (accumulator: number, currentValue: ProductType) =>
    accumulator + currentValue.count;

  return (
    <div className="relative z-40">
      <button className="flex items-center space-x-1" onClick={toggleCart}>
        <CartIcon color="#4ff8d2" />
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary-400 p-1 font-semibold text-black">
          {carrito.reduce(reducer, 0)}
        </span>
      </button>

      {showCart && (
        <div className="max-h[90vh] fixed right-2 top-14 z-10">
          <div
            className="relative w-screen max-w-sm border border-gray-600 bg-gray-100 px-4 py-8 drop-shadow-md sm:px-6 lg:px-8"
            aria-modal="true"
            role="dialog"
            tabIndex={-1}
          >
            <button
              className="absolute end-4 top-4 text-gray-600 transition hover:scale-110"
              onClick={toggleCart}
            >
              <span className="sr-only">Cerrar carrito</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="mt-4 space-y-6">
              <div className="flex flex-col space-y-4">
                {carrito.length ? (
                  carrito.map((item) => (
                    <div key={item.id} className="max-h-[80vh] overflow-y-auto">
                      <CartListItem {...item} />
                    </div>
                  ))
                ) : (
                  <div className="flex w-full items-center gap-4 p-4">
                    Tu carrito esta vacio, continue comprando!
                  </div>
                )}
              </div>

              <div className="space-y-4 text-center">
                <a
                  href="/cart"
                  className="block rounded border border-gray-600 px-5 py-3 transition hover:ring-1 hover:ring-gray-400"
                >
                  <span className="text-sm font-semibold text-tertiary-800">
                    Ver mi Carrito ({carrito.reduce(reducer, 0)})
                  </span>
                </a>

                <Link
                  href="/checkout"
                  className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                >
                  Pagar
                </Link>

                <Link href="/" className="inline-block text-sm">
                  <span
                    onClick={toggleCart}
                    className="text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
                  >
                    Continua comprando
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
