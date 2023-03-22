import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { NotificationsProvider } from './utils/contexts/NotificationsContext';
import NotificationList from './components/notifications/NotificationList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/authentication/Login';
import Register from './pages/authentication/Register';
import { AuthenticationProvider } from './utils/contexts/AuthenticationContext';
import axios from 'axios';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

axios.defaults.baseURL = 'https://localhost:7224/api/';

root.render(
    <React.StrictMode>
        <NotificationsProvider>
            <AuthenticationProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/*' element={<App />} />
                    </Routes>
                </BrowserRouter>
            </AuthenticationProvider>
            <NotificationList />
        </NotificationsProvider>
    </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
