import { combineReducers } from 'redux';
import cakeReducer from './cakeReducer';

const rootReducer = combineReducers({
  cakes: cakeReducer,
});

export default rootReducer;
