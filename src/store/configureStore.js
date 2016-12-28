import {createStore, applyMiddleware} from 'redux';
import root from '../ducks';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import createSagaMiddleware from 'redux-saga';

export const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState) {
    const middlewares = [
        reduxImmutableStateInvariant(),
        sagaMiddleware,
    ];

    return createStore(
        root.reducer,
        initialState,
        applyMiddleware(...middlewares)
    );
}

