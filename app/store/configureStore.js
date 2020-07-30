// import { createStore, compose, applyMiddleware } from 'redux';
// import { persistStore, persistCombineReducers } from 'redux-persist';
// import storage from 'redux-persist/es/storage'; // default: localStorage if web, AsyncStorage if react-native
// import { createLogger } from 'redux-logger';
// import createSagaMiddleware from 'redux-saga';

// import rootReducers from 'app/reducers'; // where reducers is a object of reducers
// import sagas from 'app/sagas';

// const config = {
//     key: 'root',
//     storage,
//     blacklist: ['nav', 'loadingReducer'],
//     debug: true //to get useful logging
// };

// const middleware = [];
// const sagaMiddleware = createSagaMiddleware();

// // middleware.push(sagaMiddleware);

// if (__DEV__) {
//     middleware.push(createLogger());
// }

// const reducers = persistCombineReducers(config, rootReducers);
// const enhancers = [applyMiddleware(...middleware)];
// // const initialState = {};
// const persistConfig = { enhancers };
// const store = createStore(reducers, undefined, compose(...enhancers));
// const persistor = persistStore(store, persistConfig, () => {
//     //   console.log('Test', store.getState());
// });

// // sagaMiddleware.run(sagas);

// export { store, persistor };

import {
    applyMiddleware, compose, combineReducers, createStore
} from 'redux';
import { createLogger } from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import rootReducers from 'app/reducers';
/**
   * This import defaults to localStorage for web and AsyncStorage for react-native.
   *
   * Keep in mind this storage *is not secure*. Do not use it to store sensitive information
   * (like API tokens, private and sensitive data, etc.).
   *
   * If you need to store sensitive information, use redux-persist-sensitive-storage.
   * @see https://github.com/CodingZeal/redux-persist-sensitive-storage
   */
import storage from 'redux-persist/lib/storage';
  
const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['nav', 'loadingReducer'],
    debug: true //to get useful logging
};
  
const reducer = combineReducers(rootReducers);
  
const rootReducer = (defaultState, action) => {
    let state = defaultState;
    return reducer(state, action);
};
  
const middleware = [];
const enhancers = [];
  
// eslint-disable-next-line no-undef
if (__DEV__) {
    middleware.push(createLogger());
}
  
enhancers.push(applyMiddleware(...middleware));
  
// Redux persist
const persistedReducer = persistReducer(persistConfig, rootReducer);
  
const store = createStore(persistedReducer, compose(...enhancers));
const persistor = persistStore(store);
  
export { store, persistor };
