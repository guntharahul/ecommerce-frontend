import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';
import { getProducts, getProduct, deleteProduct } from './apiAdmin';
import { Link } from 'react-router-dom';
const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const { user, token } = isAuthenticated();
  const loadProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  const destroy = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadProducts();
      }
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Layout
      title='Manage products'
      description='Perform crud on products'
      className='container-fluid'
    >
      <div className='row'>
        <div className='col-12'>
          <h2 className='text-left'>
            Total number of products: {products.length}
          </h2>
          <hr></hr>
          <ul className='list-group'>
            {products.map((p, i) => (
              <li
                key={i}
                className='list-group-item d-flex justify-content-between align-items-center'
              >
                <strong>{p.name}</strong>
                <Link to={`/admin/product/update/${p._id}`}>
                  <span className='badge badge-warning badge-pill'>
                    Update page
                  </span>
                </Link>
                <span
                  onClick={() => {
                    destroy(p._id);
                  }}
                  className='badge badge-danger badge-pill'
                >
                  Delete
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};
export default ManageProducts;
