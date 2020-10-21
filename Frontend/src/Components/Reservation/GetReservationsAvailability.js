import './Reservation.css';
import React, { Component } from 'react';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { withRouter, Link } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { TextField, MenuItem, InputLabel } from '@material-ui/core';
import { InputCuston } from '../../Commons/Templates/Form/Input';
import ContentHeader from '../../Commons/Templates/Form/ContentHeader';
import Content from '../../Commons/Templates/Form/Content';
import Main from '../../Commons/Templates/Main/Main';
import Layout from '../../Commons/Templates/Layout/Layout';
import { reservationAction } from "../../Actions";
import { roomAction } from "../../Actions";
import { required, minLength3, maxLength100 }
    from '../../Commons/Templates/Form/ValidatorInFieldLevel';
import { createNumberMask, createTextMask, create } from 'redux-form-input-masks';
import Selector from '../../Commons/Templates/Checkbox/Selector';

const headerProps = {
    title: 'Consultar Disponibilidade de Reservas de Salas',
}

class GetReservationsAvailability extends Component {
    componentWillMount = () => {
        const { id } = this.props.match.params;
        const { dispatch } = this.props;
        dispatch(roomAction.getRoom());

        if (!(id === undefined || !id)) {
            dispatch(reservationAction.getReservationById(id))
        }
    }

 
    handleChange = name => event => {
        this.setState({ [name]: event.target.value, });
    };


    handleClick(values) {
        const { id } = this.props.match.params;
        const { dispatch } = this.props;
        dispatch(reservationAction.getAvailability(values, this.props.history));
    }


    render() {
        const { id } = this.props.match.params;
        const { pristine, submitting, handleSubmit } = this.props
        const { room } = this.props.room;
        console.log(this.props.reservation);

        function InsertText(props) {
            headerProps.title = 'Consultar Reservas de Salas.';
            return '';
        }

        function EditText(props) {
            headerProps.title = 'Editar a Reserva da Sala.';
            return '';
        }

        function SegHeader() {
            if (!(id === undefined || !id)) {
                return <EditText />;
            } else {
                return <InsertText />;
            }
        }

        return (
            <div>
                <Layout />
                <div className='content-wrapper'>
                    <ContentHeader {...headerProps} />
                    <div role='form' className='reservationform'>
                        <SegHeader />
                    </div>
                    <Content>
                        <Main>
                            <form onSubmit={handleSubmit(v => this.handleClick(v))}>
                                <div className='box-body'>
                                    <div className="input-field col s12">
                                        <Field component={InputCuston}
                                            name="dateInitial"
                                            type="datetime-local"
                                            placeholder="Informe a Data e Hora de Início"
                                            label='Data e Hora de Inicio'
                                            validate={[required]}
                                        />
                                    </div>
                                    <div className="input-field col s12">
                                        <Field component={InputCuston}
                                            name="dateFinal"
                                            type="datetime-local"
                                            placeholder="Informe a Data e Hora Final"
                                            label='Data e Hora Final'
                                            validate={[required]}
                                        />
                                    </div>
                                    <tr />
                                    <div className="Btns">
                                        <tr />
                                        <Link
                                            class="btn btn-danger"
                                            to='/reservation'>
                                            <span>Cancelar</span>
                                        </Link>

                                        <button type="submit"
                                            class="btn btn-primary"
                                            disabled={pristine || submitting}>
                                            Consultar
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </Main>
                    </Content>
                </div>
            </div>
        );
    }
}

GetReservationsAvailability.propTypes = {
    reservation: PropTypes.object.isRequired,
    room       : PropTypes.object.isRequired,
};

GetReservationsAvailability = reduxForm({ form: 'GetReservationsAvailabilityForm', touchOnBlur: false, enableReinitialize: true, destroyOnUnmount: true })(GetReservationsAvailability)
const mapStateToProps = (state, props) => ({
    initialValues: state.reservation,
    room: state.room
});


export default connect(mapStateToProps)(withRouter(GetReservationsAvailability));



