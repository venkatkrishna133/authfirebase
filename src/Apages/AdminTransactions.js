import React, { useEffect, useState } from 'react';
import { getDownloadURL, ref, listAll } from 'firebase/storage';
import { storage } from '../firebase';
import { Typography, Image } from 'antd';
import { Container, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";

import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs5';

const AdminTransactions = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const location = useLocation();
  const email = new URLSearchParams(location.search).get("email");
    // Fetch data and map to invoices
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await fetch(
            "https://loyalty-web-app-dbc8e-default-rtdb.firebaseio.com/invoices.json",
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
            const invoicesWithUniqueId = Object.keys(data).map(uniqueId => {
              return { ...data[uniqueId], uniqueId };
            });

            setImageUrls(invoicesWithUniqueId);
            
          } else {
            throw new Error("Failed to fetch invoices");
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }, [email]);


  useEffect(() => {
    $(document).ready(function () {
      if (imageUrls.length > 0) {
        $('#example').DataTable();
      }
    });
  }, [imageUrls]);

  return (
    <div className="table-responsive" style={{marginLeft:20, marginTop:20, width:'85%'}} >
      <table id="example" class="table table-striped table-hover">
        <thead>
          <tr>
            <th>Invoice Details</th>
            <th>Invoice Image</th>
          </tr>
        </thead><br />
        <tbody>
          {imageUrls.map((data, index) => (
            <tr key={index}>
              <td>
                <p style={{ marginTop: 20 }}>
                <span style={{ fontWeight: 'bold' }}>Email:</span>{data.email}<br/>
                <span style={{ fontWeight: 'bold' }}>UserID:</span>{data.userId}<br/>
                <span style={{ fontWeight: 'bold' }}>InvoiceNumber:</span>{data.invoiceNumber}<br/>
                <span style={{ fontWeight: 'bold' }}>Date:</span>{data.formattedDate}<br/>
                <span style={{ fontWeight: 'bold' }}>Time:</span>{data.formattedTime}<br/>
                <span style={{ fontWeight: 'bold' }}>Amount:</span>{data.ammount}<br/>
                <span style={{ fontWeight: 'bold' }}>Reward:</span>{data.reward}<br/>
                </p>
              </td>
              
              
              
              <td>
                <Image src={data.imgurl} alt={`Invoice Image ${index}`} style={{ width: '100px', height: 'auto' }} />
              </td>
              
            </tr>
          ))}
          

          
        </tbody>
      </table>
    </div>
  );
};

export default AdminTransactions;
