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

const CheckOutPage = () => {
  const { carrito } = useCarritoStore();
  const reducer = (accumulator: number, currentValue: ProductType) =>
    accumulator + currentValue.count * currentValue.price;

  useEffect(() => {
    void useCarritoStore.persist.rehydrate();
  }, []);

  return (
    <section>
      <h1 className="sr-only">Cancelación</h1>

      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 md:grid-cols-2">
        <div className="bg-gray-50 py-12 md:py-24">
          <div className="mx-auto max-w-lg space-y-8 px-4 lg:px-8">
            <div className="flex items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-tertiary-400 text-2xl">
                🍵
              </span>

              <h2 className="font-medium text-gray-900">Tazas Store</h2>
            </div>

            {!!carrito.length && (
              <div>
                <p className="text-2xl font-medium tracking-tight text-gray-900">
                  ${parseInt(carrito.reduce(reducer, 0).toFixed(2))}
                </p>

                <p className="mt-1 text-sm text-gray-600">Por la compra de</p>
              </div>
            )}

            <div>
              <div className="flow-root">
                <ul className="-my-4 divide-y divide-gray-100">
                  {carrito.length ? (
                    carrito.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-center gap-4 py-4"
                      >
                        <Image
                          src={item.image}
                          alt=""
                          width={500}
                          height={500}
                          className="h-16 w-16 rounded object-cover"
                        />

                        <div>
                          <h3 className="text-sm font-semibold text-gray-900">
                            {item.name} X {item.count}
                          </h3>

                          <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                            <div>
                              <dt className="inline font-semibold">
                                ${(item.price * item.count).toFixed(2)}
                              </dt>
                            </div>
                          </dl>
                        </div>
                      </li>
                    ))
                  ) : (
                    <p className="w-full p-8 text-center">
                      Tu carrito esta vacio.
                    </p>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white py-12 md:py-24">
          <div className="mx-auto max-w-lg px-4 lg:px-8">
            <div className="col-span-6">
              <button
                className="block w-full rounded-md bg-black p-2.5 text-sm text-white transition hover:shadow-lg disabled:cursor-not-allowed disabled:bg-gray-300 disabled:hover:shadow-none"
                name="_action"
                value="make_payment"
                disabled={!carrito.length}
              >
                Pagar Ahora
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckOutPage;
