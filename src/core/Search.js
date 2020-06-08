import React, { useEffect, useState } from 'react';
import { getCategories, list } from './apiCore';
import Card from './Card';
const Search = () => {
  const [data, setData] = useState({
    categories: [], // this is for list of all categories for search bar drop down
    category: '', // to get the selected category from the drop down
    search: '', // key words typed in the search bar
    results: [], // products from the search bar
    searched: false,
  });

  const { categories, category, search, results, searched } = data;
  const loadCategories = () => {
    // getting all the categories for the search bar
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data });
      }
    });
  }; // this function shhould be runned when the component is rendered

  useEffect(() => {
    loadCategories();
  }, []);

  const searchData = () => {
    // console.log(search, category);
    if (search) {
      list({
        // will call the function and get the data from DB base on search params and category
        search: search || undefined,
        category: category,
      }).then((response) => {
        if (response.error) {
          console.log(response.error);
        } else {
          setData({ ...data, results: response, searched: true });
        }
      });
    }
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    // we need search, take category from the state, and make request to backend and get data
    searchData();
  };
  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `Found ${results.length} products`;
    }
    if (searched && results.length < 1) {
      return 'No products found for your search';
    }
  };

  // displaying the searched products
  const searchedProducts = (result = []) => {
    return (
      <div>
        <h2>{searchMessage(searched, results)}</h2>
        <div className='row'>
          {result.map((product, i) => (
            <div className='col-2'>
              <Card key={i} product={product}></Card>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const searchForm = () => {
    return (
      <form onSubmit={searchSubmit}>
        <span className='input-group-text bg-dark'>
          <div className='input-group input-group-lg'>
            <div className=' input-group-prepend'>
              <select className='btn mr-2 ' onChange={handleChange('category')}>
                {' '}
                <option className='text-white' value='All'>
                  Select Category
                </option>
                {categories.map((c, i) => (
                  <option key={i} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <input
              type='search'
              className='form-control bg-dark text-white '
              placeholder='Search your favorite products here......'
              onChange={handleChange('search')}
            ></input>
          </div>
          <div
            className='btn input-group-append ml-2'
            style={{ border: 'none' }}
          >
            <button className='input-group-text bg-dark text-white'>
              Search
            </button>
          </div>
        </span>
      </form>
    );
  };
  return (
    <div className='row'>
      <div className='container'>{searchForm()}</div>
      <div className='container-fluid'>{searchedProducts(results)}</div>
      {/* <div>{JSON.stringify(results)}</div> */}
    </div>
  );
};

export default Search;
