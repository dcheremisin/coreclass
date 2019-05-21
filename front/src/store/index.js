import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from '../reducer';
import { composeWithDevTools } from  'redux-devtools-extension' ;
import RootSaga from '../saga';

const sagaMiddleware = createSagaMiddleware();

export function configureStore() {
    const store = createStore(
        reducer,
        composeWithDevTools(applyMiddleware(sagaMiddleware)),
    );

    sagaMiddleware.run(RootSaga);
    return store;
}
