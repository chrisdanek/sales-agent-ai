"use client";

import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { fromCent } from "@/utils/currency";
import { Product } from "@prisma/client";
import { useActionState } from "react";
import { upsertProduct } from "../actions/upsert-product";

type ProductUpsertFormProps = {
  product?: Product;
};

const ProductUpsertForm = ({ product }: ProductUpsertFormProps) => {
  const [actionState, action] = useActionState(
    upsertProduct.bind(null, product?.id),
    EMPTY_ACTION_STATE,
  );

  return (
    <Form action={action} actionState={actionState}>
      <Label htmlFor="title">Title</Label>
      <Input
        id="name"
        name="name"
        type="text"
        defaultValue={
          (actionState.payload?.get("name") as string) ?? product?.name
        }
      />
      <FieldError actionState={actionState} name="name" />

      <Label htmlFor="description">Description</Label>
      <Textarea
        id="description"
        name="description"
        className="min-h-[200px]"
        defaultValue={
          (actionState.payload?.get("description") as string) ??
          product?.description
        }
      />
      <FieldError actionState={actionState} name="description" />

      <div className="mb-1 flex gap-x-2">
        <div className="w-1/2">
          <Label htmlFor="bounty">Price (PLN)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            step=".01"
            defaultValue={
              (actionState.payload?.get("price") as string) ??
              (product?.price ? fromCent(product?.price) : undefined) ??
              0
            }
          />
          <FieldError actionState={actionState} name="price" />
        </div>
      </div>

      <div>
        <Label htmlFor="image">Image (PNG, JPG)</Label>
        <input type="file" accept="image/png, image/jpeg" name="image" />
      </div>

      <SubmitButton label={product ? "Edit" : "Create"} />
    </Form>
  );
};

export { ProductUpsertForm };
