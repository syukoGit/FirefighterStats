enum EInterventionType {
    OtherOperation = 'Other operation',
    PersonalAssistance = 'Personal assistance',
    Fire = 'Fire',
    Apr = 'Accident on public road',
    FireAndApr = 'Fire and accident on public road',
}

export default EInterventionType;

export function getDisplayName(interventionType: keyof typeof EInterventionType): string {
    switch (interventionType) {
        case 'OtherOperation':
            return 'Other operation';
        case 'PersonalAssistance':
            return 'Personal assistance';
        case 'Fire':
            return 'Fire';
        case 'Apr':
            return 'Accident on public road';
        case 'FireAndApr':
            return 'Fire and accident on public road';
    }
}

export function getAbbreviation(interventionType: keyof typeof EInterventionType): string {
    switch (interventionType) {
        case 'OtherOperation':
            return 'OOP';
        case 'PersonalAssistance':
            return 'PA';
        case 'Fire':
            return 'FIRE';
        case 'Apr':
            return 'APR';
        case 'FireAndApr':
            return 'FIRE+APR';
    }
}
