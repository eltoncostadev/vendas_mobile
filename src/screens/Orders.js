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
    NavigationEvents
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-community/async-storage'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import moment from 'moment'

import commonStyles from '../commonStyles'
import { currencyFormat } from '../common'
import backgroundImage from '../../assets/imgs/BackGroundApp.png'

const initialState = {
    userOrders: []
}

export default class Orders extends Component {

    constructor(props) {
        super(props)
        //
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
      }

        state = {
            ...initialState
        }


        carregarDados = async () => {
            const stateString = await AsyncStorage.getItem('userOrders')
            const state = JSON.parse(stateString)
            // console.log('---------------------------------------------')
            // console.log('--------------- carregarDados ---------------')
            this.setState({ userOrders: state })
            //console.log(this.state)
        }

        componentDidMount() {
            BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick)
        }
        componentWillUnmount() {
            BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick)
        }
    
        handleBackButtonClick() {
            this.props.navigation.navigate('Home')
            return true
        }

        render() {
    
            const { navigate } = this.props.navigation

                return(
                    <View>
                        
                        <ImageBackground source={backgroundImage} onLoad={()=> this.carregarDados()}
                            style={{ width: '100%', height: '100%' }}>
                            <View style={styles.header}>
                                <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                                    <Icon name='bars'
                                        style={styles.menuIcon} />
                                </TouchableOpacity>                            
                                <Text style={styles.title}>
                                    Meus Pedidos
                                </Text>
                                
                            </View>
                            <View style={styles.storeList}>
                                <View style={styles.storeListContainer}>
                                    <FlatList data={this.state.userOrders}
                                        keyExtractor={item => `${item.itemDetailId}`}
                                        renderItem={({ item, index }) =>
                                            <View style={{
                                                backgroundColor : '#FFFFFF',
                                                //width: 390,
                                                //height: '80%',
                                                borderRadius: 25,
                                                marginBottom: 10,
                                            }}>
                                                <View style={{
                                                    marginTop: 10,
                                                    marginLeft: 20,
                                                    //height: '50%'
                                                }}>
                                                    <Text style={{
                                                        fontSize: 30,
                                                        fontFamily: commonStyles.fontFamilyList.Lato
                                                    }}>
                                                        Pedido pago
                                                    </Text>
                                                    <Text style={{
                                                        fontSize: 15,
                                                        fontFamily: commonStyles.fontFamilyList.Lato
                                                    }}>
                                                        Realizado em {moment(item.orderDate).format('D[/]MM[/]YYYY [às] hh:mm')}
                                                    </Text>
                                                    <Text style={{
                                                        fontSize: 15,
                                                        fontFamily: commonStyles.fontFamilyList.Lato
                                                    }}>
                                                        Quantidade de Itens {item.orderListItens.length}
                                                    </Text>
                                                    <Text style={{
                                                        fontSize: 15,
                                                        fontFamily: commonStyles.fontFamilyList.Lato
                                                    }}>
                                                        Valor do Pedido {item.orderValue}
                                                    </Text>
                                                </View>
                                                <TouchableWithoutFeedback
                                                    onPress={() => this.props.navigation.navigate('OrderItem'
                                                    ,{userOrder : item})}>
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        marginTop: 10,
                                                        marginLeft: 20,
                                                        marginRight: 20,
                                                        borderTopWidth: 2,
                                                        borderTopColor: 'gray',
                                                        justifyContent: 'center'
                                                    }}>
                                                        <Text style={{
                                                            marginTop: 5,
                                                            //marginBottom: 10,
                                                            fontSize: 20,
                                                            color: 'gray',
                                                            height: 35
                                                        }}>
                                                            Ver Detalhes
                                                        </Text>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            </View>
                                        } />
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
        storeList: {
            flex: 9
        },
        storeListContainer: {
            marginLeft: 10,
            marginRight: 10,
            marginTop: 10
        }
    })