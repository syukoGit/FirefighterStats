import Activity, { isActivity } from './Activity';
import Intervention, { isIntervention } from './Intervention';
import Month, { isMonth } from './Month';

type IndemnitySlip = {
    activities: Activity[];
    id: string;
    interventions: Intervention[];
    totalAmount: number;
    month: Month;
    year: number;
};

export function isIndemnitySlip(data: any): data is IndemnitySlip {
    return (
        Array.isArray(data.activities) &&
        data.activities.every((activity: any) => isActivity(activity)) &&
        typeof data.id === 'string' &&
        Array.isArray(data.interventions) &&
        data.interventions.every((intervention: any) => isIntervention(intervention)) &&
        typeof data.totalAmount === 'number' &&
        isMonth(data.month) &&
        typeof data.year === 'number'
    );
}

export default IndemnitySlip;
