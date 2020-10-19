import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import ContentHeader from '../../Commons/Templates/Form/ContentHeader';
import Content from '../../Commons/Templates/Form/Content';
import ValueBox from '../../Commons/Templates/Widget/ValueBox';
import Row from '../../Commons/Templates/Form/Row';
import Layout from '../../Commons/Templates/Layout/Layout';
import Main from '../../Commons/Templates/Main/Main';
import { movieAction } from '../../Actions';


class Movie extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: true };
    }
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(movieAction.getMovie());
        this.setState({ loading: false });
    }

    static renderMoviesTable(movie) {
        return (
            <div>
                <Layout />
                <div className='content-wrapper'>
                    <ContentHeader title='Filmes cadastrados' small='' />
                    <Content>
                        <form onSubmit={this.handleFormSubmit}>
                            <div className='movieform'>
                                <Main>
                                    <Row>
                                        {movie.map(movie =>
                                            <ValueBox key={movie.id}
                                                cols='12 4'
                                                color='blue'
                                                icon='film'
                                                title={movie.titulo}
                                                value={movie.nota}
                                                subtitle={movie.ano}
                                                id={movie.id} />
                                        )}
                                    </Row>
                                </Main>
                            </div>
                        </form>
                    </Content>
                </div>
            </div>
        );
    }

    render() {
        const { movie } = this.props.movie;

        let contents = this.state.loading
            ? <p><em>  Loading...</em></p>
            : Movie.renderMoviesTable(movie);

        return (
            <div>
                {contents}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { movie: state.movie };
}

const connectedMoviePage = withRouter(connect(mapStateToProps, null, null, { pure: false })(Movie));

export { connectedMoviePage as Movie };


