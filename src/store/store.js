import { createStore, applyMiddleware } from "redux";

import createSagaMiddleware from 'redux-saga';
import sagas from './sagas';
import rootReducer from './reducers';

const createAppStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        rootReducer,
        applyMiddleware(sagaMiddleware)
    );

    sagaMiddleware.run(sagas);

    return store;
};

export default createAppStore;