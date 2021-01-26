import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Login from './components/Login';
import GasPrices from './components/GasPrices';
import PrivateRoute from './components/PrivateRoute';
import { axiosWithAuth } from './utils/axiosWithAuth';
import Loader from 'react-loader-spinner';

function App() {
  const logout = () => {
    axiosWithAuth()
      .post('/logout')
      .then(res=>{
        localStorage.removeItem('token');
        window.location.href =  '/login';
      })
      .catch(err=>{
        console.log(err);
      })
  };


  return (
    <Router>
      <div className="App">
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link onClick={logout}>Logout</Link>
          </li>
          <li>{
              (localStorage.getItem('token') && <Link to="/protected">Protected Page</Link>)
            }
          </li>
        </ul>

        <Switch>
          <PrivateRoute exact path="/protected" component={GasPrices} />
          <Route path="/login" component={Login} />
          <Route component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
