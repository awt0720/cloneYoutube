import { combineReducers } from 'redux';
import { userState } from './user_reducer';


const rootReducer = combineReducers({
    userState
});

export default rootReducer;