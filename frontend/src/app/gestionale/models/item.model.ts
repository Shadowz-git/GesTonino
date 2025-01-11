export interface Item {
  id: number;
  code: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  discount: number;
  selected?: boolean;
}
