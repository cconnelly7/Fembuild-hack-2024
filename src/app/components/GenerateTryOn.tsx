import { useState } from "react";

const GenerateTryon = () => {

    const [base64, setBase64] = useState('');
    // get garment
    // get model

    const handleClick = async () => {
        console.log('Call replicate')

        // const response = await fetch('http://127.0.0.1:8000/get_image')
        // console.log('Log response')
        // console.log(response)
        // console.log('Log response as json')
        // console.log(response.json())

        let url = 'https://replicate.delivery/pbxt/6qe6wYjo0uVbOq6bAVceEdzif7194cM7NaavgE32dFSYKl0lA/output.jpg'
        const urlToBase64 = (url: string | URL | Request) => fetch(url)
            .then(data => data.blob())
            .then(blob => new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.onloadend = () => resolve(reader.result)
                reader.onerror = reject
                reader.readAsDataURL(blob)
            }))
            urlToBase64(url).then(dataUrl => {
                setBase64(dataUrl as string)
        })
    };

    const handleUpload = () => {
        console.log('Upload image')

        var formData = new FormData();
        // formData.append("filename", filename);
        // formData.append("filedata", filedata);
        
        const response_obj = fetch('http://127.0.0.1:8000/upload', {
            method:'POST',
            body: formData
        })
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })

    };

    return (
        <div>
            <button onClick={handleUpload}>Upload Image</button>
            <button onClick={handleClick}>Run model</button>
            <div>
                <img src={base64} width={300} height={400}></img>
            </div>
            
        </div>
    )
}

export default GenerateTryon;