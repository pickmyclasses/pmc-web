import React, { useState } from 'react';
import { Button } from '@mui/material';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import './UpdateData.css';

export default function UpdateData() 
{
  // location is the place that stored the data when the previous page click the update button
  let location = useLocation();

  // fetch the data from location 
  let data = location.state.data;

  // tableName is a property
  const [tableName, setTableName] = useState(location.state.table);

  // array that contains the fields (columns) and the value that initially render
  let dataToRender = [];

  // populate data to render
  for (let key in data) 
  {
    let temp = {};
    temp.key = key;
    temp.value = data[key];
    dataToRender.push(temp);
  }

  // handle change means update the value with the respective key in data array
  // with the new value that the user typed in
  let handleChange = (key, e) => 
  {
    data[key] = e.target.value;
  };

  // handleSubmit is called when the user submit the form
  let handleSubmit = (e) => 
  {
    e.preventDefault();
    let request_body = data;
    // add a field table_name = tableName
    request_body.table_name = tableName;

    // request body and header and method type
    const requestOptions = 
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request_body),
    };

    // let URL = 'https://pmc-schedule-api.herokuapp.com/update-data';

    // the endpoint where the api is attached
    let URL = 'http://localhost:5002/update-data';

    // call the api to post the updated data
    fetch(URL, requestOptions)
    .then((res) => res.json())
    .then(
          (data) => 
          {
            alert(data.message);
          },
        (error) => 
        {
          alert(error);
        }
      );
  };

  // keyItem because the map method requires key
  let keyItem = 1;

  return (
    <div className='updateDataDiv'>
      <h1 style={{ textAlign: 'center' }}>Update Data</h1>
      {/* This button goes back to the Admin Data Table */}
      <Link to="/admin">
        <Button
          variant="contained"
          color="primary"
        >
          Admin Data Table
        </Button>
      </Link>
      {/* The form */}
      <form onSubmit={handleSubmit} style={{ marginTop: '50px' }}>
        {dataToRender.map((obj) => (
          <div key={keyItem++}>
            {/* The label */}
            <label>
              {obj.key}
              {/* If the field is id then the user can't type (readonly). Otherwise they can */}
              {obj.key === 'id' ? (
                <input
                  className='updateDataInput'
                  type='text'
                  defaultValue={obj.value}
                  readOnly
                />
              ) : (
                <input
                  className='updateDataInput'
                  type='text'
                  defaultValue={obj.value}
                  onChange={(e) => handleChange(obj.key, e)}
                />
              )}
            </label>
            <br />
          </div>
        ))}
        {/*Submit button */}
        <input className='updateDateSubmit' type='submit' value='Submit' />
      </form>
    </div>
  );
}
