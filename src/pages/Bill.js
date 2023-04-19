import React, { useState } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { useLocation } from "react-router-dom";
import { storage } from "../firebase";
import { v4 } from "uuid";
import "./Bill.css";
import { Space, Button, Input } from "antd";
import imageCompression from "browser-image-compression"; // Import the image-compression library

function Bill() {
  const [imageUpload, setImageUpload] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [userId, setuserId] = useState("");
  const [ammount, setAmount] = useState("");
  const [imgdetails, setImgDetails] = useState({

    email: "",
    invoiceNumber: "",
    formattedDate: "",
    formattedTime: "",
    imgurl: "",
    ammount: "",


  });
  const location = useLocation();
  const email = new URLSearchParams(location.search).get("email");
  const PostData = async (e) => {
    e.preventDefault();
    alert("uploaded successfully");
    const {
      email,
      invoiceNumber,
      formattedDate,
      formattedTime,
      imgurl,
      userId,
      ammount, } = imgdetails;

    const res = await fetch(
      "https://loyalty-web-app-dbc8e-default-rtdb.firebaseio.com/tempinvoice.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({

          email,
          invoiceNumber,
          formattedDate,
          formattedTime,
          imgurl,
          userId,
          ammount,

        }),
      }
    );

  };
  const uploadFile = () => {
    if (imageUpload == null) return;
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("en-GB").replace(/\//g, "-"); // Format current date as dd/mm/yyyy
    const formattedTime = currentDate.toLocaleTimeString("en-US", { timeStyle: "short" }).replace(/:/g, "-"); // Format current time as hh-mm
    console.log("Current Time:", formattedTime);
    console.log("Current Date and Time:", currentDate);
    console.log("Current Date:", formattedDate);
    console.log(userId);
    const imageRef = ref(storage, `images/${email} ${invoiceNumber} ${formattedDate} ${formattedTime}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);

        // Call the PostData function after successful image upload
        // Update imgdetails state with correct values
        setImgDetails({
          email: email,
          invoiceNumber: invoiceNumber,
          formattedDate: formattedDate,
          formattedTime: formattedTime,
          imgurl: url,
          userId: userId,
          ammount: ammount,

        });
      });
    });
  };


  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    if (file.size > 1024 * 1024) {
      // Compress the image if its size is larger than 1MB
      try {
        const compressedFile = await imageCompression(file, options);
        const compressedImageDataUrl = await imageCompression.getDataUrlFromFile(
          compressedFile
        );
        setPreviewImage(compressedImageDataUrl);
        setImageUpload(compressedFile); // Update the imageUpload state with the compressed file
      } catch (error) {
        console.error("Error compressing image:", error);
      }
    } else {
      // Use the original image data URL if its size is smaller than 1MB
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
        setImageUpload(file); // Update the imageUpload state with the original file
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bill">
      <div class="container">
        <table>
          <tbody>
            <tr>
              <td><input
                type="file"
                onChange={handleFileChange} // Call the handleFileChange function on file input change
              />
              </td>
              <td>
                {previewImage && <img src={previewImage} alt="Preview" style={{ width: 300, height: 300 }} />} {/* Render the preview image */}

              </td>
              <td>
                <Space.Compact style={{ width: '100%' }}>
                  <label>Enter the Invoice NO:<Input value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} /><br />Enter the Dealer ID:<Input value={userId} onChange={(e) => setuserId(e.target.value)} />Enter the Amount:<Input value={ammount} onChange={(e) => setAmount(e.target.value)} /><Button type="primary" onClick={uploadFile}>Upload Image & Save </Button></label>


                </Space.Compact>
              </td>
              <td>
                <Space.Compact>
                  <label><Button type="primary" onClick={PostData}>Post</Button></label>
                </Space.Compact>
              </td>
            </tr>
          </tbody>
        </table>

      </div>

    </div>
  );
}

export default Bill; 