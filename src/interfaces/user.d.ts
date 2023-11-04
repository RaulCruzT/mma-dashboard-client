import { UserRoles } from "../enums/user.enum";

export interface IUser {
    _id: string;
    name: string;
    email: string;
    avatar: string;
    role: UserRoles;
}