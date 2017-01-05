import initialState from './initialState';

// actions
export const actions = {
    BEGIN_AJAX_CALL: 'pluralsight-slingshot/ajax/BEGIN_AJAX_CALL',
    AJAX_CALL_ERROR: 'pluralsight-slingshot/ajax/AJAX_CALL_ERROR'
};

function actionTypeEndsInSuccess(type) {
    return type.substring(type.length - 8) == '_SUCCESS';
}

// reducer
export function reducer(state = initialState.ajaxCallsInProgress, action) {
    if (action.type == actions.BEGIN_AJAX_CALL) {
        return state + 1;
    } else if (action.type == actions.AJAX_CALL_ERROR || actionTypeEndsInSuccess(action.type)) {
        return state - 1;
    }

    return state;
}

// sagas

export const sagas = {
    watchers: {},
    workers: {}
};

// action creators

export const creators = {
    beginAjaxCall: () => {
        return {type: actions.BEGIN_AJAX_CALL};
    },
    ajaxCallError: () => {
        return {type: actions.AJAX_CALL_ERROR};
    }
};