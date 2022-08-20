import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';

@Module({
  imports: [UserModule],
  providers: [SocketGateway],
  exports: [SocketGateway],
})
export class SocketModule {}
