import './TextInput.scss';
import { useState } from 'react';

interface ITextInputProps {
    id: string;
    value?: string | null;
    label: string;
    required?: boolean;
    errorMessages?: string[];
    type: 'text' | 'password';
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = ({ label, value, id, required, errorMessages, type, onChange }: ITextInputProps) => {
    const [modified, setModified] = useState(value !== undefined && value !== null && value.length > 0);

    const isInvalid = errorMessages !== undefined && errorMessages.length > 0;

    const inputModifiedClass = modified ? 'text-field__input--modified' : '';
    const inputRequiredClass = required ? 'text-field__input--required' : '';
    const inputInvalidClass = isInvalid ? 'text-field__input--invalid' : '';

    const textChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length > 0) {
            setModified(true);
        } else {
            setModified(false);
        }

        onChange && onChange(e);
    };

    return (
        <div className='text-field'>
            <input
                id={id}
                value={value ?? undefined}
                className={`text-field__input ${inputRequiredClass} ${inputModifiedClass} ${inputInvalidClass}`}
                type={type}
                onChange={textChange}
            />
            <label className='text-field__label' htmlFor={id}>
                {label}
            </label>
            {isInvalid && (
                <div className='text-field__errors'>
                    {errorMessages.map((errorMessage, index) => (
                        <p key={index}>{errorMessage}</p>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TextInput;
