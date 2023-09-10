import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { UserModule } from '@modules/api/user/user.module';

@Module({
  imports: [UserModule],
  providers: [SocketGateway],
  exports: [SocketGateway],
})
export class SocketModule {}
