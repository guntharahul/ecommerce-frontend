import React, { useState } from 'react';
const RadioBox = ({ prices, handleFilters }) => {
  const [value, setValue] = useState(0);
  const handleChange = (event) => {
    handleFilters(event.target.value); // sending the current selected value
    setValue(event.target.value);
  };
  return prices.map((p, i) => (
    <div key={i}>
      <input
        value={`${p._id}`} // this will be used to show the checked items
        onChange={handleChange}
        name={p}
        type='radio'
        className='mr-2 ml-4'
      ></input>
      <label className='form-check-label'>{p.name}</label>
    </div>
  ));
};

export default RadioBox;
