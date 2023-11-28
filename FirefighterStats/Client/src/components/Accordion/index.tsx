import './style.scss';
import { useState } from 'react';

interface IAccordionProps {
    children: React.ReactNode;
    title: string;
    className?: string;
}

const Accordion = ({ children, title, className }: IAccordionProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => setIsOpen(!isOpen);

    const headerOpenClass = isOpen ? 'accordion__header--open' : '';
    const iconOpenClass = isOpen ? 'accordion__header__icon--open' : '';
    const accordionContentOpenClass = isOpen ? 'accordion__content--open' : '';

    return (
        <div className={`accordion ${className}`}>
            <div className={`accordion__header ${headerOpenClass}`} onClick={toggleOpen}>
                <i className={`accordion__header__icon ${iconOpenClass}`}></i>
                <h3 className='accordion__header__title'>{title}</h3>
            </div>

            <div className={`accordion__content ${accordionContentOpenClass}`}>{children}</div>
        </div>
    );
};

export default Accordion;
