import ECalculatorVersion from './ECalculatorVersion';
import EInterventionType from './EInterventionType';
import { DefaultInterventionCalculator } from './InterventionCalculator';

type Intervention = {
    amount: number;
    dayHours: number;
    endDateTime: Date;
    id: string;
    interventionType: keyof typeof EInterventionType;
    calculatorVersion: keyof typeof ECalculatorVersion;
    nightHours: number;
    number: number;
    specialHours: number;
    startDateTime: Date;
    title: string;
    totalHours: number;
    unitAmount: number;
};

export type NewIntervention = Omit<Intervention, 'amount' | 'dayHours' | 'id' | 'nightHours' | 'specialHours' | 'totalHours'>;

export function isIntervention(data: any): data is Intervention {
    return (
        typeof data.amount === 'number' &&
        typeof data.dayHours === 'number' &&
        typeof data.endDateTime === 'string' &&
        typeof data.id === 'string' &&
        Object.keys(EInterventionType).includes(data.interventionType) &&
        Object.keys(ECalculatorVersion).includes(data.calculatorVersion) &&
        typeof data.nightHours === 'number' &&
        typeof data.number === 'number' &&
        typeof data.specialHours === 'number' &&
        typeof data.startDateTime === 'string' &&
        typeof data.title === 'string' &&
        typeof data.totalHours === 'number' &&
        typeof data.unitAmount === 'number'
    );
}

export function getNewInterventionPreview(newIntervention: NewIntervention): Intervention {
    const interventionCalculator = DefaultInterventionCalculator;

    const hours = interventionCalculator.calculateHours(newIntervention.startDateTime, newIntervention.endDateTime);
    const amount = interventionCalculator.calculateAmount(newIntervention.unitAmount, hours);

    return {
        ...newIntervention,
        amount,
        dayHours: hours.dayTime,
        nightHours: hours.nightTime,
        specialHours: hours.specialTime,
        totalHours: hours.dayTime + hours.nightTime + hours.specialTime,
        id: `new-intervention-${newIntervention.number}-preview`,
    };
}

export default Intervention;
