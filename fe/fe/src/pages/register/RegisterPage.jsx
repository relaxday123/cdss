/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import 'antd/dist/reset.css';
import { Formik } from 'formik';
// import jwt from 'jwt-decode';
// import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import useAuth from '../../hooks/useAuth';
import { authenticate, disableUser } from '../../services';
import './register.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    // faUsersMedical, 
    faUser, faEnvelope, faLock, faKey
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import UserService from '../../services/userService';
import { showErrorMessage, showSuccessMessage } from '../../util/toastdisplay';

function RegisterPage() {
    const { setToken } = useAuth();
    const navigate = useNavigate();

    //   const onFinish = async user => {
    //     try {
    //       const response = await authenticate(user);
    //       setToken(response.data.accessToken);
    //       localStorage.setItem('token', response.data.accessToken);
    //       navigate('/');
    //     } catch (error) {
    //       if (error) {
    //         showErrorMessage('Username or password is incorrect. Please try again');
    //       }
    //     }
    //   };

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
        repPassword: '',
        // termConfirm: false,
    });

    const [error, setError] = useState({
        name: '',
        username: '',
        password: '',
        repPassword: ''
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

        validateInput(e);
    };

    // const handleFormSubmit = (e) => {
    //     // e.preventDefault();
    //     console.log(formData);
    // };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        UserService.create(formData)
            .then(response => {
                showSuccessMessage(`Create user success!`);
                setTimeout(() => {
                    navigate('/login', { state: { createdUser: response.data, prePath: '/' } });
                }, 2000);
            })
            .catch(e => {
                showErrorMessage('Error: ' + e.response.data);
                console.error(e);
            });
    };

    const validateInput = e => {
        let { name, value } = e.target;
        setError(prev => {
            const stateObj = { ...prev, [name]: "" };

            switch (name) {
                case "name":
                    if (!value.match('^([A-Z][a-z]*)(\\s[A-Z][a-z]*)*$')) {
                        stateObj[name] = "Invalid name.";
                    }
                    break;

                case "username":
                    if (!value) {
                        stateObj[name] = "Please enter Username.";
                    }
                    break;

                case "password":
                    if (value.length < 6) {
                        stateObj["password"] = "Password must at least 6 characters.";
                    }
                    if (!value) {
                        stateObj[name] = "Please enter Password.";
                    } else if (formData.repPassword && value !== formData.repPassword) {
                        stateObj["repPassword"] = "Password and Confirm Password does not match.";
                    } else {
                        stateObj["repPassword"] = formData.repPassword ? "" : error.repPassword;
                    }
                    break;

                case "repPassword":
                    if (!value) {
                        stateObj[name] = "Please enter Confirm Password.";
                    } else if (formData.password && value !== formData.password) {
                        stateObj[name] = "Password and Confirm Password does not match.";
                    }
                    break;

                default:
                    break;
            }

            return stateObj;
        });
    }

    const formValid = !error.name && !error.username && !error.password && !error.repPassword

    return (
        <>
            <section className='' style={{ backgroundColor: '#eee' }}>
                <div className='container h-100' style={{ padding: '5rem' }}>
                    <div className='row d-flex justify-content-center align-items-center h-100'>
                        <div className='col-lg-12 col-xl-11'>
                            <div className='card text-black' style={{ borderRadius: '25px' }}>
                                <div className='card-body p-md-5'>
                                    <div className='row justify-content-center'>
                                        <div className='col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1'>

                                            <p className='text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4'>Sign up</p>

                                            <form className='mx-1 mx-md-4' onSubmit={handleFormSubmit}>

                                                <div className='mb-4'>
                                                    <div className='d-flex flex-row align-items-center'>
                                                        <FontAwesomeIcon icon={faUser} className='me-3 fa-fw mt-5' />
                                                        <div className='form-outline flex-fill mb-0'>
                                                            <label className='form-label mb-4' htmlFor='form3Example1c'>Your Name</label>
                                                            <input type='text' id='form3Example1c' className='form-control' name="name" value={formData.name} onChange={handleChange} onBlur={validateInput} placeholder='Enter Your Name' required />
                                                        </div>
                                                    </div>
                                                    {error.name && <span className='err'>{error.name}</span>}
                                                </div>

                                                <div className='d-flex flex-row align-items-center mb-4'>
                                                    <FontAwesomeIcon icon={faEnvelope} className='me-3 fa-fw mt-5' />
                                                    <div className='form-outline flex-fill mb-0'>
                                                        <label className='form-label mb-4' htmlFor='form3Example3c'>Your Email</label>
                                                        <input type='email' id='form3Example3c' className='form-control' name="email" value={formData.email} onChange={handleChange} onBlur={validateInput} placeholder='Enter Email' required />
                                                    </div>
                                                </div>

                                                <div className='d-flex flex-row align-items-center mb-4'>
                                                    <FontAwesomeIcon icon={faUser} className='me-3 fa-fw mt-5' />
                                                    <div className='form-outline flex-fill mb-0'>
                                                        <label className='form-label mb-4' htmlFor='form3Example2c'>Username</label>
                                                        <input type='text' id='form3Example2c' className='form-control' name="username" value={formData.username} onChange={handleChange} onBlur={validateInput} placeholder='Enter Username' required />
                                                    </div>
                                                </div>

                                                <div className='mb-4'>
                                                    <div className='d-flex flex-row align-items-center'>
                                                        <FontAwesomeIcon icon={faLock} className='me-3 fa-fw mt-5' />
                                                        <div className='form-outline flex-fill mb-0'>
                                                            <label className='form-label mb-4' htmlFor='form3Example4c'>Password</label>
                                                            <input minLength={6} type='password' id='form3Example4c' className='form-control' name="password" value={formData.password} onChange={handleChange} onBlur={validateInput} placeholder='Enter Password' required />
                                                        </div>
                                                    </div>
                                                    {error.password && <span className='err'>{error.password}</span>}
                                                </div>

                                                <div className='mb-4'>
                                                    <div className='d-flex flex-row align-items-center'>
                                                        <FontAwesomeIcon icon={faKey} className='me-3 fa-fw mt-5' />
                                                        <div className='form-outline flex-fill mb-0'>
                                                            <label className='form-label mb-4' htmlFor='form3Example4cd'>Repeat your password</label>
                                                            <input type='password' id='form3Example4cd' className='form-control' name="repPassword" value={formData.repPassword} onChange={handleChange} onBlur={validateInput} placeholder='Enter Confirm Password' required />
                                                        </div>
                                                    </div>
                                                    {error.repPassword && <span className='err'>{error.repPassword}</span>}
                                                </div>

                                                <div className='d-flex justify-content-center mx-4 mb-3 mb-lg-4'>
                                                    <button type='submit' className='btn btn-primary btn-lg' disabled={!formValid}>Register</button>
                                                </div>

                                                <p className='d-flex justify-content-center'>{"Already have an account?"}<a href='/login'>Log in</a></p>

                                            </form>

                                        </div>
                                        <div className='col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2'>

                                            <img src='https://cdn.shortpixel.ai/spai/w_1027+q_glossy+ret_img+to_webp/https://medical3danimationcompany.com/wp-content/uploads/2022/03/Medical-Animation-Explainer-Videos-2048x1229.jpg'
                                                className='img-fluid' alt='Sample image' />

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default RegisterPage;
