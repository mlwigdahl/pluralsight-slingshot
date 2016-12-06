import initialState from './initialState';
import AuthorApi from '../api/mockAuthorApi';
import {beginAjaxCall, ajaxCallError} from './ajaxDuck';

export const LOAD_AUTHORS_SUCCESS = 'pluralsight-slingshot/author/LOAD_AUTHORS_SUCCESS';
export const CREATE_AUTHOR_SUCCESS = 'pluralsight-slingshot/author/CREATE_AUTHOR_SUCCESS';
export const UPDATE_AUTHOR_SUCCESS = 'pluralsight-slingshot/author/UPDATE_AUTHOR_SUCCESS';
export const DELETE_AUTHOR_SUCCESS = 'pluralsight-slingshot/author/DELETE_AUTHOR_SUCCESS';
export const AUTHOR_CHANGED = 'pluralsight-slingshot/author/AUTHOR_CHANGED';

// reducer
export default function reducer(state = initialState.authors, action) {
    switch (action.type) {
        case LOAD_AUTHORS_SUCCESS:
            return action.authors;

        case CREATE_AUTHOR_SUCCESS:
            return [
                ...state, 
                {...action.author}
            ];

        case UPDATE_AUTHOR_SUCCESS:
            return [
                ...state.filter(author => author.id !== action.author.id),
                {...action.author}
            ];

        case DELETE_AUTHOR_SUCCESS:
            return [
                ...state.filter(author => author.id !== action.author.id)
            ];

        default:
            return state;
    }
}

// sagas

// action creators
export function loadAuthorsSuccess(authors) {
    return {type: LOAD_AUTHORS_SUCCESS, authors};
}

export function updateAuthorSuccess(author) {
    return { type: UPDATE_AUTHOR_SUCCESS, author };
}

export function createAuthorSuccess(author) {
    return { type: CREATE_AUTHOR_SUCCESS, author };
}

export function deleteAuthorSuccess(author) {
    return { type: DELETE_AUTHOR_SUCCESS, author };
}

export function authorChanged() {
    return { type: AUTHOR_CHANGED };
}

export function loadAuthors() {
    return dispatch => {
        dispatch(beginAjaxCall());
        return AuthorApi.getAllAuthors().then(authors => {
            dispatch(loadAuthorsSuccess(authors));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
    };
}

export function saveAuthor(author) {
    return (dispatch, getState) => {
        dispatch(beginAjaxCall());
        return AuthorApi.saveAuthor(author).then(savedAuthor => {
            author.id ? dispatch(updateAuthorSuccess(savedAuthor)) :
                dispatch(createAuthorSuccess(savedAuthor));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
    };
}

export function deleteAuthor(author) {
    return (dispatch, getState) => {
        dispatch(beginAjaxCall());
        return AuthorApi.deleteAuthor(author).then(deletedAuthor => {
            dispatch(deleteAuthorSuccess(deletedAuthor));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
    };
}