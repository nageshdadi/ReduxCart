/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {Component} from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../blocks/home/Home';
import Cart from '../blocks/cart/Cart';
import {homeImg, cartImg} from '../configer/config';
const Tab = createBottomTabNavigator();
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
import {connect} from 'react-redux';
const mapStateToProps = (state: {cartList: {cartList: CartData[]}}) => ({
  cartList: state.cartList.cartList,
});
const mapDispatch = {};
const connector = connect(mapStateToProps, mapDispatch);
interface IProps {
  cartList: CartData[];
}
export class BottomNavigation extends Component<IProps> {
  render() {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 75,
            backgroundColor: '#181A1A',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingTop: 10,
          },
        }}>
        <Tab.Screen
          options={{
            tabBarIcon: ({focused}) => (
              <Image
                source={homeImg}
                style={{
                  height: 30,
                  width: 30,
                  resizeMode: 'contain',
                  tintColor: focused ? '#CDE7BE' : '#EAF4F4',
                }}
              />
            ),
            tabBarLabelStyle: {
              fontSize: 15,
              marginBottom: 10,
            },
            tabBarActiveTintColor: '#CDE7BE',
          }}
          name="Home"
          component={Home}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({focused}) => (
              <Image
                source={cartImg}
                style={{
                  height: 30,
                  width: 30,
                  resizeMode: 'contain',
                  tintColor: focused ? '#CDE7BE' : '#EAF4F4',
                }}
              />
            ),
            tabBarLabelStyle: {
              fontSize: 15,
              marginBottom: 10,
            },
            tabBarBadge: `${this.props.cartList.length}`,
            tabBarActiveTintColor: '#CDE7BE',
          }}
          name="Cart"
          component={Cart}
        />
      </Tab.Navigator>
    );
  }
}

export default connector(BottomNavigation);
