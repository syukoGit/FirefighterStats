import './NumberInput.scss';
import { useState } from 'react';

interface INumberInputProps {
    id: string;
    value?: number | null;
    label: string;
    required?: boolean;
    readOnly?: boolean;
    errorMessages?: string[];
    onChange?: (e: number | undefined) => void;
}

const NumberInput = ({ label, value, id, required, readOnly, errorMessages, onChange }: INumberInputProps) => {
    const [inputValue, setInputValue] = useState(value ?? undefined);
    const [modified, setModified] = useState(inputValue && !isNaN(inputValue));

    const isInvalid = errorMessages !== undefined && errorMessages.length > 0;

    const inputModifiedClass = modified ? 'number-field__input--modified' : '';
    const inputRequiredClass = required ? 'number-field__input--required' : '';
    const inputInvalidClass = isInvalid ? 'number-field__input--invalid' : '';

    const numberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let number: number | undefined = e.target.valueAsNumber;

        if (isNaN(number)) {
            number = undefined;
        }

        if (number) {
            setModified(true);
        } else {
            setModified(false);
        }

        setInputValue(number);
        onChange && onChange(number);
    };

    return (
        <div className='number-field'>
            <input
                id={id}
                value={Number.isNaN(inputValue) ? '' : inputValue}
                className={`number-field__input ${inputRequiredClass} ${inputModifiedClass} ${inputInvalidClass}`}
                type='number'
                onChange={numberChange}
                required={required}
                readOnly={readOnly}
            />
            <label className='number-field__label' htmlFor={id}>
                {label}
            </label>
            {isInvalid && (
                <div className='number-field__errors'>
                    {errorMessages.map((errorMessage, index) => (
                        <p key={index}>{errorMessage}</p>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NumberInput;
