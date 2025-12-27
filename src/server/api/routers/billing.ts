import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const billingRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.billing.findMany({
      orderBy: { startDateTime: "desc" },
      include: {
        project: {
          include: {
            organization: true,
          },
        },
        user: true,
      },
    });
  }),

  create: publicProcedure
    .input(
      z.object({
        userId: z.string().min(1),
        projectId: z.string().min(1),
        startDateTime: z.string().datetime(),
        endDateTime: z.string().datetime().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.billing.create({
        data: {
          userId: input.userId,
          projectId: input.projectId,
          startDateTime: new Date(input.startDateTime),
          endDateTime: input.endDateTime
            ? new Date(input.endDateTime)
            : undefined,
        },
        include: {
          project: {
            include: {
              organization: true,
            },
          },
          user: true,
        },
      });
    }),
});

