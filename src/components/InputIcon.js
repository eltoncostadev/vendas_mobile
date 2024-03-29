import React from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default props => {
    return (
        <View style={styles.container}>
            <Icon name={props.icon} style={styles.icon} />
            <TextInput style={styles.input} {...props} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        backgroundColor: '#EEE',
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    icon: {
        color: '#333',
        marginLeft: 10,
        fontSize: 20,
        width: '6%'
    },
    input: {
        marginLeft: 10,
        width: '84%',
        fontFamily: 'Lato',
        fontSize: 20
    }
})