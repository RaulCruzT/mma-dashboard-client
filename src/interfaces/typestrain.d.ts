import { IUser } from './user';
export interface ITypeStrain {
    _id: string;
    name: string;
    creator: IUser;
}