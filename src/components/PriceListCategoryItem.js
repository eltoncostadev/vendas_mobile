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
import commonStyles from '../commonStyles'

export default class PriceListCategoryItem extends Component {

    render() {
        return (
            <TouchableOpacity 
            onPress={() => 
                    this.props.navigation.navigate('PriceListItens', 
                                                   {...this.props})}>
                <View style={styles.categoryItem}>
                    <Text style={ styles.categoryItemName }>{this.props.name}</Text>
                    <Icon style={ styles.categoryItemNameIcon } name='angle-right' />
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    categoryItem: { 
        backgroundColor:'#FCD75D', 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        height: 100,
        borderRadius: 15
    },
    categoryItemName: {
        fontSize: 50,
        color: '#D11B00',
        fontFamily: commonStyles.fontFamilyList.Lato,
        marginLeft: 15
    },
    categoryItemNameIcon: {
        fontSize: 50,
        color: '#D11B00',
        marginRight: 15
    }
})