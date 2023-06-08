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

    const splitValue = value?.toLocaleDateString().split('/');
    const day = splitValue?.[0];
    const month = splitValue?.[1];
    const year = splitValue?.[2]?.toString().padStart(4, '0');

    const valueToDisplay = value ? `${year}-${month}-${day}` : undefined;

    return (
        <div className='date-field'>
            <input
                id={id}
                value={valueToDisplay}
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
