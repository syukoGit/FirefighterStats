import Month, { isMonth } from './Month';

type IndemnitySlipPreview = {
    id: string;
    totalAmount: number;
    numberInterventions: number;
    numberActivities: number;
    month: Month;
    year: number;
};

export function isIndemnitySlipPreview(data: any): data is IndemnitySlipPreview {
    return (
        typeof data.id === 'string' &&
        typeof data.totalAmount === 'number' &&
        typeof data.numberInterventions === 'number' &&
        typeof data.numberActivities === 'number' &&
        isMonth(data.month) &&
        typeof data.year === 'number'
    );
}

export default IndemnitySlipPreview;
