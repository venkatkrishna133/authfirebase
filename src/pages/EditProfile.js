import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import GoogleButton from "react-google-button";

const EditProfile = () => {
    const navigate = useNavigate();
    const [userform, setuserform] = useState([]);

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
        uemail: "",
        uL1emp: "",
        uL2emp: "",
        uGstinNum: "",
        uTypeofBussiness: "",
        uOwnerName: ""
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
                    const userformWithUniqueId = Object.keys(data).map(uniqueId => {
                        return { ...data[uniqueId], uniqueId };
                    });

                    setuserform(Object.values(userformWithUniqueId));

                    // Filter userform array to check if email exists
                    const filteredUserForm = userformWithUniqueId.filter(user => user.uemail === email);
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
    const filteredUserForm = userform.filter(form => form.uemail.toLowerCase() === email.toLowerCase());

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
        <div className="form" style={{ width: '90vw', height: '95vh' }}>

            <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: 20, marginTop: 20 }}>
                <div>
                    <h3 className="position-relative">
                        Edit Details Form
                        <span
                            class="position-absolute bottom-0 start-0 bg-primary"
                            style={{ height: "3px", width: "100px" }}
                        ></span>
                    </h3>
                    <Form className="form-userreg" onSubmit={(e) => filteredUserForm.length > 0 && handleSubmit(e, filteredUserForm[0].uniqueId)}>
                        <div className="row">
                            <div className="col-md-4">
                                <Form.Group className="mb-3">
                                    <label htmlFor="user_id">User Id : </label>
                                    <Form.Control

                                        type="text"
                                        placeholder="Uid.*"
                                        name="uId"
                                        value={details.uId || (filteredUserForm.length > 0
                                            ? filteredUserForm[0].uId
                                            : "")}
                                        onChange={(e) =>
                                            setDetails({ ...details, uId: e.target.value })
                                        }
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-md-4">
                                <Form.Group className="mb-3">
                                    <label htmlFor="user_name">User Name : </label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Name.*"
                                        name="uName"
                                        value={details.uName || (filteredUserForm.length > 0
                                            ? filteredUserForm[0].uName
                                            : "")}
                                        onChange={(e) =>
                                            setDetails({ ...details, uName: e.target.value })
                                        }
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-md-4">
                                <Form.Group className="mb-3">
                                    <label htmlFor="acc_code">Account Code : </label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Account Code "
                                        name="uaccCode"
                                        value={details.uaccCode || (filteredUserForm.length > 0
                                            ? filteredUserForm[0].uaccCode
                                            : "")}
                                        onChange={(e) =>
                                            setDetails({ ...details, uaccCode: e.target.value })
                                        }
                                    />
                                </Form.Group>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <label htmlFor="add1">Address Line 1 : </label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Address Line 1.*"
                                        name="uaddr1"
                                        value={details.uaddr1 || (filteredUserForm.length > 0
                                            ? filteredUserForm[0].uaddr1
                                            : "")}
                                        onChange={(e) =>
                                            setDetails({ ...details, uaddr1: e.target.value })
                                        }
                                    />
                                </Form.Group>
                            </div>

                            <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <label htmlFor="add2">Address Line 2 : </label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Address Line 2.*"
                                        name="uaddr2"
                                        value={details.uaddr2 || (filteredUserForm.length > 0
                                            ? filteredUserForm[0].uaddr2
                                            : "")}
                                        onChange={(e) =>
                                            setDetails({ ...details, uaddr2: e.target.value })
                                        }
                                    />
                                </Form.Group>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-3">
                                <Form.Group className="mb-3">
                                    <label htmlFor="pin_code">Pin Code : </label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Pin Code.*"
                                        name="pinCode"
                                        value={details.pinCode || (filteredUserForm.length > 0
                                            ? filteredUserForm[0].pinCode
                                            : "")}
                                        onChange={(e) =>
                                            setDetails({ ...details, pinCode: e.target.value })
                                        }
                                    />
                                </Form.Group>
                            </div>

                            <div className="col-md-3">
                                <Form.Group className="mb-3">
                                    <label htmlFor="city">City : </label>
                                    <Form.Control
                                        type="text"
                                        placeholder="City.*"
                                        name="ucity"
                                        value={details.ucity || (filteredUserForm.length > 0
                                            ? filteredUserForm[0].ucity
                                            : "")}
                                        onChange={(e) =>
                                            setDetails({ ...details, ucity: e.target.value })
                                        }
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-md-3">
                                <Form.Group className="mb-3">
                                    <label htmlFor="state">State : </label>
                                    <select
                                        name="uState"
                                        value={details.uState || (filteredUserForm.length > 0 ? filteredUserForm[0].uState : "")}
                                        onChange={(e) => setDetails({ ...details, uState: e.target.value })}
                                    >
                                        <option value="">Please select a state</option>
                                        {states.map((state) => (
                                            <option key={state} value={state}>
                                                {state}
                                            </option>
                                        ))}
                                    </select>
                                </Form.Group>

                            </div>
                            <div className="col-md-3">
                                <Form.Group className="mb-3">
                                    <label htmlFor="country">Country : </label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Country.*"
                                        name="uCountry"
                                        value={details.uCountry || (filteredUserForm.length > 0
                                            ? filteredUserForm[0].uCountry
                                            : "")}
                                        onChange={(e) =>
                                            setDetails({ ...details, uCountry: e.target.value })
                                        }
                                    />
                                </Form.Group>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-4">
                                <Form.Group className="mb-3">
                                    <label htmlFor="phnum">Phone Number : </label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Phone Number.*"
                                        name="uPhonenum"
                                        value={details.uPhonenum || (filteredUserForm.length > 0
                                            ? filteredUserForm[0].uPhonenum
                                            : "")}
                                        onChange={(e) =>
                                            setDetails({ ...details, uPhonenum: e.target.value })
                                        }
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-md-4">
                                <Form.Group className="mb-3">
                                    <label htmlFor="alt_num">Alternate Number : </label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Alternate Number.*"
                                        name="uAlnum"
                                        value={details.uAlnum || (filteredUserForm.length > 0
                                            ? filteredUserForm[0].uAlnum
                                            : "")}
                                        onChange={(e) =>
                                            setDetails({ ...details, uAlnum: e.target.value })
                                        }
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-md-4">
                                <Form.Group className="mb-3">
                                    <label htmlFor="alt_num">Email: </label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Email.*"
                                        name="uemail"
                                        value={details.uemail || (filteredUserForm.length > 0
                                            ? filteredUserForm[0].uemail
                                            : "")}
                                        onChange={handleSubmit}
                                    />
                                </Form.Group>
                            </div>


                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <label htmlFor="user_id">L1 Employee : </label>
                                    <Form.Control
                                        type="text"
                                        placeholder="L1 Employee.*"
                                        name="uL1emp"
                                        value={details.uL1emp || (filteredUserForm.length > 0
                                            ? filteredUserForm[0].uL1emp
                                            : "")}
                                        onChange={(e) =>
                                            setDetails({ ...details, uL1emp: e.target.value })
                                        }
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <label htmlFor="user_id">L2 Employee : </label>
                                    <Form.Control
                                        type="text"
                                        placeholder="L2 Employee.*"
                                        name="uL2emp"
                                        value={details.uL2emp || (filteredUserForm.length > 0
                                            ? filteredUserForm[0].uL2emp
                                            : "")}
                                        onChange={(e) =>
                                            setDetails({ ...details, uL2emp: e.target.value })
                                        }
                                    />
                                </Form.Group>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-4">
                                <Form.Group className="mb-3">
                                    <label htmlFor="user_id">GSTIN Number : </label>
                                    <Form.Control
                                        type="text"
                                        placeholder="GSTIN Number.*"
                                        name="uGstinNum"
                                        value={details.uGstinNum || (filteredUserForm.length > 0
                                            ? filteredUserForm[0].uGstinNum
                                            : "")}
                                        onChange={(e) =>
                                            setDetails({ ...details, uGstinNum: e.target.value })
                                        }
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-md-4">
                                <Form.Group className="mb-3">
                                    <label htmlFor="user_id">Type of Business : </label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Type of Business"
                                        name="uTypeofBussiness"
                                        value={details.uTypeofBussiness || (filteredUserForm.length > 0
                                            ? filteredUserForm[0].uTypeofBussiness
                                            : "")}
                                        onChange={(e) =>
                                            setDetails({ ...details, uTypeofBussiness: e.target.value })
                                        }
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-md-4">
                                <Form.Group className="mb-3">
                                    <label htmlFor="user_id">Owner Name : </label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Owner Name"
                                        name="uOwnerName"
                                        value={details.uOwnerName || (filteredUserForm.length > 0
                                            ? filteredUserForm[0].uOwnerName
                                            : "")}
                                        onChange={(e) =>
                                            setDetails({ ...details, uOwnerName: e.target.value })
                                        }
                                    />
                                </Form.Group>
                            </div>
                        </div>
                        <Button type="submit">Update Profile</Button>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
