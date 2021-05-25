export interface ICategoryRes {
  categoryId?: string;
  categoryName?: string;
  products?: Array<string>;
  updating?: boolean;
  deleting?: boolean;
  checked?: boolean;
  selected?: boolean;
}
