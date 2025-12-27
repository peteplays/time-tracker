import { Prisma } from "../../../../generated/prisma";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const projectRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.project.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        organization: true,
        billings: true,
      },
    });
  }),

  create: publicProcedure
    .input(
      z.object({
        organizationId: z.string().min(1),
        name: z.string().min(1),
        description: z.string().optional(),
        rate: z.string().optional(),
        userId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.project.create({
        data: {
          organizationId: input.organizationId,
          name: input.name,
          description: input.description ?? undefined,
          rate: input.rate ? new Prisma.Decimal(input.rate) : undefined,
          userId: input.userId ?? undefined,
        },
        include: {
          organization: true,
          billings: true,
        },
      });
    }),
});
