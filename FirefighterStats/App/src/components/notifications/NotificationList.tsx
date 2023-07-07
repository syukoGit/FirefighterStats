import './NotificationList.scss';
import { useContext, useState } from 'react';
import { NotificationsContext } from '../../utils/contexts/NotificationsContext';
import NotificationItem from './NotificationItem';

const NotificationList = () => {
    const { notifications } = useContext(NotificationsContext);
    const [notificationItems] = useState<JSX.Element[]>(new Array<JSX.Element>());

    return (
        <div className='notifications'>
            {notifications.map((notification) => (
                <NotificationItem key={`notification-${notification.id}`} notification={notification} />
            ))}
            {notificationItems}
        </div>
    );
};

export default NotificationList;
