import React , {useState} from 'react';
import Table from './Table';

export default function AdminPage(props)
{
    const [tableName, setTableName] = useState("college");

    let handleChange = (e) => 
    {

        setTableName(e.target.value);
    }

    return(
        <div style={{ width: '100%' }} className="admindiv">
        <h1 style={{textAlign: 'center'}}>Admin Page</h1>
        <h1>Table {tableName}</h1>

        <label className="selector-label">Choose a table:</label>

        <select name="tables" id="tables-selector" onChange={handleChange}>
            <option value="college">college</option>
            <option value="class">class</option>
            <option value="course">course</option>
            <option value="subject">subject</option>
            <option value="professor">professor</option>
            <option value="google_user">google_user</option>
            <option value="review">review</option>
            <option value="semester">semester</option>
            <option value="user">user</option>
            <option value="schedule">schedule</option>
            <option value="feedback">feedback</option>
        </select>
        <div style={{marginBottom: '20px', marginTop: '20px'}}>---------------------------------------------------</div>

        <Table tableName={tableName}/>
        
        </div> 
    );
}