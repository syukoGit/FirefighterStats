import './style.scss';
import { useState } from 'react';
import { NewActivity } from '../../../types/Activity';
import TextInput from '../../inputs/TextInput';
import DateTimeInput from '../../inputs/DateTimeInput';
import NumberInput from '../../inputs/NumberInput';

interface INewActivityFormProps {
    defaultStartDateTime?: Date;
    defaultEndDateTime?: Date;
    onSave: (newActivity: NewActivity) => void;
}

const NewActivityForm = ({ defaultStartDateTime = new Date(), defaultEndDateTime = new Date(), onSave }: INewActivityFormProps) => {
    const [newActivity, setNewActivity] = useState<NewActivity>({
        title: '',
        rate: 0,
        durationInHours: 0,
        startDateTime: defaultStartDateTime,
        endDateTime: defaultEndDateTime,
        unitAmount: 7.92,
    });

    const [errors, setErrors] = useState<{
        titleError?: string;
        rateError?: string;
        durationInHoursError?: string;
        startDateError?: string;
        endDateError?: string;
        unitAmountError?: string;
    }>({
        titleError: undefined,
        rateError: undefined,
        durationInHoursError: undefined,
        startDateError: undefined,
        endDateError: undefined,
        unitAmountError: undefined,
    });

    const amount =
        isNaN(newActivity.durationInHours) || isNaN(newActivity.rate)
            ? 0
            : Number((newActivity.durationInHours * newActivity.unitAmount * (newActivity.rate / 100)).toFixed(2));

    const onSaveClick = () => {
        let hasError = false;

        let titleError = undefined;
        let rateError = undefined;
        let durationInHoursError = undefined;
        let startDateError = undefined;
        let endDateError = undefined;
        let unitAmountError = undefined;

        if (newActivity.title.length === 0) {
            titleError = 'Title is required';
            hasError = true;
        }

        if (isNaN(newActivity.rate)) {
            rateError = 'Rate is required';
            hasError = true;
        }

        if (isNaN(newActivity.durationInHours)) {
            durationInHoursError = 'Duration is required';
            hasError = true;
        }

        if (isNaN(newActivity.startDateTime.getTime())) {
            startDateError = 'Start Date is required';
            hasError = true;
        }

        if (isNaN(newActivity.endDateTime.getTime())) {
            endDateError = 'End Date is required';
            hasError = true;
        }

        if (isNaN(newActivity.unitAmount)) {
            unitAmountError = 'Unit amount is required';
            hasError = true;
        }

        setErrors({
            titleError,
            rateError,
            durationInHoursError,
            startDateError,
            endDateError,
            unitAmountError,
        });

        if (!hasError) {
            onSave(newActivity);
        }
    };

    return (
        <div className='new-activity-form'>
            <h2>New activity</h2>
            <div className='new-activity-form__inputs'>
                <TextInput
                    label='Title'
                    value={newActivity.title}
                    onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
                    required
                    type='text'
                    id='new-activity-form-title'
                    errorMessages={errors.titleError ? [errors.titleError] : undefined}
                />
                <DateTimeInput
                    label='Start date'
                    value={newActivity.startDateTime}
                    onChange={(e) => {
                        const newStartDateTime = new Date(e.target.value);
                        if (isNaN(newStartDateTime.getTime())) {
                            return;
                        }

                        if (
                            newStartDateTime.getTime() > newActivity.endDateTime.getTime() ||
                            (newActivity.endDateTime.getTime() - newStartDateTime.getTime()) / 1000 > 2628000
                        ) {
                            return setNewActivity({ ...newActivity, startDateTime: newStartDateTime, endDateTime: newStartDateTime });
                        }

                        return setNewActivity({ ...newActivity, startDateTime: newStartDateTime });
                    }}
                    required
                    type='datetime-local'
                    id='new-activity-form-start-date'
                    errorMessages={errors.startDateError ? [errors.startDateError] : undefined}
                />
                <DateTimeInput
                    label='End date'
                    value={newActivity.endDateTime}
                    onChange={(e) => {
                        const newEndDateTime = new Date(e.target.value);
                        if (isNaN(newEndDateTime.getTime())) {
                            return;
                        }

                        if (
                            newActivity.startDateTime.getTime() > newEndDateTime.getTime() ||
                            (newEndDateTime.getTime() - newActivity.startDateTime.getTime()) / 1000 > 2628000
                        ) {
                            return setNewActivity({ ...newActivity, startDateTime: newEndDateTime, endDateTime: newEndDateTime });
                        }

                        return setNewActivity({ ...newActivity, endDateTime: newEndDateTime });
                    }}
                    required
                    type='datetime-local'
                    id='new-activity-form-end-date'
                    errorMessages={errors.endDateError ? [errors.endDateError] : undefined}
                />
                <NumberInput
                    label='Duration in hour'
                    value={newActivity.durationInHours}
                    onChange={(e) => setNewActivity({ ...newActivity, durationInHours: e ?? NaN })}
                    required
                    id='new-activity-form-duration-in-hour'
                    errorMessages={errors.durationInHoursError ? [errors.durationInHoursError] : undefined}
                />
                <NumberInput
                    label='Rate'
                    value={newActivity.rate}
                    onChange={(e) => setNewActivity({ ...newActivity, rate: e ?? NaN })}
                    required
                    id='new-activity-form-rate'
                    errorMessages={errors.rateError ? [errors.rateError] : undefined}
                />
                <NumberInput
                    label='Unit amount'
                    value={newActivity.unitAmount}
                    onChange={(e) => setNewActivity({ ...newActivity, unitAmount: e ?? NaN })}
                    required
                    id='new-activity-form-unit-amount'
                    errorMessages={errors.unitAmountError ? [errors.unitAmountError] : undefined}
                />
            </div>
            <div className='new-activity-form__preview'>
                <NumberInput label='Amount' value={amount} readOnly id='new-activity-form-preview-amount' />
            </div>
            <button type='button' className='new-activty-form__save-button default-button' title='Save' onClick={onSaveClick}>
                Save
            </button>
        </div>
    );
};

export default NewActivityForm;
