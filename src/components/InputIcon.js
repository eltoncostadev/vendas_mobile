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
        width: '80%',
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
        fontSize: 20
    },
    input: {
        marginLeft: 10,
        width: '70%',
        fontFamily: 'Lato',
        fontSize: 20
    }
})