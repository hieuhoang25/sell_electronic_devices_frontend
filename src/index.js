import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import Store from './redux/Store';
import { BrowserRouter } from 'react-router-dom';
let { store2, persistor } = Store();
ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store2} persisto={persistor}>
                <App />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root'),
);
