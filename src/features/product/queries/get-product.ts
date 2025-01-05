import { prisma } from "@/lib/prisma";

export const getProduct = async (id: string) => {
  return await prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      photos: {
        select: {
          url: true,
        },
      },
    },
  });
};
