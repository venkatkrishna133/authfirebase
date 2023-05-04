import React, { useState } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs5';
import { Image, Button } from 'antd';
import { useLocation } from "react-router-dom";
import { storage } from "../firebase";

function AdminRewardConfig() {
    const location = useLocation();
    const email = new URLSearchParams(location.search).get("email").trim();

    const [rewardItems, setRewardItems] = useState({
        email: email,
        items: "",
        percent: "",
    });
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
        console.log(rows);
    };

    return (
        <div>

            <table class="table table-striped table-hover" >
                <thead >
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
                                    onChange={(e) => {handleInputChange(e, index);
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
        </div>
    );

}

export default AdminRewardConfig;
