import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import Card from './Card';
import { getCategories, getFilteredProducts } from './apiCore';
import Checkbox from './Checkbox';
import RadioBox from './RadioBox';
import { prices } from './fixedPrices';
const Shop = () => {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] }, // using the state to set the filters by category and price range
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0); // when we get the response after getting products we have the size field in the response
  const [filteredResults, setFilteredResults] = useState([]);

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  const loadFilteredResults = (newFilters) => {
    // getting the data based on filters
    getFilteredProducts(skip, limit, newFilters).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setFilteredResults(data.data); // the result is in data inside the object
        setSize(data.size); // setting the size of no. of products we got from DB.
        setSkip(0);
      }
    });
  };

  const loadMore = () => {
    let toskip = skip + limit;
    // getting the data based on filters
    getFilteredProducts(toskip, limit, myFilters.filters).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setFilteredResults([...filteredResults, ...data.data]); // adding old data with Load more data
        setSize(data.size); // setting the size of no. of products we got from DB.
        setSkip(toskip);
      }
    });
  };
  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className='btn btn-danger mb-5'>
          Loadmore
        </button>
      )
    );
  };

  useEffect(() => {
    init();
    loadFilteredResults(skip, limit, myFilters.filters);
  }, []);

  //passing the checked categories from Checkbox component to Shop
  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;
    if (filterBy == 'price') {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }
    loadFilteredResults(myFilters.filters); // get the products based on the filters
    setMyFilters(newFilters);
  };

  const handlePrice = (value) => {
    const data = prices;
    let array = [];
    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };

  return (
    <Layout
      title="Want to buy your Favourite design Tshirt's ?"
      description='Find products of your choice'
      className='container-fluid'
    >
      {/* {JSON.stringify(productsByArrival)}
      <hr></hr>
      {JSON.stringify(productsBySell)} */}
      <div className='row'>
        <div className='col-2'>
          <h4>Filter by categories</h4>
          <ul>
            {' '}
            <Checkbox
              categories={categories}
              handleFilters={(filters) => handleFilters(filters, 'category')}
            ></Checkbox>
          </ul>
          <h4>Filter by price range</h4>
          <div>
            {' '}
            <RadioBox
              prices={prices}
              handleFilters={(filters) => handleFilters(filters, 'price')}
            ></RadioBox>
          </div>
        </div>
        <div className='col-10'>
          <h2 className='mb-4 mx-auto'>Best selling Products</h2>
          <div className='row'>
            {filteredResults.map((product, i) => (
              <div key={i} className='col-2 mb-3'>
                <Card product={product} />
              </div>
            ))}
          </div>
          <hr></hr>
          {loadMoreButton()}
          {/* {JSON.stringify(filteredResults)} */}
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
