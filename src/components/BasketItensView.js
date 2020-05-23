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
        basketItemList: []
    }

    componentDidMount = async () => {
        const stateString = await AsyncStorage.getItem('userBasketItens')
        const state = JSON.parse(stateString)
        
        console.log('------------------------------------------')
        console.log(stateString)

        this.setState({ basketItemList : state })
        console.log('------------------------------------------')
        console.log('---------- Item em memória ----------------')
        console.log(this.state)
        console.log('------------------------------------------')
    }

    changeQuantidade = (itemAmountQuantity, item) => {

        let basketItemAmounUpdate = this.state.basketItemAmount
        basketItemAmounUpdate = basketItemAmounUpdate + itemAmountQuantity

        const basketItemCopy = this.state.basketItemList === null ? [] : this.state.basketItemList
        const qtdItens = basketItemCopy.push(item)

        console.log(qtdItens)

        this.setState({ basketItemAmount : basketItemAmounUpdate })
        this.setState({ basketItemList : basketItemCopy })

        console.log('------------------------------------------')
        console.log('---------- Item incluidos ----------------')
        console.log(basketItemCopy)
        console.log(basketItemCopy.length)
        console.log('------------------------------------------')
        console.log(this.state.basketItemList)
        //console.log(this.state.basketItemList.length)
        console.log('------------------------------------------')

        AsyncStorage.setItem('userBasketItens', 
            JSON.stringify(this.state.basketItemList))

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