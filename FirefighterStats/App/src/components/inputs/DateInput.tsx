import './DateInput.scss';

interface IDateInputProps {
    id: string;
    value?: Date | null;
    label: string;
    required?: boolean;
    errorMessages?: string[];
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DateInput = ({ label, value, id, required, errorMessages, onChange }: IDateInputProps) => {
    const isInvalid = errorMessages !== undefined && errorMessages.length > 0;

    const inputRequiredClass = required ? 'date-field__input--required' : '';
    const inputInvalidClass = isInvalid ? 'date-field__input--invalid' : '';

    return (
        <div className='date-field'>
            <input
                id={id}
                value={value?.toISOString().split('T')[0]}
                className={`date-field__input ${inputRequiredClass} ${inputInvalidClass}`}
                type='date'
                onChange={(e) => onChange && onChange(e)}
            />
            <label className='date-field__label' htmlFor={id}>
                {label}
            </label>
            {isInvalid && (
                <div className='date-field__errors'>
                    {errorMessages.map((errorMessage, index) => (
                        <text key={index}>{errorMessage}</text>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DateInput;
