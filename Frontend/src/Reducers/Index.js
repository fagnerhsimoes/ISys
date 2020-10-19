import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';

import alert      from './AlertReducer';
import auth       from './AuthReducer';
import vendor     from './VendorReducer';
import product    from './ProductReducer';
import customer   from './CustomerReducer';
import movie      from './MovieReducer';
import tournament from './TournamentReducer';
import category   from './CategoryReducer';

const rootReducer = combineReducers({
  form: formReducer,
  toastr: toastrReducer,
  alert,
  auth,
  vendor,
  product,
  movie,
  customer,
  category,
  tournament   
});

export default rootReducer


