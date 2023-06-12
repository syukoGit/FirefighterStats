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

export default Activity;
