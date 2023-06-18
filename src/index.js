import React from 'react';
import {applyMiddleware, createStore} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom'
import {GoogleOAuthProvider} from '@react-oauth/google'
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import mainReducer from './components/reducers/main';

const store = createStore(mainReducer, applyMiddleware(thunk))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store} >
    <BrowserRouter>
        <GoogleOAuthProvider clientId='877608648724-rjcmq7oemsqjbu3r8k9rqo1i7jsu9h8b.apps.googleusercontent.com' >
            <App />
        </GoogleOAuthProvider>
    </BrowserRouter>
    </Provider>
);
