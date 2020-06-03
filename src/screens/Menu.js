import React, { Component } from 'react'
import { Platform, ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { AsyncStorage } from 'react-native'
import { DrawerItems } from 'react-navigation-drawer'
import commonStyles from '../commonStyles'

const initialState = {
    stageNew: false,
    email: null,
    password: null,
    confirmPassword: null,
    name: null
}

export default class Menu extends Component {

   state = {
       ...initialState
   }

   state = {
        stageNew: false,
        email: null,
        password: null,
        confirmPassword: null,
        name: null
    }

    componentDidMount = async () => {
        const stateString = await AsyncStorage.getItem('userState')
        const state = JSON.parse(stateString)
        this.setState(state)
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.userGreeting}>
                        {`Olá, ${this.state.name}!`}
                    </Text>
                </View>
            <DrawerItems {...this.props} />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        borderBottomWidth: 1,
        borderColor: '#DDD',
        height: 50,
        backgroundColor : '#E5E2C0',
        flexDirection: 'row',
        alignItems: 'center',
    },
    userGreeting: {
        fontFamily: commonStyles.fontFamilyList.Lato,
        fontSize: 22,
        marginLeft: 15
    }
})