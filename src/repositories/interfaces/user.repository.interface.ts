import type { CreateUserDto } from "../../dto/request/user.dto";
import { User } from "../../models";

export interface UserRepository {
    createUser(user: CreateUserDto): Promise<User>;
}