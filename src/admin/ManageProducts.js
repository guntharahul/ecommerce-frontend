import React, { useState } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';
import { Link } from 'react-router-dom';

const ManageProducts = () => {
  return (
    <Layout
      title='Manage products'
      description='Perform crud on products'
      className='container-fluid'
    >
      <div className='row'>
        <div></div>
      </div>
    </Layout>
  );
};
export default ManageProducts;
