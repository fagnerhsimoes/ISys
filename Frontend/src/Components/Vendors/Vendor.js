import './Vendor.css';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Grid from '../../Commons/Templates/Form/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import IButton from '../../Commons/Templates/Form/IconButton';
import Main from '../../Commons/Templates/Main/Main';
import { vendorAction } from '../../Actions';
import Layout from '../../Commons/Templates/Layout/Layout';
import ContentHeader from '../../Commons/Templates/Form/ContentHeader';
import Content from '../../Commons/Templates/Form/Content';
import Row from '../../Commons/Templates/Form/Row';

const headerProps = {
    title: 'Lista de Fornecedores cadastrados.',
}

class Vendor extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(vendorAction.getVendor());
    }



    handleChange = event => {
        this.setState({
            anchor: event.target.value,
        });
    };


    handleClick = (event, id) => {
        console.log(id);
        const { dispatch } = this.props;
        dispatch(vendorAction.deleteVendorById(id))
    };

    render() {
        const { vendor } = this.props.vendor;

        return (
            <div >
                <Layout />
                <div className='content-wrapper'>
                    <ContentHeader {...headerProps} />
                    <Content>
                        <div className='vendorform'>
                            <Row>
                                <Grid cols='12 9 10'>
                                    <input id='description' className='form-control'
                                        placeholder='Pesquisar um Fornecedor...'
                                        onChange={this.props.changeDescription}
                                        onKeyUp={this.keyHandler}
                                        value={this.props.description} />
                                </Grid>

                                <Grid cols='12 3 2'>
                                    <IButton style='info' icon='search'></IButton>
                                    <IButton style='default' icon='close'></IButton>
                                </Grid>
                            </Row>
                            <Row>
                                <Button class="btn btn-primary"
                                    component='a'
                                    href="/add-vendor">
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
                                            <th numeric>Celular</th>
                                            <th numeric>Telefone</th>
                                            <th>Endereço</th>
                                            <th className='table-actions'>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {vendor.map(n => {
                                            return (
                                                <tr key={n._id}>
                                                    <td>{n.name}</td>
                                                    <td numeric>{n.mobile}</td>
                                                    <td numeric>{n.phone_number}</td>
                                                    <td>{n.address}</td>
                                                    <td>
                                                        <IconButton aria-label="Edit" component='a' href={`edit-vendor/${n._id}`}>
                                                            <EditIcon />
                                                        </IconButton>
                                                        <IconButton aria-label="Delete" onClick={(event) => this.handleClick(event, n._id)}>
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
        vendor: state.vendor
    };
}

const connectedVendorPage = withRouter(connect(mapStateToProps, null, null, { pure: false })(Vendor));

export { connectedVendorPage as Vendor };


