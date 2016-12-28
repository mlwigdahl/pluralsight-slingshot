import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';

import initialState from './initialState';
import AuthorApi from '../api/mockAuthorApi';
import * as ajax from './ajaxDuck';

export const actions = {
    LOAD_AUTHORS_SUCCESS: 'pluralsight-slingshot/author/LOAD_AUTHORS_SUCCESS',
    CREATE_AUTHOR_SUCCESS: 'pluralsight-slingshot/author/CREATE_AUTHOR_SUCCESS',
    UPDATE_AUTHOR_SUCCESS: 'pluralsight-slingshot/author/UPDATE_AUTHOR_SUCCESS',
    DELETE_AUTHOR_SUCCESS: 'pluralsight-slingshot/author/DELETE_AUTHOR_SUCCESS',
    AUTHOR_CHANGED: 'pluralsight-slingshot/author/AUTHOR_CHANGED',
    LOAD_AUTHORS_REQUEST: 'pluralsight-slingshot/author/LOAD_AUTHORS_REQUEST',
    SAVE_AUTHOR_REQUEST: 'pluralsight-slingshot/author/SAVE_AUTHOR_REQUEST',
    DELETE_AUTHOR_REQUEST: 'pluralsight-slingshot/author/DELETE_AUTHOR_REQUEST'
};

// reducer
export function reducer(state = initialState.authors, action) {
    switch (action.type) {
        case actions.LOAD_AUTHORS_SUCCESS:
            return action.authors;

        case actions.CREATE_AUTHOR_SUCCESS:
            return [
                ...state, 
                {...action.author}
            ];

        case actions.UPDATE_AUTHOR_SUCCESS:
            return [
                ...state.filter(author => author.id !== action.author.id),
                {...action.author}
            ];

        case actions.DELETE_AUTHOR_SUCCESS:
            return [
                ...state.filter(author => author.id !== action.author.id)
            ];

        default:
            return state;
    }
}

// sagas

export const sagas = {
    watchers: {
        LOAD_AUTHORS_REQUEST: function* () {
            yield takeEvery(actions.LOAD_AUTHORS_REQUEST, sagas.workers.loadAuthors);
        },
        SAVE_AUTHOR_REQUEST: function* () {
            yield takeEvery(actions.SAVE_AUTHOR_REQUEST, sagas.workers.saveAuthor);
        },
        DELETE_AUTHOR_REQUEST: function* () {
            yield takeEvery(actions.DELETE_AUTHOR_REQUEST, sagas.workers.deleteAuthor);
        }
    },
    workers: {
        loadAuthors: function* () {
            try {
                yield put(ajax.creators.beginAjaxCall());
                const authors = yield call(AuthorApi.getAllAuthors);
                yield put(creators.loadAuthorsSuccess(authors));
            }
            catch (e) {
                yield put(ajax.creators.ajaxCallError(e));
            }
        },
        saveAuthor: function* (action) {
            try {
                yield put(ajax.creators.beginAjaxCall());
                const author = yield call(AuthorApi.saveAuthor, action.data);
                if (action.data.id) {
                    yield put(creators.updateAuthorSuccess(author));
                }
                else {
                    yield put(creators.createAuthorSuccess(author));
                }
            }
            catch (e) {
                yield put(ajax.creators.ajaxCallError(e));
            }
        },
        deleteAuthor: function* (action) {
            try {
                yield put(ajax.creators.beginAjaxCall());
                const author = yield call(AuthorApi.deleteAuthor, action.data);
                yield put(creators.deleteAuthorSuccess(author));
            }
            catch (e) {
                yield put(ajax.creators.ajaxCallError(e));
            }
        }
    }
};

// action creators

export const creators = {
    loadAuthorsSuccess: (authors) => {
        return {type: actions.LOAD_AUTHORS_SUCCESS, authors};
    },

    updateAuthorSuccess: (author) => {
        return { type: actions.UPDATE_AUTHOR_SUCCESS, author };
    },

    createAuthorSuccess: (author) => {
        return { type: actions.CREATE_AUTHOR_SUCCESS, author };
    },

    deleteAuthorSuccess: (author) => {
        return { type: actions.DELETE_AUTHOR_SUCCESS, author };
    },

    authorChanged: () => {
        return { type: actions.AUTHOR_CHANGED };
    },

    loadAuthors: () => {
        return { type: actions.LOAD_AUTHORS_REQUEST };
    },

    saveAuthor: (author) => {
        return { type: actions.SAVE_AUTHOR_REQUEST, data: author };
    },

    deleteAuthor: (author) => {
        return { type: actions.DELETE_AUTHOR_REQUEST, data: author };
    }
};