import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './NavMenu.scss';
import { ArrowBarLeft, ArrowBarRight, House, Newspaper, PersonLinesFill } from 'react-bootstrap-icons';

const NavMenu = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleMenu = () => {
        setIsCollapsed(!isCollapsed);
    };

    let navMenuClass = 'nav-menu';
    if (isCollapsed) {
        navMenuClass += ' nav-menu--collapsed';
    }

    return (
        <div className={navMenuClass}>
            <nav>
                <NavLink className='nav-menu__item' to='/'>
                    <House />
                    <p>Home</p>
                </NavLink>
                <NavLink className='nav-menu__item' to='firefighter'>
                    <PersonLinesFill />
                    <p>Firefighters</p>
                </NavLink>
                <NavLink className='nav-menu__item' to='indemnity-slips'>
                    <Newspaper />
                    <p>Indemnity Slips</p>
                </NavLink>
            </nav>

            <button className='nav-menu__button' onClick={toggleMenu} role='presentation' title='Collapse menu' type='button'>
                {isCollapsed ? <ArrowBarRight /> : <ArrowBarLeft />}
            </button>
        </div>
    );
};

export default NavMenu;
