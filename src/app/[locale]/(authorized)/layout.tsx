import { cookies } from "next/headers";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import UserVerifier from "@/components/UserVerifier";

import styles from "./layout.module.scss";
import { TSearchParams } from "./types";

export default async function AuthorizedLayout({
  children,
  searchParams,
}: Readonly<{
  children: React.ReactNode;
  searchParams: TSearchParams;
}>) {
  const cookieStore = await cookies();
  const searchProps = await searchParams;
  const userCookie = cookieStore.get("user");
  const user = userCookie ? JSON.parse(userCookie.value) : null;

  return (
    <UserVerifier>
      <div className={styles.wrapper}>
        <Header searchProps={searchProps} />
        {user && <Navbar id={user.id} type={user.type} />}
        {children}
        <Footer />
      </div>
    </UserVerifier>
  );
}
