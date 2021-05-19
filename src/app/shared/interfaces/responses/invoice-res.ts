import { ICustomerRes } from './customer-res';
import { IEmployeeRes } from './employee-res';
import { IInvoiceDetailRes } from './invoice-detail-res';
import { IPaymentRes } from './payment-res';
export interface IInvoiceRes {
  createdDate: string;
  customer: ICustomerRes;
  employee: IEmployeeRes;
  invoiceId: null | string;
  payment: IPaymentRes;
  products: null | Array<IInvoiceDetailRes>;
  total: number;
}
