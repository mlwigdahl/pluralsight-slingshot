import initialState from './initialState';
import AuthorApi from '../api/mockAuthorApi';
import * as ajax from './ajaxDuck';

export const actions = {
    LOAD_AUTHORS_SUCCESS: 'pluralsight-slingshot/author/LOAD_AUTHORS_SUCCESS',
    CREATE_AUTHOR_SUCCESS: 'pluralsight-slingshot/author/CREATE_AUTHOR_SUCCESS',
    UPDATE_AUTHOR_SUCCESS: 'pluralsight-slingshot/author/UPDATE_AUTHOR_SUCCESS',
    DELETE_AUTHOR_SUCCESS: 'pluralsight-slingshot/author/DELETE_AUTHOR_SUCCESS',
    AUTHOR_CHANGED: 'pluralsight-slingshot/author/AUTHOR_CHANGED'
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
        return dispatch => {
            dispatch(ajax.creators.beginAjaxCall());
            return AuthorApi.getAllAuthors().then(authors => {
                dispatch(creators.loadAuthorsSuccess(authors));
            }).catch(error => {
                dispatch(ajax.creators.ajaxCallError(error));
                throw(error);
            });
        };
    },

    saveAuthor: (author) => {
        return (dispatch, getState) => {
            dispatch(ajax.creators.beginAjaxCall());
            return AuthorApi.saveAuthor(author).then(savedAuthor => {
                author.id ? dispatch(creators.updateAuthorSuccess(savedAuthor)) :
                    dispatch(creators.createAuthorSuccess(savedAuthor));
            }).catch(error => {
                dispatch(ajax.creators.ajaxCallError(error));
                throw(error);
            });
        };
    },

    deleteAuthor: (author) => {
        return (dispatch, getState) => {
            dispatch(ajax.creators.beginAjaxCall());
            return AuthorApi.deleteAuthor(author).then(deletedAuthor => {
                dispatch(creators.deleteAuthorSuccess(deletedAuthor));
            }).catch(error => {
                dispatch(ajax.creators.ajaxCallError(error));
                throw(error);
            });
        };
    }
};