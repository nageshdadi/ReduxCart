import {Component} from 'react';
interface CartData {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  quntity: number;
}
interface IProps {
  addCart: (item: CartData) => void;
  cartList: CartData[];
  incrementQuntity: (id: number) => void;
  decrimentQuntity: (id: number) => void;
  deletItem: (id: number) => void;
  paymentSuccess: () => void;
}
export class CartController extends Component<IProps> {}

export default CartController;
