import styles from "./styles.module.scss";

interface IProps {
  children: React.ReactNode | React.ReactNode[];
}

export default function StaticModal({ children }: IProps) {
  return (
    <div className={styles.staticModal}>
      <div className={styles.innerStaticModal}>{children}</div>
    </div>
  );
}
