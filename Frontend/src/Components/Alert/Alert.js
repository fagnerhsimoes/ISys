import React, { Component } from 'react';
import { connect } from 'react-redux';
import { alertActions } from '../../Actions';
import   History   from '../../Helpers/History';
import PropTypes  from 'prop-types';


class Alert extends Component {
        constructor(props) {
            super(props);

            
        const { dispatch } = this.props;
        History.listen((location, action) => {
            dispatch(alertActions.clear());
        });
        }

    componentDidUpdate( ) { 
        this.props.alert.message  && setTimeout(() => {
            this.props.dispatch(alertActions.clear()); 
    }, 4000 )}



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

  function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(Alert);
export { connectedApp as Alert }; 
