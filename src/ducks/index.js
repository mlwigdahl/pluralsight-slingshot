import {combineReducers} from 'redux';
import courses from './courseDuck';
import authors from './authorDuck';
import ajaxCallsInProgress from './ajaxDuck';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
    courses,
    authors,
    ajaxCallsInProgress,
    routing: routerReducer
});

export default rootReducer;