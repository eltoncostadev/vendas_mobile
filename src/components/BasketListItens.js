import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    BackHandler,
    Image,
    FlatList,
    ActivityIndicator,
    Alert
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-community/async-storage'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { WebView } from 'react-native-webview'
import styled from 'styled-components/native'

import BasketItensView from './BasketItensView'
import ControlItemPrice from './ControlItemPrice'
import commonStyles from '../commonStyles'
import { currencyFormat } from '../common'
import backgroundImage from '../../assets/imgs/BackGroundApp.png'

const HeaderCheckout = styled.View`
    flex: 0.1;
    flex-direction: row;
    background-color : #06AED5; 
    justify-content: center;
    align-items: center;
`

export const Title = styled.Text`
    margin: 50px;
    font-size: 22px;
    color: white;
    text-align: center;
`

const idPagamento = 0
const emailPagamento = 'feiraonline@gmail.com'
const descricaoPagamento = 'Feira Online'

export default class BasketListItens extends Component {

    state = {
        basketItemAmount: 0,
        basketItemAmountList: [], 
        userOrders: [],
        showCheckOut: false,
        allowPaymentOnDelivery: false
    }

    constructor(props) {
        super(props)
        //
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this)
        //
        this.BasketItemElement = React.createRef()
    }

    carregarDados = async () => {
        const stateString = await AsyncStorage.getItem('userBasketItens')
        const state = JSON.parse(stateString)
        this.setState({ basketItemAmountList: state })
        this.setState({ basketItemAmount: this.state.basketItemAmountList.length })
        // console.log('--------------------------------------------------------------')
        // console.log('-- Item em memória - Cesta de Compras (componentDidMount) ----')
        // console.log(this.state)
        // console.log('------------- Qtd. Itens -----------------')
        // console.log(this.state.basketItemAmount)
        // console.log('------------------------------------------')

        if(this.state.basketItemAmount === 0)
        {
            alert('Você não possui itens na sacola!')
            this.props.navigation.navigate('Home')
            return true
        }

    }

    componentDidMount = () => {
        //
        this.carregarDados()
        //
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick)
        //
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick)
        //
    }

    handleBackButtonClick() {
        this.props.navigation.navigate('PriceList')
        return true
    }

    ItemAdd = async (id) => {
        // console.log('------------ ID --------------------------')
        // console.log(id)
        // console.log('------------------------------------------')
        let newbasketItemAmountList = this.state.basketItemAmountList.map(item => (
            item.itemDetailId ===
                id.itemDetailId ? {
                    ...item, itemAmount: item.itemAmount + 1,
                    itemPrice: item.ItemDetail.itemPrice * (item.itemAmount + 1)
                } : item
        ))
        // console.log('------------ Atualizar item na cesta (+) -----')
        // console.log(newbasketItemAmountList)
        // console.log('------------------------------------------')

        this.state = {
            basketItemAmount: this.state.basketItemAmount,
            basketItemAmountList: newbasketItemAmountList
        }

        await AsyncStorage.setItem('userBasketItens',
            JSON.stringify(this.state.basketItemAmountList))

        this.carregarDados()
    }

    ItemSub = async (itemSub) => {

        if (itemSub.itemAmount - 1 === 0) return false

        // console.log('------------ itemSub ---------------------')
        // console.log(itemSub)
        // console.log('------------------------------------------')
        let newbasketItemAmountList = this.state.basketItemAmountList.map(item => (
            item.itemDetailId ===
                itemSub.itemDetailId ? {
                    ...item, itemAmount: item.itemAmount - 1,
                    itemPrice: item.ItemDetail.itemPrice * (item.itemAmount - 1)
                } : item
        ))
        // console.log('------------ Atualizar item na cesta (-) -----')
        // console.log(newbasketItemAmountList)
        // console.log('----------------------------------------------')

        this.state = {
            basketItemAmount: this.state.basketItemAmount,
            basketItemAmountList: newbasketItemAmountList
        }

        await AsyncStorage.setItem('userBasketItens',
            JSON.stringify(this.state.basketItemAmountList))

        this.carregarDados()
    }

    removeItemFromBasket = async (itemDelete) => {
        // console.log('------------- removeItemFromBasket ---------------------')
        // console.log(itemDelete)
        // console.log(this.state.basketItemAmountList)
        const newbasketItemAmountList =
            this.state.basketItemAmountList.filter(
                item => item.itemDetailId !== itemDelete.itemDetailId)

        this.state = {
            basketItemAmount: this.state.basketItemAmount,
            basketItemAmountList: newbasketItemAmountList
        }

        await AsyncStorage.setItem('userBasketItens',
            JSON.stringify(this.state.basketItemAmountList))

        this.carregarDados()

    }

    getOrderItensSum = () => {
        //console.log('------ getOrderSum ------')
        let sumOrder = 0
        let totalSum =
            this.state.basketItemAmountList.forEach((item, index) => {
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
            this.state.basketItemAmountList.forEach((item, index) => {
                //console.log(item.itemPrice)
                sumOrder = sumOrder + item.itemPrice
            })
        //console.log(sumOrder)
        return sumOrder + this.getDeliveryCost()
    }

    getDeliveryCost = () => {
        return 5
    }

    handleBasktItemChange = (itemDetail) => {
        this.BasketItemElement.current.changeQuantidade(1, itemDetail)
    }

    stateChange  = (changeState) => {
        //console.log(changeState)
        switch (changeState.title) {
            case 'success':
                //
                this.setState({ showCheckOut : false })
                setTimeout(() => {
                        alert(`Recebemos seu pagamento de ${currencyFormat(this.getOrderSum())}`)                    
                        this.voltarHome()
                  }, 1000);
                //
                break;
            case 'pending':
                Alert.alert("Pagamento pendente!", `Seu pagamento de ${currencyFormat(this.getOrderItensSum())} está pendente de processamento, assim que for processado seguiremos com o pedido!`)
                this.setState({ showCheckOut : false })
                break;
            case 'failure':
                Alert.alert("Pagamento não aprovado!", 'Verifique os dados e tente novamente')
                this.setState({ showCheckOut : false })
                break;
        }
    }

    voltarHome = () => {
        //
        this.addUserOrder()
        //  
        this.state = {
            basketItemAmount: 0,
            basketItemAmountList: null, 
        }
        //
        // console.log('------------------basketItemAmountList--------------------------------')
        // console.log(this.state.basketItemAmountList)
        //
        AsyncStorage.setItem('userBasketItens',
            JSON.stringify(this.state.basketItemAmountList))
        //
        this.props.navigation.navigate('Home')
            return true
        //
    }

    addUserOrder = async () => {
        const stateString = await AsyncStorage.getItem('userOrders')
        const state = JSON.parse(stateString)

        
        // console.log('---------------------------------------------')
        // console.log('--------------- addUserOrder ----------------')
        // console.log(state)
        this.setState({ userOrders: state })
        
        //console.log(this.state.userOrders)

        if(this.state.userOrders === null){
            //console.log('novo')
            let newOrderItem = []
            let qtd = newOrderItem.push({
                    orderListItens : this.state.basketItemAmountList,
                    orderItensCount : this.state.basketItemAmountList.length,
                    orderValue : currencyFormat(this.getOrderSum()),
                    orderDate : new Date()
                })
            //console.log(newOrderItem)
            this.setState({userOrders : newOrderItem})
            //console.log(this.state.userOrders)

            await AsyncStorage.setItem('userOrders',
                JSON.stringify(this.state.userOrders))
        }else{
            //console.log('mais 1')
            let newOrderItem = this.state.userOrders
            let qtd = newOrderItem.push({
                    orderListItens : this.state.basketItemAmountList,
                    orderItensCount : this.state.basketItemAmountList.length,
                    orderValue : currencyFormat(this.getOrderSum())
                })
            //console.log(newOrderItem)
            this.setState({userOrders : newOrderItem})
            //console.log(this.state.userOrders)

            await AsyncStorage.setItem('userOrders',
                JSON.stringify(this.state.userOrders))
        }
        
    }

    render() {

        const { navigate } = this.props.navigation
        
        if(this.state.showCheckOut)
        {
            return(
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <HeaderCheckout>
                        <TouchableOpacity onPress={() => this.setState({ showCheckOut : false })}><Text style={{ fontSize: 20, color: 'white' }}>{"<<"}</Text></TouchableOpacity>
                        <Title>Pagamento do pedido</Title>
                    </HeaderCheckout>
                    <WebView
                        source={{ uri: `https://3333-ea455e6e-d595-4e47-b1b5-f0603ba4e1d6.ws-us02.gitpod.io/payments/checkout/${idPagamento}/${emailPagamento}/${descricaoPagamento}/${this.getOrderSum()}` }}
                        onNavigationStateChange={state => this.stateChange(state)}
                        startInLoadingState={true}
                        renderLoading={() => <ActivityIndicator></ActivityIndicator>}
                    />
                </View>
            )
        }else
        {
            return(
                <ImageBackground source={backgroundImage}
                    style={{ width: '100%', height: '100%' }}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigate('PriceList')}>
                            <Icon name='arrow-left'
                                style={styles.menuIcon} />
                        </TouchableOpacity>
                        <Text style={styles.title}>
                            Sacola
                        </Text>
                        <BasketItensView
                            {...this.props}
                            ref={this.BasketItemElement} />
                    </View>
                    <View style={styles.storeList}>
                        <View style={styles.storeListContainer}>
                            <FlatList data={this.state.basketItemAmountList}
                                keyExtractor={item => `${item.itemDetailId}`}
                                renderItem={({ item, index }) =>
                                    <View>

                                        <View style={{
                                            backgroundColor: '#FFFFFF',
                                            marginTop: 10,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            //width: 390,
                                            height: 150,
                                            borderRadius: 30,
                                            paddingRight: 10,
                                            paddingLeft: 15,

                                        }}>
                                            <View style={{
                                                //backgroundColor: '#D11B00',
                                                //height: 130,
                                                //width: 130,
                                                //marginTop: 10,
                                                //marginLeft: 10,
                                            }}>
                                                <Image
                                                    source={item.ItemDetail.itemImage}
                                                    style={{
                                                        height: 120,
                                                        width: 120
                                                    }} />
                                            </View>
                                            <View style={{
                                                //backgroundColor: 'blue'
                                            }}>
                                                <View style={{
                                                    //backgroundColor: 'gray',
                                                    height: 60,
                                                    width: 150,
                                                    flexDirection: 'row',
                                                    alignItems: 'center'
                                                }}>
                                                    <Text style={{
                                                        fontFamily: commonStyles.fontFamilyList.Lato,
                                                        color: '#D11B00',
                                                        fontSize: 17
                                                    }}>
                                                        {item.ItemDetail.itemName}
                                                    </Text>
                                                </View>
                                                <View>
                                                    <Text
                                                        style={{
                                                            fontSize: 15,
                                                            marginBottom: 5
                                                        }}
                                                    >
                                                        {currencyFormat(item.ItemDetail.itemPrice)}
                                                    </Text>
                                                </View>
                                                <View 
                                                    style={{
                                                        //backgroundColor: 'blue'
                                                        maxWidth: 80
                                                    }}>
                                                    <ControlItemPrice
                                                        {...this.props}
                                                        onClickSub={() => this.ItemSub(item)}
                                                        onClickAdd={() => this.ItemAdd(item)}
                                                        iconSize={40}
                                                        controlMargin={10}
                                                        controlHeight={30}
                                                        controlWidth={80}
                                                        displaySize={20}
                                                        itemAmount={item.itemAmount}
                                                    />
                                                </View>
                                            </View>
                                                <View style={{
                                                    //backgroundColor: 'gray',
                                                    flexDirection: 'row',
                                                    justifyContent: 'flex-start',
                                                    height: 130,
                                                    paddingRight: 10

                                                }}>
                                                    <TouchableWithoutFeedback
                                                        onPress={() =>
                                                            this.removeItemFromBasket(item)
                                                        }>
                                                        <Icon
                                                            name='trash'
                                                            style={{
                                                                fontSize: 30,
                                                                color: '#ffa799',

                                                            }} />
                                                    </TouchableWithoutFeedback>
                                               </View>
                                        </View>
                                        {this.state.basketItemAmountList.length - 1 === index
                                            ?
                                            <View>
                                                <View style={{
                                                    backgroundColor: '#FFFFFF',
                                                    //flexDirection: 'row',
                                                    marginTop: 10,
                                                    //alignContent: 'center',
                                                    justifyContent: 'space-between',
                                                    //width: 390,
                                                    height: 130,
                                                    borderRadius: 25,
                                                    marginBottom: 10
                                                }}>
                                                    <View
                                                        style={{
                                                            flexDirection: 'row',
                                                            justifyContent: 'space-between',
                                                            marginLeft: 20,
                                                            marginTop: 10
                                                        }}>
                                                        <View>
                                                            <View style={{
                                                                flexDirection: 'row',
                                                                //width: 270,
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
                                                                width: 250,
                                                                //marginLeft: 15
                                                            }}>
                                                                <Text style={{
                                                                    fontSize: 18,
                                                                    color: 'gray'
                                                                }}>
                                                                    Av. Afonso Pena, 100 - Bloco 100, Ap. 300
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
                                                            justifyContent: 'center',
                                                            paddingRight: 15,
                                                            //backgroundColor: 'red'
                                                        }}>
                                                            <Icon name='edit'
                                                                style={{
                                                                    fontSize: 40,
                                                                    color: 'gray'
                                                                }} />
                                                        </View>
                                                    </View>
                                                </View>
                                                <View style={{
                                                    backgroundColor: '#FFFFFF',
                                                    //flexDirection: 'row',
                                                    //alignItems: 'center',
                                                    //justifyContent: 'center',
                                                    //width: 390,
                                                    maxHeight: 190,
                                                    padding: 15,
                                                    borderRadius: 25,
                                                    //marginBottom: 10,
                                                }}>
                                                    <View
                                                        style={{
                                                        }}>
                                                        <View>
                                                            <View style={{
                                                            }}>
                                                                <View style={{
                                                                    flexDirection: 'row',
                                                                    justifyContent: 'space-between',
                                                                }}>
                                                                    <Text style={{
                                                                        fontSize: 25,
                                                                        fontFamily:
                                                                            commonStyles.fontFamilyList.Lato,
                                                                    }}>
                                                                        {this.state.basketItemAmountList.length} Produto(s)
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
                                                                        {currencyFormat(this.getDeliveryCost())}
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
                                                                        Total a pagar
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
                                                            <TouchableWithoutFeedback
                                                                onPress={ () => navigate('PaymentView') }>
                                                                <View style={{
                                                                    height: 50,
                                                                    marginTop: 10,
                                                                    borderRadius: 30,
                                                                    backgroundColor: '#FCD75D',
                                                                    flexDirection: 'row',
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center'
                                                                }}>
                                                                    <Text
                                                                        style={{
                                                                            color: '#006600',
                                                                            fontSize: 15,
                                                                            fontFamily: commonStyles.fontFamilyList.Lato,
                                                                        }}>
                                                                            SELECIONAR FORMA DE PAGAMENTO
                                                                    </Text>
                                                                </View>
                                                            </TouchableWithoutFeedback>
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