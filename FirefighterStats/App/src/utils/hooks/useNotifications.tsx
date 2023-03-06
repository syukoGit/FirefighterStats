import { useContext } from 'react';
import { NotificationsContext } from '../contexts/NotificationsContext';
import Notification from '../Notification';

const useNotifications = () => {
    const { notifications, setNotifications } = useContext(NotificationsContext);

    const addNotification = (notification: Notification) => {
        setNotifications((notifications) => [...notifications, notification]);
    };

    const removeNotification = (id: string) => {
        setNotifications((notifications) => notifications.filter((notification) => notification.id !== id));
    };

    return { notifications, addNotification, removeNotification };
};

export default useNotifications;
