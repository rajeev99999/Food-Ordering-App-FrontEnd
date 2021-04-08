import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import Header from '../../common/header/Header';
import {withStyles} from '@material-ui/core';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';


import Fade from '@material-ui/core/Fade';
import './Details.css'

const styles = (theme => ({

    textRatingCost: { 
        'text-overflow': 'clip',
        'width': '145px',
        'color': 'grey'
    },
    restaurantName: { 
        'padding': '8px 0px 8px 0px',
        'font-size': '30px',
    },
    restaurantCategory: { 
        'padding': '8px 0px 8px 0px'
    }, 
    avgCost: { 
        'padding-left': '5px'
    },

}))
class Details extends Component{
    constructor() {
        super()
        this.state = {
            restaurantDetails: [],
            categories: [],
            cartItems: [],
            totalAmount:0,
            snackBarOpen: false,
            snackBarMessage: "",
            transition: Fade,
            badgeVisible:false,
        }
    }
     
    componentDidMount() {
        let data = null;
        let that = this;
        let xhrRestaurantDetails = new XMLHttpRequest()
        xhrRestaurantDetails.addEventListener("readystatechange", function () {
            if (xhrRestaurantDetails.readyState === 4 && xhrRestaurantDetails.status === 200) {
                let response = JSON.parse(xhrRestaurantDetails.responseText);
                let categoriesName = [];
                //Creating array of category.
                response.categories.forEach(category => {
                    categoriesName.push(category.category_name);
                });
                //Creating Restaurant object containing relevant details.
                let restaurantDetails = {
                    id: response.id,
                    name: response.restaurant_name,
                    photoURL: response.photo_URL,
                    avgCost: response.average_price,
                    rating: response.customer_rating,
                    noOfCustomerRated: response.number_customers_rated,
                    locality: response.address.locality,
                    categoriesName: categoriesName.toString(),
                }
                let categories = response.categories;
                that.setState({
                    ...that.state,
                    restaurantDetails: restaurantDetails,
                    categories: categories,
                })
            }
        })
        //Calling the api to get details of the restaurant by id.
        xhrRestaurantDetails.open('GET', 'http://localhost:8080/api/restaurant/1dd86f90-a296-11e8-9a3a-720006ceb890')
        xhrRestaurantDetails.send(data);
    }
    render(){
        const {classes} = this.props;
        return(
            <div>
                <Header ></Header>
            {/* Restaurant Details Container */}
            <div className="restaurant-details-container">
                <div>
                    <img src={this.state.restaurantDetails.photoURL} alt="Restaurant" height="215px" width="275px" />
                </div>
                <div className="restaurant-details">
                    <div className="restaurant-name">
                        <Typography variant="h5" component="h5" className={classes.restaurantName}>{this.state.restaurantDetails.name}</Typography>
                        <Typography variant="subtitle1" component="p" className={classes.restaurantLocation}>{this.state.restaurantDetails.locality}</Typography>
                        <Typography variant="subtitle1" component="p" className={classes.restaurantCategory}>{this.state.restaurantDetails.categoriesName}</Typography>
                    </div>
                    <div className="restaurant-rating-cost-container">
                        <div className="restaurant-rating-container">
                            <div className="restaurant-rating">
                                <FontAwesomeIcon icon="star" size="sm" color="black" />
                                <Typography variant="subtitle1" component="p">{this.state.restaurantDetails.rating}</Typography>
                            </div>
                            <Typography variant="caption" component="p" className={classes.textRatingCost}  >AVERAGE RATING BY {<span className="restaurant-NoOfCustomerRated">{this.state.restaurantDetails.noOfCustomerRated}</span>} CUSTOMERS</Typography>
                        </div>
                        <div className="restaurant-avg-cost-container">
                            <div className="restaurant-avg-cost">
                                <i className="fa fa-inr" aria-hidden="true"></i>
                                <Typography variant="subtitle1" component="p" className={classes.avgCost}>{this.state.restaurantDetails.avgCost}</Typography>
                            </div>
                            <Typography variant="caption" component="p" className={classes.textRatingCost} >AVERAGE COST FOR TWO PEOPLE</Typography>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}
export default withStyles(styles)(Details);
