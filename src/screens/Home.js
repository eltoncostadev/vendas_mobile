import React, { Component } from 'react'
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity
} from 'react-native'
import {AsyncStorage} from 'react-native'

export default class Home extends Component {

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
        this.setState(state, this.filterTasks)
    }

    render(){
        return(
        <Text>Olá {this.state.nome} !</Text>
        )
    }
}