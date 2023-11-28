import './style.scss';

interface IDateTimeInputProps {
    id: string;
    value?: Date | null;
    label: string;
    required?: boolean;
    errorMessages?: string[];
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type: 'date' | 'time' | 'datetime-local';
}

const DateTimeInput = ({ label, value, type, id, required, errorMessages, onChange }: IDateTimeInputProps) => {
    const isInvalid = errorMessages !== undefined && errorMessages.length > 0;

    const inputRequiredClass = required ? 'date-field__input--required' : '';
    const inputInvalidClass = isInvalid ? 'date-field__input--invalid' : '';

    const splitValue = value?.toLocaleString().split(' ');
    const date = splitValue?.[0];
    const time = splitValue?.[1];

    let day = undefined;
    let month = undefined;
    let year = undefined;
    let hour = undefined;
    let minute = undefined;

    if (date && (type === 'date' || type === 'datetime-local')) {
        const splitDate = date?.split('/');

        day = splitDate?.[0];
        month = splitDate?.[1];
        year = splitDate?.[2]?.toString().padStart(4, '0');
    }

    if (time && (type === 'time' || type === 'datetime-local')) {
        const splitTime = time?.split(':');

        hour = splitTime?.[0]?.toString().padStart(2, '0');
        minute = splitTime?.[1]?.toString().padStart(2, '0');
    }

    let valueToDisplay;

    if (type === 'datetime-local') {
        valueToDisplay = `${year}-${month}-${day} ${hour}:${minute}`;
    } else if (type === 'date') {
        valueToDisplay = `${year}-${month}-${day}`;
    } else if (type === 'time') {
        valueToDisplay = `${hour}:${minute}`;
    }

    return (
        <div className='date-field'>
            <input
                id={id}
                value={valueToDisplay}
                className={`date-field__input ${inputRequiredClass} ${inputInvalidClass}`}
                type={type}
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

export default DateTimeInput;
