import './ReservationsAvailability.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { userService } from '../../Services/Index';
import { baseUrlCore } from '../../Config/index';
import ContentHeader from '../../Commons/Templates/Form/ContentHeader';
import Content from '../../Commons/Templates/Form/Content';
import Layout from '../../Commons/Templates/Layout/Layout';
import Main from '../../Commons/Templates/Main/Main';
import Button from '@material-ui/core/Button';

export default class ReservationsAvailability extends Component {
    displayName = ReservationsAvailability.name
    constructor(props) {
        super(props);
        this.state = { rooms: []};
    }
    componentDidMount = () => {
        const { id } = this.props.match.params;
        if (!(id === undefined || !id)) {
            this.LoadResult(id);
        }
    }

    LoadResult = async (id) => {
        let apiEndpoint = baseUrlCore + '/v1/room/availability/true';
        await userService.get(apiEndpoint)
            .then((response) => {
                console.log(response);
                const { data } = response;
                this.setState({ rooms: data});
            }).catch((err) => {
                console.log("Error");
                console.log(err);
            })
    }

    static renderFilmesTable(rooms) {
        var posicao = 1;
        return (
            <div>
                <Layout />
                <div className='content-wrapper'>
                    <ContentHeader title='Salas Reservadas' />
                    <Content>
                        <div className='resultform'>
                            <Main>
                                <table class="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>Descrição</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rooms.map(room =>
                                            <tr key={room.id}>
                                                <td>{room.description}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </Main>
                            <div className="Btns">
                                <tr />
                                <Link
                                    class="btn btn-primary"
                                    to='/torneiosrealizados'>
                                    <span>Voltar</span>
                                </Link>
                            </div>
                        </div>
                    </Content>
                </div>
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>  Loading...</em></p>
            : ReservationsAvailability.renderFilmesTable(this.state.rooms);

        return (
            <div>
                {contents}
            </div>
        );
    }
}
