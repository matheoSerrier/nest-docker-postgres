import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Create a new user
  async create(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    return await this.userRepository.save(user);
  }

  // Get all users
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  // Get a user by ID
  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }

  // Update a user
  async update(id: number, userData: Partial<User>): Promise<User> {
    await this.userRepository.update(id, userData);
    return await this.userRepository.findOne({ where: { id } });
  }

  // Delete a user
  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
