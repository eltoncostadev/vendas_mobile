import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default props => {
    return (
        <View style={styles.informationList}>
            <Icon
                style={styles.informationListIcon}
                name={props.iconName} />
            <Text style={styles.informationListText}>
                {props.text}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    informationList: {
        marginTop: 18,
        flexDirection: 'row',
        alignItems: 'center'
    },
    informationListIcon: {
        marginLeft: 15,
        fontSize: 20
    },
    informationListText: {
        fontFamily: 'Lato',
        fontSize: 20,
        marginLeft: 10
    }
})