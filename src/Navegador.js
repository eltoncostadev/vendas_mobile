import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import Login from './screens/Login'
import Home from './screens/Home'

const mainRoutes = {
    Login: {
        name: 'Login',
        screen: Login
    },
    Home: {
        name: 'Home',
        screen: Home
    }
}

const MainNavigator = createSwitchNavigator(mainRoutes, {
    initialRouteName: 'Login'
})

export default createAppContainer(MainNavigator)