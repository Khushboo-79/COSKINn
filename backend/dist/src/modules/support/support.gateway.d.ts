import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SupportService } from './support.service';
export declare class SupportGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private supportService;
    server: Server;
    constructor(supportService: SupportService);
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleJoinTicket(data: {
        ticketId: string;
    }, client: Socket): {
        event: string;
        data: string;
    };
    handleMessage(data: {
        ticketId: string;
        senderId: string;
        senderRole: 'USER' | 'ADMIN';
        message: string;
    }, client: Socket): Promise<{
        id: string;
        createdAt: Date;
        message: string;
        ticketId: string;
        senderId: string;
        senderRole: string;
    }>;
}
