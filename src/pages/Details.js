import React from "react";
import { useState } from "react";
import { useNavigate ,useLocation} from "react-router-dom";
// import "./Details.css";
import { Form, Alert, Stack } from "react-bootstrap";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";

const Details = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = new URLSearchParams(location.search).get("email");
  const states = ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'];


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
    uemail: email,
    uL1emp: "",
    uL2emp: "",
    uGstinNum: "",
    uTypeofBussiness: "",
    uOwnerName: "",

  });

  const PostData = async (e) => {
    e.preventDefault();

    
    const { uId, uName, uaccCode, uaddr1, uaddr2, pinCode, ucity, uState, uCountry, uPhonenum, uAlnum, uemail, uL1emp, uL2emp, uGstinNum, uTypeofBussiness, uOwnerName } = details;

    const res = await fetch(
      "https://loyalty-web-app-dbc8e-default-rtdb.firebaseio.com/userform.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uId,
          uName,
          uaccCode,
          uaccCode,
          uaddr1,
          uaddr2,
          uaddr1,
          pinCode,
          ucity,
          uState,
          uCountry,
          uPhonenum,
          uAlnum,
          uemail:email,
          uL1emp,
          uL2emp,
          uGstinNum,
          uTypeofBussiness,
          uOwnerName,

        }),
      }

    );
    navigate(`/dashboard?email=${email}`);
  };

  return (
    <div className="form">
      <div className="container" >
        <div>
          <h3 className="position-relative">
            Detials Form
            <span
              class="position-absolute bottom-0 start-0 bg-primary"
              style={{ height: "3px", width: "50px" }}
            ></span>
          </h3>
          <form className="form-userreg">
            <div className="row">
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="user_id">User Id</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    autoFocus onChange={(e) =>
                      setDetails({ ...details, uId: e.target.value })}
                  ></input>
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="user_name">User Name</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    autoFocus onChange={(e) =>
                      setDetails({ ...details, uName: e.target.value })}
                  ></input>
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="acc_code">Account Code</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    autoFocus onChange={(e) =>
                      setDetails({ ...details, uaccCode: e.target.value })}
                  ></input>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="add1">Address Line 1</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    autoFocus onChange={(e) =>
                      setDetails({ ...details, uaddr1: e.target.value })}
                  ></input>
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="add2">Address Line 2</label>
                  <input type="text" className="form-control" onChange={(e) =>
                    setDetails({ ...details, uaddr2: e.target.value })}></input>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-3">
                <div className="mb-3">
                  <label htmlFor="pin_code">Pin Code</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    autoFocus onChange={(e) =>
                      setDetails({ ...details, pinCode: e.target.value })}
                  ></input>
                </div>
              </div>

              <div className="col-md-3">
                <div className="mb-3">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    autoFocus onChange={(e) =>
                      setDetails({ ...details, ucity: e.target.value })}
                  ></input>
                </div>
              </div>
              <div className="col-md-3">
                <div className="mb-3">
                  <label htmlFor="state">State : </label>
                  <select
                    name="uState"

                    autoFocus onChange={(e) => setDetails({ ...details, uState: e.target.value })}
                  >
                    <option value="">Please select a state</option>
                    {states.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-3">
                <div className="mb-3">
                  <label htmlFor="country">Country</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    autoFocus onChange={(e) =>
                      setDetails({ ...details, uCountry: e.target.value })}
                  ></input>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="phnum">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    autoFocus onChange={(e) =>
                      setDetails({ ...details, uPhonenum: e.target.value })}
                  ></input>
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="alt_num">Alternate Number</label>
                  <input type="text" className="form-control" required onChange={(e) =>
                    setDetails({ ...details, uAlnum: e.target.value })}></input>
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="email_id">Email Id</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={email}
                    autoFocus onChange={(e) =>
                      setDetails({ ...details, uemail: e.target.value })}
                  ></input>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="user_id">L1 Employee</label>
                  <input type="text" className="form-control" required onChange={(e) =>
                    setDetails({ ...details, uL1emp: e.target.value })}></input>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="user_id">L2 Employee</label>
                  <input type="text" className="form-control" required onChange={(e) =>
                    setDetails({ ...details, uL2emp: e.target.value })}></input>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="user_id">GSTIN Number</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    autoFocus onChange={(e) =>
                      setDetails({ ...details, uGstinNum: e.target.value })}
                  ></input>
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="user_id">Type of Business</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    autoFocus onChange={(e) =>
                      setDetails({ ...details, uTypeofBussiness: e.target.value })}
                  ></input>
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="user_id">Owner Name</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    autoFocus onChange={(e) =>
                      setDetails({ ...details, uOwnerName: e.target.value })}
                  ></input>
                </div>
              </div>
            </div>

            <div className="row btnbot">
              <div
                className="col-md-13"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                }}
              >
                <div className="mb-3">
                  <button type="save" className="btn btn-success" onClick={PostData}>
                    Save & Next
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Details;
