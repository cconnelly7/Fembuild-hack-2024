// eslint-disable-file
'use client'
import Image from "next/image";
import styles from "./page.module.css";
import React, { useState } from "react";

export default function Home() {
  const [img, setImg] = useState<string>('');

  const images = require.context('../../public/garments', true);
  const imageList = images.keys().map(image => images(image));
  console.log('hii ', imageList);

  function encodeImageFileAsURL(element: any) {
    setImg(URL.createObjectURL(element.target.files[0]));
    var file = element.target.files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
      console.log('RESULT', reader.result)
    }
    reader.readAsDataURL(file);
  }

  return (
    <div className={styles.main}>
      <div className={styles.selfieWrapper}>
        <div>Upload an image of yourself including your torso.</div>
          <input id="file-input" type="file" onChange={encodeImageFileAsURL}/>
        <img src={img} />
      </div>
      <div className={styles.selfieWrapper}>
        <div>Pick a garment.</div>
        {imageList.map((image, index) => (
        <img key={index} src={image.default.src} width={250} height={250} alt={`image-${index}`} />
      ))}
      </div>
    <button className={styles.submit}>Submit</button>
    </div>
  );
}
