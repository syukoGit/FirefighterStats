import './NotificationItem.scss';
import Notification, { ENotificationType } from '../utils/Notification';
import useNotifications from '../utils/hooks/useNotifications';

interface INotificationItemProps {
    notification: Notification;
}

const NotificationItem = ({ notification }: INotificationItemProps) => {
    const { removeNotification } = useNotifications();

    const { message, type } = notification;

    setTimeout(() => {
        removeNotification(notification.id);
    }, 3000);

    const notificationTypeClass = type === ENotificationType.Success ? 'notification--success' : 'notification--error';

    return (
        <div className={`notification ${notificationTypeClass}`}>
            <div>{message}</div>
        </div>
    );
};

export default NotificationItem;
