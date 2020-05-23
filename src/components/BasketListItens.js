import React, { Component } from 'react'
import { StyleSheet, 
        View, 
        Text,
        ImageBackground,
        TouchableOpacity,
        BackHandler
         } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { AsyncStorage } from 'react-native'

import commonStyles from '../commonStyles'
import { currencyFormat } from '../common'
import backgroundImage from '../../assets/imgs/BackGroundApp.png'

export default class BasketListItens extends Component {

    state = {
        basketItemAmountList: []
    }
    
    constructor(props) {
        super(props)
        //
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this)
        //
    }

    componentDidMount = async () => {
        const stateString = await AsyncStorage.getItem('userBasketItens')
        const state = JSON.parse(stateString)
        this.setState({ basketItemAmountList: state })
        this.setState({ basketItemAmount: this.state.basketItemAmountList.length })
        console.log('------------------------------------------')
        console.log('-- Item em memória - Cesta de Compras ----')
        console.log(this.state)
        console.log('------------- Qtd. Itens -----------------')
        console.log(this.state.basketItemAmount)
        console.log('------------------------------------------')
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

    render() {

        const { navigate } = this.props.navigation

        const basketItens = this.state.basketItemAmountList.map(item => (
                <View style={{ backgroundColor: '#FFFFFF',
                               marginTop: 10 }}>
                    <Text> {item.ItemDetail.itemName} R$ { currencyFormat( item.ItemDetail.itemPrice ) } </Text>
                    <Text> Quantidade  {item.itemAmount} </Text>
                    <Text> Valor total do item: R$ { currencyFormat(item.itemPrice) } </Text>
                </View>
            )
        )

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
                </View>
                <View style={styles.storeList}>
                    <View style={styles.storeListContainer}>
                        {basketItens}
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