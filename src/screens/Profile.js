import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
    BackHandler,
    TouchableOpacity,
    TextInput, Dimensions, KeyboardAvoidingView
    
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-community/async-storage'
import TextInputMask from 'react-native-masked-text'

import commonStyles from '../commonStyles'
import backgroundImage from '../../assets/imgs/BackGroundApp.png'
import Password from '../components/Password'

const initialState = {
    stageNew: false,
    email: null,
    password: null,
    confirmPassword: null,
    name: null,
    phone: '34992343121',
    showPassWordView: false,
    flexScreen: 9
}


const { width } = Dimensions.get('window')

export default class Profile extends Component {

    constructor(props) {
        super(props)
        //
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this)
        //
    }

    state = {
        ...initialState
    }

    componentDidMount = async () => {
        //
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick)
        //
        //Keyboard.addListener('keyboardDidShow', this.keyboardDidShow )
        //Keyboard.addListener('keyboardDidHide', this.keyboardDidHide )
        //
        const stateString = await AsyncStorage.getItem('userState')
        const state = JSON.parse(stateString)
        this.setState(state)
    }

    handleBackButtonClick() {
        this.props.navigation.navigate('Home')
        return true
    }

    keyboardDidShow(){
        alert('Teclado na tela...')
    }

    keyboardDidHide(){
        alert('Teclado vazou...')
    }

    setFormatPhoneNumber(phoneNumberString) {

        var cleaned = ('' + phoneNumberString).replace(/\D/g, '')

        var match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/)
        var match1 = cleaned.match(/^(\d{2})(\d{5})(\d{3})$/)
        var match2 = cleaned.match(/^(\d{2})(\d{5})(\d{2})$/)
        var match3 = cleaned.match(/^(\d{2})(\d{5})(\d{1})$/)
        var match4 = cleaned.match(/^(\d{2})(\d{5})$/)
        //
        var match5 = cleaned.match(/^(\d{2})(\d{4})$/)
        var match6 = cleaned.match(/^(\d{2})(\d{3})$/)
        var match7 = cleaned.match(/^(\d{2})(\d{2})$/)
        var match8 = cleaned.match(/^(\d{2})(\d{1})$/)
        var match9 = cleaned.match(/^(\d{2})$/)
        //
        //var match10 = cleaned.match(/^(\d{2})$/)

        if (match) {
            return '(' + match[1] + ') ' + match[2] + '-' + match[3]
        }
        //
        if (match1) {
            return '(' + match1[1] + ') ' + match1[2] + '-' + match1[3]
        }
        //
        if (match2) {
            return '(' + match2[1] + ') ' + match2[2] + '-' + match2[3]
        }
        //
        if (match3) {
            return '(' + match3[1] + ') ' + match3[2] + '-' + match3[3]
        }
        //
        if (match4) {
            return '(' + match4[1] + ') ' + match4[2]
        }
        //
        //
        if (match5) {
            return '(' + match5[1] + ') ' + match5[2] 
        }
        //
        if (match6) {
            return '(' + match6[1] + ') ' + match6[2] 
        }
        //
        if (match7) {
            return '(' + match7[1] + ') ' + match7[2] 
        }
        //
        if (match8) {
            return '(' + match8[1] + ') ' + match8[2] 
        }
        //
        if (match9) {
            return '(' + match9[1] + ''
        }
        //
        //

        return phoneNumberString
    }

    formatPhoneNumber(phoneNumberString) {
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
        //
        if (cleaned.length <= 11) {
            this.setState({ phone: cleaned })
        }
    }

    render() {

        const { navigate } = this.props.navigation

        

        return (

            <View>
                <ImageBackground source={backgroundImage}
                    style={{
                        width: '100%', height: '100%',
                    }}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name='bars'
                                style={styles.menuIcon} />
                        </TouchableOpacity>
                        <Text style={styles.title}>
                            Perfil
                                    </Text>

                    </View>

                    <View style={{
                        flex: 9,
                    }}>
                        <View
                            style={{
                                height: '95%',
                                padding: 10,
                                margin: 5,
                                borderRadius: 10
                            }}>
                            <View style={{
                                height: '30%'
                            }}>
                                <View style={{
                                    alignItems: 'center',
                                    borderBottomColor: '#caceca',
                                    borderBottomWidth: 2
                                }}>
                                    <Text style={{
                                        fontFamily:
                                            commonStyles.fontFamilyList.Lato,
                                        fontSize: 30,
                                        color: '#626a62'
                                    }}>
                                        Dados Pessoais
                                                    </Text>
                                </View>
                                <View
                                    style={styles.input}>
                                    <TextInput
                                        placeholder='Nome'
                                        value={this.state.name}
                                        onChangeText={name => this.setState({ name })}
                                        style={styles.inputText} />
                                </View>
                                <View
                                    style={styles.input}>
                                    <TextInput
                                        placeholder='Celular - Ex.: (34) 91234-1234'
                                        value={this.setFormatPhoneNumber(this.state.phone)}
                                        onChangeText={phone => this.formatPhoneNumber(phone)}
                                        keyboardType={'numeric'}
                                        style={styles.inputText} />
                                </View>
                                <View
                                    style={styles.input}>
                                    <TextInput
                                        placeholder='Email'
                                        value={this.state.email}
                                        editable={false}
                                        style={styles.inputTextDisabled} />
                                </View>
                                <TouchableOpacity
                                    onPress={
                                        () => {
                                            this.setState({ showPassWordView: true })
                                        }
                                    }>
                                    <View
                                        style={{
                                            backgroundColor: '#caceca',
                                            alignItems: 'center',
                                            marginTop: 10,
                                            padding: 10,
                                            borderRadius: 30
                                        }}>
                                        <Text
                                            style={{
                                                fontFamily:
                                                    commonStyles.fontFamilyList.Lato,
                                                fontSize: 20,
                                            }}>
                                            ALTERAR SENHA DE ACESSO
                                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        {
                            this.state.showPassWordView ?
                                <View style={styles.overlay} />
                                :
                                null
                        }
                        {
                            this.state.showPassWordView ?
                                
                                    <Password onPassWordHide={() => this.setState({ showPassWordView : false })} />
                                
                                :
                                null
                        }
                        


                    </View>
                    
                </ImageBackground>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    header: commonStyles.header,
    menuIcon: {
        color: '#FFFFFF',
        fontSize: 30,
        marginLeft: 15
    },
    title: {
        fontFamily: commonStyles.fontFamilyList.LeckerliOneRegular,
        color: '#FFFFFF',
        fontSize: 35,
        marginRight: 15
    },
    input: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: '#caceca',
        backgroundColor: 'rgba(242, 242, 242, 0.8)',
        borderWidth: 2,
        marginTop: 10,
        borderRadius: 10
    },
    inputText: {
        fontSize: 18,
        //color: '#626a62'
    },
    inputTextDisabled: {
        fontSize: 18,
        color: '#a2a9a2'
    },
    iconInput: {
        fontSize: 20,
        color: '#caceca',
        paddingRight: 15,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        opacity: 0.5,
        backgroundColor: 'black',
        width: width,
        height: '50%',
    }
})