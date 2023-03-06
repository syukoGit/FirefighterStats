export enum ENotificationType {
    Success,
    Error,
}

class Notification {
    readonly id: string = Math.random().toString(36).substring(2, 9);

    constructor(readonly message: string, readonly type: ENotificationType = ENotificationType.Success) {}
}

export default Notification;
