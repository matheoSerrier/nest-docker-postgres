import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Project } from './entities/project.entity';
import { Task } from './entities/task.entity';

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Project) private projectRepository: Repository<Project>,
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  async onModuleInit() {
    await this.seed();
  }

  private async seed() {
    // Vérifier si les données existent déjà
    const usersCount = await this.userRepository.count();
    if (usersCount > 0) return; // Éviter de remplir à nouveau si les données existent déjà

    // Créer des utilisateurs
    const user1 = this.userRepository.create({ name: 'Alice', email: 'alice@example.com' });
    const user2 = this.userRepository.create({ name: 'Bob', email: 'bob@example.com' });
    await this.userRepository.save([user1, user2]);

    // Créer des projets
    const project1 = this.projectRepository.create({ name: 'Project A', description: 'Description for project A', owner: user1 });
    const project2 = this.projectRepository.create({ name: 'Project B', description: 'Description for project B', owner: user2 });
    await this.projectRepository.save([project1, project2]);

    // Créer des tâches
    const task1 = this.taskRepository.create({ title: 'Task 1', description: 'Task 1 description', completed: false, assignedTo: user1, project: project1 });
    const task2 = this.taskRepository.create({ title: 'Task 2', description: 'Task 2 description', completed: false, assignedTo: user2, project: project2 });
    await this.taskRepository.save([task1, task2]);

    console.log('Database seeding completed');
  }
}
