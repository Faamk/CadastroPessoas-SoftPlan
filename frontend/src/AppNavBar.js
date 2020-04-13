import React, { Component } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";


class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {isOpen: false};
        this.toggle = this.toggle.bind(this);
        this.logout = this.logout.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    async logout() {

        let headers = new Headers();
        headers.set('Authorization', 'Basic ' + btoa(" : "));
        headers.set('Accept', 'application/json');
        headers.set('Content-Type', 'application/json');


        await fetch('http://localhost:8080/logout', {
            method: 'POST',
            credentials: 'include',
            headers:headers


        }).then(value => {
                this.props.history.push('/');
            });

    }

    render() {
        return <Navbar color="dark" dark expand="md">
            <NavbarBrand tag={Link} to="/">Home</NavbarBrand>
            <NavbarToggler onClick={this.toggle}/>
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink
                            href="https://twitter.com/faamk">@Faamk</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="https://github.com/faamk">GitHub</NavLink>
                    </NavItem>
                    <Button onClick={this.logout}> Logout </Button>
                </Nav>
            </Collapse>
        </Navbar>;
    }


} export default withRouter(AppNavbar);
