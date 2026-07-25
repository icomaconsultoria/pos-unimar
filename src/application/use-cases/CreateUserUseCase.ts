import { User } from '../../domain/entities/User';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { AuthService } from '../../domain/services/AuthService';
import { CreateUserDTO } from '../dtos/CreateUserDTO';

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService
  ) { }

  public async execute(dto: CreateUserDTO): Promise<User> {
    if (dto.id) {
      const existingUser = await this.userRepository.findById(dto.id);
      if (existingUser) {
        throw new Error('User already exists');
      }
    }

    const authUser = await this.authService.createUser(
      dto.email,
      dto.password,
      dto.displayName,
      dto.id,
      dto.photoUrl
    );

    const user = new User(
      authUser.uid,
      dto.email,
      dto.displayName,
      new Date(),
      dto.photoUrl
    );

    await this.userRepository.save(user);

    return user;
  }
}
