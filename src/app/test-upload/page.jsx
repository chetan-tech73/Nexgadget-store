"use client"
import { useState } from "react";

export default function TestUploadPage() {
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState("");

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);
         const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
         });

         const data = await res.json();
         if (data.secure_url) {
            setUrl(data.secure_url);
         }else {
            alert("Upload failed");
         }
    };
    return (
        <div style={{ padding: 20}}>
            <h1>Test Upload</h1>
            <form onSubmit={handleUpload}>
                <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                <button type="submit">Upload</button>
            </form>

            {url && (
                <div>
                    <p>Upload Image</p>
                    <img src={url} alt="uploaded" style={{maxWidth: "300px" }} />
                    </div>
            )}
        </div>
    );
}