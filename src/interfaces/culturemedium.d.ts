import { IUser } from './user';
export interface ICultureMedium {
    _id: string;
    name: string;
    creator: IUser;
}