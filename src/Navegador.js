import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import {createDrawerNavigator } from 'react-navigation-drawer'

import Login from './screens/Login'
import Home from './screens/Home'
import Menu from './screens/Menu'
import PriceList from './components/PriceList'
import StoreList from './components/StoreList'
import PriceListItens from './components/PriceListItens'
import PriceListCategories from './components/PriceListCategories'
import PriceListCategoryItem from './components/PriceListCategoryItem'

import { singleListMode } from './common'

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
    ListPrice: {
        name: 'Lista de Preços',
        screen: props => {
            if(singleListMode){ 
              return  <PriceList title='Lista de Preços' {...props} />
            }else{
              return  <StoreList title='Lista de Preços' {...props} />
            }
        },
        navigationOptions: {
            title: 'Lista de Preços'
        }
    },
    PriceList: {
        name: 'Lista de Preços',
        screen: props => <PriceList title='Lista de Preços' {...props} />,
        navigationOptions: {
            drawerLabel: () => null,
            title: 'Lista de Preços'
        }
    },
    PriceListItens: {
        name: 'Itens Lista de Preços',
        screen: props => <PriceListItens title='Itens Lista de Preços' {...props} />,
        navigationOptions: {
            drawerLabel: () => null,
            title: 'Itens Lista de Preços'
        }
    },
    PriceListCategoryItem: {
        name: 'Itens Lista de Preços',
        screen: props => <PriceListCategoryItem title='Itens Lista de Preços' {...props} />,
        navigationOptions: {
            drawerLabel: () => null,
            title: 'Itens Lista de Preços'
        }
    },
    PriceListCategories: {
        name: 'Itens Lista de Preços',
        screen: props => <PriceListCategories title='Itens Lista de Preços' {...props} />,
        navigationOptions: {
            drawerLabel: () => null,
            title: 'Itens Lista de Preços'
        }
    },
    StoreList: {
        name: 'Itens Lista de Preços',
        screen: props => <StoreList title='Itens Lista de Preços' {...props} />,
        navigationOptions: {
            drawerLabel: () => null,
            title: 'Itens Lista de Preços'
        }
    },
}

const MenuNavigator = createDrawerNavigator(MenuRoutes, menuConfig)

const mainRoutes = {
    Login: {
        name: 'Login',
        screen: Login
    },
    Home: {
        name: 'Home',
        screen: MenuNavigator
    }
}

const MainNavigator = createSwitchNavigator(mainRoutes, {
    initialRouteName: 'Login'
})

export default createAppContainer(MainNavigator)