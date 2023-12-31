import { IGenera } from './genera';
import { IUser } from './user';
export interface IActinobacteria {
    _id: string;
    creator: IUser;
    identifierStrain: string;
    identifierGenera: IGenera;
    identifierSpecies: string;
    identifierMainPhoto: string;
    identifierPhotos: string;
    identifierLocalStorage: string;
    identifierInternationalStorage: string;
    identifierComments: string;
    geographyIsolationSite: string;
    geographyCoordinates: string;
    geographyIsolationSource: string;
    geographyAltitude: number;
    geographyComments: string;
    isolationMedium: string;
    isolationTemperature: number;
    isolationMethod: string;
    isolationResponsible: string;
    isolationThesisPaper: string;
    isolationThesisPaperLink: string;
    isolationComments: string;
    arnr16sCompleteness: string;
    arnr16sSize: string;
    arnr16sSequenceFile: string;
    arnr16sMacrogenFile: string;
    arnr16sComments: string;
    characterizationGrowingMedia: ICultureMedium[];
    characterizationNotGrowingMedia: ICultureMedium[];
    characterizationMycelial: string;
    characterizationColoniesDay: number;
    characterizationSporulationDay: number;
    characterizationBiomassDay: number;
    characterizationShape: string;
    characterizationBorder: string;
    characterizationElevation: string;
    characterizationSurface: string;
    characterizationColor: string;
    characterizationTransparency: string;
    characterizationBrightness: string;
    characterizationComments: string;
    genomeRawData: string;
    genomeComments: string;
    bioactivityFile: string;
    bioactivityYes: ITypeStrain[];
    bioactivityNo: ITypeStrain[];
    bioactivityNa: ITypeStrain[];
    bioactivityComments: string;
    metabolomicsMedinaFoundationReports: string;
    metabolomicsRawData: string;
    metabolomicsComments: string;
    enzymesYes: IEnzyme[];
    enzymesNo: IEnzyme[];
    enzymesNa: IEnzyme[];
    enzymesComments: string;
}