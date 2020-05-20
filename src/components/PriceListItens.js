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

export default class PriceListItens extends Component {

    constructor(props) {
        super(props)

        state = this.props.navigation.state.params.categories
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    handleBackButtonClick() {

       console.log('Retornando para PriceList')
        if (this.props.navigation && this.props.navigation.goBack) {
            this.props.navigation.navigate('PriceList')
            return true
        } else {
            console.log('Vazio!')
            return false
        }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick)
        console.log(this.props.navigation.state)
    }

    // componentWillUnmount() {
    //     BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick)
    // }

    render() {
        return (
            <View>
                <ImageBackground source={backgroundImage}
                    style={{ width: '100%', height: '100%' }}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => this.handleBackButtonClick()}>
                            <Icon name='arrow-left'
                                style={styles.menuIcon} />
                        </TouchableOpacity>
                        <Text style={styles.title}>
                            Frutas
                        </Text>
                    </View>
                    <View style={styles.storeList}>
                        <View style={styles.storeListContainer}>
                            <TouchableOpacity>
                                <View style={styles.categoryItem}>
                                    <Text style={styles.categoryItemName}>Banana Prata</Text>
                                    <Icon style={styles.categoryItemNameIcon} name='angle-right' />
                                </View>
                            </TouchableOpacity>
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
    categoryItem: {
        backgroundColor: '#FCD75D',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
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

