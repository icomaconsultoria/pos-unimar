"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserUseCase = void 0;
const User_1 = require("../../domain/entities/User");
class CreateUserUseCase {
    userRepository;
    authService;
    constructor(userRepository, authService) {
        this.userRepository = userRepository;
        this.authService = authService;
    }
    async execute(dto) {
        if (dto.id) {
            const existingUser = await this.userRepository.findById(dto.id);
            if (existingUser) {
                throw new Error('User already exists');
            }
        }
        const authUser = await this.authService.createUser(dto.email, dto.password, dto.displayName, dto.id, dto.photoUrl);
        const user = new User_1.User(authUser.uid, dto.email, dto.displayName, new Date(), dto.photoUrl);
        await this.userRepository.save(user);
        return user;
    }
}
exports.CreateUserUseCase = CreateUserUseCase;
