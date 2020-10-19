import './Category.css';
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
import { categoryAction } from "../../Actions";
import { required, minLength3, maxLength100, isEmail }
  from '../../Commons/Templates/Form/ValidatorInFieldLevel';

const headerProps = {
  title: 'Inserir um Categoria',
}

class AddCategory extends Component {
  componentWillMount = () => {
    const { id } = this.props.match.params;

    if (!(id === undefined || !id)) {
      const { dispatch } = this.props;
      dispatch(categoryAction.getCategoryById(id))
    }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value, });
  };

  handleClick(values) {
    const { id } = this.props.match.params;
    const { dispatch } = this.props;

    if (!(id === undefined || !id)) {
      dispatch(categoryAction.editCategoryInfo(id, values, this.props.history));
    } else {
      dispatch(categoryAction.createCategory(values, this.props.history));
    }
  }

  render() {
    const { id } = this.props.match.params;
    const { pristine, submitting, handleSubmit, reset//, load 
    } = this.props
    console.log(this.props.category);

    function InsertText(props) {
      headerProps.title = 'Inserir um Categoria.';
      return '';
    }

    function EditText(props) {
      headerProps.title = 'Editar o Categoria.';
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
          <div role='form' className='categoryform'>
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
                      placeholder="Informe o Titulo"
                      label='Titulo'
                      validate={[required, minLength3, maxLength100]}
                    />
                  </div>
                  <tr />
                  <div className="Btns">
                    <tr />
                    <Link
                      class="btn btn-danger"
                      to='/category'>
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

AddCategory.propTypes = {
  category: PropTypes.object.isRequired,
};

AddCategory = reduxForm({ form: 'AddCategoryForm', touchOnBlur: false, enableReinitialize: true, destroyOnUnmount: true })(AddCategory)
const mapStateToProps = (state, props) => ({
  initialValues: state.category
});

//Não vou usar ActionsCreators de momento.
//const mapDispatchToProps = dispatch => bindActionCreators({load: loadCategory}, dispatch)

export default connect(
  mapStateToProps//, mapDispatchToProps
)(withRouter(AddCategory));
