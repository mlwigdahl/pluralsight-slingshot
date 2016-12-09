import {createStore, applyMiddleware} from 'redux';
import root from '../ducks';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

export default function configureStore(initialState) {
    return createStore(
        root.reducer,
        initialState,
        applyMiddleware(reduxImmutableStateInvariant(), thunk)
    );
}

