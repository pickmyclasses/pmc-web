import React , {useState} from 'react';
import Table from '../Table/Table';

export default function AdminPage(props)
{
    const [tableName, setTableName] = useState("building");

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
            <option value="building">building</option>
            <option value="class">class</option>
            <option value="college">college</option>
            <option value="course">course</option>
            <option value="course_set">course_set</option>
            <option value="custom_event">custom_event</option>
            <option value="major">major</option>
            <option value="over_all_rating">over_all_rating</option>
            <option value="prerequisites">prerequisites</option>
            <option value="professor">professor</option>
            <option value="review">review</option>
            <option value="schedule">schedule</option>
            <option value="semester">semester</option>
            <option value="subject">subject</option>
            <option value="tag">tag</option>
            <option value="user">user</option>
            <option value="user_course_history">user_course_history</option>            
            <option value="user_voted_tag">user_voted_tag</option>
            <option value="files_upload">files_upload</option>
        </select>
        <div style={{marginBottom: '20px', marginTop: '20px'}}>---------------------------------------------------</div>

        <Table tableName={tableName}/>
        
        </div> 
    );
}