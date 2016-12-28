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

const saga = function* () {
    yield [
        author.sagas.watchers.LOAD_AUTHORS_REQUEST(),
        author.sagas.watchers.SAVE_AUTHOR_REQUEST(),
        author.sagas.watchers.DELETE_AUTHOR_REQUEST(),
        course.sagas.watchers.LOAD_COURSES_REQUEST(),
        course.sagas.watchers.SAVE_COURSE_REQUEST(),
        course.sagas.watchers.DELETE_COURSE_REQUEST(),
    ];
};

export default { reducer, saga };