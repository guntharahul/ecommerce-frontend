import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';
import { Link } from 'react-router-dom';
import { read, update, updateUser } from './apiUser';

const Profile = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    //not mandatory for user to update email
    password: '',
    error: '',
    success: false,
  });

  const { name, email, password, error, success } = values;

  const init = () => {
    // grabbing the userId from params and getting the user details when the update profile link is clicked.
  };
  useEffect(() => {
    init();
  }, []);
};
export default Profile;
