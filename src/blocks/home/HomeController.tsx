import {Component} from 'react';
const apiStatusObj = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
};
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
  addCart: (data: CartData) => void;
  cartList: CartData[];
}
interface IState {
  productList: CartData[];
  apiStatus: string;
}
export class HomeController extends Component<IProps, IState> {
  state = {
    productList: [],
    apiStatus: apiStatusObj.initial,
  };
  componentDidMount(): void {
    this.getData();
  }
  getData = async () => {
    this.setState({apiStatus: apiStatusObj.inProgress});
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    if (response.ok) {
      this.setState({
        apiStatus: apiStatusObj.success,
        productList: data.products,
      });
    }
  };
  onPressAddCratBtn = (id: number) => {
    const filteredItem = this.state.productList.filter(
      (each: CartData) => each.id === id,
    );
    this.props.addCart(filteredItem[0]);
  };
}
export default HomeController;
