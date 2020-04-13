import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Button, Container, Form, FormGroup, Input, Label, Alert} from 'reactstrap';
import AppNavbar from './AppNavBar';
import InputMask from 'react-input-mask';
import DatePicker from 'reactstrap-date-picker';
import {validate as validateCPF} from 'gerador-validador-cpf'

class PessoaEdit extends Component {


    emptyPessoa = {
        id: '',
        nome: '',
        email: '',
        datanasc: '',
        naturalidade: '',
        nacionalidade: '',
        cpf: '',
        sexo: ''
    };

    emptyInvalid = {
        email: false,
        datanasc: false,
        cpf: false,
        cpfPres: false,
        nome: false,
        server: false
    }

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyPessoa,
            invalid: this.emptyInvalid
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {

        if (this.props.match.params.id !== 'new') {
            const pessoa = await (await fetch("http://localhost:8080/api/pessoa/" + this.props.match.params.id,
                {
                    credentials: 'include',

                }).then(value => {
                    if (value.status === 401) {
                        this.props.history.push('/')
                    }
                    return value;

                }
            )).json()
            this.setState({item: pessoa});
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }


    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;
        this.setState({
            invalid: this.emptyInvalid
        })


        function validate(self) {
            let valid = true;
            if (!item.datanasc) {
                self.setState(prevState => {
                    let invalid = Object.assign({}, prevState.invalid);
                    invalid.datanasc = true;
                    return {invalid};
                });
                valid = false;
            }
            if (!item.nome || item.nome === "") {
                self.setState(prevState => {
                    let invalid = Object.assign({}, prevState.invalid);
                    invalid.nome = true;
                    return {invalid};
                });
                valid = false;
            }

            if (item.email != null) {

                const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                const validsyntax = re.test(String(item.email).toLowerCase());
                if (!validsyntax) {
                    self.setState(prevState => {
                        let invalid = Object.assign({}, prevState.invalid);
                        invalid.email = true;
                        return {invalid};
                    });
                    valid = false;
                }
            }
            if (!validateCPF(item.cpf)) {
                self.setState(prevState => {
                    let invalid = Object.assign({}, prevState.invalid);
                    invalid.cpf = true;
                    return {invalid};
                });
                valid = false;
            }
            if (item.sexo === "\u0000") {
                item.sexo = "N"
            }

            return valid;
        }

        if (validate(this)) {

            if (item.id) {
                await fetch('http://localhost:8080/api/pessoa/' + item.id, {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify(item),
                }).then(value => {

                    if (value.status === 417) {
                        this.setState(prevState => {
                            let invalid = Object.assign({}, prevState.invalid);
                            invalid.cpfPres = true;
                            return {invalid};
                        });
                    }
                    if (value.status === 400) {
                        this.setState(prevState => {
                            let invalid = Object.assign({}, prevState.invalid);
                            invalid.server = true;
                            return {invalid};
                        });
                    } else {
                        this.props.history.push('/pessoas');
                    }
                });
            } else {

                await fetch('http://localhost:8080/api/pessoa', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',

                    body: JSON.stringify(item),
                }).then(value => {

                    if (value.status === 417) {
                        this.setState(prevState => {
                            let invalid = Object.assign({}, prevState.invalid);
                            invalid.cpfPres = true;
                            return {invalid};
                        });
                    }
                    if (value.status === 400) {
                        this.setState(prevState => {
                            let invalid = Object.assign({}, prevState.invalid);
                            invalid.server = true;
                            return {invalid};
                        });
                    } else {
                        this.props.history.push('/pessoas');
                    }
                });
            }
        }
    }

    render() {
        const {item} = this.state;
        const {invalid} = this.state;

        const title = <h2>{item.id ? 'Editar Pessoa' : 'Adicionar Pessoa'}</h2>;

        return <div>
            <AppNavbar/>
            <Container>
                {title}
                <div>
                    <Alert color="warning" isOpen={invalid.nome}>
                        Nome é Obrigatório!
                    </Alert>
                    <Alert color="warning" isOpen={invalid.cpf}>
                        CPF Inválido!
                    </Alert>
                    <Alert color="warning" isOpen={invalid.cpfPres}>
                        CPF Já Presente no banco de dados!
                    </Alert>
                    <Alert color="warning" isOpen={invalid.email}>
                        Email Inválido!
                    </Alert>
                    <Alert color="warning" isOpen={invalid.datanasc}>
                        Data De Nascimento Inválida!
                    </Alert>
                    <Alert color="danger" isOpen={invalid.server}>
                        Dados acusados como Inválidos pelo servidor!
                    </Alert>
                </div>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="nome">Nome</Label>
                        <Input type="text" name="nome" id="nome" value={item.nome || ''}

                               onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="sexo">Sexo</Label>
                        <Input type="select" name="sexo" id="sexo" value={item.sexo || ''} onChange={this.handleChange}>
                            <option value={'N'}> Não Informar</option>
                            <option value={'M'}>Masculino</option>
                            <option value={'F'}>Feminino</option>
                            <option value={'O'}>Outro</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">E-mail</Label>
                        <Input type="text" name="email" id="email" value={item.email || ''}
                               onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="datanasc">Data de Nascimento</Label>
                        <DatePicker id="datanasc"
                                    dateFormat={"DD/MM/YYYY"}
                                    value={item.datanasc || ''}
                                    onChange={v => {
                                        var evento = {target: {name: "datanasc", value: v}}

                                        this.handleChange(evento)
                                    }}

                                    showClearButton={false}
                        />
                    </FormGroup>
                    <div className="row">
                        <FormGroup className="col-md-4 mb-3">
                            <Label for="naturalidade">Naturalidade</Label>
                            <Input type="text" name="naturalidade" id="naturalidade" value={item.naturalidade || ''}
                                   onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup className="col-md-5 mb-3">
                            <Label for="nacionalidade">Nacionalidade</Label>
                            <Input type="text" name="nacionalidade" id="nacionalidade" value={item.nacionalidade || ''}
                                   onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup className="col-md-3 mb-3">
                            <Label for="cpf">CPF:</Label>
                            <Input type="cpf" name="cpf" id="cpf" value={item.cpf || ''} mask="999.999.999-99"
                                   maskChar=" "
                                   tag={InputMask}
                                   onChange={this.handleChange}/>
                        </FormGroup>
                    </div>
                    <FormGroup>
                        <Button color="primary" type="submit">Salvar</Button>{' '}
                        <Button color="secondary" tag={Link} to="/pessoas">Cancelar</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(PessoaEdit);
