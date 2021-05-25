import { ICategoryRes } from './category-res';
import { IImageRes } from './image-res';
export interface IProductRes {
  categories: Array<ICategoryRes>;
  createdDate: string;
  description: string;
  images: Array<IImageRes>;
  productId: string;
  productName: string;
  stock: number;
  unitPrice: number;
  checked?: boolean;
  adding?: boolean;
  removing?: boolean;
}