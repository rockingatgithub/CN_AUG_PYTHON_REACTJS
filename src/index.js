import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom'
import {GoogleOAuthProvider} from '@react-oauth/google'
import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <GoogleOAuthProvider clientId='877608648724-rjcmq7oemsqjbu3r8k9rqo1i7jsu9h8b.apps.googleusercontent.com' >
            <App />
        </GoogleOAuthProvider>
    </BrowserRouter>
    
);
