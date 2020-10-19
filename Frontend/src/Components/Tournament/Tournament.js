import './Tournament.css';
import React, { Component } from 'react';
import { reduxForm, Field}    from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import Checkbox from '../../Commons/Templates/Checkbox/CheckBox';
import ContentHeader from '../../Commons/Templates/Form/ContentHeader';
import Content from '../../Commons/Templates/Form/Content';
import Layout from '../../Commons/Templates/Layout/Layout';
import Main from '../../Commons/Templates/Main/Main';
import { movieAction , tournamentAction } from '../../Actions'; 


class Tournament extends Component {
    displayName = Tournament.name
    constructor(props) {
        super(props);
        this.state =
        {
            moviesSelecteds: [],
            checkboxes: [],
            contador: 0
        };
    }
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(movieAction.getMovie());
    }

    handleClick({moviesSelecteds}) {
        const { dispatch } = this.props;
        dispatch(tournamentAction.createTournament(moviesSelecteds, this.props.history));
      }

    handleCheckboxChange = changeEvent => {
        var { contador } = this.state;
        const { name } = changeEvent.target;
        const { checked } = changeEvent.target;
        if (checked) {
            this.setState({ contador: contador + 1 });
        }
        else {
            this.setState({ contador: contador - 1 });
        }

        this.setState(prevState => ({ checkboxes: { ...prevState.checkboxes, [name]: !prevState.checkboxes[name] } }));
    };

    handleFormSubmit = formSubmitEvent => {
        formSubmitEvent.preventDefault();

        const { movie } = this.props.movie;
        var moviesSelecteds = [];
 
        Object.keys(this.state.checkboxes)
            .filter(checkbox => this.state.checkboxes[checkbox])
            .forEach(checkbox => {
                let film = movie.find((selected) => {
                    return selected.id === checkbox;
                })
                moviesSelecteds.push(film);
            });

        if (moviesSelecteds.length === 8) {
            this.handleClick({ moviesSelecteds });
            console.log(moviesSelecteds);
        }
        else {
            alert(` ${this.state.contador} filme(s) selecionados. \n \nSelecione 8 filmes para dar inicio ao torneio.`);
        }
    };

  
    render() {
        const { movie } = this.props.movie;
        return (
            <div>
                <Layout />
                <div className='content-wrapper'>
                    <ContentHeader title='Torneio de Filmes' small='Selecione 8 filmes para participar do torneio.' />
                    <Content>
                        <form onSubmit={this.handleFormSubmit}>
                            <div className='tournamentform'>
                                <p className="contador"><strong>Selecionados {this.state.contador} de 8 Filmes</strong></p>
                                <Main>
                                    <table class="table table-striped table-hover">
                                        <thead >
                                            <tr >
                                                <th>Selecionado</th>
                                                <th>Filme</th>
                                                <th>Ano</th>
                                                <th>Nota</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {movie.map(movie =>
                                                <tr key={movie.id}>
                                                    <td>
                                                        <Checkbox
                                                            id={movie.id}
                                                            isSelected={this.state.checkbox}
                                                            onCheckboxChange={this.handleCheckboxChange}
                                                            key={movie.id} />
                                                    </td>
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
                                    <button type="submit"
                                        class="btn btn-primary"
                                        //disabled={pristine }
                                    >
                                        Gerar Torneio
                                    </button>
                                </div>
                            </div>
                        </form>
                    </Content>
                </div>
            </div>
        );
    }
} 

//Tournament = reduxForm({ form: 'TournamentForm', touchOnBlur: false, enableReinitialize: true})(Tournament)
const mapStateToProps = (state) => {
    return { movie: state.movie };
}

const connectedTournamentPage = withRouter(connect(mapStateToProps, null, null, { pure: false })(Tournament));

export { connectedTournamentPage as Tournament };
