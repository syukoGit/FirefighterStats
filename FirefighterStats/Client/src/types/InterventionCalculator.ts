import ECalculatorVersion from './ECalculatorVersion';

interface IInterventionCalculator {
    calculateHours(startDateTime: Date, endDateTime: Date): { dayTime: number; nightTime: number; specialTime: number };
    calculateAmount(unitAmount: number, hours: { dayTime: number; nightTime: number; specialTime: number }): number;
}

export default IInterventionCalculator;

export const InterventionCalculatorV1: IInterventionCalculator = {
    calculateHours(startDateTime: Date, endDateTime: Date): { dayTime: number; nightTime: number; specialTime: number } {
        let dayTimeInMinutes = 0;
        let nightTimeInMinutes = 0;
        let specialTimeInMinutes = 0;

        for (let i = new Date(startDateTime); i < endDateTime; i.setMinutes(i.getMinutes() + 1)) {
            const currentHour = i.getHours();
            const currentDay = i.getDay();

            currentHour < 7 || currentHour >= 22 ? nightTimeInMinutes++ : currentDay === 0 ? specialTimeInMinutes++ : dayTimeInMinutes++;
        }

        if (dayTimeInMinutes > 0) {
            dayTimeInMinutes += 30;
        }

        if (specialTimeInMinutes > 0) {
            specialTimeInMinutes += 30;
        }

        const dayTime = Number((dayTimeInMinutes / 60).toFixed(2));
        const nightTime = Number((nightTimeInMinutes / 60).toFixed(2));
        const specialTime = Number((specialTimeInMinutes / 60).toFixed(2));

        return { dayTime, nightTime, specialTime };
    },

    calculateAmount(unitAmount: number, hours: { dayTime: number; nightTime: number; specialTime: number }): number {
        const amount = unitAmount * (hours.dayTime + hours.nightTime * 2 + hours.specialTime * 1.5);

        if (isNaN(amount)) {
            return 0;
        }

        return Number(amount.toFixed(2));
    },
};

export const InterventionCalculatorV2: IInterventionCalculator = {
    calculateHours(startDateTime: Date, endDateTime: Date): { dayTime: number; nightTime: number; specialTime: number } {
        let dayTimeInMinutes = 0;
        let nightTimeInMinutes = 0;
        let specialTimeInMinutes = 0;

        for (let i = new Date(startDateTime); i < endDateTime; i.setMinutes(i.getMinutes() + 1)) {
            const currentHour = i.getHours();
            const currentDay = i.getDay();

            currentHour < 7 || currentHour >= 22 ? nightTimeInMinutes++ : currentDay === 0 ? specialTimeInMinutes++ : dayTimeInMinutes++;
        }

        const dayTime = Number((dayTimeInMinutes / 60).toFixed(2));
        const nightTime = Number((nightTimeInMinutes / 60).toFixed(2));
        const specialTime = Number((specialTimeInMinutes / 60).toFixed(2));

        return { dayTime, nightTime, specialTime };
    },

    calculateAmount(unitAmount: number, hours: { dayTime: number; nightTime: number; specialTime: number }): number {
        const amount = unitAmount * (hours.dayTime + hours.nightTime * 2 + hours.specialTime * 1.5);

        if (isNaN(amount)) {
            return 0;
        }

        return Number(amount.toFixed(2));
    },
};

export const getInterventionCalculator = (version: keyof typeof ECalculatorVersion): IInterventionCalculator => {
    switch (version) {
        case ECalculatorVersion.V1:
            return InterventionCalculatorV1;
        case ECalculatorVersion.V2:
            return InterventionCalculatorV2;
        default:
            return InterventionCalculatorV2;
    }
};
