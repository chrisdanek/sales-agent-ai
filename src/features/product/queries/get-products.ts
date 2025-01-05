import { prisma } from "@/lib/prisma";

export const getProducts = async () => {
  return await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
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
