import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div>Click the upload icon below to upload a file.</div>

      <div>
          <input id="file-input" type="file"/>
      </div>
    </main>
  );
}
