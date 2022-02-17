import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import axios from 'axios';

export default function AdminPage() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [classes, setClasses] = React.useState([]);
    const [error, setError] = useState(null);
    const [nbRows, setNbRows] = React.useState(5);
    const removeRow = () => setNbRows((x) => Math.max(0, x - 1));
    const addRow = () => setNbRows((x) => Math.min(100, x + 1));

    const { data } = useDemoData({
        dataSet: 'Commodity',
        rowLength: 100,
        maxColumns: 6,
    });


    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users/")
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true);
                    setClasses(data);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, []);

    let handleClick = () => {

    }

    if (error) 
    {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) 
    {
        return <div>Loading...</div>;
    } else 
    {
        return (
            <div style={{ width: '100%' }}>
                <h1>Admin Page</h1>
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