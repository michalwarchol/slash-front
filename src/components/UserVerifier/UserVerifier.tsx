"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface IProps {
  children: ReactNode | ReactNode[];
}

export default async function UserVerifier({ children }: IProps) {
  const userCookie = cookies().get("user");
  const user = userCookie ? JSON.parse(userCookie.value) : null;
  const langCookie = cookies().get("NEXT_LOCALE");
  const lang = langCookie ? langCookie.value : "en";

  if (user && !user.isVerified) {
    redirect(`/${lang}/verify`);
  }

  return <>{children}</>;
}
