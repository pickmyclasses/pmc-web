import React, {useState} from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

import signinImage from '../assets/signup.jpg';

const Auth = () => {

    const [isSignup, setIsSignup] = useState(true);

    const handleChange = () => {

    }

    return(
        <div className='auth__form-container'>
            <div className='auth__form-container_fields'>
                <div className='auth__form-container_fields-content'>
                    <p>{isSignup ? 'Sign Up' : 'Sign In'}</p>
                    <form onSubmit={() => {}}>
                        {isSignup && (
                            <div className='auth__form-container_fields-content_input'>
                                <label htmlFor="fullName">Full Name</label>
                                <input
                                    name="fullName"
                                    type="text"
                                    placeholder="Full Name"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className='auth__form-container_fields-content_input'>
                                <label htmlFor="fullName">Username</label>
                                <input
                                    name="username"
                                    type="text"
                                    placeholder="Username"
                                    onChange={handleChange}
                                    required
                                />
                        </div>
                        {isSignup && (
                            <div className='auth__form-container_fields-content_input'>
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <input
                                    name="phoneNumber"
                                    type="text"
                                    placeholder="Phone Number"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        {isSignup && (
                            <div className='auth__form-container_fields-content_input'>
                                <label htmlFor="avatarURL">Avatar URL</label>
                                <input
                                    name="avatarURL"
                                    type="text"
                                    placeholder="Avatar URL"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    )
};

export default Auth;