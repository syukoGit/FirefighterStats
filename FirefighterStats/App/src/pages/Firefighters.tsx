import './Firefighters.scss';
import Loader from '../components/Loader';
import { useGet } from '../utils/hooks/useApiRequest';
import { useEffect, useState } from 'react';
import EFirefighterRank, { getDisplayName } from '../utils/FirefighterRank';

type Firefighter = {
    firstName: string;
    lastName: string;
    rank?: keyof typeof EFirefighterRank | null;
    careerStartDate?: string | null;
    fireStation?: string | null;
    registrationNumber?: string | null;
};

function isFirefighter(data: any): data is Firefighter {
    return (
        typeof data.firstName === 'string' &&
        typeof data.lastName === 'string' &&
        (typeof data.rank === 'string' || data.rank === null) &&
        (typeof data.careerStartDate === 'string' || data.careerStartDate === null) &&
        (typeof data.fireStation === 'string' || data.fireStation === null) &&
        (typeof data.registrationNumber === 'string' || data.registrationNumber === null)
    );
}

function isFirefighters(data: any): data is Firefighter[] {
    return Array.isArray(data) && data.every((c) => isFirefighter(c));
}

const Firefighters = () => {
    const [firefighters, setFirefighters] = useState<Firefighter[]>([]);
    const [error, setError] = useState<string>();

    const handleSuccess = (data: any) => {
        setError(undefined);

        if (isFirefighters(data)) {
            setFirefighters(data);
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

    const { isDataLoading, makeRequest } = useGet({ apiUrl: 'firefighters', onSuccess: handleSuccess, onError: handleError });

    useEffect(() => {
        makeRequest();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='firefighters'>
            <h1 className='firefighters__title'>Firefighters</h1>

            {error && (
                <div className='firefighters__error'>
                    <p>{error}</p>
                </div>
            )}

            {isDataLoading ? (
                <Loader />
            ) : (
                <div className='firefighters__cards-list'>
                    {firefighters.map((firefighter, index) => (
                        <div key={`firefighter-${index}`} className='firefighters__cards-list__card'>
                            <div className='firefighters__cards-list__card__top'>
                                <img src='assets/firefighter-icon.png' alt='firefighter icon' />
                                <p>
                                    {firefighter.firstName} {firefighter.lastName}
                                </p>
                            </div>
                            <div className='firefighters__cards-list__card__bottom'>
                                {firefighter.rank && (
                                    <p>
                                        <strong>Rank:</strong> {getDisplayName(firefighter.rank)}
                                    </p>
                                )}
                                {firefighter.careerStartDate && (
                                    <p>
                                        <strong>Career start date:</strong> {new Date(firefighter.careerStartDate).toLocaleDateString()}
                                    </p>
                                )}
                                {firefighter.fireStation && (
                                    <p>
                                        <strong>Fire station:</strong> {firefighter.fireStation}
                                    </p>
                                )}
                                {firefighter.registrationNumber && (
                                    <p>
                                        <strong>Registration number:</strong> {firefighter.registrationNumber}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Firefighters;
