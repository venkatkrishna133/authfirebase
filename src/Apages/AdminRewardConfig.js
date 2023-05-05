import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs5';
import { Image, Button } from 'antd';
import { useLocation } from "react-router-dom";
import { storage } from "../firebase";

function AdminRewardConfig() {
    const location = useLocation();
    const email = new URLSearchParams(location.search).get("email").trim();
    const [frewards, setfrewards] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [rewardItems, setRewardItems] = useState({
        email: email,
        items: "",
        percent: "",
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(
                    "https://loyalty-web-app-dbc8e-default-rtdb.firebaseio.com/rewards.json",
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

                    setfrewards(Object.values(userformWithUniqueId));
                    setIsLoaded(true);
                    


                } else {
                    throw new Error("Failed to fetch invoices");
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();

    }, []);

    const [rows, setRows] = useState([
        {
            items: '',
            percent: '',
        },
    ]);

    const addRow = () => {
        setRows([
            ...rows,
            {
                items: '',
                percent: '',
            },
        ]);
    };

    const handleInputChange = (e, rowIndex) => {
        const { name, value } = e.target;
        const updatedRows = [...rows];
        updatedRows[rowIndex] = {
            ...updatedRows[rowIndex],
            [name]: value,
        };
        setRows(updatedRows);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const newRewardItems = {
            ...rewardItems,
        };
        console.log(newRewardItems);
        // const rewardItemsArray = rows.map(row => ({ items: row.items, percent: row.percent }));
        const res = await fetch(
            "https://loyalty-web-app-dbc8e-default-rtdb.firebaseio.com/rewards.json",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newRewardItems),
            }
            
        );
        window.location.reload();
        console.log(rows);
    };

    const handleDelete = async (uniqueId) => {
        console.log(uniqueId);

        try {
            // Check if the admin with uniqueId and email is present in adminsform
            const response = await fetch(`https://loyalty-web-app-dbc8e-default-rtdb.firebaseio.com/rewards.json`, {
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
            const rewardToDelete = adminformWithUniqueId.find((admin) => uniqueId === uniqueId);
            console.log(rewardToDelete.auniqueId);

            if (rewardToDelete) {
                // Make DELETE request to Firebase or any other backend service
                // You can use fetch or any other HTTP library for making DELETE request
                await fetch(`https://loyalty-web-app-dbc8e-default-rtdb.firebaseio.com/rewards/${rewardToDelete.auniqueId}.json`, {
                    method: "DELETE",
                });

                // Remove the admin from admins
                const updatedRewards= frewards.filter((freward) => freward.uniqueId !== uniqueId);
                setfrewards(updatedRewards);
                
            } else {
                console.error("Reward not found in rewardsform");
            }
        } catch (error) {
            console.error("Failed to delete admin:", error);
        }
        

    }

    return (
        <div style={{ display: 'flex', marginTop: 20, justifyContent: 'space-evenly', width: "100%" }}>
            {isLoaded ? (
                <>
                    <table class="table table-striped table-hover" style={{ width: "30vw" }}>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Items</th>
                                <th>Percent</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <input
                                            type="text"
                                            name="items"
                                            placeholder="Enter Items ..."
                                            value={row.items}
                                            onChange={(e) => {
                                                handleInputChange(e, index);
                                                setRewardItems({ ...rewardItems, items: e.target.value });
                                            }}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="percent"
                                            placeholder="Enter Percent ..."
                                            value={row.percent}
                                            onChange={(e) => {
                                                handleInputChange(e, index);
                                                setRewardItems({ ...rewardItems, percent: e.target.value });
                                            }}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="3" style={{ textAlign: 'center' }}>
                                    <Button type="primary" onClick={addRow} style={{ marginRight: '10px' }}>
                                        Add New Row
                                    </Button>
                                    <Button type="primary" onClick={handleSubmit} style={{ marginLeft: '10px' }}>
                                        Submit
                                    </Button>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                    {frewards.length > 0 ? (
                        <div >
                            <table id="example2" class="table table-striped table-hover" style={{ width: "50vw" }}>
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Items</th>
                                        <th>Percent</th>
                                        <th>Delete</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {frewards.map((freward, index) => (
                                        <tr key={freward.uniqueId}>
                                            <td>{index + 1}</td>
                                            <td>{freward.items}</td>
                                            <td>{freward.percent}</td>
                                            <Button onClick={() => handleDelete(freward.uniqueId)}>Delete</Button>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div>
                            <h6 style={{ textAlign: 'center' }}>No Items available</h6>
                        </div>
                    )}
                </>
            ) : (
                <div>Loading...</div>
            )}
            {isFormOpen ? (
                <h1>hello</h1>
            
            ): (
                   <></>
                )}
        </div>
    );


}

export default AdminRewardConfig;
