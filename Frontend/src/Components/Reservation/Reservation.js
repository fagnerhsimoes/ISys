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
    title: 'Lista de Reservas da Sala',
}

class Reservation extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(reservationAction.getReservation());
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
        const { reservation } = this.props.reservation;

        return (
            <div >
                <Layout />
                <div className='content-wrapper'>
                    <ContentHeader {...headerProps} />
                    <Content>
                        <div className='reservationform'>
                            <Row>

                            </Row>
                            <Row>
                                <Button class="btn btn-primary"
                                    component='a'
                                    href="/add-reservation">
                                    Nova Reserva
					        	</Button>
                            </Row>
                        </div>
                        <Main>
                            <div>
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th>Título</th>
                                            <th>Sala</th>
                                            <th datatype>Data e Hora de Inicio</th>
                                            <th datatype>Data e Hora Final</th>
                                            <th className='table-actions'>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reservation.map(n => {
                                            return (
                                                <tr key={n.id}>
                                                    <td>{n.title}</td>
                                                    <td>{n.room.description}</td>
                                                    <td datatype>{ moment(n.dateInitial).format('LLL')}</td>
                                                    <td datatype>{ moment(n.dateFinal).format('LLL')}</td>
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
        reservation: state.reservation
    };
}

const connectedReservationPage = withRouter(connect(mapStateToProps, null, null, { pure: false })(Reservation));

export { connectedReservationPage as Reservation };