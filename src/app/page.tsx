// eslint-disable-file
'use client'
import Image from "next/image";
import styles from "./page.module.css";
import React, { useState } from "react";

export default function Home() {
  const [img, setImg] = useState<string>('');

  function handleChange(e: any) {
    setImg(URL.createObjectURL(e.target.files[0]));
    
}
console.log('hereee ',img);
  return (
    <main className={styles.main}>
      <div>Click the upload icon below to upload a file.</div>
      <div>
          <input id="file-input" type="file" onChange={handleChange}/>
      </div>
    </main>
  );
}
