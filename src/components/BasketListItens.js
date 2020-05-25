import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    BackHandler,
    Image,
    FlatList
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { AsyncStorage } from 'react-native'
import BasketItensView from './BasketItensView'

import commonStyles from '../commonStyles'
import { currencyFormat } from '../common'
import backgroundImage from '../../assets/imgs/BackGroundApp.png'

import ControlItemPrice from './ControlItemPrice'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

export default class BasketListItens extends Component {

    state = {
        basketItemAmountList: []
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
        console.log('--------------------------------------------------------------')
        console.log('-- Item em memória - Cesta de Compras (componentDidMount) ----')
        console.log(this.state)
        console.log('------------- Qtd. Itens -----------------')
        console.log(this.state.basketItemAmount)
        console.log('------------------------------------------')

        if(this.state.basketItemAmount === 0)
        {
            alert('Você não possui mais itens na sacola!')
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

    state = {
        basketItemAmount: 0,
        basketItemAmountList: []
    }

    atualizaValor = () => {
        // console.log('...atualizaValor...')
        // console.log(this.state.itemAmount)
        // var itemPrice = { ...this.itemPrice }
        // itemPrice = this.state.ItemDetail.itemPrice * this.state.itemAmount
        // this.setState({ itemPrice })
    }

    ItemAdd = async (id) => {
        console.log('------------ ID --------------------------')
        console.log(id)
        console.log('------------------------------------------')
        let newbasketItemAmountList = this.state.basketItemAmountList.map(item => (
            item.itemDetailId ===
                id.itemDetailId ? {
                    ...item, itemAmount: item.itemAmount + 1
                } : item
        ))
        console.log('------------ Atualizar item na cesta (+) -----')
        console.log(newbasketItemAmountList)
        console.log('------------------------------------------')

        this.state = {
            basketItemAmount: this.state.basketItemAmount,
            basketItemAmountList: newbasketItemAmountList
        }

        await AsyncStorage.setItem('userBasketItens', 
            JSON.stringify(this.state.basketItemAmountList))

        this.carregarDados()
    }

    ItemSub = async (itemSub) => {

        if(itemSub.itemAmount - 1 === 0) return false

        console.log('------------ itemSub ---------------------')
        console.log(itemSub)
        console.log('------------------------------------------')
        let newbasketItemAmountList = this.state.basketItemAmountList.map(item => (
            item.itemDetailId ===
            itemSub.itemDetailId ? { ...item, itemAmount: item.itemAmount - 1 } : item
        ))
        console.log('------------ Atualizar item na cesta (-) -----')
        console.log(newbasketItemAmountList)
        console.log('----------------------------------------------')
        
        this.state = {
            basketItemAmount: this.state.basketItemAmount,
            basketItemAmountList: newbasketItemAmountList
        }

        await AsyncStorage.setItem('userBasketItens', 
            JSON.stringify(this.state.basketItemAmountList))

        this.carregarDados()
    }

    removeItemFromBasket = async (itemDelete) => {
        console.log('------------- removeItemFromBasket ---------------------')
        console.log(itemDelete)
        console.log(this.state.basketItemAmountList)
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

    handleBasktItemChange = (itemDetail) =>{
        this.BasketItemElement.current.changeQuantidade(1, itemDetail)
    }

    render() {

        const { navigate } = this.props.navigation
        return (
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
                        showControl={false}
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
                                        width: 390,
                                        height: 150,
                                        borderRadius: 30
                                    }}>
                                        <View style={{
                                            //backgroundColor: '#D11B00',
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
                                                //backgroundColor: 'gray',
                                                height: 60,
                                                width: 170,
                                                flexDirection: 'row',
                                                alignItems: 'center'
                                            }}>
                                                <Text style={{
                                                    //fontFamily: commonStyles.fontFamilyList.Lato,
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
                                            <ControlItemPrice
                                                {...this.props}
                                                onClickSub={() => this.ItemSub(item)}
                                                onClickAdd={() => this.ItemAdd(item)}
                                                iconSize={40}
                                                controlMargin={10}
                                                controlHeight={30}
                                                controlWidth={70}
                                                displaySize={20}
                                                itemAmount={item.itemAmount}
                                            />
                                        </View>
                                        <View style={{
                                            //backgroundColor: 'gray',
                                            height: 130,
                                            width: 60,
                                            marginTop: 10,
                                            marginLeft: 10,
                                            alignItems: 'center'
                                        }}>
                                            <TouchableWithoutFeedback
                                                onPress={()=> 
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
                                    { this.state.basketItemAmountList.length - 1 === index
                                      ?
                                        <View style={{
                                            backgroundColor: '#FFFFFF',
                                            marginTop: 10,
                                            flexDirection: 'row',
                                            width: 390,
                                            height: 100,
                                            borderRadius: 30,
                                            marginBottom: 10
                                        }}>
                                            <View>
                                                <Text>
                                                    Endereço de Entrega
                                                </Text>
                                                <Text>
                                                    Av. Afonso Pena, 1000
                                                </Text>
                                                <Text>
                                                    Centro
                                                </Text>
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