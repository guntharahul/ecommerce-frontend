import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';
import { listOrders, getStatusValues, updateOrderStatus } from './apiAdmin';
import { Link } from 'react-router-dom';
import moment from 'moment';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [statusValues, setStatusValues] = useState([]);
  const [error, setError] = useState(false);
  const { user, token } = isAuthenticated();
  const loadOrders = () => {
    listOrders(user._id, token).then((data, error) => {
      if (error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };

  const loadStatusValues = () => {
    getStatusValues(user._id, token).then((data, error) => {
      if (error) {
        console.log(data.error);
      } else {
        setStatusValues(data);
      }
    });
  };

  useEffect(() => {
    loadOrders();
    loadStatusValues();
  }, []);

  const showOrdersLength = () => {
    if (orders.length > 0) {
      return (
        <h1 className='text-danger display-2'>Total orders: {orders.length}</h1>
      );
    } else {
      return <h1 className='text-danger'>No orders</h1>;
    }
  };

  const showInput = (key, value) => (
    <div className='input-group mb-2 mr-sm-2'>
      <div className='input-group-prepend'>
        <div className='input-group-text'>{key}</div>
      </div>
      <input
        type='text'
        value={value}
        className='form-control'
        readOnly
      ></input>
    </div>
  );

  const handleStatusChange = (e, orderId) => {
    //update the order status in the backend
    updateOrderStatus(user._id, token, orderId, e.target.value).then((data) => {
      if (data.error) {
        console.log('Status update failed');
      } else {
        loadOrders();
      }
    });
  };

  const showStatus = (o) => (
    <div className='form-group'>
      <h3 className='mark mb-4'> Status: {o.status}</h3>
      <select
        className='form-control'
        onChange={(e) => handleStatusChange(e, o._id)}
      >
        <option>Update Status</option>
        {statusValues.map((s, sIndex) => (
          <option key={sIndex} value={s}>
            {s}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div>
      <Layout
        title='All orders'
        description='List of all orders'
        className='container-fluid'
      >
        <div className='row'>
          <div className='col-md-10 offset-md-1'>
            {showOrdersLength()}
            {orders.map((o, oIndex) => {
              return (
                <div
                  key={oIndex}
                  className='mt-5'
                  style={{ borderBottom: '5px solid red' }}
                >
                  <h2 className='mb-2'>
                    <span className=''>OrderId: {o._id}</span>
                  </h2>
                  <ul className='list-group mb-2'>
                    <li className='list-group-item'>{showStatus(o)}</li>
                    <li className='list-group-item'>
                      TransactionId: {o.transaction_id}
                    </li>
                    <li className='list-group-item'>Amount: {o.amount}</li>
                    <li className='list-group-item'>
                      Ordered By: {o.user.name}
                    </li>
                    <li className='list-group-item'>
                      Ordered on: {moment(o.createdAt).fromNow()}
                    </li>
                    <li className='list-group-item'>
                      Delivery Address: {o.address}
                    </li>
                  </ul>
                  <h3 className='mt-4 mb-4 font-bold'>
                    Total products in the order:{o.products.length}
                  </h3>
                  {o.products.map((p, pIndex) => {
                    return (
                      <div
                        className='mb-4'
                        key={pIndex}
                        style={{ padding: '20px', border: '1px solid red' }}
                      >
                        {showInput('Product name', p.name)}
                        {showInput('Product price', p.price)}
                        {showInput('Product total', p.count)}
                        {showInput('Product Id', p._id)}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Orders;
