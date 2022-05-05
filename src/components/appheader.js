import React, { Component } from 'react';
import {Navbar, NavItem, Nav} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {connect} from "react-redux";
import { withRouter } from "react-router-dom";
import {logoutUser} from "../actions/authActions";

class AppHeader extends Component {

    logout(){
        this.props.dispatch(logoutUser());
    }

    render() {
        return (
            <div>
                <header  className='App-Header'>
                    <Navbar className='App-Header'>
                        <Navbar.Header>
                            <Navbar.Brand>
                                Check Meowt
                            </Navbar.Brand>
                        </Navbar.Header>
                        <Nav>
                            <LinkContainer to="/">
                                <NavItem eventKey={1}>Home </NavItem>
                            </LinkContainer>
                            <LinkContainer to="/signin">
                                <NavItem eventKey={2}>{this.props.loggedIn ? <button onClick={this.logout.bind(this)}>Logout</button> : 'Login'}</NavItem>
                            </LinkContainer>
                        </Nav>
                    </Navbar>
                </header>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn,
        username: state.auth.username,
    }
}
export default withRouter(connect(mapStateToProps)(AppHeader));