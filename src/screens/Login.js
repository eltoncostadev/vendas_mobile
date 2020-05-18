import React, { Component } from 'react'
import {
    Text,
    Image,
    StyleSheet,
    View,
    TouchableOpacity,
    ImageBackground
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { AsyncStorage } from 'react-native'

import InputIcon from '../components/InputIcon'

import backgroundImage from '../../assets/imgs/BackGroundApp.png'
import logoImage from '../../assets/imgs/FeiraOnline.png'

export default class Login extends Component {

    state = {
        stageNew: false,
        email: 'mariaap@gmail.com',
        senha: '123456',
        confirmacao: '123456',
        nome: 'Maria Aparecida'
    }

    render() {
        return (
            <ImageBackground source={backgroundImage} style={{ width: '100%', height: '100%' }}>

                <View style={styles.background}>
                    <Image
                        source={logoImage}
                        style={{ width: 200, height: 200 }}
                    />
                    <Text style={styles.title}> Feira Online </Text>
                    {this.state.stageNew &&
                        <InputIcon
                            icon='user'
                            placeholder='Nome'
                            value={this.state.nome} />
                    }
                    <InputIcon
                        icon='at'
                        placeholder='Email'
                        value={this.state.email} />
                    <InputIcon
                        icon='lock'
                        placeholder='Senha'
                        value={this.state.senha} />
                    {this.state.stageNew &&
                        <InputIcon
                            icon='asterisk'
                            placeholder='Confirmação'
                            value={this.state.confirmacao} />
                    }
                    <TouchableOpacity style={{ width: 200 }}
                        onPress={
                            () => AsyncStorage.setItem('userState', JSON.stringify(this.state))
                        }
                    >
                        <View style={styles.button}>
                            <Text
                                onPress={() => this.props.navigation.navigate('Home')}
                                style={{ color: '#ffffe6' }}>
                                {this.state.stageNew ? 'Cadastrar' : 'Entrar'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: 200 }}
                        onPress={
                            () => this.setState({ stageNew: !this.state.stageNew })}>
                        <View style={styles.buttonText}>
                            <Text>
                                {this.state.stageNew ? 'Acessar sua conta?' : 'Ainda não possui conta?'}
                            </Text>
                        </View>
                    </TouchableOpacity>
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
    title: {
        marginBottom: 10,
        fontSize: 50,
        fontFamily: 'LeckerliOne-Regular',
        color: '#E84D0B'
    },
    button: {
        width: '100%',
        height: 40,
        backgroundColor: '#008000',
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})