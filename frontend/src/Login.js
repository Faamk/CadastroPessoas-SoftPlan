import React, {Component} from "react";
import AppNavbar from "./AppNavBar";
import {Alert, Button, Container, Form, FormGroup, Input, Label} from "reactstrap";


class Login extends Component {
    loginInfoEmpty = {
        usuario: "",
        senha: "",
        logado: false,
        errado: false
    }

    constructor(props) {
        super(props);
        this.state = {
            loginInfo: this.loginInfoEmpty
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let loginInfo = {...this.state.loginInfo};
        loginInfo[name] = value;
        this.setState({loginInfo});
    }


    async handleSubmit(event) {
        event.preventDefault();
        const {loginInfo} = this.state;
        let headers = new Headers();
        headers.set('Authorization', 'Basic ' + btoa(loginInfo.usuario + ":" + loginInfo.senha));
        headers.set('Accept', 'application/json');
        headers.set('Content-Type', 'application/json');


        await fetch('http://localhost:8080/api/pessoa/', {
            method: 'GET',
            headers: headers,
            credentials: 'include'
        }).then(value => {

            if (value.status === 401) {
                this.setState(prevState => {
                    let loginInfo = Object.assign({}, prevState.loginInfo);
                    loginInfo.errado = true;
                    return {loginInfo: loginInfo};
                });
            } else if (value.status === 200) {
                this.setState(prevState => {
                    let loginInfo = Object.assign({}, prevState.loginInfo);
                    loginInfo.logado = true;
                    return {loginInfo: loginInfo};
                });
                this.props.history.push('/pessoas');

            }

        }).catch(reason => console.log(reason))
    }


    render() {
        const {loginInfo} = this.state;


        return <div>
            <AppNavbar/>
            <h2 style={{textAlign: "center"}} >Login</h2>
            <Container>
                <div>
                    <Alert color="warning" isOpen={loginInfo.errado}>
                        Nome ou Senha Inválidos!
                    </Alert>
                </div>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="usuario">Usuário: </Label>
                        <Input type="text" name="usuario" id="usuario" value={loginInfo.usuario || ''}
                               onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="senha">Senha: </Label>
                        <Input type="password" name="senha" id="senha" value={loginInfo.senha || ''}
                               onChange={this.handleChange}>
                        </Input>
                    </FormGroup>

                    <FormGroup>
                        <Button color="primary" type="submit">Logar</Button>{' '}
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default Login;
