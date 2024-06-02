'use client'
import Image from "next/image";
import styles from "./page.module.css"
import GenerateTryon from "./components/GenerateTryOn";
import UploadImage from "./components/UploadImage";
import { useState } from "react"; 

export default function Home() {
  const [base64Output, setBase64Output] = useState('');
  type Base64<imageType extends string> = `data:image/${imageType};base64${string}`
  const [modelImg, setModelImage] = useState<string>('');
  const [garment, setGarment] = useState('');
  const [modelFileName, setModelFileName] = useState('');
  const [garmFileName, setGarmFileName] = useState('');
  const [img64, setImg64] = useState('');

  const [active, setAvtive] = useState(-1);
  const images = require.context('../../public/garments', true);
  const imageList = images.keys().map((image: any) => images(image));


  function encodeImageFileAsURL(element: any) {
    // console.log('hihi ', element.target.files[0]);
    // setImg(URL.createObjectURL(element.target.files[0]));
    setModelImage(URL.createObjectURL(element.target.files[0]));
    var file = element.target.files[0];
    var reader = new FileReader();

    reader.onloadend = function() {
      // console.log(reader.result)
      let preImg64 = reader.result as string
      setImg64(preImg64.replace("data:","").replace(/^.+,/, ""))
      // setImg64(reader.result as string);
    }
    // setModelFileName(file.name)
    reader.readAsDataURL(file);
  }
  // console.log('IMAGE64 ', img64)

  function encodeGarment(e: any, index: number) {
    setAvtive(index);
  }

  // call replicate directly testing only - not in use
  const handleClick = async () => {
    console.log('Call replicate')

    const response = await fetch('http://127.0.0.1:8000/get_image')
    // console.log('Log response as json')
    // console.log(response.json())

    // convert response to base64 to display
    // test string
    // let url = 'https://replicate.delivery/pbxt/6qe6wYjo0uVbOq6bAVceEdzif7194cM7NaavgE32dFSYKl0lA/output.jpg'
    let url = response.json()
    const urlToBase64 = (url: string | URL | Request) => fetch(url)
        .then(data => data.blob())
        .then(blob => new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onloadend = () => resolve(reader.result)
            reader.onerror = reject
            reader.readAsDataURL(blob)
        }))
        urlToBase64(await url).then(dataUrl => {
            setBase64Output(dataUrl as string)
    })
  };

  const handleUpload = async () => {
    console.log('Upload image')

    // TODO - save state for both modelFileName and garmFileName
    let modelFilePath = "././public/models/"
    let garmFilePath = "././public/garments/"
    // do this somewhere else
    setModelFileName("model_2.png")
    setGarmFileName("sweater.png")

    var formData = new FormData();
    // TODO - CHANGE THE FILENAMES
    formData.append("modelFilePath", modelFilePath.concat("model_2.png"))
    formData.append("garmFilePath", garmFilePath.concat("sweater.png"))

    const response = await fetch('http://127.0.0.1:8000/upload', {
        mode: 'cors',
        method:'POST',
        body: formData
    })
    let url = response.json()
    const urlToBase64 = (url: string | URL | Request) => fetch(url)
        .then(data => data.blob())
        .then(blob => new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onloadend = () => resolve(reader.result)
            reader.onerror = reject
            reader.readAsDataURL(blob)
        }))
        urlToBase64(await url).then(dataUrl => {
            setBase64Output(dataUrl as string)
    })
  };
  return (
    <main className={styles.main}>
      <div className={styles.selfieWrapper}>
        <div className={styles.selfieWrapper}>
            <div>Upload an image of yourself including your torso.</div>
            <input id="file-input" type="file" onChange={encodeImageFileAsURL}/>
            <img src={modelImg} width={300} height={400}/>
        </div>
        <div className={styles.selfieWrapper}>
            <div>Pick a garment.</div>
            {imageList.map((image: { default: { src: string | undefined; }; }, index: React.Key | null | undefined) => (
            <img className={active == index ? styles.highlight : styles.noborder} key={index} src={image.default.src} width={250} height={250} alt={`image-${index}`} onClick={(e) => encodeGarment(e, index)}/>
            ))}
        </div>          
        <button onClick={handleUpload}>Run model</button>
            <div>
                <img src={base64Output} width={300} height={400}/>
            </div>
      </div>
    </main>
  );
}
