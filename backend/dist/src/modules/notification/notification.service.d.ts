export declare class NotificationService {
    private readonly logger;
    sendOrderConfirmation(userId: string, orderId: string, email?: string, phone?: string, mobileToken?: string): Promise<{
        success: boolean;
    }>;
    sendPushNotification(userId: string, title: string, body: string, mobileToken?: string): Promise<{
        success: boolean;
    }>;
}
