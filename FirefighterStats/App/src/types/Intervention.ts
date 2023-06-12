import EInterventionType from './EInterventionType';

type Intervention = {
    amount: number;
    dayHours: number;
    endDateTime: Date;
    id: string;
    interventionType: EInterventionType;
    nightHours: number;
    number: number;
    specialHours: number;
    startDateTime: Date;
    title: string;
    totalHours: number;
    unitAmount: number;
};

export function isIntervention(data: any): data is Intervention {
    return (
        typeof data.amount === 'number' &&
        typeof data.dayHours === 'number' &&
        typeof data.endDateTime === 'string' &&
        typeof data.id === 'string' &&
        Object.keys(EInterventionType).includes(data.interventionType) &&
        typeof data.nightHours === 'number' &&
        typeof data.number === 'number' &&
        typeof data.specialHours === 'number' &&
        typeof data.startDateTime === 'string' &&
        typeof data.title === 'string' &&
        typeof data.totalHours === 'number' &&
        typeof data.unitAmount === 'number'
    );
}

export default Intervention;
