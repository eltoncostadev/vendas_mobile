import React, { Component } from 'react'
import { Platform, ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { AsyncStorage } from 'react-native'
import { DrawerItems } from 'react-navigation-drawer'

export default class Menu extends Component {

    state = {
        stageNew: false,
        email: '',
        senha: '',
        confirmacao: '',
        nome: 'Elton'
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
                        {`Olá, ${this.state.nome}!`}
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
        fontFamily: 'LeckerliOne-Regular',
        fontSize: 22,
        marginLeft: 15
    }
})