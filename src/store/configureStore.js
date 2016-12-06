import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../ducks';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(reduxImmutableStateInvariant(), thunk)
    );
}

