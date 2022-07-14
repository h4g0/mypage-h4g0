import { Types } from './Actions'
import Menus from '../Menus/Types'


// Declaração das variáveis globais e dos respetivos set's 

const default_state: any = {
    user: '', 
    password: '',
    password2: '',
    menu: Menus.CreateAccount,
    email: '',
    token: '',
    orders: [],
    index: 0,
    pagesize: 9,
    currentOrder: null,
    originalOrder: null, 
    fieldsOrder: [], 
    fileProducts: null,
    productsWithError: null,
    receptionsubmited: [],
    receptions: null, 
    receptionInfo: null, 
    findOrder: null,
    cancelOrder: "",
    filterStateOrder: ""
}

export const loginReducer = function (state = default_state , action: any) {
    var new_state: any = { ...state }

    switch ( action.type ) {
        case Types.LOGIN: 
            //console.log(action)
            new_state.token = action.payload.token
            return new_state;
        case Types.MENU: 
            new_state.menu = action.payload.menu
            return new_state
        case Types.PASSWORD:
            new_state.password = action.payload.password
            return new_state
        case Types.EMAIL:
            new_state.email = action.payload.email
            return new_state
        case Types.USER:
            new_state.user = action.payload.user
            return new_state
        case Types.PASSWORD2:
            new_state.password2 = action.payload.password2
            return new_state
        case Types.ORDERS:
            new_state.orders = action.payload.orders
            new_state.index = default_state.index
            new_state.pagesize = default_state.pagesize
            return new_state
        case Types.INDEX:
            new_state.index = Math.max(0,Math.min(action.payload.index,state.orders.length - state.pagesize))
            return new_state
        case Types.PAGESIZE:
            new_state.pagasize = action.payload.pagesize
            return new_state
        case Types.CURRENTORDER:
            new_state.currentOrder = action.payload.currentOrder
            return new_state
        case Types.ORIGINALORDER:
            new_state.originalOrder = action.payload.originalOrder
            return new_state
        case Types.EDITORDER:
            new_state.edit = action.payload.edit
            return new_state
        case Types.FIELDSORDER:
            new_state.fieldsOrder = action.payload.fieldsOrder
            return new_state
        case Types.FILEPRODUCTS:
            new_state.fileProducts = action.payload.fileProducts
            return new_state
        case Types.RECEPTIONFAILED:
            new_state.productsWithError = action.payload.productsWithError
            return new_state
        case Types.RECEPTIONSUBMITED:
            new_state.receptionsubmited = action.payload.receptionsubmited
            return new_state
        case Types.RECEPTIONS:
            new_state.receptions = action.payload.receptions
            return new_state
        case Types.RECEPTIONINFO:
            new_state.receptionInfo = action.payload.receptionInfo
            return new_state
        case Types.FINDORDER:
            new_state.findOrder = action.payload.findOrder
            return new_state
        case Types.CANCELORDERSTATE:
            new_state.cancelOrder = action.payload.cancelOrder
            return new_state
        case Types.FILTERSTATEORDER:
            new_state.filterStateOrder = action.payload.filterStateOrder
            return new_state
        case Types.LOGOUT:
            return { ...default_state}
        default: 
            return state;
    } 

}