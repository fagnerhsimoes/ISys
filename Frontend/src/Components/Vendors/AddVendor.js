import './Vendor.css';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { InputCuston } from '../../Commons/Templates/Form/Input';
import ContentHeader from '../../Commons/Templates/Form/ContentHeader';
import Content from '../../Commons/Templates/Form/Content';
import Main from '../../Commons/Templates/Main/Main';
import Layout from '../../Commons/Templates/Layout/Layout';
import { vendorAction } from "../../Actions";
import { required, minLength3, maxLength100 }
  from '../../Commons/Templates/Form/ValidatorInFieldLevel';

const headerProps = {
  title: 'Inserir um Fornecedor',
}

class AddVendor extends Component {
  componentWillMount = () => {
    const { id } = this.props.match.params;

    if (!(id === undefined || !id)) {
      const { dispatch } = this.props;
      dispatch(vendorAction.getVendorById(id))
    }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value, });
  };

  handleClick(values) {
    const { id } = this.props.match.params;
    const { dispatch } = this.props;

    if (!(id === undefined || !id)) {
      dispatch(vendorAction.editVendorInfo(id, values, this.props.history));
    } else {
      dispatch(vendorAction.createVendor(values, this.props.history));
    }
  }

  render() {
    const { id } = this.props.match.params;
    const { pristine, submitting, handleSubmit, reset//, load 
    } = this.props
    console.log(this.props.vendor);

    function InsertText(props) {
      headerProps.title = 'Inserir um Fornecedor.';
      return '';
    }

    function EditText(props) {
      headerProps.title = 'Editar o Fornecedor.';
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
          <div role='form' className='vendorform'>
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
                      name="mobile"
                      type="number"
                      placeholder="Informe o n° do Celular"
                      label='Celular '
                      validate={[required]}
                    />
                  </div>
                  <div className="input-field col s12">
                    <Field component={InputCuston}
                      name="phone_number"
                      type="number"
                      placeholder="Informe o n° do Telefone"
                      label='Telefone'
                      validate={[required]}
                    />
                  </div>
                  <div className="input-field col s12">
                    <Field component={InputCuston}
                      name="address"
                      type="text"
                      placeholder="Informe o Endereço"
                      label='Endereço'
                      validate={[required]}
                    />
                  </div>
                  <tr />
                  <div className="Btns">
                    <tr />
                    <Link
                      class="btn btn-danger"
                      to='/vendor'>
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

AddVendor.propTypes = {
  vendor: PropTypes.object.isRequired,
};

AddVendor = reduxForm({ form: 'AddVendorForm', touchOnBlur: false, enableReinitialize: true, destroyOnUnmount: true })(AddVendor)
const mapStateToProps = (state, props) => ({
  initialValues: state.vendor
});

//Não vou usar ActionsCreators de momento.
//const mapDispatchToProps = dispatch => bindActionCreators({load: loadVendor}, dispatch)

export default connect(
  mapStateToProps//, mapDispatchToProps
)(withRouter(AddVendor));
