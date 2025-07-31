// src/context/AuthContext.jsx
import React, { createContext, useReducer, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import authService from '../services/auth';

export const AuthContext = createContext();

const initialState = {
  admin: null,
  token: null,
  isAuthenticated: false,
  loading: true,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        admin: action.payload.admin,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        admin: null,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'UPDATE_PROFILE':
      return {
        ...state,
        admin: action.payload,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initial auth check
  useEffect(() => {
    const token = authService.getToken();
    const admin = authService.getCurrentAdmin();

    if (token && admin) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: { token, admin } });
    } else {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const login = async (credentials) => {
    const result = await authService.login(credentials);
    dispatch({ type: 'LOGIN_SUCCESS', payload: result });
    return result;
  };

  const register = async (userData) => {
    const result = await authService.register(userData);
    dispatch({ type: 'REGISTER_SUCCESS', payload: result });
    return result;
  };

  const logout = () => {
    authService.logout();
    dispatch({ type: 'LOGOUT' });
  };

  const updateProfile = async () => {
    const updatedAdmin = await authService.getProfile();
    dispatch({ type: 'UPDATE_PROFILE', payload: updatedAdmin });
    return updatedAdmin;
  };

  const value = useMemo(() => ({
    ...state,
    login,
    register,
    logout,
    updateProfile,
  }), [state]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
