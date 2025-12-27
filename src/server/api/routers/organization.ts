import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const organizationRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.organization.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        contacts: true,
        projects: true,
      },
    });
  }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().optional(),
        address: z.string().optional(),
        email: z.string().email().optional().or(z.literal("")),
        phone: z.string().optional(),
        contact: z
          .object({
            firstName: z.string().min(1),
            lastName: z.string().min(1),
            position: z.string().optional(),
            phone: z.string().optional(),
            email: z.string().email().optional().or(z.literal("")),
          })
          .optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { contact, ...orgData } = input;

      return ctx.db.organization.create({
        data: {
          ...orgData,
          email: orgData.email ?? undefined,
          contacts: contact
            ? {
                create: {
                  ...contact,
                  email: contact.email ?? undefined,
                },
              }
            : undefined,
        },
        include: {
          contacts: true,
          projects: true,
        },
      });
    }),
});
