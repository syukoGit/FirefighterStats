import './App.scss';
import LoginDisplay from './components/authentication/LoginDisplay';
import NavMenu from './components/NavMenu';

const App = () => {
    return (
        <div className='app'>
            <header className='app__header'>
                <div className='app__header__logo'>
                    <img src='logo192.png' alt='logo' />
                    <p>FirefighterStats</p>
                </div>
                <LoginDisplay />
            </header>

            <div className='app__body'>
                <div className='app__body__sidebar'>
                    <NavMenu />
                </div>

                <main className='app__body__content'>
                    <p>TODO: Content</p>
                </main>
            </div>
        </div>
    );
};

export default App;
