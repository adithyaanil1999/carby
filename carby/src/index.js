import React from 'react';
import reactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './components/App';
import reducers from './reducers';

export const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

reactDom.render(
    <Provider store={ store }>
        <App />,
    </Provider>, 
    document.getElementById('root')
)


