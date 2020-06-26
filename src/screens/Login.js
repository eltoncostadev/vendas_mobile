import React, { Component } from 'react'
import {
    Text,
    Image,
    StyleSheet,
    View,
    TouchableOpacity,
    ImageBackground,
    KeyboardAvoidingView
} from 'react-native'

import AsyncStorage from '@react-native-community/async-storage'

import InputIcon from '../components/InputIcon'

import backgroundImage from '../../assets/imgs/BackGroundApp.png'
import logoImage from '../../assets/imgs/FeiraOnline.png'

export default class Login extends Component {

    // state = {
    //     stageNew: false,
    //     email: 'mariaap@gmail.com',
    //     password: '123456',
    //     confirmPassword: '123456',
    //     name: 'Maria Aparecida'
    // }

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

        if(this.state.email !== null) this.props.navigation.navigate('Home')

    }

    render() {

        const validations = []

        validations.push(this.state.email && this.state.email.includes('@'))
        validations.push(this.state.password && this.state.password.length >= 6)

        if(this.state.stageNew) {
            validations.push(this.state.name && this.state.name.trim())
            validations.push(this.state.confirmPassword)
            validations.push(this.state.password === this.state.confirmPassword)
        }

        const { navigate } = this.props.navigation

        const validForm = validations.reduce((all, v) => all && v)

        return (
                <ImageBackground source={backgroundImage} style={{ width: '100%', height: '100%' }}>

                    <View style={styles.background}>
                        <Image
                            source={logoImage}
                            style={{ width: 200, height: 200 }}
                        />
                        <Text style={styles.title}> Feira Online </Text>
                        <KeyboardAvoidingView
                        behavior="padding"
                         style={styles.formContainer}>
                            {this.state.stageNew &&
                                <InputIcon
                                    icon='user'
                                    placeholder='Nome'
                                    value={this.state.name}
                                    onChangeText={name => this.setState({ name })} />
                            }
                            <InputIcon
                                icon='at'
                                placeholder='Email'
                                value={this.state.email}
                                onChangeText={email => this.setState({ email })} />
                            <InputIcon
                                icon='lock'
                                placeholder='Senha'
                                secureTextEntry={true}
                                value={this.state.password}
                                onChangeText={password => this.setState({ password })} />
                            {this.state.stageNew &&
                                <InputIcon
                                    icon='asterisk'
                                    placeholder='Confirmação'
                                    secureTextEntry={true}
                                    value={this.state.confirmPassword}
                                    onChangeText={confirmPassword => this.setState({ confirmPassword })} />
                            }
                            <TouchableOpacity 
                                disabled={!validForm}
                                onPress={
                                    () => {
                                        AsyncStorage.setItem('userState', JSON.stringify(this.state))
                                        //console.log(this.state)
                                        navigate('Home')
                                    }
                                }
                            >
                                <View 
                                    style={[styles.button, !validForm ? { backgroundColor: '#AAA' } : {}]}
                                >
                                    <Text
                                        style={{ color: '#ffffe6' }}>
                                        {this.state.stageNew ? 'Cadastrar' : 'Entrar'}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={
                                    () => this.setState({ stageNew: !this.state.stageNew })}>
                                <View style={styles.buttonText}>
                                    <Text>
                                        {this.state.stageNew ? 'Acessar sua conta?' : 'Ainda não possui conta?'}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </KeyboardAvoidingView>
                    </View>
                </ImageBackground>
        )
    }

}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    formContainer: {
        //backgroundColor: 'rgba(0,0,0,0.8)',
        padding: 20,
        width: '90%',
    },
    title: {
        marginBottom: 10,
        fontSize: 50,
        fontFamily: 'LeckerliOne-Regular',
        color: '#E84D0B'
    },
    button: {
        backgroundColor: '#080',
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
        borderRadius: 20
    },
    buttonText: {
        alignItems: 'center',
        marginTop: 5,
        padding: 10,
    }
})