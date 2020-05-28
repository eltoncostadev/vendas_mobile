import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    BackHandler,
    FlatList
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'

import backgroundImage from '../../assets/imgs/BackGroundApp.png'
import imgBanana from '../../assets/imgs/Banana.png'
import imgBananaTerra from '../../assets/imgs/BananaTerra.png'
import imgMaca from '../../assets/imgs/Maca.png'
import imgPera from '../../assets/imgs/Pera.png'
import imgUva from '../../assets/imgs/Uva.png'
import imgAbacaxi from '../../assets/imgs/Abacaxi.png'
import commonStyles from '../commonStyles'

import PriceListItem from './PriceListItem'
import BasketItensView from './BasketItensView'

const initialState = {
    fruits: []
}

export default class PriceListItens extends Component {

    state = {
        ...initialState
    }

    constructor(props) {
        super(props)
        //
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this)
        //
        console.log('-------------------------------------------')
        console.log('-------------- Price List Itens -----------')
        console.log(this.props)
        console.log('-------------------------------------------')
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick)
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick)
    }
    handleBackButtonClick() {
        this.props.navigation.navigate('PriceList')
        return true
    }

    state = {
        fruits: [
            {
                id: Math.random(),
                itemName: 'Banana Maçã',
                itemPrice: 4.50,
                itemImage: imgBanana
            },
            {
                id: Math.random(),
                itemName: 'Banana da Terra',
                itemPrice: 4.50,
                itemImage: imgBananaTerra,
            },
            {
                id: Math.random(),
                itemName: 'Maçã Argentina',
                itemPrice: 12.50,
                itemImage: imgMaca
            },
            {
                id: Math.random(),
                itemName: 'Pera Williams com nome grande',
                itemPrice: 3.50,
                itemImage: imgPera
            },
            {
                id: Math.random(),
                itemName: 'Uva Crimson',
                itemPrice: 14.50,
                itemImage: imgUva
            },
            {
                id: Math.random(),
                itemName: 'Abacaxi',
                itemPrice: 4.60,
                itemImage: imgAbacaxi
            }

        ]
    }

    render() {

        const { navigate } = this.props.navigation

        return (
            <View>
                <ImageBackground source={backgroundImage}
                    style={{ width: '100%', height: '100%' }}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigate('PriceList')}>
                            <Icon name='arrow-left'
                                style={styles.menuIcon} />
                        </TouchableOpacity>
                        <Text style={styles.title}>
                            {this.props.navigation.state.params.name}
                        </Text>
                        <BasketItensView 
                            {...this.props} 
                            showControl={true} />
                    </View>
                    <View style={styles.storeList}>
                        <View style={styles.storeListContainer}>
                        <FlatList data={this.state.fruits}
                            keyExtractor={item => `${item.id}`}
                            renderItem={({ item }) =>
                                <PriceListItem {...item} {...this.props}/>} />
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
})

