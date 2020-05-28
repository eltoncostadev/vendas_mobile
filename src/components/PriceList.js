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
      }

      componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
      }
      componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
      }
      handleBackButtonClick() {
        this.props.navigation.navigate('Home')
        return true
      }

    state = {
        ...initialState
    }

    state = {
        categories: [
            { id: Math.random(), name: 'Frutas' },
            { id: Math.random(), name: 'Legumes' },
            { id: Math.random(), name: 'Verduras' },
            { id: Math.random(), name: 'Outros' }
        ]
    }

    render() {

        const { navigate } = this.props.navigation

        return (
            <View>
                <ImageBackground source={backgroundImage}
                    style={{ width: '100%', height: '100%' }}>
                        <View style={styles.header}>
                            <TouchableOpacity
                                onPress={() => navigate('Home')}>
                                <Icon name='arrow-left'
                                    style={styles.menuIcon} />
                            </TouchableOpacity>
                            <Text style={styles.title}>
                                Categorias
                            </Text>
                            <BasketItensView 
                                {...this.props}
                                showControl={true}  />
                        </View>
                    <View style={styles.storeList}>
                        <View style={styles.storeListContainer}>
                            <PriceListCategories categories={this.state.categories} {...this.props}></PriceListCategories>
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
        fontSize: 30,
        marginRight: 20
    },
    storeList: {
        flex: 9
    },
    storeListContainer: {
        margin: 10,
    },
})