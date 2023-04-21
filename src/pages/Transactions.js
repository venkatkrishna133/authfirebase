import React, { useEffect, useState } from 'react';
import { getDownloadURL, ref, listAll } from 'firebase/storage';
import { storage } from '../firebase';
import { Typography, Image } from 'antd';
import { Container, Row, Col } from "react-bootstrap";
import "./Transactions.css";
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs5';

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

  useEffect(() => {
    $(document).ready(function () {
      if (imageUrls.length > 0) {
        $('#example').DataTable();
      }
    });
  }, [imageUrls]);

  return (
    <div>
      <table id="example" class="table table-striped">
        <thead>
          <tr>
            <th>Invoice Details</th>
            <th>Invoice Image</th>
          </tr>
        </thead><br />
        <tbody>
          {imageUrls.length > 0 ? (
            imageUrls.map((data, index) => (
              <tr key={index}>
                <td>
                  <p style={{ marginTop: 20 }}>
                  <span style={{ fontWeight: 'bold' }}>Email:</span> {data.name.split(' ')[0]} <br />
                  <span style={{ fontWeight: 'bold' }}>Invoicenumber:</span>  {data.name.split(' ')[1]} <br />
                  <span style={{ fontWeight: 'bold' }}>Date:</span>  {data.name.split(' ')[2]} <br />
                  <span style={{ fontWeight: 'bold' }}>Time:</span>  {data.name.split(' ')[3].replace('-', ':')} {data.name.split(' ')[4] === 'AM' ? 'AM' : 'PM'}
                  </p>

                  {/* Display the name of the image */}
                </td>

                <td>
                  <Image
                    src={data.url}
                    alt={`Transaction ${index}`}
                    style={{ width: '300px', height: 'auto', borderRadius: '5px', marginTop: 20 }}
                  />
                </td>
              </tr>
            ))
          ) : (
            <p>No images available</p>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
