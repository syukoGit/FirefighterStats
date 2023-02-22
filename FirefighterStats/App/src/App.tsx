import { BrowserRouter, Router } from 'react-router-dom';
import './App.scss';
import NavMenu from './components/NavMenu';

function App() {
    return (
        <div className='app'>
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

                <p>TODO: Notification</p>
            </div>
        </div>
    );
}

export default App;
