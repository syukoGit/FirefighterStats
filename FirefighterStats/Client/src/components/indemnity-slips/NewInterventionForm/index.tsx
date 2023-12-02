import { useState } from 'react';
import EInterventionType, { getDisplayName } from '../../../types/EInterventionType';
import './style.scss';
import TextInput from '../../inputs/TextInput';
import DateTimeInput from '../../inputs/DateTimeInput';
import NumberInput from '../../inputs/NumberInput';
import SelectInput from '../../inputs/SelectInput';
import { NewIntervention } from '../../../types/Intervention';
import { getInterventionCalculator } from '../../../types/InterventionCalculator';
import ECalculatorVersion from '../../../types/ECalculatorVersion';

interface INewInterventionFormProps {
    defaultStartDateTime?: Date;
    defaultEndDateTime?: Date;
    onSave: (newIntervention: NewIntervention) => void;
}

const NewInterventionForm = ({ defaultStartDateTime = new Date(), defaultEndDateTime = new Date(), onSave }: INewInterventionFormProps) => {
    const [newIntervention, setNewIntervention] = useState<NewIntervention>({
        title: '',
        startDateTime: defaultStartDateTime,
        endDateTime: defaultEndDateTime,
        interventionType: 'PersonalAssistance',
        calculatorVersion: 'V2',
        unitAmount: 7.92,
        number: NaN,
    });

    const interventionCalculator = getInterventionCalculator(newIntervention.calculatorVersion);

    const [errors, setErrors] = useState<{
        titleError?: string;
        startDateError?: string;
        endDateError?: string;
        interventionTypeError?: string;
        calculatorVersionError?: string;
        unitAmountError?: string;
        numberError?: string;
    }>({
        titleError: undefined,
        startDateError: undefined,
        endDateError: undefined,
        unitAmountError: undefined,
        numberError: undefined,
    });

    const hours = interventionCalculator.calculateHours(newIntervention.startDateTime, newIntervention.endDateTime);

    const dayTime = hours.dayTime;
    const nightTime = hours.nightTime;
    const specialTime = hours.specialTime;

    const amount = interventionCalculator.calculateAmount(newIntervention.unitAmount, hours);

    const onSaveClick = () => {
        let hasError = false;

        if (newIntervention.title.length === 0) {
            setErrors({ ...errors, titleError: 'Title is required' });
            hasError = true;
        } else {
            setErrors({ ...errors, titleError: undefined });
        }

        if (isNaN(newIntervention.startDateTime.getTime())) {
            setErrors({ ...errors, startDateError: 'Start Date is required' });
            hasError = true;
        } else {
            setErrors({ ...errors, startDateError: undefined });
        }

        if (isNaN(newIntervention.endDateTime.getTime())) {
            setErrors({ ...errors, endDateError: 'End Date is required' });
            hasError = true;
        } else {
            setErrors({ ...errors, endDateError: undefined });
        }

        if (isNaN(newIntervention.unitAmount) || newIntervention.unitAmount === 0) {
            setErrors({ ...errors, unitAmountError: 'Unit Amount is required' });
            hasError = true;
        } else {
            setErrors({ ...errors, unitAmountError: undefined });
        }

        if (isNaN(newIntervention.number) || newIntervention.number === 0) {
            setErrors({ ...errors, numberError: 'Number is required' });
            hasError = true;
        } else {
            setErrors({ ...errors, numberError: undefined });
        }

        if (!hasError) {
            onSave(newIntervention);
        }
    };

    return (
        <div className='new-intervention-form'>
            <h2>New intervention</h2>
            <div className='new-intervention-form__inputs'>
                <NumberInput
                    label='Number'
                    value={newIntervention.number}
                    onChange={(e) => setNewIntervention({ ...newIntervention, number: e ?? NaN })}
                    required
                    id='new-intervention-form-number'
                    errorMessages={errors.numberError ? [errors.numberError] : undefined}
                />
                <TextInput
                    label='Title'
                    value={newIntervention.title}
                    onChange={(e) => setNewIntervention({ ...newIntervention, title: e.target.value })}
                    required
                    type='text'
                    id='new-intervention-form-title'
                    errorMessages={errors.titleError ? [errors.titleError] : undefined}
                />
                <DateTimeInput
                    label='Start date'
                    value={newIntervention.startDateTime}
                    onChange={(e) => {
                        const newStartDateTime = new Date(e.target.value);
                        if (isNaN(newStartDateTime.getTime())) {
                            return;
                        }

                        if (
                            newStartDateTime.getTime() > newIntervention.endDateTime.getTime() ||
                            (newIntervention.endDateTime.getTime() - newStartDateTime.getTime()) / 1000 > 2628000
                        ) {
                            return setNewIntervention({ ...newIntervention, startDateTime: newStartDateTime, endDateTime: newStartDateTime });
                        }

                        return setNewIntervention({ ...newIntervention, startDateTime: newStartDateTime });
                    }}
                    required
                    id='new-intervention-form-start-date-time'
                    type='datetime-local'
                    errorMessages={errors.startDateError ? [errors.startDateError] : undefined}
                />
                <DateTimeInput
                    label='End date'
                    value={newIntervention.endDateTime}
                    onChange={(e) => {
                        const newEndDateTime = new Date(e.target.value);
                        if (isNaN(newEndDateTime.getTime())) {
                            return;
                        }

                        if (
                            newIntervention.startDateTime.getTime() > newEndDateTime.getTime() ||
                            (newEndDateTime.getTime() - newIntervention.startDateTime.getTime()) / 1000 > 2628000
                        ) {
                            return setNewIntervention({ ...newIntervention, startDateTime: newEndDateTime, endDateTime: newEndDateTime });
                        }

                        return setNewIntervention({ ...newIntervention, endDateTime: newEndDateTime });
                    }}
                    required
                    id='new-intervention-form-end-date-time'
                    type='datetime-local'
                    errorMessages={errors.endDateError ? [errors.endDateError] : undefined}
                />
                <SelectInput
                    label='Intervention type'
                    value={newIntervention.interventionType}
                    onChange={(e) => setNewIntervention({ ...newIntervention, interventionType: e.target.value as keyof typeof EInterventionType })}
                    required
                    id='new-intervention-form-intervention-type'
                    options={Object.keys(EInterventionType).map((key) => ({
                        value: key,
                        displayName: getDisplayName(key as keyof typeof EInterventionType),
                    }))}
                    errorMessages={errors.interventionTypeError ? [errors.interventionTypeError] : undefined}
                />
                <SelectInput
                    label='Calculator version'
                    value={newIntervention.calculatorVersion}
                    onChange={(e) => setNewIntervention({ ...newIntervention, calculatorVersion: e.target.value as keyof typeof ECalculatorVersion })}
                    required
                    id='new-intervention-form-calculator-version'
                    options={Object.keys(ECalculatorVersion).map((key) => ({
                        value: key,
                        displayName: key as keyof typeof ECalculatorVersion,
                    }))}
                    errorMessages={errors.calculatorVersionError ? [errors.calculatorVersionError] : undefined}
                />
                <NumberInput
                    label='Unit amount'
                    value={newIntervention.unitAmount}
                    onChange={(e) => setNewIntervention({ ...newIntervention, unitAmount: e ?? NaN })}
                    required
                    id='new-intervention-form-unit-amount'
                    errorMessages={errors.unitAmountError ? [errors.unitAmountError] : undefined}
                />
            </div>
            <div className='new-intervention-form__preview'>
                <h3>Preview</h3>
                <div className='new-intervention-form__preview__times'>
                    <p>Duration (h)</p>
                    <p>Day</p>
                    <p>Night</p>
                    <p>Special</p>
                    <p>Total</p>
                    <p>{dayTime.toFixed(2)}</p>
                    <p>{nightTime.toFixed(2)}</p>
                    <p>{specialTime.toFixed(2)}</p>
                    <p>{(dayTime + nightTime + specialTime).toFixed(2)}</p>
                </div>
                <p className='new-intervention-form__preview__amount'>Amount: {amount.toFixed(2)} €</p>
            </div>
            <button type='button' className='new-intervention-form__save-button default-button' title='Save' onClick={onSaveClick}>
                Save
            </button>
        </div>
    );
};

export default NewInterventionForm;
