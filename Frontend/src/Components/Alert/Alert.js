import React, { Component } from 'react';
import { connect } from 'react-redux';

import { alertActions } from '../../Actions';
import   History   from '../../Helpers/History';

import PropTypes  from 'prop-types';
import { limpar } from '../../Actions/AlertActions';
import { Link, withRouter } from "react-router-dom";

class Alert extends Component {
        constructor(props) {
            super(props);

            
        const { dispatch } = this.props;
        History.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });

        //limpar();
        }

    componentDidUpdate( ) { 
        this.props.alert.message  && setTimeout(() => {
            this.props.dispatch(alertActions.clear()); 
    }, 10000 )}



    render() {
        const { alert } = this.props;
        return (
                <div >
                    <div >
                        <div className="col-sm-8 col-sm-offset-2">
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

Alert.propTypes = {
    limpar   : PropTypes.func.isRequired,
    alert    : PropTypes.object.alert,
};

/*const mapStateToProps = state => ({
    alert   : state.alert
});*/


/*const mapStateToProps = state => ({
    alert: state.alert
  });
  
/*export default connect(
    mapStateToProps
)(Alert);*/
/*
export default connect(
    mapStateToProps,
    { limpar }
  )(withRouter(Alert));*/

  function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(Alert);
export { connectedApp as Alert }; 
