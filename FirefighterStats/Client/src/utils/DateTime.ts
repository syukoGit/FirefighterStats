import Activity from '../types/Activity';
import Intervention from '../types/Intervention';

export const displayDateTimes = (element: Intervention | Activity) => {
    var startDateTime = new Date(element.startDateTime);
    var endDateTime = new Date(element.endDateTime);

    if (startDateTime.getDate() === endDateTime.getDate()) {
        return `${startDateTime.toLocaleDateString()} ${startDateTime.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
        })} - ${endDateTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`;
    } else {
        return `${startDateTime.toLocaleString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })} - ${endDateTime.toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}`;
    }
};
