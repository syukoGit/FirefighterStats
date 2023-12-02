type Activity = {
    amount: number;
    durationInHours: number;
    endDateTime: Date;
    id: string;
    rate: number;
    startDateTime: Date;
    title: string;
    unitAmount: number;
};

export type NewActivity = Omit<Activity, 'amount' | 'id'>;

export function isActivity(data: any): data is Activity {
    return (
        typeof data.amount === 'number' &&
        typeof data.durationInHours === 'number' &&
        typeof data.endDateTime === 'string' &&
        typeof data.id === 'string' &&
        typeof data.rate === 'number' &&
        typeof data.startDateTime === 'string' &&
        typeof data.title === 'string' &&
        typeof data.unitAmount === 'number'
    );
}

export function getNewActivityPreview(newActivity: NewActivity): Activity {
    return {
        ...newActivity,
        amount: Number((newActivity.durationInHours * newActivity.unitAmount * (newActivity.rate / 100)).toFixed(2)),
        id: `new-activity-${newActivity.title}-${newActivity.startDateTime}-${newActivity.endDateTime}-preview`,
    };
}

export default Activity;
