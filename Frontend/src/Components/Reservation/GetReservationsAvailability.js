import './Reservation.css';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { withRouter, Link } from "react-router-dom";
import { InputCuston } from '../../Commons/Form/Input';
import ContentHeader from '../../Commons/Form/ContentHeader';
import Content from '../../Commons/Form/Content';
import Main from '../../Commons/Main/Main';
import Layout from '../../Commons/Layout/Layout';
import { reservationAction } from "../../Actions";
import { required }
    from '../../Commons/Form/ValidatorInFieldLevel';


const headerProps = {
    title: 'Consultar Disponibilidade de Salas',
}

class GetReservationsAvailability extends Component {

    handleChange = name => event => {
        this.setState({ [name]: event.target.value, });
    };

    handleClick(values) {
        const { dispatch } = this.props;
        dispatch(reservationAction.getAvailability(values));
        dispatch(reservationAction.getNotAvailability(values, this.props.history));
    }

    render() {
        const { pristine, submitting, handleSubmit, reset } = this.props
        console.log(this.props.reservation);

        return (
            <div>
                <Layout />
                <div className='content-wrapper'>
                    <ContentHeader {...headerProps} />
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

                                        <button type="button"
                                            class="btn btn-default"
                                            disabled={pristine || submitting}
                                            onClick={reset}>
                                            Limpar
                                        </button>

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

GetReservationsAvailability = reduxForm({ form: 'GetReservationsAvailabilityForm', touchOnBlur: false, enableReinitialize: true, destroyOnUnmount: true })(GetReservationsAvailability)


export default (withRouter(GetReservationsAvailability));



