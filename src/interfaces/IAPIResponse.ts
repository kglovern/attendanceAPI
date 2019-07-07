import { IErrorMessage } from './IErrorMessage';

export interface IAPIResponse {
    status: string;
    code: number;
    data?: object;
    error?: IErrorMessage;
}
