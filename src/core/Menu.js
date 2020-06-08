import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth/index';
import { itemTotal } from './cartHelpers';
const isActive = (history, path) => {
  // to make the current page active by checking the histoty of pages visited
  if (history.location.pathname === path) {
    return { color: '#ff9900' };
  } else {
    return { color: '#ffffff' };
  }
};
const Menu = ({ history }) => {
  return (
    <div>
      <ul className='nav nav-tabs bg-dark fixed-top'>
        <li className='nav-item'>
          <Link className='nav-link' style={isActive(history, '/')} to='/'>
            E-cart
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            className='nav-link'
            style={isActive(history, '/shop')}
            to='/shop'
          >
            Shop
          </Link>
        </li>
        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <li className='nav-item'>
            <Link
              className='nav-link'
              style={isActive(history, '/dashboard')}
              to='/user/dashboard'
            >
              Dashboard
            </Link>
          </li>
        )}
        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <li className='nav-item'>
            <Link
              className='nav-link'
              style={isActive(history, '/admin/dashboard')}
              to='/admin/dashboard'
            >
              Dashboard
            </Link>
          </li>
        )}

        {!isAuthenticated() && ( //  showing Sign In and Sign Out based on if user is authenticated or not
          <Fragment>
            <li>
              <Link
                className='nav-link'
                style={isActive(history, '/signup')}
                to='/signup'
              >
                Sign Up
              </Link>
            </li>
            <li>
              <Link
                className='nav-link'
                style={isActive(history, '/signin')}
                to='/signin'
              >
                Sign In
              </Link>
            </li>
          </Fragment>
        )}

        {isAuthenticated() && (
          <li>
            <span
              className='nav-link'
              style={{ cursor: 'pointer', color: '#ffffff' }}
              onClick={() =>
                signout(() => {
                  history.push('/');
                })
              }
            >
              Sign Out
            </span>
          </li>
        )}
        <li className='nav-item'>
          <Link
            className='nav-link'
            style={isActive(history, '/cart')}
            to='/cart'
          >
            Cart{' '}
            <sup>
              <small className='cart-badge'>{itemTotal()}</small>
            </sup>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default withRouter(Menu);
