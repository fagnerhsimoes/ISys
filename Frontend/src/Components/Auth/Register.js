import './Login.css'
import React, { Component } from "react";
import { reduxForm, Field } from 'redux-form';
import { Link, withRouter } from "react-router-dom";
import { connect }          from "react-redux";
import PropTypes            from "prop-types";
import Button     from '@material-ui/core/Button';
import Row from '../../Commons/Templates/Form/Row';
import Grid from '../../Commons/Templates/Form/Grid';
import { InputIcon } from '../../Commons/Templates/Form/InputIcon';
import Logo       from '../../Commons/Templates/Logo/Logo';
import {Alert }               from "../Alert/Alert";
import { registerUser }     from "../../Actions/AuthActions";
import { required ,minLength6, maxLength30,isEmail, mathAnother, passwordIsValid}  
    from '../../Commons/Templates/Form/ValidatorInFieldLevel';



class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmpassword: ""
    };

  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/home");
    }
  }

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleClick(values) {
    this.props.registerUser(values, this.props.history);
  };

  render() {
    const { pristine, submitting, handleSubmit } = this.props

    return (
      <div>
          <div class="col-md-12" className='todoForm'>
                <Logo />
                <Alert/>
          </div>

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
                          placeholder="Senha" icon='lock' 
                          onChange={this.handleChange}
                          value={this.state.password}
                          validate={[required, minLength6, maxLength30, passwordIsValid]}
                        />
                      </div>
                     <div className="input-field col s12"> 
                        <Field component={InputIcon} 
                          name="confirmpassword"
                          type="password" 
                          placeholder="Confirmar Senha" 
                          icon='lock' 
                          onChange={this.handleChange}
                          value={this.state.password2}
                          validate={[required, mathAnother]}
                        />
                      </div>
                      <div>
                        <Row>
                            <Grid cols="1">
                                <button type="submit"
                                        class="btn btn-primary"
                                        disabled={pristine || submitting}>
                                    Cadastrar
                                </button>
                            </Grid>
                        </Row> 
                      </div>
                    </form>
                    <br />
                    <Link to="/">Já é cadastrado? Entrar aqui!</Link>
                </div>
            </div>
          </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth        : PropTypes.object.isRequired
};

Register = reduxForm({ form: 'registerForm', touchOnBlur: false})(Register)
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));


