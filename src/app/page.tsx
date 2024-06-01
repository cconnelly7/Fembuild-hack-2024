import Image from "next/image";
import styles from "./page.module.css";
import Camera from './Camera'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Camera/>
      </div>
    </main>
  );
}
