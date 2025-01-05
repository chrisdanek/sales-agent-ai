"use server";

import { setCookieByKey } from "@/actions/cookies";
import {
  ActionState,
  fromErrorToActionState,
} from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import { utapi } from "@/lib/uploadthing";
import { productPath, productsPath } from "@/paths";
import { toCent } from "@/utils/currency";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import sharp from "sharp";
import { z } from "zod";
const upsertProductSchema = z.object({
  name: z.string().min(1, "Name is required").max(191, "Name is too long"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(1024, "Description is too long"),
  price: z.coerce.number().nonnegative("Price must be not negative").default(0),
});

export const upsertProduct = async (
  id: string | undefined,
  _actionState: ActionState,
  formData: FormData,
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

    const images = formData.getAll("image") as File[];

    const textOverlay = `
<svg width="1000" height="1000" xmlns="http://www.w3.org/2000/svg">
        <style>
          .title { fill: white; font-size: 250px; font-family: Arial; font-weight: bold; opacity: 0.3; text-anchor: middle;}
        </style>
        <defs>
          <filter id="shadow">
            <feDropShadow dx="4" dy="4" stdDeviation="4" flood-opacity="0.3"/>
          </filter>
        </defs>
        <text x="50%" y="50%" class="title" filter="url(#shadow)">QPIK</text>
        
      </svg>
    `;

    const processedImages = await Promise.all(
      images.map(async (image) => {
        const buffer = Buffer.from(await image.arrayBuffer());

        const processedBuffer = await sharp(buffer)
          .composite([
            {
              input: Buffer.from(textOverlay),
              gravity: "center",
            },
          ])
          .toBuffer();

        const processedFile = new File([processedBuffer], image.name, {
          type: image.type,
        });

        return processedFile;
      }),
    );

    const result = await utapi.uploadFiles(processedImages);

    for (const res of result) {
      if (!!res.error) {
        return fromErrorToActionState(res.error, formData);
      }
    }

    const product = await prisma.product.upsert({
      where: { id: id || "" },
      update: dbData,
      create: dbData,
    });

    if (images.length > 0 && id) {
      await prisma.photo.deleteMany({
        where: { id },
      });
    }

    if (images.length > 0) {
      await prisma.photo.createMany({
        data: result.map((res) => ({
          productId: product.id,
          url: res.data!.url,
        })),
      });
    }
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  revalidatePath(productsPath());

  if (id) {
    await setCookieByKey("toast", "Product updated");
    redirect(productPath(id));
  }

  await setCookieByKey("toast", "Product created");
  redirect(productsPath());
};
