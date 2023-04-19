import React, { useEffect, useState } from 'react';
import { getDownloadURL, ref, listAll } from 'firebase/storage';
import { storage } from '../firebase';
import { Col, Row } from 'antd';

const Transactions = () => {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const listResult = await listAll(ref(storage, 'images')); // Fetch list of all files in 'images' folder
        const urls = await Promise.all(
          listResult.items.map(async (item) => {
            const url = await getDownloadURL(item);
            const name = item.name; // Fetch download URL for each file
            return { url, name };
          })
        );
        setImageUrls(urls);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };
    fetchImages();
  }, []);

  return (
    <div>
      <h1>Transactions</h1>
      {imageUrls.length > 0 ? (
        imageUrls.map((data, index) => (
          <div key={index}>
            <Row>
            <Col span={12}><p>Image Name: {data.name}</p> {/* Display the name of the image */}</Col>
              <Col span={12}><img src={data.url} alt={`Transaction ${index}`} style={{ width: "100px", height: "auto", borderRadius: "5px" }} /></Col>
              
            </Row>


          </div>
        ))
      ) : (
        <p>No images available</p>
      )}
    </div>
  );
};

export default Transactions;
