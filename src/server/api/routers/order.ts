import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const orderRouter = createTRPCRouter({
  getOrderByUser: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.orders.findMany({
        where: {
          userId: input.userId,
        },
      });
    }),
});
