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
import Orders from './src/screens/Orders'
import Profile from './src/screens/Profile'
import OrderItem from './src/components/OrderItem'
import StoreList from './src/components/StoreList'
import PriceList from './src/components/PriceList'
import PriceListCategories from './src/components/PriceListCategories'
import PriceListItem from './src/components/PriceListItem'
import PriceListItens from './src/components/PriceListItens'
import PriceListItemDetails from './src/components/PriceListItemDetails'
import BasketListItens from './src/components/BasketListItens'
import PaymentView from './src/components/PaymentView'

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
  },
  Orders: {
      name: 'Meus Pedidos',
      screen: props => <Orders title='Meus Pedidos' {...props} />,
      navigationOptions: {
          title: 'Meus Pedidos'
      }
  },
  Profile: {
      name: 'Perfil',
      screen: props => <Profile title='Perfil' {...props} />,
      navigationOptions: {
          title: 'Perfil'
      }
  },
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
    PriceListItem: {screen: PriceListItem, navigationOptions: {headerShown: false} }, 
    PriceListItemDetails: {screen: PriceListItemDetails, navigationOptions: {headerShown: false} }, 
    BasketListItens: {screen: BasketListItens, navigationOptions: {headerShown: false} }, 
    Orders: {screen: Orders, navigationOptions: {headerShown: false} }, 
    OrderItem: {screen: OrderItem, navigationOptions: {headerShown: false} }, 
    PaymentView: {screen: PaymentView, navigationOptions: {headerShown: false} }, 
    Profile: {screen: Profile, navigationOptions: {headerShown: false} }, 
  },
  {
    initialRouteName: 'Login',
  }
)

export default createAppContainer(App)
