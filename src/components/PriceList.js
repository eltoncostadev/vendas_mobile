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

import BasketItensView from './BasketItensView'
import PriceListCategories from './PriceListCategories'

const initialState = {
    categories: []
}

export default class PriceList extends Component {

    constructor(props) {
        super(props)
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        //
        state = 
            typeof this.props.navigation.state.params === 'undefined' ? 
                this.handleBackButtonClick() :
                this.props.navigation.state.params.categories

      }

      componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
      }
      componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
      }
      handleBackButtonClick() {
        this.props.navigation.navigate('StoreList')
        return true
      }

    state = {
        ...initialState
    }

    render() {

        const { navigate } = this.props.navigation

        return (
            <View>
                <ImageBackground source={backgroundImage}
                    style={{ width: '100%', height: '100%' }}>
                    <View style={styles.header}>
                        <TouchableOpacity
                            onPress={() => navigate('StoreList')}>
                            <Icon name='arrow-left'
                                style={styles.menuIcon} />
                        </TouchableOpacity>
                        <Text style={styles.title}>
                            Lista de Preço
                        </Text>
                        <BasketItensView {...this.props}  />
                    </View>
                    <View style={styles.storeList}>
                        <View style={styles.storeListContainer}>
                            <PriceListCategories categories={state} {...this.props}></PriceListCategories>
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
        margin: 10,
    },
    storeListItem: {
        color: '#ED9C50',
        backgroundColor: '#FCD75D',
        height: 140,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        marginTop: 15,
        borderRadius: 12
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