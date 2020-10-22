import './Login.css'
import React, { Component } from "react";
import { reduxForm, Field } from 'redux-form';
import PropTypes            from "prop-types";
import { connect }          from "react-redux";
import Button               from '@material-ui/core/Button';
import Row                  from   '../../Commons/Templates/Form/Row';
import Grid                 from '../../Commons/Templates/Form/Grid';
import { InputIcon }        from '../../Commons/Templates/Form/InputIcon';
import Logo                 from '../../Commons/Templates/Logo/Logo';
import { loginUser }        from "../../Actions/AuthActions";
import  { Alert }           from "../Alert/Alert";
import { Link, withRouter } from "react-router-dom";

import {SubmissionError} from 'redux-form';
import { required, 
         minLength6, 
         maxLength30,
         isEmail}  
from '../../Commons/Templates/Form/ValidatorInFieldLevel';



class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/home")
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/home");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };



  handleClick(values) {
    this.props.loginUser(values); 
  }

  render() {
    const { pristine, submitting, handleSubmit } = this.props

    return (
        <div class="col-md-12" className='todoForm'>
           <Logo />
           <Alert/>
        <div className="login-box">
        <div className="login-logo"><b> My</b> ISys </div>
              <div className="login-box-body">
                 <p className="login-box-msg">Bem vindo!</p>
                    <form onSubmit={handleSubmit(v => this.handleClick(v))}>
                      <div className="input-field col s12">                 
                        <Field component={InputIcon} 
                            name="email"
                            type="email" 
                            placeholder="E-mail" 
                            icon='envelope' 
                            onChange={this.handleChange}
                            value={this.state.email}
                            validate={[required, isEmail]} 
                         />
                      </div>
                      <div className="input-field col s12">   
                          <Field component={InputIcon} 
                            name="password"
                            type="password" 
                            placeholder="Senha" 
                            icon='lock'
                            onChange={this.handleChange}
                            value={this.state.password}
                            validate={[required, minLength6, maxLength30]}
                           />
                         </div>
                         <div >                 
                         <Row>
                            <Grid cols="1">
                                <button type="submit"
                                        class="btn btn-primary"
                                        disabled={pristine || submitting}>
                                        Entrar
                                </button>
                            </Grid>
                        </Row>
                      </div>
                    </form>
                    <br />
                    <Link to="/register">Novo usuário? Registrar aqui!</Link>
                </div>
            </div>
  </div>
    );
  }
}

Login.propTypes = {
  loginUser    : PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

Login = reduxForm({ form: 'loginForm', touchOnBlur: false})(Login)
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));
