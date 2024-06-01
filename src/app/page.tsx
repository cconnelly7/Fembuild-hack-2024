// eslint-disable-file
'use client'
import Image from "next/image";
import styles from "./page.module.css";
import React, { useState } from "react";

export default function Home() {

  function encodeImageFileAsURL(element: any) {
    var file = element.target.files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
      console.log('RESULT', reader.result)
    }
    reader.readAsDataURL(file);
  }

  return (
    <main className={styles.main}>
      <div>Click the upload icon below to upload a file.</div>
      <div>
          <input id="file-input" type="file" onChange={encodeImageFileAsURL}/>
      </div>
    </main>
  );
}
