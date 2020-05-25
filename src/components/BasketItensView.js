import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import {NavigationEvents} from 'react-navigation'

import { AsyncStorage } from 'react-native'


const initialState = {
    basketItemAmount: 0,
    basketItemList: []
}

export default class BasketItensView extends Component {

    state = {
        ...initialState
    }

    componentDidMount = async () => {

        // console.log('** componentDidMount **')

        // const stateString = await AsyncStorage.getItem('userBasketItens')
        // const state = JSON.parse(stateString)
        
        // console.log('------------------------------------------')
        // console.log(stateString)
        // this.setState({ basketItemList : state })

        // if(this.state.basketItemList && this.state.basketItemList.length > 0 ){
        //     this.setState({ basketItemAmount : this.state.basketItemList.length })
        //     console.log('------------------------------------------')
        //     console.log('---------- Item em memória ----------------')
        //     console.log(this.state)
        //     console.log(this.state.basketItemList.length)
        //     console.log(this.state.basketItemAmount)
        //     console.log('------------------------------------------')
        // }
    }
    

    changeQuantidade = async  (itemAmountQuantity, item) => {

        let basketItemAmounUpdate = this.state.basketItemAmount
        basketItemAmounUpdate = basketItemAmounUpdate + itemAmountQuantity

        const basketItemCopy = this.state.basketItemList === null ? [] : this.state.basketItemList
        const qtdItens = basketItemCopy.push(item)

        console.log(qtdItens)

        //this.setState({ basketItemAmount : basketItemAmounUpdate })
        
        this.state = {
            basketItemAmount : basketItemAmounUpdate,
            basketItemList : basketItemCopy
        }
        console.log('---------- Novo state --------------------')
        console.log(this.state)
        console.log(this.state.basketItemAmount)
        this.setState({ basketItemAmount : this.state.basketItemAmount }) 

        // console.log('------------------------------------------')
        // console.log('---------- Item incluidos ----------------')
        // console.log(basketItemCopy)
        // console.log(basketItemCopy.length)
        // console.log('------------------------------------------')
        // console.log(this.state.basketItemList)
        // console.log('------------------------------------------')
        // console.log('---------- Nova quantidade ---------------')
        // console.log(this.state.basketItemAmount)
        // console.log(basketItemAmounUpdate)
        // console.log('------------------------------------------')

        if(this.state.basketItemList && this.state.basketItemAmount > 0){
             await AsyncStorage.setItem('userBasketItens', 
                JSON.stringify(this.state.basketItemList))
        }else
             await AsyncStorage.setItem('userBasketItens', 
                JSON.stringify(basketItemCopy))

        
    }

    recarregarDados = async () => {

        const stateString = await AsyncStorage.getItem('userBasketItens')
        const state = JSON.parse(stateString)
        
        console.log('-------------- TESTE ------------------------')
        console.log(stateString)
        this.setState({ basketItemList : state })

        if(this.state.basketItemList && this.state.basketItemList.length > 0 ){
            this.setState({ basketItemAmount : this.state.basketItemList.length })
            console.log('------------------------------------------')
            console.log('---------- Item em memória ----------------')
            console.log(this.state)
            console.log(this.state.basketItemList.length)
            console.log(this.state.basketItemAmount)
            console.log('------------------------------------------')
        }

    }

    render() {

        const { navigate } = this.props.navigation

        return (
            <View>
                <NavigationEvents onWillFocus={() => this.recarregarDados() } />
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

//problema da atualização resolvido no post abaixo
//https://stackoverflow.com/questions/48018084/componentdidmount-function-is-not-called-after-navigation