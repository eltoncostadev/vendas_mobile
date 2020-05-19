import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    BackHandler 
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import backgroundImage from '../../assets/imgs/BackGroundApp.png'

import commonStyles from '../commonStyles'

export default class StoreList extends Component {

    constructor(props) {
        super(props)
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    // componentWillMount() {
    //     BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    // }
    
    // componentWillUnmount() {
    //     BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
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
                            Lojas
                        </Text>
                    </View>
                    <View style={styles.storeList}>
                        <Text>
                            Lista de Lojas
                        </Text>
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
    }
})