import React from 'react';
import './AdminPage.css';


const AdminPage = () => {
    return(
        <div className='admin'>
            <h1>Admin page</h1>
            <label for="tables">Choose a table:</label>

            <select name="tables" id="tables-selector">
                <option value="class">class</option>
                <option value="college">college</option>
                <option value="course">course</option>
                <option value="subject">subject</option>
            </select>
            
            <button> Search </button>

            <table className='table'>
                <tr>
                    <th>
                        Company
                    </th>
                </tr>
                <tr>
                    <td>
                        Google
                    </td>
                </tr>
            </table>
        </div>
    )
}

export default AdminPage;