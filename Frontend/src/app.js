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
import Home from "./Components/Home/Home";
import Register from "./Components/Auth/Register";
import Login from "./Components/Auth/Login";
import { Room } from "./Components/Room/Room";
import AddRoom from "./Components/Room/AddRoom";
import { Reservation } from "./Components/Reservation/Reservation";
import AddReservation from "./Components/Reservation/AddReservation";
import GetReservationsAvailability from "./Components/Reservation/GetReservationsAvailability";
import { ReservationsAvailability } from "./Components/Reservation/ReservationsAvailability";




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
              <PrivateRoute exact path="/home"                        component={Home} />
              <PrivateRoute exact path='/reservation'                 component={Reservation} />
              <PrivateRoute exact path='/add-reservation'             component={AddReservation} />
              <PrivateRoute exact path='/edit-reservation/:id'        component={AddReservation} />
              <PrivateRoute exact path='/getreservationsavailability' component={GetReservationsAvailability} />
              <PrivateRoute exact path='/reservationsavailability'    component={ReservationsAvailability} />
              <PrivateRoute exact path='/room'                        component={Room} />
              <PrivateRoute exact path='/add-room'                    component={AddRoom} />
              <PrivateRoute exact path='/edit-room/:id'               component={AddRoom} />
              <Redirect from='*' to='/' />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;