import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import {createDrawerNavigator } from 'react-navigation-drawer'

import Login from './screens/Login'
import Home from './screens/Home'
import Menu from './screens/Menu'
import ListPrice from './components/ListPrice'

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
        screen: props => <Home title='Home' {...props} />,
        navigationOptions: {
            //drawerLabel: () => null,
            title: 'Home'
        }
    },
    ListPrice: {
        name: 'Lista de Preços',
        screen: props => <ListPrice title='Lista de Preços' {...props} />,
        navigationOptions: {
            title: 'Lista de Preços'
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