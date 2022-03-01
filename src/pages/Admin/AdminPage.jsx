import React , {useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';

function Table(props)
{
    const [tableName, setTableName] = useState("");

    let handleChange = (e) => 
    {

        setTableName(e.target.value);
    }

    return(
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
        
        </div> 
    );
}