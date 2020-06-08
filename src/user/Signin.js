import React, { useState } from 'react';
import Layout from '../core/Layout';
import { signin, authenticate, isAuthenticated } from '../auth/index';
import { Redirect } from 'react-router-dom';
const Signin = () => {
  const [values, setValues] = useState({
    name: '',
    email: 'guntha.rahul9@gmail.com',
    password: 'rahulg27',
    error: '',
    loading: false,
    redirectToReferer: false,
  });

  const { email, password, error, loading, redirectToReferer } = values;
  const { user } = isAuthenticated();

  //  this is a higher order function returning other function
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
    // here the name is different which will set the name,email,passsword when it is changed in the input field
  };

  const clickSubmit = (event) => {
    event.preventDefault(); // for browser not to load when form is submitted
    setValues({ ...values, error: false, loading: true }); // setting previous errors to false after submitting the form
    signin({ email, password }).then((data) => {
      if (data.error) {
        console.log(data.error);
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          // saving the user data to browser local storage
          setValues({
            ...values,
            redirectToReferer: true, // Redirecting the user to some other page when he successfully logs in.
          });
        });
      }
    });
  };
  const signInForm = () => (
    <form>
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
  const showLoading = () =>
    loading && (
      <div className='alert alert-info'>
        <h2>Loading</h2>
      </div>
    );

  const redirectUser = () => {
    if (redirectToReferer) {
      if (user && user.role === 1) {
        return <Redirect to='/admin/dashboard'></Redirect>;
      } else {
        return <Redirect to='/user/dashboard'></Redirect>;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to='/'></Redirect>;
    }
  };
  return (
    <Layout
      title='SignIn '
      description='SignIn to E-Cart'
      className='container col-md-8  offset-md-2'
    >
      {showLoading()}
      {showError()}
      {signInForm()}
      {redirectUser()}
      {/* {JSON.stringify(values)} */}
    </Layout>
  );
};

export default Signin;
