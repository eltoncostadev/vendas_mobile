import { Alert, Platform } from 'react-native'

// const server = Platform.OS === 'ios' ?
//     'http://localhost:3000' : 'http://10.0.2.2:3000'

const server = 'http://10.0.2.2:3000'

const singleListMode = false

function showError(err) {
    Alert.alert('Ops! Ocorreu um Problema!', `Mensagem: ${err}`)
}

function currencyFormat(num){ return 'R$ ' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, 'R$ 0,')}


export { server, showError, singleListMode, currencyFormat }