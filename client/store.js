import {combineReducers, createStore} from 'redux';
import schoolReducer from './storeReducers/schoolReducer';
import studentReducer from './storeReducers/studentReducer';
import userReducer from './storeReducers/userReducer';

const rootReducer = combineReducers({schools: schoolReducer,
				     students: studentReducer,
				     user: userReducer});

export default createStore(rootReducer);
