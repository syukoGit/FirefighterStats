import './style.scss';

interface ISelectInputProps {
    id: string;
    value?: string | null;
    label: string;
    required?: boolean;
    errorMessages?: string[];
    options: { value: string; displayName: string | null | undefined }[];
    nullable?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectInput = ({ id, value, label, required, errorMessages, options, nullable, onChange }: ISelectInputProps) => {
    const isInvalid = errorMessages !== undefined && errorMessages.length > 0;

    const inputRequiredClass = required ? 'select-field__select--required' : '';
    const inputInvalidClass = isInvalid ? 'select-field__select--invalid' : '';

    return (
        <div className='select-field'>
            <select
                id={id}
                value={value ?? undefined}
                className={`select-field__select ${inputRequiredClass} ${inputInvalidClass}`}
                onChange={(e) => onChange && onChange(e)}
            >
                {nullable && <option key={-1} value={''}></option>}
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.displayName}
                    </option>
                ))}
            </select>
            <label className='select-field__label' htmlFor={id}>
                {label}
            </label>
            {isInvalid && (
                <div className='select-field__errors'>
                    {errorMessages.map((errorMessage, index) => (
                        <text key={index}>{errorMessage}</text>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SelectInput;
