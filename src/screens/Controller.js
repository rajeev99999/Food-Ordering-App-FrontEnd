import React, {Component} from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';

class Controller extends Component{
    constructor(){
        super()
        this.baseUrl = "https://localhost:8080/api"
    }
    render(){
        return(
            <Router>

            </Router>
        )
    }
}

export default Controller;