import './Customer.css';
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
import { customerAction } from "../../Actions";
import { required, minLength3, maxLength100, isEmail }
  from '../../Commons/Templates/Form/ValidatorInFieldLevel';

const headerProps = {
  title: 'Inserir um Cliente',
}

class AddCustomer extends Component {
  componentWillMount = () => {
    const { id } = this.props.match.params;

    if (!(id === undefined || !id)) {
      const { dispatch } = this.props;
      dispatch(customerAction.getCustomerById(id))
    }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value, });
  };

  handleClick(values) {
    const { id } = this.props.match.params;
    const { dispatch } = this.props;

    if (!(id === undefined || !id)) {
      dispatch(customerAction.editCustomerInfo(id, values, this.props.history));
    } else {
      dispatch(customerAction.createCustomer(values, this.props.history));
    }
  }

  render() {
    const { id } = this.props.match.params;
    const { pristine, submitting, handleSubmit, reset//, load 
    } = this.props
    console.log(this.props.customer);

    function InsertText(props) {
      headerProps.title = 'Inserir um Cliente.';
      return '';
    }

    function EditText(props) {
      headerProps.title = 'Editar o Cliente.';
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
          <div role='form' className='customerform'>
            <SegHeader />
          </div>
          <Content>
            <Main>
              <form onSubmit={handleSubmit(v => this.handleClick(v))}>
                <div className='box-body'>
                  <div className="input-field col s12">
                    <Field component={InputCuston}
                      name="name"
                      type="text"
                      placeholder="Informe o Nome"
                      label='Nome'
                      validate={[required, minLength3, maxLength100]}
                    />
                  </div>
                  <div className="input-field col s12">
                    <Field component={InputCuston}
                      name="email"
                      type="email"
                      placeholder="Informe o E-Mail"
                      label='E-Mail'
                      validate={[required, minLength3, maxLength100, isEmail]}
                    />
                  </div>
                  <div className="input-field col s12">
                    <Field component={InputCuston}
                      name="birthDate"
                      type="date"
                      placeholder="Informe a Data de Nascimento"
                      label='Data de Nascimento'
                      validate={[required]}
                    />
                  </div>
                  <tr />
                  <div className="Btns">
                    <tr />
                    <Link
                      class="btn btn-danger"
                      to='/customer'>
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

AddCustomer.propTypes = {
  customer: PropTypes.object.isRequired,
};

AddCustomer = reduxForm({ form: 'AddCustomerForm', touchOnBlur: false, enableReinitialize: true, destroyOnUnmount: true })(AddCustomer)
const mapStateToProps = (state, props) => ({
  initialValues: state.customer
});

//Não vou usar ActionsCreators de momento.
//const mapDispatchToProps = dispatch => bindActionCreators({load: loadCustomer}, dispatch)

export default connect(
  mapStateToProps//, mapDispatchToProps
)(withRouter(AddCustomer));
