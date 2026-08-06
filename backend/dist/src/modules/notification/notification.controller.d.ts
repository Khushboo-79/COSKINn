import { NotificationService } from './notification.service';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    sendPushNotification(body: {
        userId: string;
        title: string;
        body: string;
        mobileToken?: string;
    }): Promise<{
        success: boolean;
    }>;
}
