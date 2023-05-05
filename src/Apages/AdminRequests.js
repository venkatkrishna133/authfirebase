import React, { useState, useEffect } from "react";
import { Image, Button } from 'antd';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs5';
import {
  ref, deleteObject,
} from "firebase/storage";
import { storage } from "../firebase";
import { useLocation } from "react-router-dom";

function Requests() {
  const [invoices, setInvoices] = useState([]);
  // Define tempInvoices and setTempInvoices using useState hook
  const [tempInvoice, setTempInvoice] = useState([]);
  const location = useLocation();
  const email = new URLSearchParams(location.search).get("email").trim();


  // Fetch data and map to invoices
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://loyalty-web-app-dbc8e-default-rtdb.firebaseio.com/tempinvoice.json",
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
          setInvoices(Object.values(invoicesWithUniqueId));
          setTempInvoice(Object.values(invoicesWithUniqueId));
          console.log(invoicesWithUniqueId);
        } else {
          throw new Error("Failed to fetch invoices");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    $(document).ready(function () {
      if (invoices.length > 0) {
        $('#example').DataTable();
      }
    });
  }, [invoices]);

  const handleDecline = (invoiceData) => {
    // Access individual values from invoiceData object
    const { email, invoiceNumber, price, date, time } = invoiceData;
    // Perform necessary actions with the invoice data
    console.log("Declined Invoice Data:", invoiceData);
  };

  // Handler for confirm button
  const handleConfirm = async (invoiceData) => {
    // Access individual values from invoiceData object
    const { email,
      invoiceNumber,
      formattedDate,
      formattedTime,
      imgurl,
      userId,
      ammount,
      items,
      percent,} = invoiceData;

    // Calculate reward
    const percentage =(percent / 100);
    console.log(percentage);
    const reward = percentage*ammount ;
    console.log(reward);

    // Create rewardData object to send in POST request
    const rewardData = {
      email,
      invoiceNumber,
      formattedDate,
      formattedTime,
      imgurl,
      userId,
      ammount,
      items,
      
      reward,

    };

    try {
      // Make POST request to Firebase
      const res = await fetch('https://loyalty-web-app-dbc8e-default-rtdb.firebaseio.com/invoices.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(rewardData)
      });

      if (res.ok) {
        // Update the invoices state with the new data
        setInvoices(invoices.map(invoice => invoice.invoiceNumber === invoiceData.invoiceNumber ? { ...invoice, rewarded: true } : invoice));
        console.log('Reward added successfully', rewardData);
      } else {
        console.error('Failed to add reward');
      }
      window.location.reload(); 
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }

  };

  // Handler for delete button
  const handleDelete = async (uniqueId) => {
    try {
      console.log('tempInvoice:', tempInvoice);
      console.log('uniqueId:', uniqueId);

      // Find the index of the invoice to delete in tempInvoices
      const index = tempInvoice.findIndex(invoice => invoice.uniqueId === uniqueId);

      console.log(index);
      console.log(uniqueId);

      if (index !== -1) {
        // Make DELETE request to Firebase or any other backend service
        // You can use fetch or any other HTTP library for making DELETE request
        await fetch(`https://loyalty-web-app-dbc8e-default-rtdb.firebaseio.com/tempinvoice/${uniqueId}.json`, {
          method: 'DELETE'
        });

        // Remove the deleted invoice from tempInvoices state
        setTempInvoice(tempInvoice.filter(invoice => invoice.uniqueId !== uniqueId));
        console.log('Invoice deleted successfully', uniqueId);
        
      } else {
        console.error('Invoice not found in tempInvoice');
      }
      window.location.reload(); 
    } catch (error) {
      console.error('Failed to delete invoice:', error);
    }
  };

  // Function to delete an image from Firebase Storage
  const deleteImage = (imgurl) => {
    const imageRef = ref(storage, `${imgurl}`);
    console.log(imageRef);
    deleteObject(imageRef)
      .then(() => {
        // Handle successful deletion
        console.log("Image deleted successfully:", imgurl);
      })
      .catch((error) => {
        // Handle deletion error
        console.error("Failed to delete image:", error);
      });
  };

  const filteredInvoices = invoices.filter(invoice => Object.is(email, invoice.userId));

  console.log(filteredInvoices.length);

  return (

    <div  style={{marginLeft:20, marginTop:20}}>
    {filteredInvoices.length > 0 ? (
      <table id="example" class="table table-striped table-hover" >
        <thead>
          <tr>
            <th>Email</th>
            <th>Invoice Number</th>
            <th>Date</th>
            <th>Time</th>
            <th>Image</th>
            <th>Amount</th>
            <th>Decline</th>
            <th>Confirm</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => {
            
              return (
                <tr key={invoice.invoiceNumber}>
                  <td>{invoice.email}</td>
                  <td>{invoice.invoiceNumber}</td>
                  <td>{invoice.formattedDate}</td>
                  <td>{invoice.formattedTime}</td>
                  <td><Image src={invoice.imgurl} alt="Invoice" width={300} /></td>
                  <td>{invoice.ammount}</td>
                  <td><Button type="primary" onClick={() => { handleDelete(invoice.uniqueId); deleteImage(invoice.imgurl); }}>Decline</Button></td>
                  <td><Button type="primary" onClick={() => { handleConfirm(invoice); handleDelete(invoice.uniqueId); }}>Confirm</Button></td>
                </tr>
              );
            
          })}
        </tbody>
      </table>
    ) : (
      <div>
        <h6 style={{ textAlign: 'center' }}>
          No Requests available
        </h6>
      </div>
    )}
  </div>

  );
}

export default Requests;
