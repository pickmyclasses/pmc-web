import React, {useState} from 'react';
import { useLocation } from "react-router";
import "./UpdateData.css";

export default function UpdateData()
{
    //console.log("called from UpdateData");
    let keyItem = 1;

    let location = useLocation();

    let data = location.state.data;

    const [tableName, setTableName] = useState(location.state.table);

    console.log(tableName);

    let dataToRender = [];

    for(let key in data)
    {
        let temp = {};
        temp.key = key;
        temp.value = data[key];
        dataToRender.push(temp);
    }

    let handleChange = (key, e) => {
        data[key] = e.target.value;
    }

    let handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };

        let URL = 'https://pmc-schedule-api.herokuapp.com/' + tableName + '/update';
        console.log(URL);
        fetch(URL, requestOptions)
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


    return(
        <div className='updateDataDiv'>
            <h1 style={{textAlign: 'center'}}>Update Data</h1>
            <form onSubmit={handleSubmit}>
                {dataToRender.map(obj => <div key={keyItem++}>
                                            <label>{obj.key}
                                            {   obj.key === "id" ?  <input className="updateDataInput" type="text" defaultValue={obj.value} readOnly/> : 
                                                <input className="updateDataInput" type="text" defaultValue={obj.value} onChange={(e) => handleChange(obj.key, e)}/>
                                            }
                                            </label><br/>
                                        </div>)
                }
                <input className="updateDateSubmit" type="submit" value="Submit" />
            </form>
        </div>
    )
}