import React, {Component} from 'react';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import './Header.css';

const styles = (theme => ({
    loginButton: { 
        "font-weight": 400,
        "margin":"8px 8px 8px 8px"

    }
}))

class Header extends Component{
    render(){

        const {classes} = this.props;
        return(
            <div>
                <header className="app-header">
                    <FastfoodIcon className="logo" fontSize="large" htmlColor="white"/>
                    <Button className={classes.loginButton} size="medium" variant="contained" >
                            <AccountCircle className="login-button-icon" />
                            &nbsp; LOGIN
                    </Button>
                </header>
            </div>
        );
    }
}
export default withStyles(styles)(Header);