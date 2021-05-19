export interface IResponse<T> {
    data?: T;
    errors?: Array<string>;
    isSuccess?: boolean;
    message?: string;
}