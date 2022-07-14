import './Workplace.css'
import { useDispatch, useSelector } from 'react-redux'
import { changeMenu, changeCurrentOrder, changeOriginalOrder, changeCancelOrderState, changeFindOrder, changeOrders } from '../UpdateState/Actions'
import Menus from './../Menus/Types'
import { Button } from 'react-bootstrap'
import { cancelOrder } from './CancelOrder'
import Orders from './Orders'
import { ORDER_CLIENT } from '../TYPES/OrderType'
import { CancelStates } from '../TYPES/OrderStates'

export function Order(props: any) {

    let dispatch = useDispatch()

    let orders: ORDER_CLIENT[] = useSelector((state: any) => state.orders)
    let order = props.order;
    let token = useSelector( (state: any) => state.token)    
       
    let order_id: string = order.order_id
    let email: string = order.email
    let order_number: string = order.order_number
    let wms: string = order.wms
    let state: string = order.state
    
    // Botão Cancelar Order
    let cancel = async (e) => {
        // Cancelar Order
        const response = await cancelOrder(token, order);

        // refresh ao input find order
        e.target.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].children[0].children[0].value = "";

        // Casp seja cancelada com sucesso mudar o estado para cancelled e atualizar nas orders de sessao
        if(response === "success") {
            order.state = "cancelled";
            for(let i = 0; i < orders.length; i++) {
                if(orders[i].order_id.toString() === order.order_id.toString()) {
                    orders[i] = order;
                    dispatch( changeOrders( { orders: orders } ) )
                    break;
                }
            }
        }

        dispatch( changeCancelOrderState( { cancelOrder: response } ) )
        dispatch( changeFindOrder({findOrder: null}));
        dispatch( changeMenu( { menu: Menus.Workplace } ))
    }

    // Ver toda a info da order
    let goToOrderInfo = () => {
        dispatch( changeCurrentOrder( { currentOrder: order } ) )
        dispatch( changeOriginalOrder( { originalOrder: order } ) )
        dispatch( changeMenu( { menu: Menus.OrderInfo } ) )
    }

    // Caso o estado da order permita cancelar mostrar o botão de cancelar
    if(Object.values(CancelStates).includes(order.state)) {
        return ( 
            <div className="order">
                <div className="order-info">
                    <p><b>Order: </b>{order_id}</p> 
                    <p><b>Contact: </b>{email}</p>
                    <p> <b> Wms: </b>{String(wms)}</p>
                </div>
    
                <div className="order-info">
                    <p><b>Order number: </b>{order_number}</p>
                    <p className="view-more" onClick={goToOrderInfo} > View more </p>
                    <p><Button onClick={cancel}>Cancel</Button></p>
                </div>
            </div>
        ) 
    // Caso não seja possivel cancelar a order mostrar o estado e não o botão
    } else {
        return ( 
            <div className="order">
                <div className="order-info">
                    <p><b>Order: </b>{order_id}</p> 
                    <p><b>Contact: </b>{email}</p>
                    <p> <b> Wms: </b>{String(wms)}</p>
                </div>
    
                <div className="order-info">
                    <p><b>Order number: </b>{order_number}</p>
                    <p><b>State: </b>{state}</p>
                    <p className="view-more" onClick={goToOrderInfo} > View more </p>                    
                </div>
            </div>
        ) 
    }

            
}

export default Order