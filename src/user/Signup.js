import React, { useState } from 'react';
import Layout from '../core/Layout';
import { signup } from '../auth/index';
import { Link } from 'react-router-dom';
const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false,
  });

  const { name, email, password, error, success } = values;

  //  this is a higher order function returning other function
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
    // here the name is different which will set the name,email,passsword when it is changed in the input field
  };

  const clickSubmit = (event) => {
    event.preventDefault(); // for browser not to load when form is submitted
    setValues({ ...values, error: false }); // setting previous errors to false after submitting the form
    signup({ name, email, password }).then((data) => {
      if (data.error) {
        console.log(data.error);
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: '',
          email: '',
          password: '',
          error: '',
          success: true,
        });
      }
    });
  };
  const signUpForm = () => (
    <form>
      <div className='form-group'>
        <label className='text-muted'>Name</label>
        <input
          type='text'
          className='form-control'
          value={name}
          onChange={handleChange('name')}
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Email</label>
        <input
          type='email'
          className='form-control'
          value={email}
          onChange={handleChange('email')}
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Password</label>
        <input
          type='password'
          className='form-control'
          value={password}
          onChange={handleChange('password')}
        />
      </div>
      <button onClick={clickSubmit} className='btn btn-dark'>
        Submit
      </button>
    </form>
  );
  const showError = () => (
    <div
      className='alert alert-danger'
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  );
  const showSuccess = () => (
    <div
      className='alert alert-success'
      style={{ display: success ? '' : 'none' }}
    >
      New account is created. Please <Link to='/signin'>SignIn</Link>
    </div>
  );

  return (
    <Layout
      title='Sign Up '
      description='Sign Up to E-Cart'
      className='container col-md-8  offset-md-2'
    >
      {showSuccess()}
      {showError()}
      {signUpForm()}
      {/* {JSON.stringify(values)} */}
    </Layout>
  );
};

export default Signup;
