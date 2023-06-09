import { useEffect, useState } from 'react';
import './IndemnitySlips.scss';
import { useGet } from '../utils/hooks/useApiRequest';
import Loader from '../components/Loader';
import useAuthentication from '../utils/hooks/useAuthentication';
import { Navigate } from 'react-router-dom';
import { CaretRight, PlusLg } from 'react-bootstrap-icons';
import IndemnitySlipPreview, { isIndemnitySlipPreview } from '../types/IndemnitySlipPreview';

function isIndemnitySlipPreviewArray(data: any): data is IndemnitySlipPreview[] {
    return Array.isArray(data) && data.every((c) => isIndemnitySlipPreview(c));
}

const IndemnitySlips = () => {
    const [indemnitySlips, setIndemnitySlips] = useState<IndemnitySlipPreview[]>();
    const [error, setError] = useState<string>();

    const { authenticationState } = useAuthentication();

    const handleSuccess = (data: any) => {
        setError(undefined);

        if (isIndemnitySlipPreviewArray(data)) {
            setIndemnitySlips(data);
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

    const apiUrl = authenticationState === undefined ? 'NA' : `Firefighters/${authenticationState.username}/IndemnitySlips`;
    const { isDataLoading, makeRequest: getIndemnitySlips } = useGet({ apiUrl: apiUrl, onSuccess: handleSuccess, onError: handleError });

    if (apiUrl === 'NA') {
        Navigate({ to: '/unauthorized' });
    }

    useEffect(() => {
        getIndemnitySlips();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='indemnity-slips'>
            <h1 className='indemnity-slips__title'>IndemnitySlips</h1>

            {error && (
                <div className='indemnity-slips__error'>
                    <p>{error}</p>
                </div>
            )}

            {isDataLoading ? (
                <Loader />
            ) : (
                <div className='indemnity-slips__list'>
                    <div className='indemnity-slips__list__header'>
                        <div className='indemnity-slips__list__header__buttons'>
                            <button role='presentation' type='button' title='Add indemnity slip' className='default-button'>
                                <PlusLg />
                            </button>
                        </div>
                    </div>
                    <div className='indemnity-slips__list__content'>
                        {indemnitySlips?.map((indemnitySlip, index) => (
                            <div key={`indemnitySlip-${index}`} className='indemnity-slip'>
                                <p className='indemnity-slip__date'>
                                    {indemnitySlip.month} {indemnitySlip.year}
                                </p>
                                <p className='indemnity-slip__total-amount'>{indemnitySlip.totalAmount} €</p>
                                <CaretRight className='indemnity-slip__caret' />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default IndemnitySlips;
