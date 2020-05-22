import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    TouchableWithoutFeedback,
    BackHandler,
    Image,
    TextInput,
    Keyboard,
    Animated,
    Dimensions,
    UIManager
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'

import backgroundImage from '../../assets/imgs/BackGroundApp.png'
import commonStyles from '../commonStyles'

const { State: TextInputState } = TextInput;

export default class PriceListItemDetails extends Component {

    constructor(props) {
        super(props)
        state.ItemDetail = { ...this.props.navigation.state.params.ItemDetail }
        //
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this)
    }

    state = {
        shift: new Animated.Value(0),
        ItemDetail : {
            itemName : '',
            itemPrice : 0
        },
        itemAmount : 0
    };

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick)
        //
        this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow)
        this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick)
        //
        this.keyboardDidShowSub.remove();
        this.keyboardDidHideSub.remove();
    }

    handleBackButtonClick() {
        this.props.navigation.navigate('PriceListItens')
        return true
    }

    handleKeyboardDidShow = (event) => {
        const { height: windowHeight } = Dimensions.get('window');
        const keyboardHeight = event.endCoordinates.height + 30;
        const currentlyFocusedField = TextInputState.currentlyFocusedField();
        UIManager.measure(currentlyFocusedField, (originX, originY, width, height, pageX, pageY) => {
            const fieldHeight = height;
            const fieldTop = pageY;
            const gap = (windowHeight - keyboardHeight) - (fieldTop + fieldHeight);
            if (gap >= 0) {
                return;
            }
            Animated.timing(
                this.state.shift,
                {
                    toValue: gap,
                    duration: 1000,
                    useNativeDriver: true,
                }
            ).start();
        });
    }

    handleKeyboardDidHide = () => {
        Animated.timing(
            this.state.shift,
            {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            }
        ).start();
    }

    atualizaValor = () => {
        
    }

    render() {
        const { shift } = this.state
        const { navigate } = this.props.navigation
        
        return (
            <Animated.View style={[styles.container, { transform: [{ translateY: shift }] }]}>
                <ImageBackground source={backgroundImage}
                    style={{ width: '100%', height: '100%' }}>

                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigate('PriceListItens')}>
                            <Icon name='arrow-left'
                                style={styles.menuIcon} />
                        </TouchableOpacity>
                        <Text style={styles.title}>
                            {state.ItemDetail.itemName}
                        </Text>
                    </View>
                    <View style={styles.storeList}>
                        <View style={styles.storeListContainer}>
                            <View style={styles.imageContainer}>
                                <Image
                                    source={state.ItemDetail.itemImage}
                                    style={styles.imageDetail} />
                            </View>
                            <View style={styles.itemDescContainer}>
                                <Text style={{
                                    textAlign: 'center',
                                    color: '#D11B00',
                                    fontSize: 20,
                                    fontFamily: commonStyles.fontFamilyList.Lato,
                                    marginLeft: 5,
                                    marginRight: 5,
                                }}>
                                    O peso dos produtos pode variar em algumas gramas, e são cobrados pelo peso exato na balança, no momento da embalagem.</Text>
                            </View>
                            <View style={styles.itemPriceContainer}>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    width: 360,
                                    marginTop: 5,
                                    marginRight: 15,
                                    marginLeft: 15

                                }}>
                                    <Text style={{ fontSize: 40, color: '#D11B00' }}>KG</Text>
                                    <Text style={{ fontSize: 40, color: '#D11B00' }}>{state.ItemDetail.itemPrice}</Text>
                                </View>
                                <TextInput style={{ fontSize: 15, color: '#D11B00', marginLeft: 15 }} placeholder='Observações' />
                            </View>
                            <View style={styles.itemPriceControl}>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    width: 390,

                                    marginTop: 10,
                                    paddingRight: 20,
                                    paddingLeft: 20

                                }}>
                                    <TouchableWithoutFeedback onPress={
                                            () =>this.setState({itemAmount: this.state.itemAmount === 0 ? 0: this.state.itemAmount - 1 }) }>
                                        <Icon style={{ fontSize: 80, color: '#D11B00'  }} name='minus-circle' />
                                    </TouchableWithoutFeedback>
                                    <View style={{ marginTop: 25, 
                                                   borderBottomWidth: 2, 
                                                   borderBottomColor: '#D11B00',
                                                   height: 40, 
                                                   width: 200, 
                                                   flexDirection: 'row', 
                                                   alignContent: 'center', 
                                                   justifyContent:'center' }}>
                                        <Text style={{ fontSize: 30, color: '#D11B00'  }}>
                                           {this.state.itemAmount}
                                        </Text>
                                    </View>
                                    <TouchableWithoutFeedback onPress={
                                            ()=> this.setState({itemAmount: this.state.itemAmount + 1}, this.atualizaValor()) }>
                                        <Icon style={{ fontSize: 80, color: '#D11B00'  }} name='plus-circle' /> 
                                    </TouchableWithoutFeedback>
                                </View>
                                <View>
                                    <Text>
                                        Total
                                        </Text>
                                    <Text>
                                        R$ {state.ItemDetail.itemPrice}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>

                </ImageBackground>
            </Animated.View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'gray',
        flex: 1,
        height: '100%',
        justifyContent: 'space-around',
        left: 0,
        position: 'absolute',
        top: 0,
        width: '100%'
    },
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
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10
    },
    imageContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        height: 170,
        width: 390,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center'
    },
    imageDetail: {
        height: 180,
        width: 180,
    },
    itemDescContainer: {
        marginTop: 10,
        backgroundColor: '#FCD75D',
        borderRadius: 15,
        height: 110,
        width: 390,
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemPriceContainer: {
        marginTop: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        height: 110,
        width: 390,
    },
    itemPriceControl: {
        marginTop: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        height: 150,
        width: 390,
    },
})

//Voltar para refatorar o componente
//https://codeburst.io/react-native-keyboard-covering-inputs-72a9d3072689