import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Container from '../../Components/Container/index';
import { Form, SubmitButton, List } from './styles';

import Api from '../../services/Api';

export default class Main extends Component {
    state = {
        newRepo: '',
        repositories: [],
        loading: false,
    };

    componentDidMount() {
        const repositores = localStorage.getItem('repositores');

        if (repositores) {
            this.setState({ repositories: JSON.parse(repositores) });
        }
    }

    componentDidUpdate(_, prevState) {
        const { repositories } = this.state;

        if (prevState.repositores !== repositories) {
            console.log('gravar');
            localStorage.setItem('repositores', JSON.stringify(repositories));
        }
    }

    handleInputChange = e => {
        this.setState({ newRepo: e.target.value });
    };

    handleSubmit = async e => {
        this.setState({ loading: true });

        e.preventDefault();

        const { newRepo, repositories } = this.state;

        const response = await Api.get(`/repos/${newRepo}`);

        const data = {
            name: response.data.full_name,
        };

        this.setState({
            repositories: [...repositories, data],
            newRepo: '',
            loading: false,
        });
    };

    render() {
        const { newRepo, loading, repositories } = this.state;

        return (
            <Container>
                <h1>
                    <FaGithubAlt />
                    Repositorios
                </h1>

                <Form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        placeholder="Adicionar repositorio"
                        value={newRepo}
                        onChange={this.handleInputChange}
                    />

                    <SubmitButton loading={loading}>
                        {loading ? (
                            <FaSpinner color="#FFF" size={14} />
                        ) : (
                            <FaPlus color="#FFF" size={14} />
                        )}
                    </SubmitButton>
                </Form>
                <List>
                    {repositories.map(repository => (
                        <li key={repository.name}>
                            <span>{repository.name}</span>
                            <Link
                                to={`/repository/${encodeURIComponent(
                                    repository.name
                                )}`}
                            >
                                Detalhes
                            </Link>
                        </li>
                    ))}
                </List>
            </Container>
        );
    }
}
