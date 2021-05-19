import { IImageRes } from './image-res';
export interface IDetailProductRes {
  description: string;
  image: IImageRes;
  productId: string;
  productName: string;
  unitPrice: number;
}