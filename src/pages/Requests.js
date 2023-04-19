import React, { useState, useEffect } from "react";

function Requests() {
  const [invoices, setInvoices] = useState([]);

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
          setInvoices(Object.values(data));
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
    <div className="Requests">
      <h1>Requests</h1>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Invoice Number</th>
            <th>Date</th>
            <th>Time</th>
            <th>Image</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.invoiceNumber}>
              <td>{invoice.email}</td>
              <td>{invoice.invoiceNumber}</td>
              <td>{invoice.formattedDate}</td>
              <td>{invoice.formattedTime}</td>
              <img src={invoice.imgurl} alt="Invoice" width="50" height="50" />
              <td>{invoice.ammount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Requests;
