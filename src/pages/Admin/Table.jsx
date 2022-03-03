import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { Link } from "react-router-dom";


export default function Table(props) 
{
    const [isLoaded, setIsLoaded] = useState(false);
    const [tableName, setTableName] = useState(props.tableName);
    const [testData, setTestData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
      setTableName(props.tableName);
    }, [props.tableName]);

    useEffect(() => 
    {
        setIsLoaded(false);
        fetch("https://pmc-schedule-api.herokuapp.com/" + tableName)
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true);
                    setTestData(data);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }, [tableName]);

    let deleteClick = (e) => {
        let delete_id = e.row.id;
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
                    <Link to="/admin-update" state = {{data: cellValues.row, table: tableName}}
                    >
                      <Button
                        variant="contained"
                        color="success"
                      >
                        Update
                      </Button>
                    </Link>

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

        return (
          <div style={{ height: 700, width: '100%' }}>
            <DataGrid
            columns={columns}
            rows={rows}
            />
          </div>
        );
    }
}
