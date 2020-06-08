import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';
import Search from './Search';
const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts('sold').then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setProductsBySell(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts('createdAt').then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setProductsByArrival(data);
      }
    });
  };
  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  return (
    <Layout
      title='Home page'
      description='Welcome to my Ecommerce'
      className='container-fluid'
    >
      <Search></Search>
      <hr></hr>
      {/* {JSON.stringify(productsByArrival)}
      <hr></hr>
      {JSON.stringify(productsBySell)} */}
      <h2 className='mb-4 mt-4'>Best selling Products</h2>
      <div className='row'>
        {productsBySell.map((product, i) => (
          <div key={i} className='col-2 mb-3'>
            <Card product={product}></Card>
          </div>
        ))}
      </div>

      <h2 className='mb-4'>New Arrivals</h2>
      <div className='row'>
        {productsByArrival.map((product, i) => (
          <div key={i} className='col-2 mb-3'>
            <Card product={product}></Card>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
