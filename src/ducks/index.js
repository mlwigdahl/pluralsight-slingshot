import {combineReducers} from 'redux';
import * as course from './courseDuck';
import * as author from './authorDuck';
import * as ajax from './ajaxDuck';
import {routerReducer} from 'react-router-redux';

const reducer = combineReducers({
    courses: course.reducer,
    authors: author.reducer,
    ajaxCallsInProgress: ajax.reducer,
    routing: routerReducer
});

export default { reducer };