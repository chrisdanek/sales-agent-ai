import { productsPath } from "@/paths";
import { redirect } from "next/navigation";

export default function Home() {
  redirect(productsPath());
}
