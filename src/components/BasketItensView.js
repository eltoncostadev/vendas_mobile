import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

import { AsyncStorage } from 'react-native'

export default class BasketItensView extends Component {

    constructor(props) {
        super(props)
    }

    state = {
        basketItemAmount: 0,
        basketItemAmountList: []
    }

    componentDidMount = async () => {
        const stateString = await AsyncStorage.getItem('userBasketItens')
        const state = JSON.parse(stateString)
        this.setState({basketItemAmountList : state})
        this.setState({ basketItemAmount : this.state.basketItemAmountList.length })
        console.log('------------------------------------------')
        console.log('---------- Item em memória ---------------')
        console.log(this.state)
        console.log('------------- Qtd. Itens -----------------')
        console.log(this.state.basketItemAmount) 
        console.log('------------------------------------------')
    }

    changeQuantidade = (itemAmountQuantity, item) => {
        let basketItemAmounUpdate = this.state.basketItemAmount
        basketItemAmounUpdate = basketItemAmounUpdate + itemAmountQuantity

        let basketItemCopy = this.state.basketItemAmountList
        let qtdItens = basketItemCopy.push(item)

        console.log('------------------------------------------')
        console.log('---------- Item incluidos ----------------')
        console.log(basketItemCopy)
        console.log('------------------------------------------')

        this.setState({ basketItemAmount: basketItemAmounUpdate })

        AsyncStorage.setItem('userBasketItens', 
            JSON.stringify(this.state.basketItemAmountList))

    }

    render() {

        const { navigate } = this.props.navigation

        return (
            <View>
                {this.state.basketItemAmount >= 1 ?

                    <TouchableWithoutFeedback 
                        style={{ margin: 10, width:50 }}
                        onPress={() => navigate('BasketListItens')}>
                        <View style={{
                            height: 50,
                            borderRadius: 25,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Icon style={{ margin: 1, color: '#D11B00', fontSize: 25 }} name='shopping-basket' />
                            <View style={{
                                backgroundColor: '#FFFFFF',
                                height: 25,
                                width: 25,
                                borderRadius: 12,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 20,
                                marginLeft: -10
                            }}>
                                <Text style={{ color: '#D11B00', fontSize: 15 }}>
                                    {this.state.basketItemAmount}
                                </Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    : null}
            </View>
        )
    }
}