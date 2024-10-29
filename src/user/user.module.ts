import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from '../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Ajoute cette ligne pour importer le repository
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
