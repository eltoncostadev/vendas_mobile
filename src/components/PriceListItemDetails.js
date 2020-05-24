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

import BasketItensView from './BasketItensView'
import ControlItemPrice from './ControlItemPrice'
import backgroundImage from '../../assets/imgs/BackGroundApp.png'
import commonStyles from '../commonStyles'
import { currencyFormat } from '../common'

const { State: TextInputState } = TextInput

const initialState = {
    shift: new Animated.Value(0),
    ItemDetail: {},
    basketItens: {},
    itemAmount: 0,
    itemPrice: 0,
    basketItens: null
}

export default class PriceListItemDetails extends Component {

    state = {
        ...initialState
    }

    constructor(props) {
        super(props)
        this.state.ItemDetail = { ...this.props.navigation.state.params.ItemDetail }
        //
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this)
        //
        this.BasketItemElement = React.createRef()
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick)
        //
        this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow)
        this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide)
        //
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
        console.log('...atualizaValor...')
        console.log(this.state.itemAmount)
        var itemPrice = { ...this.itemPrice }
        itemPrice = this.state.ItemDetail.itemPrice * this.state.itemAmount
        this.setState({ itemPrice })
    }

    handleBasktItemChange = (itemDetail) =>{
        this.BasketItemElement.current.changeQuantidade(1, itemDetail)
    }

    addItemToOrder = () => {

        if (this.state.itemAmount === 0) {
            alert('Nenhum item selecionado!')
            return false
        }

        console.log('-------------------------------')
        //console.log(this.state.ItemDetail.itemName)
        console.log('-------------------------------')

        var itemDetail = {
            ItemDetail : {
                itemName: this.state.ItemDetail.itemName,
                itemPrice: this.state.ItemDetail.itemPrice,
                itemImage: this.state.ItemDetail.itemImage
            },
            itemAmount : this.state.itemAmount,
            itemPrice : this.state.itemPrice,
            itemDetailId : Math.random()
        }

        this.setState({ basketItens : itemDetail })
        console.log('-------------------------------')
        //console.log(itemDetail)
        //console.log(this.state.basketItens)
        console.log('-------------------------------')

        this.handleBasktItemChange(itemDetail)

        alert('Item incluído com sucesso!')
        //this.handleBackButtonClick()
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
                            {this.state.ItemDetail.itemName}
                        </Text>
                            <BasketItensView 
                                {...this.props} 
                                ref={this.BasketItemElement} />
                    </View>
                    <View style={styles.storeList}>
                        <View style={styles.storeListContainer}>
                            <View style={styles.imageContainer}>
                                <Image
                                    source={this.state.ItemDetail.itemImage}
                                    style={styles.imageDetail} />
                            </View>
                            <View style={styles.itemPriceContainer}>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    width: 360,
                                    marginTop: 5,
                                    marginRight: 15,
                                    marginLeft: 15,
                                    marginBottom: -10

                                }}>
                                    <Text style={{ fontSize: 40, color: '#D11B00' }}>KG</Text>
                                    <Text style={{ fontSize: 40, color: '#D11B00' }}>{currencyFormat(this.state.ItemDetail.itemPrice)}</Text>
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
                                    <ControlItemPrice 
                                        {...this.props}
                                        iconSize={80}
                                        controlHeight={40}
                                        controlWidth={200}
                                        displaySize={30}
                                        controlMargin={25}
                                        itemAmount={0}  
                                        onClickSub={() => this.setState({
                                            itemAmount: this.state.itemAmount === 0 ? 0 : this.state.itemAmount - 1
                                            },
                                            this.atualizaValor)}
                                        onClickAdd={() => this.setState({ 
                                            itemAmount: this.state.itemAmount + 1 }, 
                                            this.atualizaValor)}
                                        itemAmount={this.state.itemAmount} />
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignContent: 'center',
                                    height: 40,
                                    width: 390,
                                    paddingRight: 20,
                                    paddingLeft: 20
                                }}>
                                    <Text style={{
                                        fontFamily: commonStyles.fontFamilyList.Lato,
                                        color: '#D11B00',
                                        fontSize: 30
                                    }}>
                                        Total
                                    </Text>
                                    <Text style={{
                                        fontFamily: commonStyles.fontFamilyList.Lato,
                                        color: '#D11B00',
                                        fontSize: 30
                                    }}>
                                        {currencyFormat(this.state.itemPrice)}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.itemDescContainer}>
                                <Text style={{
                                    textAlign: 'center',
                                    color: '#D11B00',
                                    fontSize: 15,
                                    fontFamily: commonStyles.fontFamilyList.Lato,
                                    marginLeft: 10,
                                    marginRight: 10,
                                }}>
                                    O peso dos produtos pode variar em algumas gramas, e são cobrados pelo peso exato na balança, no momento da embalagem.</Text>
                            </View>
                            <TouchableWithoutFeedback onPress={this.addItemToOrder}>
                                <View style={styles.itemAddOrder}>
                                    <Text style={{
                                        textAlign: 'center',
                                        color: '#006600',
                                        fontSize: 40,
                                        fontFamily: commonStyles.fontFamilyList.LeckerliOneRegular,
                                        marginLeft: 10,
                                        marginRight: 10,
                                    }} >
                                        Incluir
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </ImageBackground>
            </Animated.View>
        )
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
        marginLeft: 15
    },
    title: {
        fontFamily: commonStyles.fontFamilyList.LeckerliOneRegular,
        color: '#FFFFFF',
        fontSize: 35,
        marginRight: 15
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
        height: 60,
        width: 390,
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemPriceContainer: {
        marginTop: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        height: 90,
        width: 390,
    },
    itemPriceControl: {
        marginTop: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        height: 150,
        width: 390,
    },
    itemAddOrder: {
        marginTop: 10,
        backgroundColor: '#FCD75D',
        borderRadius: 30,
        height: 60,
        width: 390,
    },
})

// //Voltar para refatorar o componente
// //https://codeburst.io/react-native-keyboard-covering-inputs-72a9d3072689