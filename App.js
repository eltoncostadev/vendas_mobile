//This is an example code to handle Android back button press// 
import React, { Component } from 'react'
//import react in our code.

//Import react-navigation
import { createAppContainer } from 'react-navigation'
import { createStackNavigator} from 'react-navigation-stack'
import {createDrawerNavigator } from 'react-navigation-drawer'

//Import external files
import Login from './src/screens/Login'
import Home from './src/screens/Home'
import Menu from './src/screens/Menu'
import StoreList from './src/components/StoreList'
import PriceList from './src/components/PriceList'
import PriceListCategories from './src/components/PriceListCategories'
import PriceListItens from './src/components/PriceListItens'

const menuConfig = {
  initialRouteName: 'Home',
  contentComponent: Menu,
  contentOptions: {
      labelStyle: {
          fontFamily: 'Lato',
          fontWeight: 'normal',
          fontSize: 20,
      },
      activeLabelStyle: {
          color: '#080',
          fontWeight: 'bold',
      },
  },
}

const MenuRoutes = {
  Home: {
      name: 'Principal',
      screen: props => <Home title='Inicio' {...props} />,
      navigationOptions: {
          //drawerLabel: () => null,
          title: 'Inicio'
      }
  }
}

const MenuNavigator = createDrawerNavigator(MenuRoutes, menuConfig)

const App = createStackNavigator({
  //Constant which holds all the screens like index of any book 
    Login: { screen: Login, navigationOptions: {headerShown: false} }, 
    Home: { screen: MenuNavigator, navigationOptions: {headerShown: false} }, 
    StoreList: { screen: StoreList, navigationOptions: {headerShown: false} }, 
    PriceList: { screen: PriceList, navigationOptions: {headerShown: false} }, 
    PriceListCategories: {screen: PriceListCategories, navigationOptions: {headerShown: false} }, 
    PriceListItens: {screen: PriceListItens, navigationOptions: {headerShown: false} }, 

  },
  {
    initialRouteName: 'Login',
  }
)

export default createAppContainer(App)
