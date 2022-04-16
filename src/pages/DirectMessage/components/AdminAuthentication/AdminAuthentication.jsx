import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import './AdminAuthentication.css';

const cookies = new Cookies();

// the initial object that represent the data in the form
const initialState = {
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    avatarURL: '',
}

const AdminAuthentication = () => 
{
    // set property form with the initial state
    const [form, setForm] = useState(initialState);
    const isSignup = false;

    // handle change: ... means spreading the property of the form with the respective
    // field = e.target.name with e.target.value
    const handleChange = (e) => 
    {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    // handleSubmit will be called when the user submit the form
    const handleSubmit = async (e) => 
    {
        // prevent reloading the form
        e.preventDefault();

        // fetch these fields from the form
        const { username, password, phoneNumber, avatarURL } = form;

        const URL = 'https://pmc-admin-api.herokuapp.com/auth';
        
        //const URL = 'http://localhost:5003/auth';

        const { data: { token, userId, hashedPassword, fullName } } = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, 
        {
            username, password, fullName: form.fullName, phoneNumber, avatarURL,
        });

        // when the user login, set these fields in the cookies accordingly
        cookies.set('token', token);
        cookies.set('username', username);
        cookies.set('fullName', fullName);
        cookies.set('userId', userId);

        if(isSignup) 
        {
            cookies.set('phoneNumber', phoneNumber);
            cookies.set('avatarURL', avatarURL);
            cookies.set('hashedPassword', hashedPassword);
        }

        window.location.reload();
    }

    return (
        <div className="panel-authentication">
            <div className="pannel-authentication-fields">
                <div className="pannel-authentication-fields-content">
                    <p>Sign In</p>
                    {/*The form to log in */}
                    <form onSubmit={handleSubmit}>
                        {/*The username dive */}
                        <div className="pannel-authentication-fields-content-input">
                            <label htmlFor="username">Username</label>
                            <input 
                                name="username" 
                                type="text"
                                placeholder="Username"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {/*The password*/}
                        <div className="pannel-authentication-fields-content-input">
                            <label htmlFor="password">Password</label>
                            <input 
                                name="password" 
                                type="password"
                                placeholder="Password"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {/* Submit Button */}
                        <div className="pannel-authentication-fields-content-button">
                            <button>{isSignup ? "Sign Up" : "Sign In"}</button>
                        </div>
                    </form>
                </div> 
            </div>
        </div>
    )
}

export default AdminAuthentication;