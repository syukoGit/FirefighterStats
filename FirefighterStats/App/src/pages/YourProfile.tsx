import './YourProfile.scss';
import { useEffect, useState } from 'react';
import { PersonFill } from 'react-bootstrap-icons';
import { Navigate } from 'react-router-dom';
import DateInput from '../components/inputs/DateInput';
import SelectInput from '../components/inputs/SelectInput';
import TextInput from '../components/inputs/TextInput';
import Loader from '../components/Loader';
import EFirefighterRank, { getDisplayName } from '../types/EFirefighterRank';
import Firefighter, { isFirefighter } from '../types/Firefighter';
import { useGet, usePut } from '../utils/hooks/useApiRequest';
import useAuthentication from '../utils/hooks/useAuthentication';
import useNotifications from '../utils/hooks/useNotifications';
import { NotificationError } from '../utils/Notification';

const YourProfile = () => {
    const [profile, setProfile] = useState<Firefighter>();

    const { authenticationState } = useAuthentication();
    const { addNotification } = useNotifications();

    const handleSuccess = (data: any) => {
        if (isFirefighter(data)) {
            setProfile(data);
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

    const apiUrl = authenticationState === undefined ? 'NA' : `Firefighters/${authenticationState.username}`;
    const { isDataLoading, makeRequest: getProfile } = useGet({ apiUrl, onSuccess: handleSuccess, onError: handleError });
    const { isInProgress: profileUpdating, makeRequest: updateProfile } = usePut({ apiUrl, onSuccess: handleSuccess, onError: handleError });

    if (apiUrl === 'NA') {
        Navigate({ to: '/unauthorized' });
    }

    useEffect(() => {
        getProfile();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isDataLoading || profile === undefined) {
        return <Loader />;
    }

    const saveProfile = () => {
        if (profileUpdating) {
            return;
        }

        updateProfile(profile);
    };

    return (
        <div className='your-profile'>
            <div className='your-profile__identity'>
                <PersonFill />
                <h1>
                    {profile.firstName} {profile.lastName}
                </h1>
            </div>
            <div className='horizontal-divider' />
            <div className='your-profile__optional-infos'>
                <TextInput
                    id='your-profile-registration-number'
                    label='Registration number'
                    type='text'
                    value={profile.registrationNumber}
                    onChange={(e) => setProfile({ ...profile, registrationNumber: e.target.value })}
                />

                <DateInput
                    id='your-profile-career-start-date'
                    label='Career start'
                    value={profile.careerStartDate === null || profile.careerStartDate === undefined ? null : new Date(profile.careerStartDate)}
                    onChange={(e) => setProfile({ ...profile, careerStartDate: new Date(e.target.value).toISOString() })}
                />

                <TextInput
                    id='your-profile-fire-station'
                    label='Fire station'
                    type='text'
                    value={profile.fireStation}
                    onChange={(e) => setProfile({ ...profile, fireStation: e.target.value })}
                />

                <SelectInput
                    id='your-profile-rank'
                    value={profile.rank}
                    label='Rank'
                    options={Object.keys(EFirefighterRank).map((rank) => ({
                        value: rank,
                        displayName: getDisplayName(rank as keyof typeof EFirefighterRank),
                    }))}
                    nullable
                    onChange={(e) => setProfile({ ...profile, rank: e.target.value as keyof typeof EFirefighterRank })}
                />

                <button className='default-button' title='Save' onClick={saveProfile}>
                    Save
                </button>
            </div>
        </div>
    );
};

export default YourProfile;
