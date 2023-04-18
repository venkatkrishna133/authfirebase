import React, { useEffect, useState } from 'react';
import { getDownloadURL, ref, listAll } from 'firebase/storage';
import { storage } from '../firebase';

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
            <img src={data.url} alt={`Transaction ${index}`} />
            <p>Image Name: {data.name}</p> {/* Display the name of the image */}
          </div>
        ))
      ) : (
        <p>No images available</p>
      )}
    </div>
  );
};

export default Transactions;
