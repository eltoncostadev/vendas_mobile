import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import commonStyles from '../commonStyles'

export default class Store extends Component {

    render() {
        return (
            <TouchableOpacity onPress={
                () => this.props.navigation.navigate('PriceList', 
                        {categories: this.props.categories, 
                        navigation: this.props.navigation})}>
                <View style={styles.storeListItem}>
                    <View style={styles.storeImage}>
                        <Icon name='image'
                            style={{
                                fontSize: 30,
                                color: '#D11B00'
                            }} />
                        <Text style={{ color: '#D11B00' }}> Sem imagem </Text>
                    </View>
                    <View style={styles.storeDescription}>
                        <Text style={styles.storeListItemName}>
                            {this.props.Name}
                        </Text>
                        <Text style={styles.storeListItemType}>
                            {this.props.Type}
                        </Text>
                        <Text style={styles.storeListItemDelivery}>
                            {this.props.Delivery}
                        </Text>
                        <Text style={styles.storeListItemDeliveryTime}>
                            <Icon name='history' style={{ fontSize: 20 }} /> {this.props.DeliveryTime}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
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