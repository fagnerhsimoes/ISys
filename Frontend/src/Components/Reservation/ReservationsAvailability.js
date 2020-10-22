import './Reservation.css';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import Main from '../../Commons/Templates/Main/Main';
import { reservationAction } from '../../Actions';
import Layout from '../../Commons/Templates/Layout/Layout';
import ContentHeader from '../../Commons/Templates/Form/ContentHeader';
import Content from '../../Commons/Templates/Form/Content';
import 'moment/locale/pt-br';

class ReservationsAvailability extends Component {
    render() {
        const { availability }    = this.props.availability;
        const { notavailability } = this.props.notavailability;

        return (
            <div >
                <Layout />
                <div className='content-wrapper'>
                    <ContentHeader title='Salas Disponíveis' />
                    <Content>
                        <Main>
                            <div>
                                <table className='table table-striped table-hover'>
                                    <thead>
                                        <tr>
                                            <th>Descrição da Sala</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {availability.map(n => {
                                            return (
                                                <tr key={n.id}>
                                                    <td>{n.description}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </Main>
                    </Content>
                    <ContentHeader title='Salas Indisponíveis' />
                    <Content>
                        <Main>
                            <div>
                                <table className='table table-striped table-hover'>
                                    <thead>
                                        <tr>
                                            <th>Descrição da Sala</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {notavailability.map(n => {
                                            return (
                                                <tr key={n.id}>
                                                    <td>{n.description}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </Main>
                        <div className='resultform'>
                            <div className="Btns">
                                <Link
                                    class="btn btn-primary"
                                    to='/getreservationsavailability'>
                                    <span>Voltar</span>
                                </Link>
                            </div>
                        </div>
                    </Content>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        availability: state.availability,
        notavailability: state.notavailability
    };
}

const connectedReservationsAvailabilityPage = withRouter(connect(mapStateToProps, null, null, { pure: false })(ReservationsAvailability));

export { connectedReservationsAvailabilityPage as ReservationsAvailability };