import './TournamentList.css';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Main from '../../Commons/Templates/Main/Main';
import { tournamentAction } from '../../Actions';
import Layout from '../../Commons/Templates/Layout/Layout'; 
import ContentHeader from '../../Commons/Templates/Form/ContentHeader';
import Content from '../../Commons/Templates/Form/Content';
import moment from 'moment';
import 'moment/locale/pt-br';

const headerProps = {
    title: 'Torneios Realizados',
}

class TournamentList extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(tournamentAction.getTournament());
    }

    handleChange = event => {
        this.setState({
            anchor: event.target.value,
        });
    };

    handleClick = (event, id) => {
        console.log(id);
        const { dispatch } = this.props;
        dispatch(tournamentAction.deleteTournamentById(id))
    };

    render() {
        const { tournament } = this.props.tournament;
        return (
            <div >
                <Layout />
                <div className='content-wrapper'>
                    <ContentHeader {...headerProps} />
                    <Content>
                        <div className='tournamentlistform'>
                        <Main>
                                <table class="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>Data</th>
                                            <th>Vencedor</th>
                                            <th>Vice</th>
                                            <th className='table-actions'>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tournament.map(n => {
                                            return (
                                                <tr key={n.id}>
                                                    <td datatype>{ moment(n.createdAt).format('LLL')}</td>
                                                    <td>{n.nameWinner}</td>
                                                    <td>{n.nameRunnerUp}</td>
                                                    <td>
                                                        <IconButton aria-label="Edit" component='a' href={`resultadotorneio/${n.id}`}>
                                                            <EditIcon />
                                                        </IconButton>
                                                        <IconButton aria-label="Delete" onClick={(event) => this.handleClick(event, n.id)}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                        </Main>
                        </div>
                    </Content>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tournament: state.tournament
    };
}

const connectedTournamentListPage = withRouter(connect(mapStateToProps, null, null, { pure: false })(TournamentList));

export { connectedTournamentListPage as TournamentList };