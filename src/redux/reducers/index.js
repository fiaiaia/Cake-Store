import { combineReducers } from 'redux';
import cakesReducer from '../cakeReducer';

const rootReducer = combineReducers({
  cakes: cakesReducer,
});

export default rootReducer;
