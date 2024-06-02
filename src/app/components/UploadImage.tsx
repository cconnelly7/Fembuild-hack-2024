import React, { useState } from "react";
import Image from "next/image";
import styles from "../page.module.css"

const UploadImage = () => {

    type Base64<imageType extends string> = `data:image/${imageType};base64${string}`
    const [img, setImg] = useState<string>('');
    const [img64, setImg64] = useState('');
  
    const [garment, setGarment] = useState('');
    const [active, setAvtive] = useState(-1);
    const images = require.context('../../../public/garments', true);
    const imageList = images.keys().map((image: any) => images(image));

    function encodeImageFileAsURL(element: any) {
        // console.log('hihi ', element.target.files[0]);
        setImg(URL.createObjectURL(element.target.files[0]));
        var file = element.target.files[0];
        var reader = new FileReader();
        reader.onloadend = function() {
          setImg64(reader.result as string);
        }
        reader.readAsDataURL(file);
      }
    
      function encodeGarment(e: any, index: number) {
        setAvtive(index);
      }

    return (
        <div>
            <div className={styles.selfieWrapper}>
                <div>Upload an image of yourself including your torso.</div>
                <input id="file-input" type="file" onChange={encodeImageFileAsURL}/>
                <img src={img} />
            </div>
            <div className={styles.selfieWrapper}>
                <div>Pick a garment.</div>
                {imageList.map((image: { default: { src: string | undefined; }; }, index: React.Key | null | undefined) => (
                <img className={active == index ? styles.highlight : styles.noborder} key={index} src={image.default.src} width={250} height={250} alt={`image-${index}`} onClick={(e) => encodeGarment(e, index)}/>
                ))}
            </div>
        </div>

      
    )
}

export default UploadImage;