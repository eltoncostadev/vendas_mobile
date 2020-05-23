import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'

export default class ControlItemPrice extends Component {
    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <TouchableWithoutFeedback
                    onPress={this.props.onClickSub}>
                    <Icon style={{ fontSize: this.props.iconSize, 
                                   color: '#D11B00' }} name='minus-circle' />
                </TouchableWithoutFeedback>
                <View style={{
                    //marginTop: 25,
                    marginTop: this.props.controlMargin,
                    borderBottomWidth: 2,
                    borderBottomColor: '#D11B00',
                    height: this.props.controlHeight,
                    width: this.props.controlWidth,
                    flexDirection: 'row',
                    alignContent: 'center',
                    justifyContent: 'center'
                }}>
                    <Text style={{ fontSize: this.props.displaySize, color: '#D11B00' }}>
                        {this.props.itemAmount}
                    </Text>
                </View>
                <TouchableWithoutFeedback
                    onPress={this.props.onClickAdd}>
                    <Icon style={{ fontSize: this.props.iconSize, 
                                   color: '#D11B00' }} name='plus-circle' />
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    itemPriceControl: {
        marginTop: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        height: 150,
        width: 390,
    }
})