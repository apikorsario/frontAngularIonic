import { ILockerDetailRes } from './locker-detail-res';
export interface ILockerRes {
  itemCount: number;
  lockerId: string;
  products: Array<ILockerDetailRes>;
  total: number;
}