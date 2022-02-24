import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';

export default function AdminPage() 
{
    const [isLoaded, setIsLoaded] = useState(false);
    const [tableName, setTableName] = useState("");
    const [testData, setTestData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => 
    {
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

    let deleteClick = (e) => {
        let delete_id = e.row.id;
        console.log("delete id: " + delete_id);
    }

    let updateClick = (e) => {
        let update_id = e.row.id;
        console.log("update id: " + update_id);
    }

    if (error) 
    {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) 
    {
        return <div>Loading...</div>;
    } else 
    {
        let columns = [];
        let rows = [];

        if(testData.length > 0)
        {
            for(let key in testData[0])
            {
                let temp = {}
                temp.field=key;
                temp.width=200;
                columns.push(temp);
            }
            columns.push({
                field: "Update",
                renderCell: (cellValues) => {
                  return (
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => {
                        updateClick(cellValues);
                      }}
                    >
                      Update
                    </Button>
                  );
                }
            });
            columns.push({
                field: "Delete",
                renderCell: (cellValues) => {
                  return (
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => {
                        deleteClick(cellValues);
                      }}
                    >
                      Delete
                    </Button>
                  );
                }
            });

            rows = testData;
        }
        // const options = {
        //     filterType: 'checkbox',
        //   };

        return (
            <div style={{ width: '100%' }} className="admindiv">
                <h1>Admin Page</h1>
                <h1>Table {tableName}</h1>

                <label className="selector-label">Choose a table:</label>

                <select name="tables" id="tables-selector" onChange={handleChange}>
                    <option value=""></option>
                    <option value="class">class</option>
                    <option value="college">college</option>
                    <option value="course">course</option>
                    <option value="subject">subject</option>
                </select>
            <div style={{ height: 2500, width: '100%' }}>
                <DataGrid
                columns={columns}
                rows={rows}
                />
            </div>
            </div>
        );
    }
}
