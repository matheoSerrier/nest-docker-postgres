import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './entities/user.entity';
import { Project } from './entities/project.entity';
import { Task } from './entities/task.entity';
import { SeederService } from './seeder.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [User, Project, Task],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([User, Project, Task]), // Fournir les repositories
    UserModule,
  ],
  controllers: [AppController], // Ajouter AppController ici
  providers: [AppService, SeederService], // Ajouter AppService ici
})
export class AppModule {}
