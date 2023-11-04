import { IMyActinobacteria } from "./myactinobacteria";
import { IUser } from "./user";

export interface IProcessedData {
    _id: string;
    creator: IUser
    actinobacteria: IMyActinobacteria;
    massDetection: string;
    chromatogramBuilder: string;
    deconvolution: string;
    isotope: string;
    filtered: string;
    identification: string;
    alignment: string;
    gapFilling: string;
    comments: string;
    dataSource: string;
    equipment: string;
    fileName: string;
    massIVEID: string;
    link: string;
}