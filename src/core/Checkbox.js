import React, { useState, useEffect } from 'react';

const Checkbox = ({ categories, handleFilters }) => {
  const [checked, setChecked] = useState([]);
  const handleToggle = (c) => () => {
    // this is higher order function, a function returning other function
    //checking if the category is already in the state
    // return the first index  if the category is there or return  -1
    const currentCategoryId = checked.indexOf(c); // getting the index of category present in the state checked array
    const newCheckedCategoryId = [...checked];
    // if currently checked was not already in the checked state -> push
    // else pull off

    if (currentCategoryId === -1) {
      //push the category to the state
      newCheckedCategoryId.push(c);
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1); // removing if the category is already there in the state by getting the index of that category from the currentCategoryID and removing one category
    }
    console.log(newCheckedCategoryId);
    setChecked(newCheckedCategoryId);
    handleFilters(newCheckedCategoryId); // we need to send the checked filters to the parent function so calling a function
  };

  return categories.map((c, i) => (
    <li key={i} className='list-unstyled'>
      <input
        value={checked.indexOf(c._id === -1)} // this will be used to show the checked items
        onChange={handleToggle(c._id)}
        type='checkbox'
        className='form-check-input'
      ></input>
      <label className='form-check-label'>{c.name}</label>
    </li>
  ));
};
export default Checkbox;
