import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React from 'react';
import CartController from './CartController';
import {connect} from 'react-redux';
import {
  addCart,
  incrementQuntity,
  decrimentQuntity,
  deletItem,
  paymentSuccess,
} from '../../redux/ProductsSlice';
import RazorpayCheckout from 'react-native-razorpay';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {starImg, emptyCart} from '../../configer/config';
const mapStateToProps = (state: {cartList: {cartList: CartData[]}}) => ({
  cartList: state.cartList.cartList,
});
const mapDispatch = {
  addCart,
  incrementQuntity,
  decrimentQuntity,
  deletItem,
  paymentSuccess,
};
const connector = connect(mapStateToProps, mapDispatch);
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

export class Cart extends CartController {
  render() {
    let totalBill = 0;
    this.props.cartList.map(
      (each: CartData) => (totalBill = totalBill + each.price * each.quntity),
    );
    return (
      <View style={styles.mainCartCard}>
        <Text style={styles.cartMainText}>Cart</Text>
        {this.props.cartList.length === 0 && (
          <View style={styles.emptyCartCard}>
            <Image
              resizeMode="contain"
              style={styles.emptyCartImg}
              source={emptyCart}
            />
            <Text style={styles.emptyCartText}>Empty Cart</Text>
          </View>
        )}
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={this.props.cartList}
          renderItem={({item}: {item: CartData}) => {
            return (
              <TouchableOpacity style={styles.cartItemCard}>
                <Image
                  resizeMode="contain"
                  style={styles.imagCart}
                  source={{uri: `${item.thumbnail}`}}
                />
                <View>
                  <View style={styles.deleteCard}>
                    <Text style={styles.titleText}>{item.title}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.deletItem(item.id);
                      }}>
                      <MaterialIcons name="delete" size={25} />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.brandtext}>
                    brand: {item.brand}, <Text>category:{item.category}</Text>
                  </Text>
                  <Image
                    resizeMode="contain"
                    style={styles.starImg}
                    source={starImg}
                  />
                  <View style={styles.priceCard}>
                    <View style={styles.QuntityCard}>
                      <TouchableOpacity
                        style={styles.incrementCrad}
                        onPress={() => {
                          if (item.quntity > 1) {
                            this.props.decrimentQuntity(item.id);
                          } else {
                            this.props.deletItem(item.id);
                          }
                        }}>
                        <Text style={styles.plusText}>-</Text>
                      </TouchableOpacity>
                      <View style={styles.quntityNum}>
                        <Text>{item.quntity}</Text>
                      </View>
                      <TouchableOpacity style={styles.incrementCrad}>
                        <Text
                          style={styles.plusText}
                          onPress={() => {
                            this.props.incrementQuntity(item.id);
                          }}>
                          +
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.priceText}>
                      ${item.price * item.quntity}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
        {this.props.cartList.length !== 0 && (
          <View style={styles.totalCard}>
            <View>
              <Text style={styles.titleText}>Total Amount</Text>
              <Text style={styles.priceText}>${totalBill}</Text>
            </View>
            <TouchableOpacity
              style={styles.continueBtn}
              onPress={() => {
                var options: any = {
                  description: 'Credits towards consultation',
                  image: 'https://i.imgur.com/3g7nmJC.jpg',
                  currency: 'INR',
                  key: 'rzp_test_locuRaWt3KL2uf',
                  amount: totalBill * 100,
                  name: 'Acme Corp',
                  order_id: '', //Replace this with an order_id created using Orders API.
                  prefill: {
                    email: 'nageshdadi307@gmail.com',
                    contact: '7660917108',
                    name: 'Nagesh Dadi',
                  },
                  theme: {color: '#53a20e'},
                };
                RazorpayCheckout.open(options)
                  .then((data: any) => {
                    // handle success
                    Alert.alert(`Success: ${data.razorpay_payment_id}`);
                    this.props.paymentSuccess();
                  })
                  .catch((error: any) => {
                    // handle failure
                    Alert.alert(`Error: ${error.code} | ${error.description}`);
                  });
              }}>
              <Text style={styles.continueText}>Continue</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  mainCartCard: {
    flex: 1,
    padding: 15,
  },
  cartMainText: {
    fontSize: 30,
    color: '#000',
    marginBottom: 15,
  },
  emptyCartCard: {
    height: 500,
    width: 350,
  },
  emptyCartImg: {
    height: 450,
    width: 350,
  },
  emptyCartText: {
    fontSize: 30,
    textAlign: 'center',
  },
  cartItemCard: {
    backgroundColor: '#fff',
    padding: 7,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  imagCart: {
    height: 150,
    width: 130,
    marginRight: 10,
  },
  deleteCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandtext: {
    width: 180,
  },
  starImg: {
    height: 30,
  },
  titleText: {
    color: '#2E2D2D',
    fontSize: 20,
    width: 180,
  },
  priceCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 200,
  },
  priceText: {
    color: '#1ECA2F',
    fontSize: 18,
  },
  totalCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#2E2D2D',
    borderTopWidth: 1,
    paddingTop: 10,
  },
  continueBtn: {
    backgroundColor: '#f2be2e',
    width: 150,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  continueText: {
    fontSize: 20,
    fontWeight: '600',
  },
  QuntityCard: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(129, 138, 152, 0.2)',
    borderRadius: 8,
    margin: 10,
  },
  quntityNum: {
    backgroundColor: '#fff',
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
  },
  incrementCrad: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
  },
  plusText: {
    color: '#2E2D2D',
    fontSize: 20,
    fontWeight: '400',
  },
});
export default connector(Cart);
