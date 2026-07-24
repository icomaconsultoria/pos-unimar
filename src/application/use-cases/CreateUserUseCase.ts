import { User } from "../../domain/entities/User"
import { AuthService } from "../../domain/services/AuthService"
import { UserRepository } from "../../domain/repositories/UserRepository"
import { CreateUserDTO } from "../dtos/CreateUserDTO"
import { GithubService } from "../../domain/services/GithubService"

export class CreateUserUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly authService: AuthService,
        private readonly githubService: GithubService
    ) { }

    public async execute(dto: CreateUserDTO): Promise<User> {
        const existingUser = await this.userRepository.findById(dto.id)
        if (existingUser) {
            return {message: "User already exists"} as any
        }
        const authUser = await this.authService.createUser(
            dto.email,
            dto.password,
            dto.displayName,
            dto.id
        )
        const avatar = await this.githubService.getAvatar(dto.github);
        
        const user = new User(
            dto.id,
            dto.email,
            dto.displayName,
            new Date(),
            avatar || ''
        )
        await this.userRepository.save(user)
        return user
    }
}