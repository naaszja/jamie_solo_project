import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import workOrderReducer from './work_order.reducer';
import singleWorkOrderReducer from './single_work_order.reducer';
import equipmentReducer from './equipment.reducer';
import customerReducer from './customer.reducer';


// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  workOrderReducer, //contains all work orders and accompanying details.
  singleWorkOrderReducer, //contains all work orders and accompanying details.
  equipmentReducer, //contains all equipment records
  customerReducer, //constains details about customers 
});

export default rootReducer;
