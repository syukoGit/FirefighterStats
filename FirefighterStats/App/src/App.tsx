import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import NavMenu from './components/NavMenu';
import NotificationList from './components/NotificationList';
import { NotificationsProvider } from './utils/contexts/NotificationsContext';

const App = () => (
    <div className='app'>
        <NotificationsProvider>
            <header className='app__header'>
                <div className='app__header__logo'>
                    <img src='logo192.png' alt='logo' />
                    <p>FirefighterStats</p>
                </div>
                <div>
                    <p>TODO: LoginDisplay</p>
                </div>
            </header>

            <div className='app__body'>
                <BrowserRouter>
                    <div className='app__body__sidebar'>
                        <NavMenu />
                    </div>

                    <main className='app__body__content'>
                        <p>TODO: Content</p>
                    </main>
                </BrowserRouter>

                <NotificationList />
            </div>
        </NotificationsProvider>
    </div>
);

export default App;
