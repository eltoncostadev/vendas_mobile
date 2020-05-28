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
        this.props.navigation.navigate('PriceList');
        return true
      }

    render() {

        const { navigate } = this.props.navigation

        return (
            <TouchableOpacity 
            onPress={() => navigate('PriceListItens', 
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
        marginBottom: 10,
        height: 70,
        borderRadius: 15
    },
    categoryItemName: {
        fontSize: 35,
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