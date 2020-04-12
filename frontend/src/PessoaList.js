import React, {Component} from 'react';
import {Button, ButtonGroup, Container, Table} from 'reactstrap';
import AppNavbar from './AppNavBar';
import {Link} from 'react-router-dom';

class PessoaList extends Component {

    constructor(props) {
        super(props);
        this.state = {pessoas: [], isLoading: true};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});

        fetch('api/pessoa')
            .then(value => {
                if (value.status === 401) {
                    throw new Error ("Unauthorized")
                }
                    return value;
            })

            .then(response => response.json())
            .then(data => this.setState({pessoas: data, isLoading: false}))
            .catch(reason => {
                    console.log(reason)
                    this.props.history.push('/')
                }
            )

    }

    async remove(id) {
        await fetch(`/api/pessoa/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedPessoas = [...this.state.pessoas].filter(i => i.id !== id);
            this.setState({pessoas: updatedPessoas});
        });
    }

    render() {
        const {pessoas, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const pessoaList = pessoas.map(pessoa => {
            return <tr key={pessoa.id}>
                <td style={{whiteSpace: 'nowrap'}}>{pessoa.nome}</td>
                <td>{pessoa.cpf}</td>
                <td>{pessoa.email}</td>
                <td>{pessoa.datanasc}</td>
                <td>{pessoa.sexo}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/pessoas/" + pessoa.id}>Editar</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(pessoa.id)}>Deletar</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/pessoas/new">Adicionar Pessoa</Button>
                    </div>
                    <h3>Cadastro de Pessoas</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th>Nome</th>
                            <th>CPF</th>
                            <th>E-mail</th>
                            <th>Dta. Nascimento</th>
                            <th>Sexo</th>

                            <th width="10%">Ações</th>
                        </tr>
                        </thead>
                        <tbody>
                        {pessoaList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default PessoaList;