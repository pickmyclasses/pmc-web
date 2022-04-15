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
      const URL = "https://pmc-schedule-api.herokuapp.com/" + tableName + "/delete/" + e.row.id;
      console.log(URL);
      fetch("https://pmc-schedule-api.herokuapp.com/" + tableName + "/delete/" + e.row.id)
      .then(res => res.json())
      .then(
          (data) => {
              alert(data.message);
          },
          (error) => {
              alert(error);
          }
      );
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
        if(testData.length > 0)
        {
            for(let key in testData[0])
            {
                let temp = {}
                temp.field=key;
                temp.width=200;
                columns.push(temp);
            }
            if(tableName === 'files_upload')
            {

              columns.push({
                field: "Link",
                renderCell: (cellValues) => {
                  console.log(cellValues.row.name);
                  const URL = "http://localhost:5000/uploads/" + cellValues.row.name;
                  return (
                      <Button
                        href = {URL}
                        variant="contained"
                        color="primary"
                      >
                        Link
                      </Button>

                  );
                }
            });
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
        }

        return (
          <div style={{ height: 500, width: '100%' }}>
            <DataGrid
            columns={columns}
            rows={testData}
            />
          </div>
        );
    }
}
