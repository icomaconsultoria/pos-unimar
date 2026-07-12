import { User } from "../../domain/entities/User"
import { AuthService } from "../../domain/services/AuthService"
import { GitHubProfileProvider } from "../../domain/services/GitHubProfileProvider"
import { UserRepository } from "../../domain/repositories/UserRepository"
import { CreateUserDTO } from "../dtos/CreateUserDTO"

export class CreateUserUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly authService: AuthService,
        private readonly githubProfileProvider: GitHubProfileProvider
    ) { }

    public async execute(dto: CreateUserDTO): Promise<User> {
        const existingUser = await this.userRepository.findById(dto.id)
        if (existingUser) {
            return { message: "User already exists" } as any
        }

        let photoUrl: string | undefined = undefined
        if (dto.githubUsername) {
            const avatarUrl = await this.githubProfileProvider.getAvatarUrl(dto.githubUsername)
            photoUrl = avatarUrl ?? undefined
        }

        const authUser = await this.authService.createUser(
            dto.email,
            dto.password,
            dto.displayName,
            dto.id
        )
        const user = new User(
            dto.id,
            dto.email,
            dto.displayName,
            new Date(),
            photoUrl
        )
        await this.userRepository.save(user)
        return user
    }
}