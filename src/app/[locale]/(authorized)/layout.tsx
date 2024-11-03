import { cookies } from "next/headers";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import UserVerifier from "@/components/UserVerifier";

import styles from "./layout.module.scss";

export default function AuthorizedLayout({
  children,
  searchParams,
}: Readonly<{
  children: React.ReactNode;
  searchParams: {
    search: string;
    typeName: string;
  };
}>) {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("user");
  const user = userCookie ? JSON.parse(userCookie.value) : null;

  return (
    <UserVerifier>
      <div className={styles.wrapper}>
        <Header searchParams={searchParams} />
        {user && <Navbar id={user.id} type={user.type} />}
        {children}
        <Footer />
      </div>
    </UserVerifier>
  );
}
