import { combineReducers } from 'redux';
import sources from './sources';
import feeds from './feeds';

export default combineReducers({
  sources,
  feeds,
});
