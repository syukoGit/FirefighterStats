import './IndemnitySlipView.scss';
import { useEffect, useState } from 'react';
import IndemnitySlip, { isIndemnitySlip } from '../../types/IndemnitySlip';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import useAuthentication from '../../utils/hooks/useAuthentication';
import { useDelete, useGet } from '../../utils/hooks/useApiRequest';
import Loader from '../../components/Loader';
import InterventionsView from '../../components/indemnity-slips/InterventionsView';
import ActivitiesView from '../../components/indemnity-slips/ActivitiesView';
import React from 'react';
import { TrashFill } from 'react-bootstrap-icons';
import useNotifications from '../../utils/hooks/useNotifications';
import { NotificationSuccess } from '../../utils/Notification';

const IndemnitySlipView = () => {
    const [indemnitySlip, setIndemnitySlip] = useState<IndemnitySlip>();
    const [error, setError] = useState<string>();

    const { indemnitySlipId } = useParams();
    const { authenticationState } = useAuthentication();
    const navigate = useNavigate();
    const { addNotification } = useNotifications();

    const handleSuccess = (data: any) => {
        setError(undefined);

        if (isIndemnitySlip(data)) {
            setIndemnitySlip(data);
        } else {
            setError('Internal error. Please retry on later.');
        }
    };

    const handleError = (error: any) => {
        if (typeof error === 'string') {
            setError(error);
        } else {
            setError('Internal error. Please retry on later.');
        }
    };

    const apiUrl = authenticationState === undefined ? 'NA' : `Firefighters/${authenticationState.username}/IndemnitySlips/${indemnitySlipId}`;
    const { isDataLoading, makeRequest: getIndemnitySlip } = useGet({ apiUrl: apiUrl, onSuccess: handleSuccess, onError: handleError });
    const { isInProgress: deleteIsInProgress, makeRequest: deleteIndemnitySlip } = useDelete({
        apiUrl: apiUrl,
        onSuccess: handleSuccess,
        onError: handleError,
    });

    if (apiUrl === 'NA') {
        Navigate({ to: '/unauthorized' });
    }

    useEffect(() => {
        getIndemnitySlip();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const deleteIndemnitySlipHandler = () => {
        if (deleteIsInProgress) {
            return;
        }

        deleteIndemnitySlip().then(() => {
            addNotification(NotificationSuccess('Indemnity slip deleted successfully.'));
            navigate('/indemnity-slips');
        });
    };

    return (
        <div className='indemnity-slip-view'>
            {error && (
                <div className='indemnity-slip-view__error'>
                    <p>{error}</p>
                </div>
            )}

            {isDataLoading || indemnitySlip === undefined ? (
                <Loader />
            ) : (
                <React.Fragment>
                    <h1 className='indemnity-slip-view__title'>
                        {indemnitySlip.month} {indemnitySlip.year}
                    </h1>
                    <div className='indemnity-slip-view__content'>
                        <InterventionsView interventions={indemnitySlip.interventions} />
                        <ActivitiesView activities={indemnitySlip.activities} />
                    </div>
                    <div className='indemnity-slip-view__total-amount'>Total amount: {indemnitySlip.totalAmount}€</div>
                    <div className='indemnity-slip-view__button-bar'>
                        <button className='indemnity-slip-view__button-bar__delete default-button' onClick={deleteIndemnitySlipHandler}>
                            <TrashFill />
                        </button>
                    </div>
                </React.Fragment>
            )}
        </div>
    );
};

export default IndemnitySlipView;
