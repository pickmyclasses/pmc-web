import React from 'react';
import { useLocation } from "react-router";

export default function UpdateData(props)
{
    //console.log("called from UpdateData");
    let location = useLocation();
    console.log("data passed from AdminPage");
    console.log(location.state.data);
    return(
        <div>Hello world</div>
    )
}