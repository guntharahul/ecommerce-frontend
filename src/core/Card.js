import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import { addItem, updateItem, removeItem } from './cartHelpers';
const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = (f) => f,
  run = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showViewButton = (showViewProductButton) => {
    return (
      <Link to={`/product/${product._id}`}>
        {showViewProductButton && (
          <button className='btn btn-outline-dark mt-2 mb-2 mr-2'>
            View Product
          </button>
        )}
      </Link>
    );
  };
  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to='/cart'></Redirect>;
    }
  };

  const showAddToCart = (showAddToCartButton) => {
    return (
      showAddToCartButton && (
        <button
          onClick={addToCart}
          className='btn btn-outline-warning mt-2 mb-2'
        >
          Add to Cart
        </button>
      )
    );
  };
  const showRemoveButton = (showRemoveProductButton) => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItem(product._id);
            setRun(!run);
          }}
          className='btn btn-outline-danger mt-2 mb-2'
        >
          Remove Product
        </button>
      )
    );
  };

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className='badge bg-primary badge-pill'>In stock</span>
    ) : (
      <span className='badge bg-danger badge-pill'>Out of stock</span>
    );
  };

  const handleChange = (productId) => (event) => {
    setRun(!run); // run useEffect in parent cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    } // whatever user types as input we are setting as count
  };
  // function for showing updated cart items
  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <div className='input-group mb-3'>
          <div className='input-group-prepend'>
            <span className='input-group-text'>Quantity</span>
          </div>
          <input
            type='number'
            className='form-control'
            value={count}
            onChange={handleChange(product._id)}
          ></input>
        </div>
      )
    );
  };
  return (
    <div className='card'>
      <div className='card-header name'>{product.name}</div>
      <div className='card-body'>
        {shouldRedirect(redirect)}
        <ShowImage item={product} url='product'></ShowImage>
        <p className='lead mt-2'>{product.description.substring(0, 100)}</p>
        {/* decreasing the size of the descritption to 100 characters */}
        <p className='black-10'>Rs. {product.price}</p>
        <p className='black-9'>Product Category: {product.category.name}</p>
        <p className='black-8'>
          Added on: {moment(product.createdAt).fromNow()}
        </p>
        {showStock(product.quantity)}
        <br></br>
        {showViewButton(showViewProductButton)}
        {showAddToCart(showAddToCartButton)}
        {showRemoveButton(showRemoveProductButton)}
        {showCartUpdateOptions(cartUpdate)}
      </div>
    </div>
  );
};

export default Card;
