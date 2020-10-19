import './Product.css';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import Grid from '../../Commons/Templates/Form/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import IButton from '../../Commons/Templates/Form/IconButton';
import Main from '../../Commons/Templates/Main/Main';
import { productAction } from '../../Actions';
import Layout from '../../Commons/Templates/Layout/Layout';
import ContentHeader from '../../Commons/Templates/Form/ContentHeader';
import Content from '../../Commons/Templates/Form/Content';
import Row from '../../Commons/Templates/Form/Row';
import Button from '@material-ui/core/Button';

const headerProps = {
    title: 'Lista de Produtos cadastrados.',
}

class Product extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(productAction.getProduct());
    }

    handleChange = event => {
        this.setState({
            anchor: event.target.value,
        });
    };


    handleClick = (event, id) => {
        console.log(id);
        const { dispatch } = this.props;
        dispatch(productAction.deleteProductById(id))
    };

    render() {
        const { product } = this.props.product;

        return (
            <div >
                <Layout />
                <div className='content-wrapper'>
                    <ContentHeader {...headerProps} />
                    <Content>
                        <div className='productform'>
                            <Row>
                                <Grid cols='12 9 10'>
                                    <input id='description' className='form-control'
                                        placeholder='Pesquisar um produto...'
                                        onChange={this.props.changeDescription}
                                        onKeyUp={this.keyHandler}
                                        value={this.props.description} />
                                </Grid>

                                <Grid cols='12 3 2'>
                                    <IButton style='info' icon='search'></IButton>
                                    <IButton style='default' icon='close' ></IButton>
                                </Grid>
                            </Row>
                            <Row>
                                <Button class="btn btn-primary"
                                    component='a'
                                    href="/add-product">
                                    Cadastrar
					        	</Button>
                            </Row>
                        </div>
                        <Main>
                            <div>
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th>Nome</th>
                                            <th>Descrição</th>
                                            <th>Valor</th>
                                            <th className='table-actions'>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {product.map(n => {
                                            return (
                                                <tr key={n.id}>
                                                    <td>{n.name}</td>
                                                    <td>{n.description}</td>
                                                    <td money> R$ {n.price}</td>
                                                    <td>
                                                        <IconButton aria-label="Edit" component='a' href={`edit-product/${n.id}`}>
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
        product: state.product
    };
}

const connectedProductPage = withRouter(connect(mapStateToProps, null, null, { pure: false })(Product));

export { connectedProductPage as Product };