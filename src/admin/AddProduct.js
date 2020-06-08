import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';
import { createProduct, getCategories } from './apiAdmin';
import { Link } from 'react-router-dom';
const AddProduct = () => {
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    categories: [],
    category: '',
    shipping: '',
    quantity: '',
    photo: '',
    loading: false,
    error: '',
    createdProduct: '',
    redirectToProfile: false,
    formData: '',
  });

  // destructuring default state values
  const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData,
  } = values;

  const { user, token } = isAuthenticated();

  //load categories and set form Data
  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: true });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  // use effect functions is called when ever there is a render to the component
  useEffect(() => {
    init();
  }, []); // form data should be available as soon as the component mounts

  const handleChange = (name) => (event) => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value; // we have to check photo file and capture the file
    formData.set(name, value); // setting each field to formdata
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: '', loading: true });
    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          // setting the values after the product is created
          ...values,
          name: '',
          description: '',
          photo: ' ',
          price: '',
          quantity: '',
          loading: false,
          createdProduct: data.name,
        });
      }
    });
  };
  const newPostForm = () => (
    <form className='mb-3' onSubmit={clickSubmit}>
      <h4>Post Photo</h4>
      <div className='form-group'>
        <label className='btn btn-secondary'>
          <input
            onChange={handleChange('photo')}
            type='file'
            name='photo'
            accept='image/*'
          />
        </label>
      </div>
      <div className='form-group'>
        <label className='text-muted'>Name</label>
        <input
          type='text'
          onChange={handleChange('name')}
          className='form-control'
          value={name}
        ></input>
      </div>
      <div className='form-group'>
        <label className='text-muted'>Description</label>
        <textarea
          type='text'
          onChange={handleChange('description')}
          className='form-control'
          value={description}
        ></textarea>
      </div>
      <div className='form-group'>
        <label className='text-muted'>Price</label>
        <input
          type='number'
          onChange={handleChange('price')}
          className='form-control'
          value={price}
        ></input>
      </div>
      <div className='form-group'>
        <label className='text-muted'>Category</label>
        <select onChange={handleChange('category')} className='form-control'>
          <option>Please select</option>
          {categories &&
            categories.map((c, i) => (
              <option key={i} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>
      <div className='form-group'>
        <label className='text-muted'>Shipping</label>
        <select onChange={handleChange('shipping')} className='form-control'>
          <option>Please select a option</option>
          <option value='0'>No</option>
          <option value='1'>Yes</option>
        </select>
      </div>
      <div className='form-group'>
        <label className='text-muted'>Quantity</label>
        <input
          type='number'
          onChange={handleChange('quantity')}
          className='form-control'
          value={quantity}
        ></input>
      </div>
      <button className='btn btn-outline-dark'>Create Product</button>
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
      className='alert alert-info'
      style={{ display: createdProduct ? '' : 'none' }}
    >{`${createdProduct} is created`}</div>
  );

  const showLoading = () =>
    loading && (
      <div className='alert alert-success'>
        <h2>Loading....</h2>
      </div>
    );

  return (
    <Layout
      title='Add a new Category'
      description={`Hello  ready to add a new category?`}
    >
      <div className='row'>
        <div className='col-md-8 offset-md-2'>
          {showSuccess()}
          {showError()}
          {showLoading()}
          {newPostForm()}
        </div>
      </div>
    </Layout>
  );
};
export default AddProduct;
