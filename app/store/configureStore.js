import {
    applyMiddleware, compose, combineReducers, createStore
} from 'redux';
import { createLogger } from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import rootReducers from 'app/reducers';
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
