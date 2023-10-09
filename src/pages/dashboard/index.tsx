import { formatDate } from "@/lib/utils";
import { api } from "@/utils/api";
import { SignOutButton, useUser } from "@clerk/nextjs";

export default function AccountDashboard() {
  const { user } = useUser();
  if (!user) return null;

  const { data: orders } = api.order.getOrderByUser.useQuery({
    userId: user.id,
  });

  return (
    <div className="flex min-h-screen flex-col space-x-8 space-y-8">
      <div className="flex justify-between">
        <h1 className="p-6 text-gray-600">Hola 👋 {user.firstName}!</h1>
        <SignOutButton>
          <button type="submit" className="p-3">
            Salir 🚪
          </button>
        </SignOutButton>
      </div>
      <section className="-mt-nav relative flex flex-col justify-end">
        {orders?.length ? (
          <div className="flex flex-col space-y-4 p-2">
            <h2 className="p-2 text-center text-gray-500">
              Aqui esta tu historial de ordenes.
            </h2>
            <table className="p-2">
              <thead>
                <th>Fecha</th>
                <th>Costo Total</th>
                <th>Shipping to</th>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders?.map((order) => (
                  <tr key={order.id}>
                    <td className="whitespace-nowrap px-4 py-2 text-center">
                      {formatDate(order?.createdAt as number)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-center">
                      {order.finalAmount}$
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-center">
                      {order.shippingAddress}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>Sin ordenes pendientes!</div>
        )}
      </section>
    </div>
  );
}
