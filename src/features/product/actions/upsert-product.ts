"use server";

import { setCookieByKey } from "@/actions/cookies";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import { productPath, productsPath } from "@/paths";
import { toCent } from "@/utils/currency";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const upsertProductSchema = z.object({
  name: z.string().min(1).max(191),
  description: z.string().min(1).max(1024),
  price: z.coerce.number().positive(),
});

export const upsertProduct = async (
  id: string | undefined,
  _actionState: ActionState,
  formData: FormData
) => {
  try {
    const data = upsertProductSchema.parse({
      name: formData.get("name"),
      description: formData.get("description"),
      price: formData.get("price"),
    });

    const dbData = {
      ...data,
      price: toCent(data.price),
    };

    await prisma.product.upsert({
      where: { id: id || "" },
      update: dbData,
      create: dbData,
    });
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  revalidatePath(productsPath());

  if (id) {
    await setCookieByKey("toast", "Product updated");
    redirect(productPath(id));
  }

  return toActionState("SUCCESS", "Product created");
};
