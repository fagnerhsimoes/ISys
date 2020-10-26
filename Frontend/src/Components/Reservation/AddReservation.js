import './Reservation.css';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { withRouter, Link } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { InputCuston } from '../../Commons/Form/Input';
import ContentHeader from '../../Commons/Form/ContentHeader';
import Content from '../../Commons/Form/Content';
import Main from '../../Commons/Main/Main';
import Layout from '../../Commons/Layout/Layout';
import { reservationAction } from "../../Actions";
import { roomAction } from "../../Actions";
import { required, minLength3, maxLength100, dateInitial }
    from '../../Commons/Form/ValidatorInFieldLevel';
import Selector from '../../Commons/Checkbox/Selector';

const headerProps = {
    title: 'Inserir uma Reserva de Sala',
}

class AddReservation extends Component {
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

        if (!(id === undefined || !id)) {
            dispatch(reservationAction.editReservationInfo(id, values, this.props.history));
        } else {
            dispatch(reservationAction.createReservation(values, this.props.history));
        }
    }


    render() {
        const { id } = this.props.match.params;
        const { pristine, submitting, handleSubmit, reset } = this.props
        const { room } = this.props.room;
        console.log(this.props.reservation);

        function InsertText(props) {
            headerProps.title = 'Inserir uma Reserva de Sala';
            return '';
        }

        function EditText(props) {
            headerProps.title = 'Editar a Reserva da Sala';
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
                                            name="title"
                                            type="text"
                                            placeholder="Informe o Título"
                                            label='Título'
                                            validate={[required, minLength3, maxLength100]}
                                        />
                                    </div>
                                    <div className="input-field col s12">
                                        <Field component={Selector}
                                            name="roomId"
                                            placeholder="Informe a Sala"
                                            label='Sala'
                                            type="text"
                                            data={room}
                                            validate={[required]}
                                        />
                                    </div>
                                    <div className="input-field col s12">
                                        <Field component={InputCuston}
                                            name="dateInitial"
                                            type="datetime-local"
                                            placeholder="Informe a Data e Hora de Início"
                                            label='Data e Hora de Inicio'
                                            validate={[required, dateInitial]}
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
                                            Desfazer
                                        </button>

                                        <button type="submit"
                                            class="btn btn-primary"
                                            disabled={pristine || submitting}>
                                            Salvar
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

AddReservation.propTypes = {
    reservation: PropTypes.object.isRequired,
    room: PropTypes.object.isRequired,
};

AddReservation = reduxForm({ form: 'AddReservationForm', touchOnBlur: false, enableReinitialize: true, destroyOnUnmount: true })(AddReservation)
const mapStateToProps = (state, props) => ({
    initialValues: state.reservation,
    room: state.room
});


export default connect(mapStateToProps)(withRouter(AddReservation));



