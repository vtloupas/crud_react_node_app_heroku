import React from 'react';
import './App.css';
import {Navigation} from "./components/Navigation";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Table from "./components/MyTable";
import {home} from "./components/home";
import MyForm from "./components/MyForm";

function App() {
  return (
    <div className="App">
        <Router>
            <Navigation />
            <Switch>
                <Route path='/' component={home} exact></Route>
                <Route path='/Table' component={Table} exact></Route>
                <Route path='/MyForm' component={MyForm} exact></Route>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
