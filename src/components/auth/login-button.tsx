"use client";

import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

type LoginButtonProps = PropsWithChildren<{
  mode?: "modal" | "redirect";
  asChild?: boolean;
}>;

export default function LoginButton({
  children,
  mode = "redirect",
  asChild,
}: LoginButtonProps) {
  const router = useRouter();

  const handleClickLoginButton = () => {
    router.push("/auth/login");
  };

  if (mode === "modal") {
    return <span>TODO: Implement modal</span>;
  }

  return (
    <span onClick={handleClickLoginButton} className="cursor-pointer">
      {children}
    </span>
  );
}
