import './Room.css';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import Grid from '../../Commons/Templates/Form/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import IButton from '../../Commons/Templates/Form/IconButton';
import Button from '@material-ui/core/Button';
import Main from '../../Commons/Templates/Main/Main';
import { roomAction } from '../../Actions';
import Layout from '../../Commons/Templates/Layout/Layout';
import ContentHeader from '../../Commons/Templates/Form/ContentHeader';
import Content from '../../Commons/Templates/Form/Content';
import Row from '../../Commons/Templates/Form/Row';

const headerProps = {
    title: 'Lista de Salas Cadastradas',
}

class Room extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(roomAction.getRoom());
    }

    handleChange = event => {
        this.setState({
            anchor: event.target.value,
        });
    };


    handleClick = (event, id) => {
        console.log(id);
        const { dispatch } = this.props;
        dispatch(roomAction.deleteRoomById(id))
    };

    render() {
        const { room } = this.props.room;

        return (
            <div >
                <Layout />
                <div className='content-wrapper'>
                    <ContentHeader {...headerProps} />
                    <Content>
                        <div className='roomform'>
                            <Row>
                                <Grid cols='12 9 10'>
                                    <input id='description' className='form-control'
                                        placeholder='Pesquisar uma Sala...'
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
                                    href="/add-room">
                                    Nova Sala
					        	</Button>
                            </Row>
                        </div>
                        <Main>
                            <div>
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th>Descrição</th>
                                            <th className='table-actions'>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {room.map(n => {
                                            return (
                                                <tr key={n.id}>
                                                    <td>{n.description}</td>
                                                    <td>
                                                        <IconButton aria-label="Edit" component='a' href={`edit-room/${n.id}`}>
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
        room: state.room
    };
}

const connectedRoomPage = withRouter(connect(mapStateToProps, null, null, { pure: false })(Room));

export { connectedRoomPage as Room };
