import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavBar';
import {Container, NavItem, NavLink} from 'reactstrap';

class Home extends Component {
    render() {
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <h1>Link para o repositório no GitHub</h1>
                    <NavItem>
                        <NavLink href="#">Link</NavLink>
                    </NavItem>
                </Container>
            </div>
        );
    }
}

export default Home;