import './Product.css';
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
import { productAction } from "../../Actions";
import { categoryAction } from "../../Actions";
import { required, minLength3, maxLength100 }
    from '../../Commons/Templates/Form/ValidatorInFieldLevel';
import { createNumberMask, createTextMask, create } from 'redux-form-input-masks';
import Selector from '../../Commons/Templates/Checkbox/Selector';

const headerProps = {
    title: 'Inserir um Produto',
}

const currencyMask = createNumberMask({
    prefix: 'R$ ',
    suffix: '',
    decimalPlaces: 2,
    locale: 'pt-BR',
})

const phoneMask = createTextMask({
    pattern: '(99) 99999-9999',
});



class AddProduct extends Component {
    componentWillMount = () => {
        const { id } = this.props.match.params;
        const { dispatch } = this.props;
        dispatch(categoryAction.getCategory());
    
        if (!(id === undefined || !id)) {
            dispatch(productAction.getProductById(id))
        }
    }


    handleChange = name => event => {
        this.setState({ [name]: event.target.value, });
    };


    handleClick(values) {
        const { id } = this.props.match.params;
        const { dispatch } = this.props;

        if (!(id === undefined || !id)) {
            dispatch(productAction.editProductInfo(id, values, this.props.history));
        } else {
            dispatch(productAction.createProduct(values, this.props.history));
        }
    }


    render() {
        const { id } = this.props.match.params;
        const { pristine, submitting, handleSubmit, reset} = this.props
        const { category } = this.props.category;
        console.log(this.props.product);

        function InsertText(props) {
            headerProps.title = 'Inserir um Produto.';
            return '';
        }

        function EditText(props) {
            headerProps.title = 'Editar o Produto.';
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
                    <div role='form' className='productform'>
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
                                            name="description"
                                            type="text"
                                            placeholder="Informe a Descrição"
                                            label='Descrição'
                                            validate={[required, minLength3, maxLength100]}
                                        />
                                    </div>
                                    <div className="input-field col s12">
                                        <Field component={InputCuston}
                                            name="price"
                                            placeholder="Informe o Valor"
                                            label='Valor'
                                            type="tel"
                                            {...currencyMask}
                                            validate={[required]}
                                        />
                                    </div>

                                    <div className="input-field col s12">
                                        <Field component={Selector}
                                            name="categoryId"
                                            placeholder="Informe a Categoria"
                                            label='Categoria'
                                            type="text"
                                            data={category}
                                            validate={[required]}
                                        />
                                    </div>
                                    <tr />
                                    <div className="Btns">
                                        <tr />
                                        <Link
                                            class="btn btn-danger"
                                            to='/product'>
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

AddProduct.propTypes = {
    product: PropTypes.object.isRequired,
    category: PropTypes.object.isRequired,
};

AddProduct = reduxForm({ form: 'AddProductForm', touchOnBlur: false, enableReinitialize: true, destroyOnUnmount: true })(AddProduct)
const mapStateToProps = (state, props) => ({
    initialValues: state.product,
    category: state.category
});


export default connect(mapStateToProps)(withRouter(AddProduct));



