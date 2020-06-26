import React, { useEffect, useState } from 'react'
import {View,
    Dimensions, 
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Text,
    Animated,
    Keyboard,
} from 'react-native'

import commonStyles from '../commonStyles'
import Icon from 'react-native-vector-icons/FontAwesome'

const { width } = Dimensions.get('window')

export default function Password(props) {

    const [offset] = useState(new Animated.ValueXY({x : 0, y : 80}))

    useEffect(()=> {
        Animated.spring(offset.y, { toValue : 0 , speed : 1 }).start()
        //
        keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow)
    },[])

    function keyboardDidShow()
    {
        alert('Teclado aberto!')
    }

    return(
        <Animated.View style={
            [
                {
                    position: 'absolute',
                    top: '45%',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    backgroundColor: '#FFFFFF',
                    width: width,
                    height: '55%'
                },
                {
                    transform : [
                        {
                            translateY: offset.y
                        }
                    ]
                }
            ]
        }>
            <View
                style={{
                    padding: 10,
                    margin: 5,
                }}
            >
                <View
                    style={styles.input}>
                    <TextInput
                        placeholder='Senha atual'
                        style={styles.inputText}
                        secureTextEntry={true} />
                    <Icon name='eye-slash'
                        style={styles.iconInput} />
                </View>
                <View
                    style={styles.input}>
                    <TextInput
                        placeholder='Nova senha'
                        style={styles.inputText}
                        secureTextEntry={true} />
                    <Icon name='eye-slash'
                        style={styles.iconInput} />
                </View>
                <View
                    style={styles.input}>
                    <TextInput
                        placeholder='Confirme a nova senha'
                        style={styles.inputText}
                        secureTextEntry={true} />
                    <Icon name='eye-slash'
                        style={styles.iconInput} />
                </View>
                <TouchableOpacity
                    onPress={props.onPassWordHide}
                >
                    <View
                        style={{
                            backgroundColor: '#caceca',
                            alignItems: 'center',
                            marginTop: 10,
                            padding: 10,
                            borderRadius: 30
                        }}>
                        <Text
                            style={{
                                fontFamily:
                                    commonStyles.fontFamilyList.Lato,
                                fontSize: 20,
                            }}>
                            ALTERAR SENHA
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={props.onPassWordHide}
                    >
                    <View style={{
                        marginTop: 20,
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            fontSize: 20,
                            fontFamily:
                                commonStyles.fontFamilyList.Lato
                        }}>
                            Cancelar
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    header: commonStyles.header,
    menuIcon: {
        color: '#FFFFFF',
        fontSize: 30,
        marginLeft: 15
    },
    title: {
        fontFamily: commonStyles.fontFamilyList.LeckerliOneRegular,
        color: '#FFFFFF',
        fontSize: 35,
        marginRight: 15
    },
    input: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: '#caceca',
        backgroundColor: 'rgba(242, 242, 242, 0.8)',
        borderWidth: 2,
        marginTop: 10,
        borderRadius: 10
    },
    inputText: {
        fontSize: 18,
        //color: '#626a62'
    },
    inputTextDisabled: {
        fontSize: 18,
        color: '#a2a9a2'
    },
    iconInput: {
        fontSize: 20,
        color: '#caceca',
        paddingRight: 15,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        opacity: 0.5,
        backgroundColor: 'black',
        width: width,
        height: '50%',
    }
})