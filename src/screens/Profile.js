import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
    BackHandler,
    Image,
    FlatList,
    Alert,
    TouchableOpacity,
    TextInput
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { AsyncStorage } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import moment from 'moment'

import commonStyles from '../commonStyles'
import { currencyFormat } from '../common'
import backgroundImage from '../../assets/imgs/BackGroundApp.png'

const initialState = {
    stageNew: false,
    email: null,
    password: null,
    confirmPassword: null,
    name: null
}

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
                            style={{ width: '100%', height: '100%' }}>
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
                                flex: 9
                            }} >
                                <View
                                    style={{
                                        //backgroundColor: 'rgba(255, 255, 204, 0.8)',
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
                                                style={styles.inputText} />
                                        </View>
                                        <View
                                            style={styles.input}>
                                            <TextInput 
                                                placeholder='Telefone'
                                                
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
                                    </View>
                                </View>
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
        }
    })