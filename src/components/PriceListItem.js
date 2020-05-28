import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    BackHandler,
    FlatList,
    Image
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'
import commonStyles from '../commonStyles'
import { currencyFormat } from '../common'

export default class PriceListItem extends Component {

    render() {

        const { navigate } = this.props.navigation

        return (
            <TouchableOpacity 
                onPress={() => navigate('PriceListItemDetails',
                                        {ItemDetail : this.props})
                }>
                <View style={styles.categoryItem}>
                    <View style={{
                        backgroundColor: "#FFFFFF",
                        height: 80,
                        width: 90,
                        marginLeft: 10,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10
                    }}>
                        <Image source={this.props.itemImage}
                            style={
                                {
                                    height: 80,
                                    width: 85,
                                }
                            } />
                    </View>
                    <View style={{ marginLeft: 10 }}>
                        <Text style={styles.categoryItemName}> { this.props.itemName } </Text>
                        <Text style={styles.categoryItemPrice}> { currencyFormat(this.props.itemPrice) } </Text>
                    </View>
                    <Icon style={styles.categoryItemNameIcon} name='angle-right' />
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
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
        fontSize: 20,
        color: '#D11B00',
        fontFamily: commonStyles.fontFamilyList.Lato,
    },
    categoryItemPrice: {
        fontSize: 15,
        color: '#D11B00',
        fontFamily: commonStyles.fontFamilyList.Lato,
        marginLeft: 10
    },
    categoryItemNameIcon: {
        fontSize: 50,
        color: '#D11B00',
        paddingRight: 30
    }
})

