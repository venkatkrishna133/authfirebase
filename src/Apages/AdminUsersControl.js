import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs5';
import { Image, Button } from 'antd';

const AdminUsersControl = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const location = useLocation();
    const [admins, setAdmins] = useState([]);
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
                    setUsers(userformWithUniqueId);


                } else {
                    throw new Error("Failed to fetch Users");
                }
            } catch (error) {
                console.error(error);
            }

        };
        fetchData();
    }, [email]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(
                    "https://loyalty-web-app-dbc8e-default-rtdb.firebaseio.com/adminform.json",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (res.ok) {
                    const data = await res.json();
                    // Map the data to include uniqueId for each admin
                    const userformWithUniqueId = Object.keys(data).map(uniqueId => {
                        return { ...data[uniqueId], uniqueId };
                    });

                    setAdmins(userformWithUniqueId);
                    


                } else {
                    throw new Error("Failed to fetch admins");
                }
            } catch (error) {
                console.error(error);
            }

        };
        fetchData();
    }, [email]);

    const handlepromote = async (uniqueId) => {
        console.log(uniqueId);

        try {

            // Check if the admin with uniqueId and email is present in adminsform
            const response = await fetch(`https://loyalty-web-app-dbc8e-default-rtdb.firebaseio.com/adminform.json`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            // Map the data to include uniqueId for each user
            const adminformWithUniqueId = Object.keys(data).map(auniqueId => {
                return { ...data[auniqueId], auniqueId };
            });

            const adminExisted = adminformWithUniqueId.find((admin) => admin.uniqueId === uniqueId);
            console.log(adminExisted);
            if(adminExisted){

                alert("The user is Alredy as Admin")
            }else {


            const user = users.find((user) => user.uniqueId === uniqueId);
            console.log("Hen", user);
            if (!user) {
                console.error("User not found");
                return;
            }

            const res = await fetch(
                "https://loyalty-web-app-dbc8e-default-rtdb.firebaseio.com/adminform.json",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        adminEmail: user.uemail,
                        uniqueId: user.uniqueId,
                        aName: user.uName,
                    }),
                }
            );

            if (res.ok) {
                console.log("User promoted to admin");
            } else {
                console.error("Failed to promote user to admin");
            }
            window.location.reload();
        }
        } catch (error) {
            console.error("Failed to delete admin:", error);
        }
    };

    const handleDepromoteA = async (uniqueId) => {
        console.log(uniqueId);

        try {
            // Check if the admin with uniqueId and email is present in adminsform
            const response = await fetch(`https://loyalty-web-app-dbc8e-default-rtdb.firebaseio.com/adminform.json`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            // Map the data to include uniqueId for each user
            const adminformWithUniqueId = Object.keys(data).map(auniqueId => {
                return { ...data[auniqueId], auniqueId };
            });
            console.log(adminformWithUniqueId);
            const adminToDelete = adminformWithUniqueId.find((admin) => uniqueId === uniqueId);
            console.log(adminToDelete.auniqueId);

            if (adminToDelete) {
                // Make DELETE request to Firebase or any other backend service
                // You can use fetch or any other HTTP library for making DELETE request
                await fetch(`https://loyalty-web-app-dbc8e-default-rtdb.firebaseio.com/adminform/${adminToDelete.auniqueId}.json`, {
                    method: "DELETE",
                });

                // Remove the admin from admins
                const updatedUsers = users.filter((user) => user.uniqueId !== uniqueId);
                setAdmins(updatedUsers);
            } else {
                console.error("Admin not found in adminsform");
            }
        } catch (error) {
            console.error("Failed to delete admin:", error);
        }
        window.location.reload();

    }

    const handleDepromote = async (uniqueId, uemail) => {
        console.log(uniqueId)
        try {
            // Check if the admin with uniqueId and email is present in adminsform
            const response = await fetch(`https://loyalty-web-app-dbc8e-default-rtdb.firebaseio.com/adminform.json`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            // Map the data to include uniqueId for each user
            const adminformWithUniqueId = Object.keys(data).map(auniqueId => {
                return { ...data[auniqueId], auniqueId };
            });

            const adminToDelete = adminformWithUniqueId.find((admin) => admin.uniqueId === uniqueId && admin.adminEmail === uemail);
            console.log(adminToDelete);

            if (adminToDelete) {
                // Make DELETE request to Firebase or any other backend service
                // You can use fetch or any other HTTP library for making DELETE request
                await fetch(`https://loyalty-web-app-dbc8e-default-rtdb.firebaseio.com/adminform/${adminToDelete.auniqueId}.json`, {
                    method: "DELETE",
                });

                // Remove the admin from admins
                const updatedUsers = users.filter((user) => user.uniqueId !== uniqueId);
                setUsers(updatedUsers);
            } else {
                console.error("Admin not found in adminsform");
            }
        } catch (error) {
            console.error("Failed to delete admin:", error);
        }
    };



    useEffect(() => {
        $(document).ready(function () {
            if (users.length > 0) {
                $('#example').DataTable();
            }
        });
    }, [users]);

    useEffect(() => {
        $(document).ready(function () {
            if (users.length > 0) {
                $('#example2').DataTable();
            }
        });
    }, [admins]);




    return (
        <div style={{ display: 'flex',flemarginLeft: 20, marginTop: 20 }}>
            {users.length > 0 ? (
                <table id="example" class="table table-striped table-hover" >
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Users</th>
                            <th>UserMailID</th>
                            <th>Promote to admin</th>

                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index = 0) => {

                            return (
                                <tr key={user.uemail}>
                                    <td>{index + 1}</td>
                                    <td>{user.uName}</td>
                                    <td>{user.uemail}</td>
                                    <td><Button type="primary" onClick={() => { handlepromote(user.uniqueId); }}>Promote</Button></td>


                                </tr>
                            );


                        })}

                    </tbody>
                </table>

            ) : (
                <div>
                    <h6 style={{ textAlign: 'center' }}>
                        No Users available
                    </h6>
                </div>
            )}

            {admins.length > 0 ? (
                <div style={{ marginLeft: 100, }}>
                    
                    <table id="example2" class="table table-striped table-hover">
                    
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>AdminsMailId</th>
                            <th>Depromote admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {admins.map((admin, index = 0) => {

                            return (
                                <tr key={admin.adminEmail}>
                                    <td>{index + 1}</td>
                                    <td>{admin.aName}</td>
                                    <td>{admin.adminEmail}</td>


                                    <td><Button type="primary" onClick={() => { handleDepromoteA(admin.uniqueId); }}>DePromote</Button></td>

                                </tr>
                            );


                        })}
                    </tbody>
                </table>
                </div>
            ) : (
                <div>
                    <h6 style={{ textAlign: 'center' }}>
                        No Admins available
                    </h6>
                </div>
            )}
        </div>
    );
};


export default AdminUsersControl;
// 