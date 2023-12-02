import './style.scss';
import Notification, { ENotificationType } from '../../../utils/Notification';
import useNotifications from '../../../utils/hooks/useNotifications';
import { XLg } from 'react-bootstrap-icons';

interface INotificationItemProps {
    notification: Notification;
}

const NotificationItem = ({ notification }: INotificationItemProps) => {
    const { removeNotification } = useNotifications();

    const { message, type, autoHide } = notification;

    if (autoHide) {
        setTimeout(() => {
            removeNotification(notification.id);
        }, 5000);
    }

    const notificationShowClass = autoHide ? 'notification--auto-hide' : 'notification--closable';
    const notificationTypeClass = type === ENotificationType.Success ? 'notification--success' : 'notification--error';

    return (
        <div className={`notification ${notificationTypeClass} ${notificationShowClass}`}>
            <div>{message}</div>
            {!autoHide && (
                <div className='notification__close' onClick={() => removeNotification(notification.id)}>
                    <XLg />
                </div>
            )}
        </div>
    );
};

export default NotificationItem;
