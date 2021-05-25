import { IDetailProductRes } from './detail-product-res';
export interface ILockerDetailRes {
  product: IDetailProductRes;
  quantity: number;
  total: number;
  removing?: boolean;
  adding?: boolean;
  deleting?: boolean;
}