import { ORDER_CLIENT } from "../TYPES/OrderType";

// Declaração das actions 

// types of action
export const Types = {
    LOGIN: "LOGIN",
    PASSWORD: "PASSWORD",
    PASSWORD2: "PASSWORD2",
    USER: "USER",
    EMAIL: "EMAIL",
    MENU: "MENU",
    LOGOUT: "LOGOUT",
    ORDERS: "ORDERS",
    INDEX: "INDEX",
    PAGESIZE: "PAGESIZE",
    CURRENTORDER: "CURRENTORDER",
    ORIGINALORDER: "ORIGINALORDER",
    FIELDSORDER: "FIELDSORDER",
    EDITORDER: "EDITORDER", 
    FILEPRODUCTS: "FILEPRODUCTS", 
    RECEPTIONFAILED: "RECEPTIONFAILED",
    RECEPTIONSUBMITED: "RECEPTIONSUBMITED",
    RECEPTIONS: "RECEPTIONS",
    RECEPTIONINFO: "RECEPTIONINFO",
    FINDORDER: "FINDORDER",
    CANCELORDERSTATE: "CANCELORDERSTATE",
    FILTERSTATEORDER: "FILTERSTATEORDER"
};

// Actions para mudar o valor das variáveis globais

export const newLogin = (value: {token: string})  => ({
    type: Types.LOGIN,
    payload: value
  });
  

export const changePassword = (value: {password: string}) => ({
    type: Types.PASSWORD,
    payload: value
})

export const changePassword2 = (value: {password2: string }) => ({
    type: Types.PASSWORD2,
    payload: value
})

export const changeUser = (value: {user: string}) => ({
    type: Types.USER,
    payload: value
})

export const changeEmail = (value: {email: string}) => ({
    type: Types.EMAIL,
    payload: value
})

export const changeMenu = (value: {menu: string} ) => ({
    type: Types.MENU,
    payload: value
})

export const logOut = () => ({
    type: Types.LOGOUT,
    payload: {}
})

export const changeOrders = (value: {orders: any[]}) => ({
    type: Types.ORDERS,
    payload: value
})

export const changeIndex = (value: {index: number}) => ({
    type: Types.INDEX,
    payload: value
})

export const changePageSize = (value: {pagesize: number}) => ({
    type: Types.PAGESIZE,
    payload: value
})

export const changeCurrentOrder = (value: {currentOrder: any}) => ({
    type: Types.CURRENTORDER,
    payload: value
})

export const changeOriginalOrder = (value: {originalOrder: any}) => ({
    type: Types.ORIGINALORDER,
    payload: value
})

export const changeFieldsOrder = (value: {fieldsOrder: any}) => ({
    type: Types.FIELDSORDER,
    payload: value
})

export const changeFileProducts = (value: {fileProducts: any}) => ({
    type: Types.FILEPRODUCTS,
    payload: value
})

export const changeReceptionFailed = (value: {productsWithError: any}) => ({
    type: Types.RECEPTIONFAILED,
    payload: value
})

export const changeReceptionSubmited = (value: {receptionsubmited: any}) => ({
    type: Types.RECEPTIONSUBMITED,
    payload: value
})

export const changeReceptions = (value: {receptions: any}) => ({
    type: Types.RECEPTIONS,
    payload: value
})

export const changeReceptionInfo = (value: {receptionInfo: any}) => ({
    type: Types.RECEPTIONINFO,
    payload: value
})

export const changeFindOrder = (value: {findOrder: any}) => ({
    type: Types.FINDORDER,
    payload: value
})

export const changeCancelOrderState = (value: {cancelOrder: any}) => ({
    type: Types.CANCELORDERSTATE,
    payload: value
})

export const editOrder = (value: {edit: boolean}) => ({
    type: Types.EDITORDER,
    payload: value
})

export const changefilterStateOrder = (value: {filterStateOrder: string}) => ({
    type: Types.FILTERSTATEORDER,
    payload: value
})


