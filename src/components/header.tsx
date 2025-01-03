"use client";

import { signOut } from "@/features/auth/actions/sign-out";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { homePath, newProductPath, productsPath } from "@/paths";
import { LucideLogOut, LucidePlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SubmitButton } from "./form/submit-button";
import { ThemeSwitcher } from "./theme/theme-switcher";
import { buttonVariants } from "./ui/button";

const Header = () => {
  const { user, isFetched } = useAuth();

  if (!isFetched) {
    return null;
  }

  const navItems = user ? (
    <>
      <Link
        href={productsPath()}
        className={buttonVariants({ variant: "outline" })}
      >
        Products
      </Link>
      <Link
        href={newProductPath()}
        className={buttonVariants({ variant: "outline" })}
      >
        <LucidePlus />
        New Product
      </Link>
      <form action={signOut}>
        <SubmitButton label="Sign Out" icon={<LucideLogOut />} />
      </form>
    </>
  ) : null;

  return (
    <nav className="animate-header-from-top supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 flex w-full justify-between border-b bg-background/95 px-5 py-2.5 backdrop-blur">
      <div className="align-items flex gap-x-2">
        <Link
          href={homePath()}
          className={buttonVariants({ variant: "ghost" })}
        >
          <Image
            src="/favicon.webp"
            alt=""
            width={32}
            height={32}
            className="rounded-full"
          />
          <h1 className="text-lg font-semibold">QPIK Product Agent</h1>
        </Link>
      </div>
      <div className="align-items flex gap-x-2">
        <ThemeSwitcher />
        {navItems}
      </div>
    </nav>
  );
};

export { Header };
