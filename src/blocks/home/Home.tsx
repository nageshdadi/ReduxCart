/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import HomeController from './HomeController';
import {connect} from 'react-redux';
import {addCart} from '../../redux/ProductsSlice';
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
const mapStateToProps = (state: {cartList: {cartList: CartData[]}}) => ({
  cartList: state.cartList.cartList,
});
const mapDispatch = {
  addCart,
};
const connector = connect(mapStateToProps, mapDispatch);
export class Home extends HomeController {
  apiPendeingView = () => {
    return (
      <View style={styles.homeCrad}>
        <ActivityIndicator size="large" />
      </View>
    );
  };

  apiSeccussView = () => {
    return (
      <View style={{marginBottom: 80}}>
        <FlatList
          data={this.state.productList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}: {item: CartData}) => {
            let disableBtn = false;
            this.props.cartList.map((each: CartData) => {
              if (each.id === item.id) {
                disableBtn = true;
              }
            });

            return (
              <View>
                <TouchableOpacity style={styles.itemCrad}>
                  <Image
                    style={styles.itemImage}
                    resizeMode="contain"
                    source={{uri: `${item.thumbnail}`}}
                  />
                  <View style={styles.contentCrad}>
                    <Text style={styles.titleText}>{item.title}</Text>
                    <Text style={styles.itemSideHead}>
                      Rating:{' '}
                      <Text style={styles.itemDescription}>{item.rating}</Text>
                    </Text>
                    <Text style={styles.itemSideHead}>
                      Price: <Text style={styles.itemPrice}>${item.price}</Text>
                    </Text>
                    <TouchableOpacity
                      style={{
                        ...styles.fitlerBtn,
                        backgroundColor: `${
                          disableBtn ? '#f7a92a' : '#0f961a'
                        }`,
                      }}
                      disabled={disableBtn}
                      onPress={() => {
                        this.onPressAddCratBtn(item.id);
                      }}>
                      <Text style={styles.viewMoreText}>Add to Cart</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    );
  };

  renderData = () => {
    const {apiStatus} = this.state;
    switch (apiStatus) {
      case apiStatusObj.inProgress:
        return this.apiPendeingView();
      case apiStatusObj.success:
        return this.apiSeccussView();
      default:
        return null;
    }
  };
  render() {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.homeText}>Products</Text>
        {this.renderData()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  homeCrad: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeText: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
    backgroundColor: '#000000',
    width: '100%',
    color: '#ffffff',
    padding: 10,
  },
  itemCrad: {
    backgroundColor: '#e7e4dc',
    marginBottom: 15,
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
  },
  itemImage: {
    height: 180,
    width: 180,
    borderRadius: 5,
    marginRight: 10,
  },
  contentCrad: {
    width: 160,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 18,
    color: '#0c0902',
  },
  itemDescription: {
    fontSize: 16,
    color: '#f7a92a',
  },
  itemPrice: {
    fontSize: 20,
    color: '#0f961a',
  },
  itemSideHead: {
    color: '#5a3a17',
  },
  viewMoreText: {
    fontSize: 18,
    color: '#fff',
  },

  fitlerBtn: {
    fontWeight: '300',
    width: 150,
    borderColor: '#ebeef5',
    borderWidth: 1,
    padding: 8,
    // backgroundColor: '#000',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
  },
  ShortCrad: {
    backgroundColor: '#ffffff',
    width: 300,
    marginLeft: 30,
    marginBottom: 20,
    borderRadius: 10,
    padding: 20,
  },
});

export default connector(Home);
