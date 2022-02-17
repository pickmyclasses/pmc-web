import React from 'react';
import './AdminPage.css';
import DataGrid from '@mui/material';

const AdminPage = () => {

    let columns = ['Company'];
    let rows= ['Google'];

    return(
        <div className='admin'>
            <h1>Admin page</h1>
            <label for="tables" className="selector-label">Choose a table:</label>

            <select name="tables" id="tables-selector">
                <option value="class">class</option>
                <option value="college">college</option>
                <option value="course">course</option>
                <option value="subject">subject</option>
            </select>
            
            <button className='btn btn-success search-button'> Search </button>

            <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            />

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