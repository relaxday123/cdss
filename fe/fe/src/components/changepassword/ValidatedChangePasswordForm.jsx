/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Formik } from 'formik';
import Button from 'react-bootstrap/Button';
import './ChangePassword.css';
import { validatePassword, validateConfPassword } from '../../util/validate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { changePassword, checkPassword } from '../../services/index';
import useAuth from '../../hooks/useAuth';
import UserService from '../../services/userService';
import { showErrorMessage, showSuccessMessage } from '../../util/toastdisplay';

function ValidatedChangePasswordForm(props) {
  const { user } = useAuth();

  let username = user.sub;

  const [values, setValues] = useState({
    username: username,
    oldPassword: '',
    newPassword: '',
    newPasswordConf: '',
  });

  const [revealOldPassword, setRevealOldPassword] = useState(false);
  const [revealNewPassword, setRevealNewPassword] = useState(false);
  const [revealNewPasswordConf, setRevealNewPasswordConf] = useState(false);
  const [oldPasswordErrorMessages, setOldPasswordErrorMessages] = useState('');
  const [newPasswordErrorMessages, setNewPasswordErrorMessages] = useState('');
  const [newPasswordConfErrorMessages, setNewPasswordConfErrorMessages] = useState('');

  const [touched, setTouched] = useState({
    oldPassword: false,
    newPassword: false,
    newPasswordConf: false,
  });

  const handleSubmit = async evt => {
    evt.preventDefault();
    if (validatePassword(values.oldPassword) == '' && validatePassword(values.newPassword) == '') {
      UserService.changePassword(values)
      .then(response => {
        showSuccessMessage('Change password successfully!');
        props.setIsSubmitted(true);
      })
      .catch(error => {
        if (error.response && error.response.status === 400)
          console.clear();
        showErrorMessage('Error: ' + error.response.data);
      });
    }
  };

  const handleChange = evt => {
    setValues({
      ...values,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleClose = () => {
    props.setShow(false);
    props.setIsSubmitted(false);
    setValues({
      ...values,
      oldPassword: '',
      newPassword: '',
      newPasswordConf: '',
    });
    setTouched(false, false);
    setOldPasswordErrorMessages('');
    setNewPasswordErrorMessages('');
  };

  const handleBlur = async evt => {
    setTouched({
      ...touched,
      [evt.target.name]: true,
    });

    // if (values.oldPassword !== '') {
    //   const response = await checkPassword(values);
    //   setOldPasswordErrorMessages(response.data);
    // }

    // setOldPasswordErrorMessages(validatePassword(values.oldPassword));
    setNewPasswordErrorMessages(validatePassword(values.newPassword));
    setNewPasswordConfErrorMessages(validateConfPassword(values.newPassword, values.newPasswordConf));
    if (values.newPassword !== values.newPasswordConf) setNewPasswordConfErrorMessages('Password are not matching');
  };

  const formValid =
    oldPasswordErrorMessages == '' &&
    newPasswordErrorMessages == '' &&
    newPasswordConfErrorMessages == '' &&
    values.newPassword != '' &&
    values.oldPassword != '' &&
    values.oldPasswordConf != '';

  return (
    <Formik
      validate={values => {
        let errors = {};
        errors.oldPassword = validatePassword(values.oldPassword);
        errors.newPassword = validatePassword(values.newPassword);

        return errors;
      }}
      initialValues={{ oldPassword: '', newPassword: '' }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);
        }, 500);
      }}
    >
      {() => {
        return (
          <form onSubmit={handleSubmit}>
            <div className="grid-container">
              <label htmlFor="oldPassword" className="grid-item">
                Old password
              </label>
              <div className="grid-item">
                <input
                  id="oldPassword"
                  name="oldPassword"
                  type={`${revealOldPassword ? 'text' : 'password'}`}
                  placeholder="Enter your old password"
                  value={values.oldPassword}
                  maxLength="50"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={oldPasswordErrorMessages && touched.oldPassword && 'error'}
                />
                {oldPasswordErrorMessages && touched.oldPassword && (
                  <div className="input-feedback_changepassword">{oldPasswordErrorMessages}</div>
                )}
                <div className="wrapper">
                  <div className="icon">
                    {!revealOldPassword ? (
                      <FontAwesomeIcon
                        icon={faEye}
                        className="cursor-pointer absolute text-gray-500"
                        onClick={() => setRevealOldPassword(true)}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faEyeSlash}
                        className="cursor-pointer absolute text-gray-500"
                        onClick={() => setRevealOldPassword(false)}
                      />
                    )}
                  </div>
                </div>
              </div>

              <label htmlFor="newPassword" className="grid-item">
                New Password
              </label>
              <div className="grid-item">
                <input
                  id="newPassword"
                  name="newPassword"
                  type={`${revealNewPassword ? 'text' : 'password'}`}
                  placeholder="Enter your new password"
                  value={values.newPassword}
                  maxLength="50"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={newPasswordErrorMessages && touched.newPassword && 'error'}
                />
                {newPasswordErrorMessages && touched.newPassword && (
                  <div className="input-feedback_changepassword">{newPasswordErrorMessages}</div>
                )}
                <div className="wrapper">
                  <div className="icon">
                    {!revealNewPassword ? (
                      <FontAwesomeIcon
                        icon={faEye}
                        className="cursor-pointer absolute text-gray-500"
                        onClick={() => setRevealNewPassword(true)}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faEyeSlash}
                        className="cursor-pointer absolute text-gray-500"
                        onClick={() => setRevealNewPassword(false)}
                      />
                    )}
                  </div>
                </div>
              </div>

              <label htmlFor="newPasswordConf" className="grid-item">
                Confirm Password
              </label>
              <div className="grid-item">
                <input
                  id="newPasswordConf"
                  name="newPasswordConf"
                  type={`${revealNewPasswordConf ? 'text' : 'password'}`}
                  placeholder="Confirm new password"
                  value={values.newPasswordConf}
                  maxLength="50"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={newPasswordConfErrorMessages && touched.newPasswordConf && 'error'}
                />
                {newPasswordConfErrorMessages && touched.newPasswordConf && (
                  <div className="input-feedback_changepassword">{newPasswordConfErrorMessages}</div>
                )}
                <div className="wrapper">
                  <div className="icon">
                    {!revealNewPasswordConf ? (
                      <FontAwesomeIcon
                        icon={faEye}
                        className="cursor-pointer absolute text-gray-500"
                        onClick={() => setRevealNewPasswordConf(true)}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faEyeSlash}
                        className="cursor-pointer absolute text-gray-500"
                        onClick={() => setRevealNewPasswordConf(false)}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex flex-row-reverse" style={{ paddingTop: '40px' }}>
              <Button variant="" style={{ marginLeft: '20px', border: 'solid 1px #046380' }} onClick={handleClose}>
                Cancel
              </Button>
              <Button
                disabled={!formValid}
                className="d-flex text-light shadow-none "
                type="submit"
                value="Submit"
                style={{ backgroundColor: '#046380' }}
              >
                Save
              </Button>
            </div>
          </form>
        );
      }}
    </Formik>
  );
}

export default ValidatedChangePasswordForm;
