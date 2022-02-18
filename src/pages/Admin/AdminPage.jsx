import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

export default function AdminPage() 
{
    const [isLoaded, setIsLoaded] = useState(false);

    const [tableName, setTableName] = useState("");


    const [testData, setTestData] = useState([]);


    const [error, setError] = useState(null);
    const [nbRows, setNbRows] = useState(10);


    const removeRow = () => setNbRows((x) => Math.max(0, x - 1));
    const addRow = () => setNbRows((x) => Math.min(100, x + 1));

    const { data } = useDemoData({
        dataSet: 'Commodity',
        rowLength: 100,
        maxColumns: 6,
    });

    useEffect(() => {
        fetch("https://pmc-schedule-api.herokuapp.com/" + tableName)
            .then(res => res.json())
            .then(
                (data) => {
                    console.log("useEffect is called: " + tableName);
                    setIsLoaded(true);
                    setTestData(data);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );

    }, [tableName]);


    let handleChange = (e) => {
        setIsLoaded(false);
        setTableName(e.target.value);
    }

    if (error) 
    {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) 
    {
        return <div>Loading...</div>;
    } else 
    {
        console.log(testData);
        return (
            <div style={{ width: '100%' }}>
                <h1>Admin Page</h1>

                <label className="selector-label">Choose a table:</label>

                <select name="tables" id="tables-selector" onChange={handleChange}>
                    <option value=""></option>
                    <option value="class">class</option>
                    <option value="college">college</option>
                    <option value="course">course</option>
                    <option value="subject">subject</option>
                </select>

                <Button variant="outlined" onClick={removeRow}>
                    Remove a row
                </Button>
                <Button variant="outlined" onClick={addRow}>
                    Add a row
                </Button>
                <DataGrid autoHeight {...data} rows={data.rows.slice(0, nbRows)} />
            </div>
        );
    }
}