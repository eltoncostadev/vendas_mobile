import React, { Component } from 'react'
import {
    Text,
    Image,
    ImageBackground,
    StyleSheet,
    View,
    TouchableOpacity
} from 'react-native'
import { AsyncStorage } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import InformationList from '../components/InformationList'

import App from '../../App'

import backgroundImage from '../../assets/imgs/BackGroundApp.png'
import commonStyles from '../commonStyles'

export default class Home extends Component {

     render() {
        
        const { navigate } = this.props.navigation

        return (
            <ImageBackground source={backgroundImage}
                style={{ width: '100%', height: '100%' }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                        <Icon name='bars'
                            style={styles.menuIcon} />
                    </TouchableOpacity>
                    <Text style={styles.title}>
                        Feira Online
                    </Text>
                </View>
                <View style={styles.info}>
                    <TouchableOpacity onPress={() =>navigate('PriceList')}>
                        <View style={styles.listPriceButton}>
                            <Text style={styles.buttonText}>Lista de Preços</Text>
                            <Icon style={{
                                color: '#FFFFFF',
                                fontSize: 70,
                                marginRight: 15
                            }}
                                name='arrow-circle-right' />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.mainInfo}>
                        <View style={styles.mainInfoTitle}>
                            <Icon name='info-circle'
                                style={{ fontSize: 50, color: '#F70000' }} />
                            <Text style={styles.mainInfoTitleText}>
                                nformações
                            </Text>
                        </View>
                        <InformationList iconName='caret-right'
                                         text='Você não tem pedido agendado!'/>
                        <InformationList iconName='caret-right'
                                         text='Seu último pedido foi em 01/05/2020!'/>
                    </View>
                </View>
                <View style={styles.tips}>
                    <View style={styles.mainInfo}>
                        <View style={styles.mainInfoTitle}>
                            <Icon name='hashtag' 
                                style={{ fontSize: 45, color: '#F70000' }} />
                            <Text style={styles.mainInfoTitleText}>
                                Dicas
                            </Text>
                        </View>
                        <View style={{ flexDirection:'row', 
                                       justifyContent:'center',
                                       marginTop: 5,
                                       marginRight: 20,
                                       marginLeft: 20} }>
                            <Text style={{ fontFamily: 'Lato', 
                                        fontSize: 23,
                                        textAlign:'center'
                                        }}>
                                Antes de fazer seu pedido, verifique os itens faltantes,
                                assim você evita desperdício e realiza uma compra totalmente
                                sustentável!
                            </Text>
                        </View>
                    </View>
                </View>
            </ImageBackground>
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
    info: {
        flex: 5
    },
    listPriceButton: {
        backgroundColor: '#ED9C50',
        marginTop: 30,
        marginRight: 15,
        marginLeft: 15,
        height: 80,
        borderRadius: 35,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 35,
        marginLeft: 15,
        fontFamily: 'Lato'
    },
    mainInfo: {
        backgroundColor: '#EDD3AA',
        height: 220,
        borderRadius: 20,
        marginTop: 10,
        marginRight: 10,
        marginLeft: 10,
    },
    mainInfoTitle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginLeft: 10,
        marginRight: 10
    },
    mainInfoTitleText: {
        fontSize: 40,
        fontFamily: commonStyles.fontFamilyList.Lato
    },
    informationList: {
        flexDirection: 'row'
    },
    tips: {
        flex: 4,
        marginTop: 40
    }
})