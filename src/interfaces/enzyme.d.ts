import { IUser } from './user';
export interface IEnzyme {
    _id: string;
    name: string;
    creator: IUser;
}