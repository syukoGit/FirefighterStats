import React, { createContext, useState } from 'react';
import Notification from '../Notification';

interface INotificationsContext {
    notifications: Notification[];
    setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
}

interface INotificationsProps {
    children: React.ReactNode;
}

export const NotificationsContext = createContext<INotificationsContext>({
    notifications: new Array<Notification>(),
    setNotifications: () => {},
});

export const NotificationsProvider = ({ children }: INotificationsProps) => {
    const [notifications, setNotifications] = useState<Notification[]>(new Array<Notification>());

    return <NotificationsContext.Provider value={{ notifications, setNotifications }}>{children}</NotificationsContext.Provider>;
};
