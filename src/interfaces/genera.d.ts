import { IUser } from './user';
export interface IGenera {
    _id: string;
    name: string;
    creator: IUser;
}