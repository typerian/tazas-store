import { create } from "zustand";
import { persist } from "zustand/middleware";
import compare from "just-compare";

interface ProductType {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  count: number;
}

interface ProductState {
  carrito: ProductType[];
  addToCart: (product: ProductType) => void;
  removeFromCart: (product: ProductType) => void;
}

export const useCarritoStore = create(
  persist<ProductState>(
    (set, get) => ({
      carrito: [],
      addToCart: (product) => {
        const findProduct = get().carrito.find(
          (prod) => prod.id === product.id,
        );
        if (findProduct) {
          set((state) => ({
            carrito: state.carrito.map((item) => {
              if (findProduct.id === item.id) {
                return {
                  ...item,
                  count: item.count + product.count,
                };
              } else {
                return item;
              }
            }),
          }));
        } else {
          set((state) => ({
            carrito: [...state.carrito, product],
          }));
        }
      },
      removeFromCart: (product) => {
        set(() => ({
          carrito: get().carrito.filter((prod) => !compare(prod, product)),
        }));
      },
    }),
    { name: "cart", skipHydration: true },
  ),
);
