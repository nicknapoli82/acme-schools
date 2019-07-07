import {combineReducers, createStore} from 'redux';
import schoolReducer from './storeReducers/schoolReducer';
import studentReducer from './storeReducers/studentReducer';

const rootReducer = combineReducers({schools: schoolReducer, students: studentReducer});

export default createStore(rootReducer);
