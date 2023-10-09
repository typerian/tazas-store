import Link from "next/link";
import { AccountIcon } from "./Icon";
import { Cart } from "./Cart";
import { useEffect } from "react";
import { useCarritoStore } from "@/store";

export const Header = () => {
  useEffect(() => {
    void useCarritoStore.persist.rehydrate();
  }, []);
  return (
    <header className="header flex justify-between bg-primary px-4 py-2">
      <ul className="flex justify-start">
        <li>
          <Link
            href="/"
            className="font-thin text-white hover:text-secondary-300"
          >
            Inicio
          </Link>
        </li>
      </ul>
      <div className={`logo`}>
        <Link
          href="/"
          title="Turix Store"
          className="no-decoration text-center font-semibold text-white"
        >
          <span className="text-center text-xl font-semibold text-secondary-300">
            T🍵zas Store
          </span>
        </Link>
      </div>
      <ul className="space-x-1">
        <li>
          <Cart />
        </li>
        <li>
          <Link href="/dashboard" title="account">
            <AccountIcon color="#4ff8d2" />
          </Link>
        </li>
      </ul>
    </header>
  );
};
