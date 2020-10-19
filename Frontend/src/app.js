import React, { Component } from "react";
import { Redirect } from 'react-router';
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { setCurrentUser, logoutUser } from "./Actions/AuthActions";
import SetAuthToken from "./Helpers/SetAuthToken";
import History from "./Helpers/History";
import Store from "./Reducers/Store";
import PrivateRoute from "./Config/Private-Route/PrivateRoute";
import Dashboard from "./Components/Dashboard/Dashboard";
import Register from "./Components/Auth/Register";
import Login from "./Components/Auth/Login";
import { Vendor } from "./Components/Vendors/Vendor";
import AddVendor from "./Components/Vendors/AddVendor";
import { Product } from "./Components/Product/Product";
import AddProduct from "./Components/Product/AddProduct";
import { Customer } from "./Components/Customer/Customer";
import AddCustomer from "./Components/Customer/AddCustomer";
import { Category } from "./Components/Category/Category";
import  Teste  from "./Components/Category/Teste";
import AddCategory from "./Components/Category/AddCategory";
import { Movie } from "./Components/Movie/Movie";
import { Tournament } from "./Components/Tournament/Tournament";
import TournamentResult from "./Components/TournamentResult/TournamentResult";
import { TournamentList } from "./Components/TournamentList/TournamentList";

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  SetAuthToken(token);
  const decoded = jwt_decode(token);
  Store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 7200;
  if (decoded.exp < currentTime) {
    Store.dispatch(logoutUser());
    window.location.href = "./";
  }
}


class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <Router History={History}>
          <div className="App">
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <Switch>
              <PrivateRoute exact path="/home"                  component={Dashboard} />
              <PrivateRoute exact path="/vendor"                component={Vendor} />
              <PrivateRoute exact path='/add-vendor'            component={AddVendor} />
              <PrivateRoute exact path='/edit-vendor/:id'       component={AddVendor} />
              <PrivateRoute exact path='/product'               component={Product} />
              <PrivateRoute exact path='/add-product'           component={AddProduct} />
              <PrivateRoute exact path='/edit-product/:id'      component={AddProduct} />
              <PrivateRoute exact path='/customer'              component={Customer} />
              <PrivateRoute exact path='/add-customer'          component={AddCustomer} />
              <PrivateRoute exact path='/edit-customer/:id'     component={AddCustomer} />
              <PrivateRoute exact path='/category'              component={Category} />
              <PrivateRoute exact path='/category/:startDateIndex?' component={Category} />
              <PrivateRoute exact path='/add-category'          component={AddCategory} />
              <PrivateRoute exact path='/edit-category/:id'     component={AddCategory} />
              <PrivateRoute exact path="/filme"                 component={Movie} />
              <PrivateRoute exact path="/torneio"               component={Tournament} />
              <PrivateRoute exact path='/resultadotorneio'      component={TournamentResult} />
              <PrivateRoute exact path='/resultadotorneio/:id'  component={TournamentResult} />
              <PrivateRoute exact path='/torneiosrealizados'    component={TournamentList} />
              <Redirect from='*' to='/' />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;