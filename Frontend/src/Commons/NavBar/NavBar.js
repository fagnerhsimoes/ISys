import React, { Component } from 'react';
import { connect } from 'react-redux';
import  PropTypes         from 'prop-types';
import { logoutUser }    from "../../Actions/AuthActions";
import { Glyphicon, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = { open: false , anchor: 'left'}
    }

    changeOpen() {
        this.setState({ open: !this.state.open })
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
      };

    render() {
        const name  = this.props.auth.email;
        const email = 'fagner.simoes@gmail.com';
        return (
            <div className="navbar-custom-menu">
                <ul className="nav navbar-nav">
                    <li onMouseLeave={() => this.changeOpen()}
                        className={`dropdown user user-menu ${this.state.open ? 'open' :
                            ''}`}>
                        <a href onClick={() => this.changeOpen()}
                            aria-expanded={this.state.open ? 'true' : 'false'}
                            className="dropdown-toggle"
                            data-toggle="dropdown">
                            <img src="http://lorempixel.com/160/160/abstract"
                                className="user-image" alt="User" />
                            <span className="hidden-xs">{name}</span>
                        </a>
                        <ul className="dropdown-menu">
                            <li className="user-header">
                                <img src="http://lorempixel.com/160/160/abstract"
                                    className="img-circle" alt="User" />
                                <p>{name}<small>{email}</small></p>
                            </li>
                            <li className="user-footer">
                                <LinkContainer to={'/'} exact >
                                    <NavItem button onClick={this.onLogoutClick} class="btn btn-primary" className=" btn-flat pull-right">
                                        <Glyphicon glyph='log-out' /> Sair
                                    </NavItem>
                                </LinkContainer>
                            </li>
                        </ul>
                    </li>


                </ul>
            </div>
        )
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth      : PropTypes.object.isRequired
  };

const mapStateToProps = state => ({
    auth: state.auth
  });

export default connect(
    mapStateToProps,
    { logoutUser }
  )(Navbar);