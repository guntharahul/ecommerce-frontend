import { API } from '../config';

export const signup = (user) => {
  // console.log(name, email, password);
  // @ making request to the API for User Signup
  return fetch(`${API}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const signin = (user) => {
  // console.log(name, email);
  // @ making request to the API for User Signup
  return fetch(`${API}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const authenticate = (data, next) => {
  if (typeof window != undefined) {
    localStorage.setItem('JWT', JSON.stringify(data));
    next();
  }
};

export const signout = (next) => {
  if (typeof window != undefined) {
    localStorage.removeItem('JWT');
    next();
    return fetch(`${API}/signout`, {
      method: 'GET',
    })
      .then((response) => {
        console.log('User Signed out', response);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

export const isAuthenticated = () => {
  if (typeof window == undefined) {
    return false;
  }
  if (localStorage.getItem('JWT')) {
    return JSON.parse(localStorage.getItem('JWT'));
  } else {
    return false;
  }
};
