import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const EditProfile = () => {
  const navigate = useNavigate();
  const [userform, setuserform] = useState([]);

  const location = useLocation();
  const email = new URLSearchParams(location.search).get("email");
  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  const [details, setDetails] = useState({
    uId: "",
    uName: "",
    uaccCode: "",
    uaddr1: "",
    uaddr2: "",
    pinCode: "",
    ucity: "",
    uState: "",
    uCountry: "",
    uPhonenum: "",
    uAlnum: "",
    uemail: "",
    uL1emp: "",
    uL2emp: "",
    uGstinNum: "",
    uTypeofBussiness: "",
    uOwnerName: "",
  });

  // ...
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
          const userformWithUniqueId = Object.keys(data).map((uniqueId) => {
            return { ...data[uniqueId], uniqueId };
          });

          setuserform(Object.values(userformWithUniqueId));

          // Filter userform array to check if email exists
          const filteredUserForm = userformWithUniqueId.filter(
            (user) => user.uemail === email
          );
          console.log("u", filteredUserForm); // filtered array with matching email
        } else {
          throw new Error("Failed to fetch invoices");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  // ...
  const filteredUserForm = userform.filter(
    (form) => form.uemail.toLowerCase() === email.toLowerCase()
  );

  const handleSubmit = async (e, uniqueId) => {
    e.preventDefault();
    if (filteredUserForm.length > 0) {
      const upData = {
        ...details,
        uId: e.target.uId.value,
        uName: e.target.uName.value,
        uaccCode: e.target.uaccCode.value,
        uaddr1: e.target.uaddr1.value,
        uaddr2: e.target.uaddr2.value,
        pinCode: e.target.pinCode.value,
        ucity: e.target.ucity.value,
        uState: e.target.uState.value,
        uCountry: e.target.uCountry.value,
        uPhonenum: e.target.uPhonenum.value,
        uAlnum: e.target.uAlnum.value,
        uemail: e.target.uemail.value,
        uL1emp: e.target.uL1emp.value,
        uL2emp: e.target.uL2emp.value,
        uGstinNum: e.target.uGstinNum.value,
        uTypeofBussiness: e.target.uTypeofBussiness.value,
        uOwnerName: e.target.uOwnerName.value,

        // add all other fields from your form here
      };

      console.log("uniqueID", uniqueId);
      // Update profile data to the backend
      try {
        const response = await fetch(
          `https://loyalty-web-app-dbc8e-default-rtdb.firebaseio.com/userform/${uniqueId}.json`, // Update the URL to include the uId in the path
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(upData),
          }
        );
        if (response.ok) {
          // Handle success
          console.log("Profile data updated successfully!");
          alert("Profile data updated successfully!");
          navigate(`/editProfile?email=${email}`);
        } else {
          // Handle error
          console.error("Failed to update profile data");
        }
      } catch (error) {
        console.error("Failed to update profile data", error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  return (
    <div className="form" style={{ width: "90vw", height: "95vh" , color: 'white', fontSize: 18}}>
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: 5,
          marginTop: 40
        }}
      >
        <div>
          {/* <h3 className="position-relative">
                        Edit Details Form
                        <span
                            class="position-absolute bottom-0 start-0 bg-primary"
                            style={{ height: "3px", width: "100px" }}
                        ></span>
                    </h3> */}
          <Form style={{ backgroundColor:'#A580FF', borderRadius: 10, height: 569, width: 1190, borderStyle:'revert'}} 
            className="form-userreg"
            onSubmit={(e) =>
              filteredUserForm.length > 0 &&
              handleSubmit(e, filteredUserForm[0].uniqueId)
            }
            
          >
            <br></br><br></br><br>
            </br>
     
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <label style={{ marginLeft: 83,fontWeight: 'bold'}} htmlFor="user_id">USER ID :</label><span>
                  <div style={{ marginTop: -26, marginLeft: 245 }} className="align">
                  
                    {details.uId ||
                      (filteredUserForm.length > 0
                        ? filteredUserForm[0].uId
                        : "")}
                
                  </div>
                  </span>
                </Form.Group>
              </Col>
              <Col style={{marginLeft: 130 }} className="col">
                <Form.Group className="mb-3">
                  <label style={{ fontWeight: 'bold'}} htmlFor="user_name">USERNAME : </label>
                  <span>
                  <div style={{ marginTop: -27, marginLeft: 202 }} className="align">
                    {details.uName ||
                      (filteredUserForm.length > 0
                        ? filteredUserForm[0].uName
                        : "")}
                  </div>
                  </span>
                </Form.Group>
              </Col>
            </Row>

            <Row style={{marginTop: 10  }}>
              <Col>
              <Form.Group className="mb-3">
                  <label style={{ marginLeft: 83,fontWeight: 'bold'}} htmlFor="alt_num">EMAIL : </label>
                  <span>
                  <div style={{ marginTop: -26, marginLeft: 245 }} className="align">
                    {details.uemail ||
                      (filteredUserForm.length > 0
                        ? filteredUserForm[0].uemail
                        : "")}
                        </div>
                  </span>
                </Form.Group>
              </Col>
              <Col style={{ marginLeft: 130 }}>
              <Form.Group className="mb-3">
                  <label style={{ fontWeight: 'bold'}} htmlFor="acc_code">ACCOUNT CODE : </label>
                  <span>
                  <div style={{ marginTop: -27, marginLeft: 202 }} className="align">
                    {details.uaccCode ||
                      (filteredUserForm.length > 0
                        ? filteredUserForm[0].uaccCode
                        : "")}
                        </div>
                  </span>
                </Form.Group>
              </Col>
            </Row>
            

            <Row style={{marginTop: 10  }}>
              <Col>
              <Form.Group className="mb-3">
                  <label style={{ marginLeft: 83,fontWeight: 'bold'}} htmlFor="add1">ADDRESS LINE 1 : </label>
                  <span>
                  <div style={{ marginTop: -26, marginLeft: 245 }} className="align">
                    {details.uaddr1 ||
                      (filteredUserForm.length > 0
                        ? filteredUserForm[0].uaddr1
                        : "")}
                        </div>
                  </span>
                </Form.Group>
              </Col>
              <Col style={{marginLeft: 130 }}>
              <Form.Group className="mb-3">
                  <label style={{ fontWeight: 'bold'}} htmlFor="add2">ADDRESS LINE 2 : </label>
                  <span>
                  <div style={{ marginTop: -27, marginLeft: 202 }} className="align">
                    {details.uaddr2 ||
                      (filteredUserForm.length > 0
                        ? filteredUserForm[0].uaddr2
                        : "")}
                      </div>
                  </span>
                </Form.Group>
              </Col>
            </Row>
            
            
            <Row style={{marginTop: 10  }}>
              <Col>
              <Form.Group className="mb-3">
                  <label style={{ marginLeft: 83,fontWeight: 'bold'}} htmlFor="pin_code">PIN CODE : </label>
                  <span>
                  <div style={{ marginTop: -26, marginLeft: 245 }} className="align">
                    {details.pinCode ||
                      (filteredUserForm.length > 0
                        ? filteredUserForm[0].pinCode
                        : "")}
                      </div>
                  </span>
                </Form.Group>
              </Col>
              <Col style={{ marginLeft: 130 }}>
              <Form.Group className="mb-3">
                  <label style={{ fontWeight: 'bold'}} htmlFor="city">CITY : </label>
                  <span>
                  <div style={{ marginTop: -27, marginLeft: 202 }} className="align">
                    {details.ucity ||
                      (filteredUserForm.length > 0
                        ? filteredUserForm[0].ucity
                        : "")}
                  </div>
                  </span>
                </Form.Group>
              </Col>
            </Row>
      
                        
            <Row style={{marginTop: 10  }}>
              <Col>
              <Form.Group className="mb-3">
                  <label style={{ marginLeft: 83,fontWeight: 'bold'}} htmlFor="state">STATE : </label>
                  <span>
                  <div style={{ marginTop: -26, marginLeft: 245 }} className="align">
                    {details.uState ||
                      (filteredUserForm.length > 0
                        ? filteredUserForm[0].uState
                        : "")}
                    </div>
                  </span>
                </Form.Group>
              </Col>
              <Col  style={{marginLeft: 130 }}>
              <Form.Group className="mb-3">
                  <label style={{ fontWeight: 'bold'}} htmlFor="country">COUNTRY : </label>
                  <span>
                  <div style={{ marginTop: -27, marginLeft: 202 }} className="align">
                    {details.uCountry ||
                      (filteredUserForm.length > 0
                        ? filteredUserForm[0].uCountry
                        : "")}
                  </div>
                  </span>
                </Form.Group>
              </Col>
            </Row>

            <Row style={{marginTop: 10  }}>
              <Col>
              <Form.Group className="mb-3">
                  <label style={{ marginLeft: 83,fontWeight: 'bold'}} htmlFor="phnum">PHONE NUMBER : </label>
                  <span>
                  <div style={{ marginTop: -26, marginLeft: 245 }} className="align">
                    {details.uPhonenum ||
                      (filteredUserForm.length > 0
                        ? filteredUserForm[0].uPhonenum
                        : "")}
                      </div>
                  </span>
                </Form.Group>
              </Col>
              <Col style={{ marginLeft: 130 }}>
              <Form.Group className="mb-3">
                  <label style={{ fontWeight: 'bold'}} htmlFor="alt_num">ALTERNATE NUMBER : </label>
                  <span>
                  <div style={{ marginTop: -27, marginLeft: 202 }} className="align">
                    {details.uAlnum ||
                      (filteredUserForm.length > 0
                        ? filteredUserForm[0].uAlnum
                        : "")}
                      </div>
                  </span>
                </Form.Group>
              </Col>
            </Row>
            
            <Row style={{marginTop: 10  }}>
              <Col>
              <Form.Group className="mb-3">
                  <label style={{ marginLeft: 83,fontWeight: 'bold'}} htmlFor="user_id">L1 EMPLOYEE : </label>
                  <span>
                  <div style={{ marginTop: -26, marginLeft: 245 }} className="align">
                    {details.uL1emp ||
                      (filteredUserForm.length > 0
                        ? filteredUserForm[0].uL1emp
                        : "")}
                        </div>
                  </span>
                </Form.Group>
              </Col>
              <Col style={{ marginLeft: 130 }}>
              <Form.Group className="mb-3">
                  <label style={{ fontWeight: 'bold'}} htmlFor="user_id">L2 EMPLOYEE : </label>
                  <span>
                  <div style={{ marginTop: -27, marginLeft: 202 }} className="align">
                    {details.uL2emp ||
                      (filteredUserForm.length > 0
                        ? filteredUserForm[0].uL2emp
                        : "")}
                        </div>
                  </span>
                </Form.Group>
              </Col>
            </Row>

            <Row style={{marginTop: 10  }}>
              <Col>
              <Form.Group className="mb-3">
                  <label style={{ marginLeft: 83,fontWeight: 'bold'}} htmlFor="user_id">OWNER NAME : </label>
                  <span>
                  <div style={{ marginTop: -26, marginLeft: 245 }} className="align">
                    {details.uOwnerName ||
                      (filteredUserForm.length > 0
                        ? filteredUserForm[0].uOwnerName
                        : "")}
                      </div>
                  </span>
                </Form.Group>
              </Col>
              <Col  style={{ marginLeft: 130 }}>
              <Form.Group className="mb-3">
                  <label style={{ fontWeight: 'bold'}} htmlFor="user_id">TYPE OF BUSINESS : </label>
                  <span>
                  <div style={{ marginTop: -27, marginLeft: 202 }} className="align">
                    {details.uTypeofBussiness ||
                      (filteredUserForm.length > 0
                        ? filteredUserForm[0].uTypeofBussiness
                        : "")}
                        </div>
                  </span>
                </Form.Group>
              </Col>
            </Row>
          
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;