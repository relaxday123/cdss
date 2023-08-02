/* eslint-disable react/prop-types */
import 'antd/dist/reset.css';
import { Formik } from 'formik';
// import jwt from 'jwt-decode';
// import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import useAuth from '../../hooks/useAuth';
import { authenticate } from '../../services';
import { showErrorMessage } from '../../util/toastdisplay';
import './login.css';

function LoginPage() {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const onFinish = async user => {
    try {
      const response = await authenticate(user);
      setToken(response.data.accessToken);
      localStorage.setItem('token', response.data.accessToken);
      navigate('/');
    } catch (error) {
      if (error) {
        showErrorMessage('Username or password is incorrect. Please try again');
      }
    }
  };

  return (
    <section className="login-page vh-100" style={{ backgroundColor: '#eee' }}>
      <div className='container h-100' style={{ padding: '5rem' }}>
        <div className='row d-flex justify-content-center align-items-center h-100'>
          <div className='col-lg-12 col-xl-11'>
            <div className='card text-black' style={{ borderRadius: '25px' }}>
              <div className='card-body p-md-5'>
                <div className='row justify-content-center'>
                  <div className='col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1'>
                  <p className='text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4'>Log in</p>

                  <Formik
                    initialValues={{ username: '', password: '' }}
                    validationSchema={Yup.object({
                      username: Yup.string().required('Please enter username'),
                      password: Yup.string().required('Please enter password'),
                    })}
                    onSubmit={values => {
                      let user = {
                        username: values.username,
                        password: values.password,
                      };
                      onFinish(user);
                    }}
                  >
                    {props => {
                      const {
                        touched,
                        errors,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                      } = props;
                      return (
                        <form onSubmit={handleSubmit} className="login-form-custom">
                          <div className="mb-3">
                            <input
                              id="username"
                              name="username"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              size="large"
                              placeholder="Username"
                              maxLength={50}
                              className={
                                errors.username && touched.username
                                  ? 'text-input error form-control'
                                  : 'text-input form-control'
                              }
                            />
                            {errors.username && touched.username && (
                              <div className="input-feedback">{errors.username}</div>
                            )}
                          </div>
                          <div className="mb-3">
                            <input
                              name="password"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              size="large"
                              type="password"
                              placeholder="Password"
                              maxLength={50}
                              className={
                                errors.password && touched.password
                                  ? 'text-input error form-control'
                                  : 'text-input form-control'
                              }
                            />
                            {errors.password && touched.password && (
                              <div className="input-feedback">{errors.password}</div>
                            )}
                          </div>

                          <div className="center-button">
                            <button
                              disabled={errors.username || errors.password}
                              type="submit"
                              className="btn btn-primary"
                            >
                              Log in
                            </button>
                          </div>

                          <p className='mt-4'>{"Don't have an account yet? "}<a href='/register'>Sign up</a></p>
                        </form>
                      );
                    }}
                  </Formik>
                  </div>
                  <div className='col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2'>

                    <img src='https://www.videojeeves.com/assets_website/images/2d-medical/industry-first-content-image.jpg'
                      className='img-fluid' alt='Sample image' style={{ borderRadius: '20px' }}/>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
