interface IInterventionCalculator {
    calculateHours(startDateTime: Date, endDateTime: Date): { dayTime: number; nightTime: number; specialTime: number };
    calculateAmount(unitAmount: number, hours: { dayTime: number; nightTime: number; specialTime: number }): number;
}

export default IInterventionCalculator;

export const DefaultInterventionCalculator: IInterventionCalculator = {
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
