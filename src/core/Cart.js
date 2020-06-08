import React, { useState, useEffect, Fragment } from 'react';
import Layout from './Layout';
import Card from './Card';
import { Link } from 'react-router-dom';
import { getCart } from './cartHelpers';
import Checkout from './Checkout';

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);
  useEffect(() => {
    console.log('Max depth .....');
    setItems(getCart);
  }, [run]);

  const showItems = (items) => {
    return (
      <div>
        <h2>Your cart has {`${items.length}`} items</h2>
        <hr />
        <div className='row'>
          {items.map((product, i) => (
            <div className='col-4 mb-3'>
              <Card
                key={i}
                product={product}
                showAddToCartButton={false}
                cartUpdate={true}
                showRemoveProductButton={true}
                setRun={setRun}
                run={run}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const noItemsMessage = () => (
    <Fragment>
      {' '}
      <h2> Your cart is empty </h2>
      <h5>
        <br /> <Link to='/shop'>Continue shopping</Link>
      </h5>
    </Fragment>
  );
  return (
    <div>
      <Layout
        title='Shopping Cart page'
        description='Manage your cart items here. Add remove checkout or continue shopping.'
        className='container-fluid'
      >
        <div className='row'>
          <div className='col-6'>
            {items.length > 0 ? showItems(items) : noItemsMessage()}
          </div>
          <div className='col-6'>
            <p>
              <Checkout products={items} setRun={setRun} run={run}></Checkout>
            </p>
          </div>
        </div>
      </Layout>
    </div>
  );
};
export default Cart;
