import EFirefighterRank from './EFirefighterRank';

type Firefighter = {
    firstName: string;
    lastName: string;
    rank?: keyof typeof EFirefighterRank | null;
    careerStartDate?: string | null;
    fireStation?: string | null;
    registrationNumber?: string | null;
};

export function isFirefighter(data: any): data is Firefighter {
    return (
        typeof data.firstName === 'string' &&
        typeof data.lastName === 'string' &&
        (Object.keys(EFirefighterRank).includes(data.rank) || data.rank === null) &&
        (typeof data.careerStartDate === 'string' || data.careerStartDate === null) &&
        (typeof data.fireStation === 'string' || data.fireStation === null) &&
        (typeof data.registrationNumber === 'string' || data.registrationNumber === null)
    );
}

export default Firefighter;
