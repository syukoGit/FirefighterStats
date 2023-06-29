import './NewIndemnitySlipView.scss';
import { useState } from 'react';
import Month, { getMonths } from '../../types/Month';
import SelectInput from '../../components/inputs/SelectInput';
import NumberInput from '../../components/inputs/NumberInput';
import { NewIndemnitySlip, isIndemnitySlip } from '../../types/IndemnitySlip';
import ModalPopup from '../../components/ModalPopup';
import NewInterventionForm from '../../components/indemnity-slips/NewInterventionForm';
import InterventionsView from '../../components/indemnity-slips/InterventionsView';
import { getNewInterventionPreview } from '../../types/Intervention';
import { PlusLg } from 'react-bootstrap-icons';
import ActivitiesView from '../../components/indemnity-slips/ActivitiesView';
import { getNewActivityPreview } from '../../types/Activity';
import NewActivityForm from '../../components/indemnity-slips/NewActivityForm';
import useAuthentication from '../../utils/hooks/useAuthentication';
import { Navigate } from 'react-router-dom';
import { usePost } from '../../utils/hooks/useApiRequest';
import useNotifications from '../../utils/hooks/useNotifications';
import { NotificationError } from '../../utils/Notification';

const NewIndemnitySlipView = () => {
    const [newIndemnitySlip, setNewIndemnitySlip] = useState<NewIndemnitySlip>({
        activities: [],
        interventions: [],
        month: 'January',
        year: new Date().getFullYear(),
    });

    const [isAddingNewIntervention, setIsAddingNewIntervention] = useState<boolean>(false);
    const [isAddingNewActivity, setIsAddingNewActivity] = useState<boolean>(false);

    const { authenticationState } = useAuthentication();
    const { addNotification } = useNotifications();

    const handleSuccess = (data: any) => {
        if (isIndemnitySlip(data)) {
            console.log(data);
            Navigate({ to: '/indemnity-slips' });
        } else {
            addNotification(NotificationError('Internal error. Please retry on later.'));
        }
    };

    const handleError = (error: any) => {
        if (typeof error === 'string') {
            addNotification(NotificationError(error));
        } else {
            addNotification(NotificationError('Internal error. Please retry on later.'));
        }
    };

    const interventionsPreview = newIndemnitySlip.interventions.map((intervention) => getNewInterventionPreview(intervention));
    const activitiesPreview = newIndemnitySlip.activities.map((activity) => getNewActivityPreview(activity));

    const totalAmount = Number(
        (
            interventionsPreview.reduce((total, intervention) => total + intervention.amount, 0) +
            activitiesPreview.reduce((total, activity) => total + activity.amount, 0)
        ).toFixed(2)
    );

    const apiUrl = authenticationState === undefined ? 'NA' : `/Firefighters/${authenticationState.username}/IndemnitySlips`;
    const { isInProgress, makeRequest } = usePost({
        apiUrl,
        onSuccess: handleSuccess,
        onError: handleError,
    });

    if (apiUrl === 'NA') {
        Navigate({ to: '/unauthorized' });
    }

    const onClick = () => {
        if (isInProgress) {
            return;
        }

        makeRequest(newIndemnitySlip);
    };

    return (
        <div className='new-indemnity-slip'>
            <ModalPopup isOpen={isAddingNewIntervention} onClose={() => setIsAddingNewIntervention(false)}>
                <NewInterventionForm
                    defaultStartDateTime={new Date(newIndemnitySlip.year, getMonths().indexOf(newIndemnitySlip.month), 1)}
                    defaultEndDateTime={new Date(newIndemnitySlip.year, getMonths().indexOf(newIndemnitySlip.month), 1)}
                    onSave={(newIntervention) => {
                        setNewIndemnitySlip({
                            ...newIndemnitySlip,
                            interventions: [...newIndemnitySlip.interventions, newIntervention],
                        });
                        setIsAddingNewIntervention(false);
                    }}
                />
            </ModalPopup>
            <ModalPopup isOpen={isAddingNewActivity} onClose={() => setIsAddingNewActivity(false)}>
                <NewActivityForm
                    defaultStartDateTime={new Date(newIndemnitySlip.year, getMonths().indexOf(newIndemnitySlip.month), 1)}
                    defaultEndDateTime={new Date(newIndemnitySlip.year, getMonths().indexOf(newIndemnitySlip.month), 1)}
                    onSave={(newActivity) => {
                        setNewIndemnitySlip({
                            ...newIndemnitySlip,
                            activities: [...newIndemnitySlip.activities, newActivity],
                        });
                        setIsAddingNewActivity(false);
                    }}
                />
            </ModalPopup>
            <h1>New indemnity slip</h1>
            <div className='new-indemnity-slip__form'>
                <div className='new-indemnity-slip__form__date'>
                    <SelectInput
                        label='Month'
                        value={newIndemnitySlip.month}
                        onChange={(e) => setNewIndemnitySlip({ ...newIndemnitySlip, month: e.target.value as Month })}
                        options={getMonths().map((month) => ({ value: month, displayName: month }))}
                        id={'new-indemnity-slip-month'}
                        required
                    />
                    <NumberInput
                        label='Year'
                        value={newIndemnitySlip.year}
                        onChange={(e) => setNewIndemnitySlip({ ...newIndemnitySlip, year: e ?? NaN })}
                        id={'new-indemnity-slip-year'}
                        required
                    />
                </div>
                <div className='new-indemnity-slip__form__interventions'>
                    <h2 className='new-indemnity-slip__form__interventions__title'>Interventions</h2>
                    <InterventionsView interventions={newIndemnitySlip.interventions.map((newIntervention) => getNewInterventionPreview(newIntervention))} />
                    <button className='default-button new-indemnity-slip__form__interventions__add-button' onClick={() => setIsAddingNewIntervention(true)}>
                        <PlusLg />
                    </button>
                </div>
                <div className='new-indemnity-slip__form__activities'>
                    <h2 className='new-indemnity-slip__form__activities__title'>Activities</h2>
                    <ActivitiesView activities={newIndemnitySlip.activities.map((newActivity) => getNewActivityPreview(newActivity))} />
                    <button className='default-button new-indemnity-slip__form__activities__add-button' onClick={() => setIsAddingNewActivity(true)}>
                        <PlusLg />
                    </button>
                </div>
            </div>
            <p className='new-indemnity-slip__total-amount'>Total Amount: {totalAmount} €</p>
            <button className='default-button new-indemnity-slip__save-button' onClick={onClick}>
                Save
            </button>
        </div>
    );
};

export default NewIndemnitySlipView;
