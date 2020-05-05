import React, { Component } from 'react'
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import {AsyncStorage} from 'react-native'

import InputIcon from '../components/InputIcon'

export default class Login extends Component {

    state = {
        stageNew: false,
        email: 'eltoncostabr@gmail.com',
        senha: '123456',
        confirmacao: '123456',
        nome: 'Elton Costa'
    }

    render() {
        return (
            <View style={styles.background}>
                <Icon name='shopping-basket' style={styles.logo} />
                <Text style={styles.title}> Market Mobile </Text>
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
        )
    }

}

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#99ff99',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        fontSize: 80
    },
    title: {
        marginBottom: 10
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