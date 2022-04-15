import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { Link } from "react-router-dom";


export default function Table(props) 
{
    // a field type boolean to check if the data has been completely loaded or not
    const [isLoaded, setIsLoaded] = useState(false);
    // a field type string to store the table name
    const [tableName, setTableName] = useState(props.tableName);
    // a field type array to store the rows where each row is an object of data
    const [renderData, setRenderData] = useState([]);
    // error object to capture the error messages
    const [error, setError] = useState(null);

    // the domain
    const DOMAIN = "http://localhost:5002/";

    // when the table name of props changes, set table name of this component accordingly
    useEffect(() => {
      setTableName(props.tableName);
    }, [props.tableName]);

    // When the table name changes, the call back function (the first parameter) will be called
    useEffect(() => 
    {
        // setIsLoaded to false until the data is completely loaded
        setIsLoaded(false);
        // call the fetch function. fetch is a function used to make API call
        fetch(DOMAIN + tableName)
            // turns the result into json
            .then(res => res.json())
            // after the result is the data response
            .then(
                (data) => {
                    // once the data is completely loaded, set isLoaded to true
                    setIsLoaded(true);
                    // assigned the data fetched to renderData 
                    setRenderData(data);
                },
                (error) => 
                {
                    // once the error arrives, set isLoaded to true because stop loading
                    setIsLoaded(true);
                    // set the error received to the error object
                    setError(error);
                }
            );
    }, [tableName]);

    // the function handle the click of the delete button
    let deleteClick = (e) => {
      const URL = DOMAIN + tableName + "/delete/" + e.row.id;
      console.log(URL);
      fetch(DOMAIN + tableName + "/delete/" + e.row.id)
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
        if(renderData.length > 0)
        {
            for(let key in renderData[0])
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

                  const URL = DOMAIN + "uploads/" + cellValues.row.name;
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
            else{
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

        }

        return (
          <div style={{ height: 500, width: '100%' }}>
            <DataGrid
            columns={columns}
            rows={renderData}
            />
          </div>
        );
    }
}
