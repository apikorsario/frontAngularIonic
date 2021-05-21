import { IImageReq } from './imagen-req';
export interface IProductReq {
    productName: string;
    description: string;
    stock: number;
    unitPrice: number;
    images: Array<IImageReq>;
    categoryIds?: null | Array<string>;
}