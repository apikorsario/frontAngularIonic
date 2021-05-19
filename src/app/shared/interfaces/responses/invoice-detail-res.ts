import { IDetailProductRes } from './detail-product-res';
export interface IInvoiceDetailRes {
  product: IDetailProductRes;
  quantity: number;
  total: number;
  unitPrice: number;
}
