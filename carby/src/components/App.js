import React from 'react';
import Landing from './landing.js';
import Dashboard from './dashboard.js'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { connect } from 'react-redux';
import { store } from '..';
import { action_loginstate } from '../actions';

function getCook(cookiename) {
    var cookiestring = RegExp("" + cookiename + "[^;]+").exec(document.cookie);
    return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./, "") : "");
}

var loginval = getCook('login');

class App extends React.Component{
    componentDidMount(){
        if(loginval === 'true'){
            store.dispatch(action_loginstate(true));                     
        }
    }
    render(){
        return (
            <Router>
                <Switch>
                    {
                        this.props.loginstate === true ?  <Route path="/" component={Dashboard} /> : <Route path="/" component={Landing} />
                    }
                </Switch>
            </Router>
        )
    }
}

function mapStateToProps(state) {
    return state;
}
export default connect(mapStateToProps)(App);