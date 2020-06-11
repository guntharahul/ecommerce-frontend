import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Home from './core/Home';
import Shop from './core/Shop';
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import Dashboard from './user/UserDashboard';
import Profile from './user/Profile';
import AdminDashboard from './user/AdminDashboard';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import Orders from './admin/Orders';
import ManageProducts from './admin/ManageProducts';
import Product from './core/Product';
import Cart from './core/Cart';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Home}></Route>
        <Route path='/shop' exact component={Shop}></Route>
        <Route path='/signin' exact component={Signin}></Route>
        <Route path='/signup' exact component={Signup}></Route>
        <Route path='/product/:productId' exact component={Product}></Route>
        <Route path='/cart' exact component={Cart}></Route>
        <PrivateRoute
          path='/user/dashboard'
          component={Dashboard}
        ></PrivateRoute>
        <PrivateRoute
          path='/profile/:userId'
          component={Profile}
        ></PrivateRoute>
        <AdminRoute
          path='/admin/dashboard'
          component={AdminDashboard}
        ></AdminRoute>
        <AdminRoute
          path='/create/category'
          component={AddCategory}
        ></AdminRoute>
        <AdminRoute path='/create/product' component={AddProduct}></AdminRoute>
        <AdminRoute path='/admin/orders' component={Orders}></AdminRoute>
        <AdminRoute
          path='/admin/products'
          component={ManageProducts}
        ></AdminRoute>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
