import './TournamentResult.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { userService } from '../../Services/Index';
import { baseUrlCore } from '../../Config/index';
import ContentHeader from '../../Commons/Templates/Form/ContentHeader';
import Content from '../../Commons/Templates/Form/Content';
import Layout from '../../Commons/Templates/Layout/Layout';
import Main from '../../Commons/Templates/Main/Main';
import Button from '@material-ui/core/Button';

export default class TournamentResult extends Component {
    displayName = TournamentResult.name
    constructor(props) {
        super(props);
        this.state = { movies: [], loading: true };
    }
    componentDidMount = () => {
        const { id } = this.props.match.params;
        if (!(id === undefined || !id)) {
            this.LoadResult(id);
        }
    }

    LoadResult = async (id) => {
        let apiEndpoint = baseUrlCore + '/v1/tournament/result/' + id;
        await userService.get(apiEndpoint)
            .then((response) => {
                console.log(response);
                const { data } = response;
                this.setState({ movies: data, loading: false });
            }).catch((err) => {
                console.log("Error");
                console.log(err);
            })
    }

    static renderFilmesTable(movies) {
        var posicao = 1;
        return (
            <div>
                <Layout />
                <div className='content-wrapper'>
                    <ContentHeader title='Resultado do Torneio' />
                    <Content>
                        <div className='resultform'>
                            <Main>
                                <table class="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>Posição</th>
                                            <th>Filme</th>
                                            <th>Ano</th>
                                            <th>Nota</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {movies.map(movie =>
                                            <tr key={movie.id}>
                                                <td>{posicao++} &#x02218;</td>
                                                <td>{movie.titulo}</td>
                                                <td>{movie.ano}</td>
                                                <td>{movie.nota}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </Main>
                            <div className="Btns">
                                <tr />
                                <Link
                                    class="btn btn-primary"
                                    to='/torneiosrealizados'>
                                    <span>Voltar</span>
                                </Link>
                            </div>
                        </div>
                    </Content>
                </div>
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>  Loading...</em></p>
            : TournamentResult.renderFilmesTable(this.state.movies);

        return (
            <div>
                {contents}
            </div>
        );
    }
}
