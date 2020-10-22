import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';

import alert           from './AlertReducer';
import auth            from './AuthReducer';
import room            from './RoomReducer';
import reservation     from './ReservationReducer';
import availability    from './AvailabilityReducer';
import notavailability from './NotAvailabilityReducer';

const rootReducer = combineReducers({
  form: formReducer,
  toastr: toastrReducer,
  alert,
  auth,
  room,
  reservation,
  availability,
  notavailability,

});

export default rootReducer


