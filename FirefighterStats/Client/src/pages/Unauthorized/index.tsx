import './style.scss';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
    const navigate = useNavigate();

    return (
        <div className='unauthorized-page'>
            <h1>What are you doing here?</h1>
            <p> You are not allowed to come here!</p>
            <button className='unauthorized-page__button' onClick={() => navigate('/')} type='button'>
                Go back to home
            </button>
        </div>
    );
};

export default Unauthorized;
