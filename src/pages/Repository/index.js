import React, { Component } from 'react';
import PropType from 'prop-types';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaSpinner } from 'react-icons/fa';
import api from '../../services/Api';
import { Loading, Owner, Back, IssuesList } from './styles';
import Container from '../../Components/Container/index';

export default class Repository extends Component {
    static propType = {
        match: PropType.shape({
            params: PropType.shape({
                repository: PropType.string,
            }),
        }).isRequired,
    };

    state = {
        repository: {},
        issues: [],
        loading: true,
    };

    async componentDidMount() {
        const { match } = this.props;

        const repositoryName = decodeURIComponent(match.params.repository);

        const [repository, issues] = await Promise.all([
            api.get(`/repos/${repositoryName}`),
            api.get(`/repos/${repositoryName}/issues`, {
                params: {
                    status: 'open',
                    per_page: 5,
                },
            }),
        ]);

        this.setState({
            repository: repository.data,
            issues: issues.data,
            loading: false,
        });
    }

    render() {
        const { repository, issues, loading } = this.state;

        console.log(repository);

        if (loading) {
            return (
                <Loading>
                    <FaSpinner />
                    Carregando
                </Loading>
            );
        }

        return (
            <Container>
                <Back>
                    <Link to="/">
                        <FaArrowLeft />
                    </Link>
                </Back>
                <Owner>
                    <img
                        src={repository.owner.avatar_url}
                        alt={repository.owner.login}
                    />
                    <h1>{repository.name}</h1>
                    <p>{repository.description}</p>
                </Owner>

                <IssuesList>
                    {issues.map(issue => (
                        <li key={String(issue.id)}>
                            <img
                                src={issue.user.avatar_url}
                                alt={issue.user.login}
                            />
                            <div>
                                <strong>
                                    <a target="blank" href={issue.html_url}>
                                        {issue.title}
                                    </a>
                                    {issue.labels.map(label => (
                                        <span key={String(label.id)}>
                                            {label.name}
                                        </span>
                                    ))}
                                </strong>
                                <p>{issue.user.login}</p>
                            </div>
                        </li>
                    ))}
                </IssuesList>
            </Container>
        );
    }
}
