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
    const inputValue = value ?? undefined;

    const [isModified, setIsModified] = useState(inputValue !== undefined);

    const isInvalid = errorMessages !== undefined && errorMessages.length > 0;

    const inputModifiedClass = isModified ? 'number-field__input--modified' : '';
    const inputRequiredClass = required ? 'number-field__input--required' : '';
    const inputInvalidClass = isInvalid ? 'number-field__input--invalid' : '';
    const inputReadOnlyClass = readOnly ? 'number-field__input--read-only' : '';

    const numberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let number: number | undefined = e.target.valueAsNumber;

        if (isNaN(number)) {
            number = undefined;
        }

        if (number) {
            setIsModified(true);
        } else {
            setIsModified(false);
        }

        onChange && onChange(number);
    };

    return (
        <div className='number-field'>
            <input
                id={id}
                value={Number.isNaN(inputValue) ? '' : inputValue}
                className={`number-field__input ${inputRequiredClass} ${inputModifiedClass} ${inputInvalidClass} ${inputReadOnlyClass}`}
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
