import React, { useState, useEffect } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { useLocation } from "react-router-dom";
import { storage } from "../firebase";


import { Space, Button, Input, Image, Checkbox } from "antd";
import imageCompression from "browser-image-compression"; // Import the image-compression library

function Bill() {
  const [imageUpload, setImageUpload] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [userId, setuserId] = useState("");
  const [rewards, setRewards] = useState();

  const [isLoaded, setIsLoaded] = useState(false);
  const [ammount, setAmount] = useState("");
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [selectedReward, setSelectedReward] = useState("");
  const items = selectedReward.split("-")[0] // Log the items value
  const percent = selectedReward.split("-")[1]
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
    console.log("Checking2.0", e.items, e.percent);

    const {
      email,
      invoiceNumber,
      formattedDate,
      formattedTime,
      imgurl,
      userId,
      ammount,
      items,
      percent, } = imgdetails;
    // Check if checkbox is checked
    if (!checkboxChecked) {
      // Show alert message if checkbox is not checked
      alert("Please check the Checkbox before submitting data!");
      return;
    }

    // Check if fields are empty
    if (!invoiceNumber || !userId || !ammount) {
      // Show warning message if any field is empty
      alert("Please fill in all the fields!");
      return;
    }

    alert("uploaded successfully");

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
          items,
          percent,

        }),
      }
    );

  };
  const handleCheckboxChange = (e) => {
    // Check if fields are empty
    if (!invoiceNumber || !userId || !ammount) {
      // Do not check the checkbox
      setCheckboxChecked(false);
      // Show warning message if any field is empty
      
      return;
    }
    // Check the checkbox
    setCheckboxChecked(e.target.checked);
  };
  
  const uploadFile = () => {

      // Check if fields are empty
      if (!invoiceNumber || !userId || !ammount) {
        // Show warning message if any field is empty
        alert("Please fill in all the fields!");
        return;
      }

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
          items,
          percent,


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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://loyalty-web-app-dbc8e-default-rtdb.firebaseio.com/rewards.json",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (res.ok) {
          const data = await res.json();
          // Map the data to include uniqueId for each invoice
          const userformWithUniqueId = Object.keys(data).map(uniqueId => {
            return { ...data[uniqueId], uniqueId };
          });

          setRewards(Object.values(userformWithUniqueId));
          setIsLoaded(true);



        } else {
          throw new Error("Failed to fetch invoices");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

  }, []);

  return (
    <div className="bill" style={{ marginLeft: 20, marginTop: 20 }}>
      {isLoaded ? (
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
                  {previewImage && <Image src={previewImage} alt="Preview" style={{ width: 300, height: 300 }} />} {/* Render the preview image */}

                </td>
                <td>
                  <Space.Compact style={{ width: '100%' }}>
                    <label>Enter the Invoice NO:
                      <Input value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} />
                      <br />Enter the Dealer ID:
                      <Input value={userId} onChange={(e) => setuserId(e.target.value)} />
                      Enter the Amount:<Input value={ammount} onChange={(e) => setAmount(e.target.value)} />
                      {rewards.length > 0 && (
                        <select value={selectedReward} onChange={(e) => setSelectedReward(e.target.value)}>
                          <option value="">Select Reward</option>
                          {rewards.map((reward) => (
                            <option key={reward.uniqueId} value={`${reward.items}-${reward.percent}`}>{reward.items} - {reward.percent}%</option>
                          ))}
                        </select>
                      )}
                      <Checkbox onChange={(e) => { handleCheckboxChange(e); uploadFile(); }}>Checkbox</Checkbox>

                      <Button type="primary" onClick={(e) => { PostData(e); }}>Upload Image & Save</Button>
                    </label>


                  </Space.Compact>
                </td>
                {/* <td>
                <Space.Compact>
                  <label><Button type="primary" onClick={}>Post</Button></label>
                </Space.Compact>
              </td> */}
              </tr>
            </tbody>
          </table>

        </div>
      ) : (
        <div>Loading...</div>
      )}

    </div>
  );
}

export default Bill; 