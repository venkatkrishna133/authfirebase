import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Check = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = new URLSearchParams(location.search).get("email").trim();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://loyalty-web-app-dbc8e-default-rtdb.firebaseio.com/userform.json",
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
  
          // Filter userform array to check if email exists
          const filteredUserForm = userformWithUniqueId.filter(user => user.uemail === email);
          if (filteredUserForm.length > 0) {
        
            navigate(`/adminDashboard?email=${email}`);
          } else {
            navigate(`/details?email=${email}`);
          }
  
        } else {
          throw new Error("Failed to fetch invoices");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [navigate, email]);
  

  return isLoading ? <div>Loading...</div> : null;
};


export default Check;
