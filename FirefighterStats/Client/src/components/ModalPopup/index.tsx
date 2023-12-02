import { useCallback, useEffect, useRef, useState } from 'react';
import './style.scss';

interface IModalPopupProps {
    children: React.ReactNode;
    isOpen: boolean;
    onClose?: () => void;
}

const ModalPopup = ({ children, isOpen, onClose }: IModalPopupProps) => {
    const [isModalOpen, setIsModalOpen] = useState(isOpen);

    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsModalOpen(isOpen);
    }, [isOpen]);

    const close = useCallback(() => {
        setIsModalOpen(false);
        onClose?.();
    }, [onClose]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                close();
            }
        };

        const handleClickOutside = (event: MouseEvent) => {
            if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
                close();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [close]);

    return (
        <>
            {isModalOpen && (
                <div className='modal-popup'>
                    <div ref={contentRef} className='modal-popup__content'>
                        {children}
                    </div>
                </div>
            )}
        </>
    );
};

export default ModalPopup;
