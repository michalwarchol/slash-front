import { me } from "@/app/actions";
import Header from "@/components/Header";

import styles from "./page.module.scss";

export default async function Home() {
  const data = await me();

  return (
    <div className={styles.wrapper}>
      <Header />
      {JSON.stringify(data)}
    </div>
  );
}
