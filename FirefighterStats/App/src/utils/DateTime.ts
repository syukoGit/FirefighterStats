import Activity from '../types/Activity';
import Intervention from '../types/Intervention';

export const displayDateTimes = (element: Intervention | Activity) => {
    var startDateTime = new Date(element.startDateTime);
    var endDateTime = new Date(element.endDateTime);

    if (startDateTime.getDate() === endDateTime.getDate()) {
        return `${startDateTime.toLocaleDateString()} ${startDateTime.toLocaleTimeString()} - ${endDateTime.toLocaleTimeString()}`;
    } else {
        return `${startDateTime.toLocaleString()} - ${endDateTime.toLocaleString()}`;
    }
};
