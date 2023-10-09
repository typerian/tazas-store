import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const productRouter = createTRPCRouter({
  getAllProduct: publicProcedure.query(({ ctx }) => {
    return ctx.db.product.findMany();
  }),
  getProductById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.product.findUnique({
        where: {
          id: input.id
        }
      });
    }),
});
