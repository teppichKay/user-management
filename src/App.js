import React, { Component } from 'react';
//import logo from './logo.svg';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import Header from './components/Header/Header';
import UserList from './components/UserList/UserList';
import PostUser from './components/PostUser/PostUser';
import UpdateUser from './components/UpdateUser/UpdateUser';

class App extends Component {
    render() {
  
        return (
            <div className="App">
                <Header />
                <Switch>
                    <Route path="/add" component={PostUser} />
                    <Route path="/update" component={UpdateUser} />
                    <Route path="/" exact component={UserList} />

                </Switch>
            </div>
        );
    }
}

export default App;

