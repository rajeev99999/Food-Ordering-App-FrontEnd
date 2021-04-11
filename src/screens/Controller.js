import React, {Component} from 'react';
import Details from './details/Details';
import Home from './home/Home';
import Checkout from './checkout/Checkout';
import {BrowserRouter as Router,Route} from 'react-router-dom';

class Controller extends Component{
    constructor(){
        super()
        this.baseUrl = "https://localhost:8080/api"
    }
    render(){
        return(
            <Router>
                <div className="main-container">
                    <Route path='/checkout' render={(props) => <Checkout {...props} baseUrl={this.baseUrl} />} /> {/* Route to Checkout Page */}
                    <Route path='/restaurant/:id' render={(props) => <Details {...props} baseUrl={this.baseUrl} />} /> {/* Route to restaurant details Page */}
                    <Route exact path='/' render={(props) => <Home {...props} baseUrl={this.baseUrl}/>}/>
                </div>

            </Router>
        )
    }
}

export default Controller;