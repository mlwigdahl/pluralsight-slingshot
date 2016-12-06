import initialState from './initialState';

// actions
export const BEGIN_AJAX_CALL = 'pluralsight-slingshot/ajax/BEGIN_AJAX_CALL';
export const AJAX_CALL_ERROR = 'pluralsight-slingshot/ajax/AJAX_CALL_ERROR';

function actionTypeEndsInSuccess(type) {
    return type.substring(type.length - 8) == '_SUCCESS';
}

// reducer
export default function reducer(state = initialState.ajaxCallsInProgress, action) {
    if (action.type == BEGIN_AJAX_CALL) {
        return state + 1;
    } else if (action.type == AJAX_CALL_ERROR || actionTypeEndsInSuccess(action.type)) {
        return state - 1;
    }

    return state;
}

// sagas

// action creators
export function beginAjaxCall() {
    return {type: BEGIN_AJAX_CALL};
}

export function ajaxCallError() {
    return {type: AJAX_CALL_ERROR};
}