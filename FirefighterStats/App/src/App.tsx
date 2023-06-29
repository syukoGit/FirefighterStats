import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Auth from './components/authentication/Auth';
import Firefighters from './pages/Firefighters';
import LoginDisplay from './components/authentication/LoginDisplay';
import NavMenu from './components/NavMenu';
import Unauthorized from './pages/Unauthorized';
import YourProfile from './pages/YourProfile';
import IndemnitySlips from './pages/indemnity-slips/IndemnitySlips';
import IndemnitySlipView from './pages/indemnity-slips/IndemnitySlipView';
import NewIndemnitySlipView from './pages/indemnity-slips/NewIndemnitySlipView';

const App = () => (
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
                <Routes>
                    <Route path='/unauthorized' element={<Unauthorized />} />
                    <Route element={<Auth />}>
                        <Route path='/firefighters' element={<Firefighters />} />
                        <Route path='/profile' element={<YourProfile />} />
                        <Route path='/indemnity-slips' element={<IndemnitySlips />} />
                        <Route path='/indemnity-slips/create' element={<NewIndemnitySlipView />} />
                        <Route path='/indemnity-slips/:indemnitySlipId' element={<IndemnitySlipView />} />
                    </Route>
                </Routes>
            </main>
        </div>
    </div>
);

export default App;
