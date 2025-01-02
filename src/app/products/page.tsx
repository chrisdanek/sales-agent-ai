import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";

export default async function Products() {
  await getAuthOrRedirect();

  return <div>Products</div>;
}
