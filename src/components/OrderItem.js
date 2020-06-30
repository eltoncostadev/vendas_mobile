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
    TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-community/async-storage'

import commonStyles from '../commonStyles'
import { currencyFormat } from '../common'
import backgroundImage from '../../assets/imgs/BackGroundApp.png'


const initialState = {
    userOrder: []
}


export default class OrderItem extends Component {

    state = {
        ...initialState
    }

    constructor(props) {
        super(props)
        //
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this)
        //
        this.state.userOrder = this.props.navigation.state.params.userOrder
        //
        //console.log(this.state.userOrder)
    }

    componentDidMount = () => {
        //
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick)
        //
    }

    handleBackButtonClick() {
        this.props.navigation.navigate('Orders');
        return true
    }

    getOrderItensSum = () => {
        //console.log('------ getOrderSum ------')
        let sumOrder = 0
        let totalSum =
            this.state.userOrder.orderListItens.forEach((item, index) => {
                //console.log(item.itemPrice)
                sumOrder = sumOrder + item.itemPrice
            })
        //console.log(sumOrder)
        return sumOrder
    }

    getOrderSum = () => {
        //console.log('------ getOrderSum ------')
        let sumOrder = 0
        let totalSum =
            this.state.userOrder.orderListItens.forEach((item, index) => {
                //console.log(item.itemPrice)
                sumOrder = sumOrder + item.itemPrice
            })
        //console.log(sumOrder)
        return sumOrder + 5
    }

    render() {

        const { navigate } = this.props.navigation

        return (
            <ImageBackground source={backgroundImage}
                style={{ width: '100%', height: '100%' }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigate('Orders')}>
                        <Icon name='arrow-left'
                            style={styles.menuIcon} />
                    </TouchableOpacity>
                    <Text style={styles.title}>
                        Meu Pedido
                            </Text>

                </View>
                <View style={styles.storeList}>
                    <View style={styles.storeListContainer}>
                        <FlatList data={this.state.userOrder.orderListItens}
                            keyExtractor={item => `${item.itemDetailId}`}
                            renderItem={({ item, index }) =>
                                <View>

                                    <View style={{
                                        backgroundColor: '#FFFFFF',
                                        marginTop: 10,
                                        flexDirection: 'row',
                                        height: 150,
                                        borderRadius: 30
                                    }}>
                                        <View style={{
                                            height: 130,
                                            width: 130,
                                            marginTop: 10,
                                            marginLeft: 10,
                                            alignItems: 'center'
                                        }}>
                                            <Image
                                                source={item.ItemDetail.itemImage}
                                                style={{
                                                    height: 120,
                                                    width: 120
                                                }} />
                                        </View>
                                        <View style={{
                                            marginLeft: 5,
                                            marginTop: 10
                                        }}>
                                            <View style={{
                                                height: 60,
                                                width: 170,
                                                flexDirection: 'row',
                                                alignItems: 'center'
                                            }}>
                                                <Text style={{
                                                    fontFamily: commonStyles.fontFamilyList.Lato,
                                                    color: '#D11B00',
                                                    fontSize: 20
                                                }}>
                                                    {item.ItemDetail.itemName}
                                                </Text>
                                            </View>
                                            <Text
                                                style={{
                                                    fontSize: 15,
                                                    marginBottom: 5
                                                }}
                                            >
                                                {currencyFormat(item.ItemDetail.itemPrice)}
                                            </Text>
                                            <Text> Quantidade : 1</Text>
                                        </View>
                                        <View style={{
                                            height: 130,
                                            width: 60,
                                            marginTop: 10,
                                            marginLeft: 10,
                                            alignItems: 'center'
                                        }}>

                                        </View>
                                    </View>
                                    {this.state.userOrder.orderListItens.length - 1 === index
                                        ?
                                        <View>
                                            <View style={{
                                                backgroundColor: '#FFFFFF',
                                                flexDirection: 'row',
                                                marginTop: 10,
                                                alignItems: 'center',
                                                height: 120,
                                                borderRadius: 25,
                                                marginBottom: 10
                                            }}>
                                                <View
                                                    style={{
                                                        flexDirection: 'row',
                                                        marginLeft: 20
                                                    }}>
                                                    <View>
                                                        <View style={{
                                                            flexDirection: 'row',
                                                            width: 270,
                                                        }}>
                                                            <Icon name='map-marker'
                                                                style={{
                                                                    fontSize: 30
                                                                }} />
                                                            <Text style={{
                                                                fontSize: 25,
                                                                fontFamily:
                                                                    commonStyles.fontFamilyList.Lato,
                                                                marginLeft: 5
                                                            }}>
                                                                Endereço de Entrega
                                                                    </Text>
                                                        </View>
                                                        <View style={{
                                                            width: 250
                                                        }}>
                                                            <Text style={{
                                                                fontSize: 18,
                                                                color: 'gray'
                                                            }}>
                                                                Av. Afonso Pena, Bloco 100, Ap. 300
                                                                    </Text>
                                                            <Text style={{
                                                                fontSize: 18,
                                                                color: 'gray'
                                                            }}>
                                                                Centro
                                                                    </Text>
                                                        </View>
                                                    </View>
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        width: 120
                                                    }}>

                                                    </View>
                                                </View>
                                            </View>
                                            <View style={{
                                                backgroundColor: '#FFFFFF',
                                                //height: 220,
                                                padding: 15,
                                                borderRadius: 25,
                                                marginBottom: 10,
                                            }}>
                                                <View
                                                    style={{

                                                    }}>
                                                    <View>
                                                        <View style={{
                                                        }}>
                                                            <View style={{
                                                                marginBottom: 10
                                                            }}>
                                                                <Text style={{
                                                                    fontSize: 20,
                                                                    fontFamily:
                                                                        commonStyles.fontFamilyList.Lato,
                                                                }}>
                                                                    Forma de Pagamento:
                                                                    </Text>
                                                                <Text style={{
                                                                    fontSize: 20,
                                                                    fontFamily:
                                                                        commonStyles.fontFamilyList.Lato,
                                                                }}>
                                                                    {this.state.userOrder.orderPaymentType.orderTypeName}
                                                                </Text>

                                                            </View>
                                                            <View style={{
                                                                flexDirection: 'row',
                                                                justifyContent: 'space-between',
                                                            }}>
                                                                <Text style={{
                                                                    fontSize: 25,
                                                                    fontFamily:
                                                                        commonStyles.fontFamilyList.Lato,
                                                                }}>
                                                                    {this.state.userOrder.orderListItens.length} Produto(s)
                                                                    </Text>
                                                                <Text style={{
                                                                    fontSize: 25,
                                                                    fontFamily:
                                                                        commonStyles.fontFamilyList.Lato,
                                                                }}>
                                                                    {currencyFormat(this.getOrderItensSum())}
                                                                </Text>
                                                            </View>
                                                            <View style={{
                                                                flexDirection: 'row',
                                                                justifyContent: 'space-between',
                                                            }}>
                                                                <Text style={{
                                                                    fontSize: 25,
                                                                    fontFamily:
                                                                        commonStyles.fontFamilyList.Lato,
                                                                }}>
                                                                    Frete
                                                                    </Text>
                                                                <Text style={{
                                                                    fontSize: 25,
                                                                    fontFamily:
                                                                        commonStyles.fontFamilyList.Lato,
                                                                }}>
                                                                    R$ 5.00
                                                                    </Text>
                                                            </View>
                                                            <View style={{
                                                                flexDirection: 'row',
                                                                justifyContent: 'space-between',
                                                            }}>
                                                                <Text style={{
                                                                    fontSize: 25,
                                                                    fontFamily:
                                                                        commonStyles.fontFamilyList.Lato,
                                                                }}>
                                                                    Total pago
                                                                    </Text>
                                                                <Text style={{
                                                                    fontSize: 25,
                                                                    fontFamily:
                                                                        commonStyles.fontFamilyList.Lato,
                                                                }}>
                                                                    {currencyFormat(this.getOrderSum())}
                                                                </Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                        : null
                                    }
                                </View>
                            } />
                    </View>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'gray',
        flex: 1,
        height: '100%',
        justifyContent: 'space-around',
        left: 0,
        position: 'absolute',
        top: 0,
        width: '100%'
    },
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