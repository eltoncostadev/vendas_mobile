import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
    BackHandler,
    Alert,
    TouchableOpacity,
    TextInput, Dimensions
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { AsyncStorage } from 'react-native'
import TextInputMask from 'react-native-text-input-mask'

import commonStyles from '../commonStyles'
import backgroundImage from '../../assets/imgs/BackGroundApp.png'

const initialState = {
    stageNew: false,
    email: null,
    password: null,
    confirmPassword: null,
    name: null,
    phone: '34992343121',
    showPassWordView : false,
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
            const stateString = await AsyncStorage.getItem('userState')
            const state = JSON.parse(stateString)
            this.setState(state)
        }
    
        handleBackButtonClick() {
            this.props.navigation.navigate('Home')
            return true
        }

        render() {
    
            const { navigate } = this.props.navigation

                return(
                    
                        <View>
                            <ImageBackground source={backgroundImage}
                                style={{ 
                                    width: '100%', height: '100%' ,
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
                                                        onChangeText={name => this.setState({name})}
                                                        style={styles.inputText} />
                                                </View>
                                                <View
                                                    style={styles.input}>
                                                    <TextInputMask
                                                        placeholder='Telefone'
                                                        onChangeText={phone => this.setState({ phone })}
                                                        style={styles.inputText}
                                                        keyboardType='numeric'
                                                        refInput={ref => { this.input = ref }}
                                                        mask={"([00]) [00000]-[0000]"}
                                                        value={this.state.phone}
                                                    />
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
                                                            this.setState({ showPassWordView : true })
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
                                                <View style={{
                                                    position: 'absolute',
                                                    top: '45%',
                                                    borderTopLeftRadius: 20,
                                                    borderTopRightRadius: 20,
                                                    backgroundColor: '#FFFFFF',
                                                    width: width,
                                                    height: '55%'
                                                }}>
                                                    <View
                                                        style={{
                                                            padding: 10,
                                                            margin: 5,
                                                        }}
                                                        >
                                                        <View
                                                            style={styles.input}>
                                                                <TextInput 
                                                                    placeholder='Senha atual'
                                                                    //value={this.state.password}
                                                                    onChangeText={password => this.setState({password})}
                                                                    style={styles.inputText}
                                                                    secureTextEntry={true} />
                                                                <Icon name='eye-slash'
                                                                    style={styles.iconInput} />
                                                        </View>
                                                        <View
                                                            style={styles.input}>
                                                                <TextInput 
                                                                    placeholder='Nova senha'
                                                                    //value={this.state.password}
                                                                    onChangeText={password => this.setState({password})}
                                                                    style={styles.inputText}
                                                                    secureTextEntry={true} />
                                                                <Icon name='eye-slash'
                                                                    style={styles.iconInput} />
                                                        </View>
                                                        <View
                                                            style={styles.input}>
                                                                <TextInput 
                                                                    placeholder='Confirme a nova senha'
                                                                    //value={this.state.password}
                                                                    onChangeText={password => this.setState({password})}
                                                                    style={styles.inputText}
                                                                    secureTextEntry={true} />
                                                                <Icon name='eye-slash'
                                                                    style={styles.iconInput} />
                                                        </View>
                                                        <TouchableOpacity
                                                            onPress={() => this.setState({ showPassWordView : false })}
                                                            >
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
                                                                    ALTERAR SENHA
                                                                </Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity
                                                            onPress={() => this.setState({ showPassWordView : false })}>
                                                            <View style={{
                                                                marginTop: 20,
                                                                alignItems: 'center'
                                                            }}>
                                                                <Text style={{
                                                                    fontSize : 20,
                                                                    fontFamily: 
                                                                        commonStyles.fontFamilyList.Lato
                                                                }}>
                                                                    Cancelar
                                                                </Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
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
    input : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: '#caceca',
        backgroundColor: 'rgba(242, 242, 242, 0.8)',
        borderWidth: 2,
        marginTop: 10,
        borderRadius: 10
    },
    inputText : {
        fontSize: 18,
        //color: '#626a62'
    },
    inputTextDisabled : {
        fontSize: 18,
        color: '#a2a9a2'
    },
    iconInput: {
        fontSize: 20,
        color : '#caceca',
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