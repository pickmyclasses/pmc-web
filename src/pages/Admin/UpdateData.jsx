import React, {useState} from 'react';
import { useLocation } from "react-router";
import "./UpdateData.css";

export default function UpdateData(props)
{
    //console.log("called from UpdateData");
    let keyItem = 1;

    let location = useLocation();

    let data = location.state.data;

    let dataToRender = [];

    for(let key in data)
    {
        let temp = {};
        temp.key = key;
        temp.value = data[key];
        dataToRender.push(temp);
    }

    let handleChange = () => {

    }

    let handleSubmit = () => {

    }


    return(
        <div className='updateDataDiv'>
            <h1 style={{textAlign: 'center'}}>Update Data</h1>
            <form onSubmit={handleSubmit}>
                {dataToRender.map(obj => <div key={keyItem++}><label>{obj.key}
                                            {   obj.key === "id" ?  <input className="updateDataInput" type="text" value={obj.value} readOnly/> : 
                                                obj.value == null ? <input className="updateDataInput" type="text" value={""} onChange={handleChange}/> :
                                                <input className="updateDataInput" type="text" value={obj.value} onChange={handleChange}/>
                                            }
                                            </label><br/>
                                        </div>)
                }
                <input className="updateDateSubmit" type="submit" value="Submit" />
            </form>
        </div>


    )
}