/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';
import jwt from 'jwt-decode';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useState(null);

  let user = null;
  let localStorageToken = localStorage.getItem('token');

  if (localStorageToken) {
    user = jwt(localStorageToken);
  }

  let value = { user, setToken };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
