import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    BackHandler
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { FlatList } from 'react-native-gesture-handler'

import backgroundImage from '../../assets/imgs/BackGroundApp.png'
import commonStyles from '../commonStyles'

import Store from './Store'
import BasketItensView from './BasketItensView'



const initialState = {
    stores: []
}

export default class StoreList extends Component {

    state = {
        ...initialState
    }

    state = {
        stores: [
            {
                id: Math.random(),
                Name: 'Sacolão Jd. Europa',
                Type: 'Hortifruti',
                Delivery: 'Entrega grátis acima de R$ 50,00',
                DeliveryTime: 'Até 1 dia útil!',
                categories: [
                    { id: Math.random(), name: 'Frutas' },
                    { id: Math.random(), name: 'Legumes' },
                    { id: Math.random(), name: 'Verduras' },
                    { id: Math.random(), name: 'Outros' }
                ]
            },
            {
                id: Math.random(),
                Name: 'Rende Mais',
                Type: 'Hortifruti',
                Delivery: 'Entrega grátis acima de R$ 40,00',
                DeliveryTime: 'Até 1 dia útil!',
                categories: [
                    { id: Math.random(), name: 'Frutas' },
                    { id: Math.random(), name: 'Legumes' },
                    { id: Math.random(), name: 'Verduras' },
                    { id: Math.random(), name: 'Outros' }
                ]
            },
            {
                id: Math.random(),
                Name: 'Sacolão da Família',
                Type: 'Hortifruti',
                Delivery: 'Promoção: Frete Grátis',
                DeliveryTime: 'Até 1 dia útil!',
                categories: [
                    { id: Math.random(), name: 'Frutas' },
                    { id: Math.random(), name: 'Legumes' },
                    { id: Math.random(), name: 'Verduras' },
                    { id: Math.random(), name: 'Outros' }
                ]
            },
            {
                id: Math.random(),
                Name: 'Sacolão do Povo',
                Type: 'Hortifruti',
                Delivery: 'Entrega grátis acima de R$ 40,00',
                DeliveryTime: 'Até 1 dia útil!',
                categories: [
                    { id: Math.random(), name: 'Frutas' },
                    { id: Math.random(), name: 'Legumes' },
                    { id: Math.random(), name: 'Verduras' },
                    { id: Math.random(), name: 'Outros' }
                ]
            },
            {
                id: Math.random(),
                Name: 'Preço Bom',
                Type: 'Hortifruti',
                Delivery: 'Entrega grátis acima de R$ 40,00',
                DeliveryTime: 'Até 1 dia útil!',
                categories: [
                    { id: Math.random(), name: 'Frutas' },
                    { id: Math.random(), name: 'Legumes' },
                    { id: Math.random(), name: 'Verduras' }
                ]
            },
        ]
    }

    constructor(props) {
        super(props)
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
      }
      componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
      }
      componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
      }
      handleBackButtonClick() {
        this.props.navigation.navigate('Home');
        return true
      }

    render() {

        const { navigate } = this.props.navigation

        return (
            <View>
                <ImageBackground source={backgroundImage}
                    style={{ width: '100%', height: '100%' }}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigate('Home')}>
                            <Icon name='arrow-left'
                                style={styles.menuIcon} />
                        </TouchableOpacity>
                        <Text style={styles.title}>
                            Sacolões
                        </Text>
                        <BasketItensView 
                            {...this.props}
                            showControl={true}  />
                    </View>
                    <View style={styles.storeList}>
                        <View style={styles.storeListContainer}>
                            <FlatList data={this.state.stores}
                                keyExtractor={item => `${item.id}`}
                                renderItem={({ item }) =>
                                    <Store {...item} {...this.props} />} />
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
        marginLeft: 20
    },
    title: {
        fontFamily: commonStyles.fontFamilyList.LeckerliOneRegular,
        color: '#FFFFFF',
        fontSize: 40,
        marginRight: 20
    },
    storeList: {
        flex: 9
    },
    storeListContainer: {
        marginLeft: 10,
        marginRight: 10,
    },
    storeListItem: {
        color: '#ED9C50',
        backgroundColor: '#FCD75D',
        height: 140,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
    },
    storeImage: {
        color: '#D11B00',
        width: 120,
        height: 120,
        borderRadius: 10,
        borderColor: '#D11B00',
        borderWidth: 4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffcc',
        margin: 10,
    },
    storeDescription:
    {
        height: 130
    },
    storeListItemName: {
        color: '#D11B00',
        fontFamily: commonStyles.fontFamilyList.Lato,
        fontSize: 30,
    },
    storeListItemType: {
        color: '#000000',
        fontFamily: commonStyles.fontFamilyList.Lato,
        fontSize: 20,
    },
    storeListItemDelivery: {
        color: '#000000',
        fontFamily: commonStyles.fontFamilyList.Lato,
        fontSize: 17,
    },
    storeListItemDeliveryTime: {
        color: '#000000',
        fontSize: 17,
        marginTop: 5
    }

})