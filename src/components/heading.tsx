import { cn } from "@/lib/utils";
import type React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Heading = ({ children, className }: Props) => {
  return <h1 className={cn("text-2xl font-bold", className)}>{children}</h1>;
};

export { Heading };
