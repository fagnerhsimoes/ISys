import './Reservation.css';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import Grid from '../../Commons/Templates/Form/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import IButton from '../../Commons/Templates/Form/IconButton';
import Main from '../../Commons/Templates/Main/Main';
import { reservationAction } from '../../Actions';
import Layout from '../../Commons/Templates/Layout/Layout';
import ContentHeader from '../../Commons/Templates/Form/ContentHeader';
import Content from '../../Commons/Templates/Form/Content';
import Row from '../../Commons/Templates/Form/Row';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import 'moment/locale/pt-br';

const headerProps = {
    title: 'Lista de Reservas.',
}

class ReservationsAvailability extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        //const payLoad = { dateInitial : '2020-10-23T08:00:00', dateFinal : '2020-10-29T08:00:00', availability : false } 
        //dispatch(reservationAction.getAvailability(payLoad,  this.props.history));
    }

    handleChange = event => {
        this.setState({
            anchor: event.target.value,
        });
    };


    handleClick = (event, id) => {
        console.log(id);
        const { dispatch } = this.props;
        dispatch(reservationAction.deleteReservationById(id))
    };

    render() {
        const { availability } = this.props.availability;

        return (
            <div >
                <Layout />
                <div className='content-wrapper'>
                    <ContentHeader {...headerProps} />
                    <Content>
                        <div className='reservationform'>
                            <Row>
                                <Grid cols='12 9 10'>
                                    <input id='description' className='form-control'
                                        placeholder='Pesquisar uma reserva...'
                                        onChange={this.props.changeDescription}
                                        onKeyUp={this.keyHandler}
                                        value={this.props.description} />
                                </Grid>

                                <Grid cols='12 3 2'>
                                    <IButton style='info' icon='search'></IButton>
                                    <IButton style='default' icon='close' ></IButton>
                                </Grid>
                            </Row>
                            <Row>

                                <Link
                                    class="btn btn-primary"
                                    to='/getreservationsavailability'>
                                    <span>Voltar</span>
                                </Link>
                            </Row>
                        </div>
                        <Main>
                            <div>
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th>Descrição</th>
                                            <th className='table-actions'>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {availability.map(n => {
                                            return (
                                                <tr key={n.id}>
                                                    <td>{n.description}</td>
                                                    <td>
                                                        <IconButton aria-label="Edit" component='a' href={`edit-reservation/${n.id}`}>
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
                            </div>
                        </Main>
                    </Content>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        availability: state.availability
    };
}

const connectedReservationsAvailabilityPage = withRouter(connect(mapStateToProps, null, null, { pure: false })(ReservationsAvailability));

export { connectedReservationsAvailabilityPage as ReservationsAvailability };