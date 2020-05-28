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

import PriceListCategoryItem from './PriceListCategoryItem'
import commonStyles from '../commonStyles'

export default class PriceListCategories extends Component {

    render() {
        return (
            <View>
                <FlatList data={this.props.categories}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item }) =>
                        <PriceListCategoryItem 
                        {...item} 
                        {...this.props}
                        showControl={true} />} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
})