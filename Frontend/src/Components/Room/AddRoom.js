import './Room.css';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { InputCuston } from '../../Commons/Templates/Form/Input';
import ContentHeader from '../../Commons/Templates/Form/ContentHeader';
import Content from '../../Commons/Templates/Form/Content';
import Main from '../../Commons/Templates/Main/Main';
import Layout from '../../Commons/Templates/Layout/Layout';
import { roomAction } from "../../Actions";
import { required, minLength3, maxLength100 }
  from '../../Commons/Templates/Form/ValidatorInFieldLevel';

const headerProps = {
  title: 'Inserir uma Sala',
}

class AddRoom extends Component {
  componentWillMount = () => {
    const { id } = this.props.match.params;

    if (!(id === undefined || !id)) {
      const { dispatch } = this.props;
      dispatch(roomAction.getRoomById(id))
    }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value, });
  };

  handleClick(values) {
    const { id } = this.props.match.params;
    const { dispatch } = this.props;

    if (!(id === undefined || !id)) {
      dispatch(roomAction.editRoomInfo(id, values, this.props.history));
    } else {
      dispatch(roomAction.createRoom(values, this.props.history));
    }
  }

  render() {
    const { id } = this.props.match.params;
    const { pristine, submitting, handleSubmit, reset//, load 
    } = this.props
    console.log(this.props.room);

    function InsertText(props) {
      headerProps.title = 'Inserir uma Sala';
      return '';
    }

    function EditText(props) {
      headerProps.title = 'Editar a Sala';
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
          <div role='form' className='roomform'>
            <SegHeader />
          </div>
          <Content>
            <Main>
              <form onSubmit={handleSubmit(v => this.handleClick(v))}>
                <div className='box-body'>
                  <div className="input-field col s12">
                    <Field component={InputCuston}
                      name="description"
                      type="text"
                      placeholder="Informe a Descrição da Sala"
                      label='Descrição'
                      validate={[required, minLength3, maxLength100]}
                    />
                  </div>
                  <tr />
                  <div className="Btns">
                    <tr />
                    <Link
                      class="btn btn-danger"
                      to='/room'>
                      <span>Cancelar</span>
                    </Link>
                    <button
                      type="button"
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

AddRoom.propTypes = {
  room: PropTypes.object.isRequired,
};

AddRoom = reduxForm({ form: 'AddRoomForm', touchOnBlur: false, enableReinitialize: true, destroyOnUnmount: true })(AddRoom)
const mapStateToProps = (state, props) => ({
  initialValues: state.room
});

//Não vou usar ActionsCreators de momento.
//const mapDispatchToProps = dispatch => bindActionCreators({load: loadCustomer}, dispatch)

export default connect(
  mapStateToProps//, mapDispatchToProps
)(withRouter(AddRoom));
