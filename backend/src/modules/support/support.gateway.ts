import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SupportService } from './support.service';

@WebSocketGateway({ cors: { origin: '*' }, namespace: '/chat' })
export class SupportGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private supportService: SupportService) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinTicket')
  handleJoinTicket(@MessageBody() data: { ticketId: string }, @ConnectedSocket() client: Socket) {
    client.join(data.ticketId);
    return { event: 'joined', data: data.ticketId };
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(@MessageBody() data: { ticketId: string; senderId: string; senderRole: 'USER' | 'ADMIN'; message: string }, @ConnectedSocket() client: Socket) {
    const savedMsg = await this.supportService.addMessage(data.ticketId, data.senderId, data.senderRole, data.message);
    this.server.to(data.ticketId).emit('newMessage', savedMsg);
    return savedMsg;
  }
}
