import './Workplace.css'
import { useSelector,useDispatch } from 'react-redux'
import { changeOrders, changeIndex, changeFindOrder, changeMenu, changeCancelOrderState, changefilterStateOrder } from '../UpdateState/Actions'
import Menus from './../Menus/Types'
import Order from './Order'
import { getOrders } from './GetOrders'
import { Alert, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ORDER_CLIENT } from '../TYPES/OrderType'
import { OrderStates } from '../TYPES/OrderStates'

export function Orders(props: any) {
           
    let dispatch = useDispatch()
    let token: any = useSelector((state: any) => state.token)
    let orders: ORDER_CLIENT[] = useSelector((state: any) => state.orders)
    let pagesize: any = useSelector((state: any) => state.pagesize)
    let index: any = useSelector((state: any) => state.index)
    let findOrder: any = useSelector((state: any) => state.findOrder)
    let cancelOrderState = useSelector( (state: any) => state.cancelOrder)
    let filterStateOrder = useSelector( (state: any) => state.filterStateOrder)

    let menu: any = useSelector((state: any) => state.menu)

    if (menu !== Menus.Workplace) return null

    // Botão refresh - reset aos filtros e variaveis
    let refresh = (e) => {
        // remover alert
        dispatch( changeCancelOrderState( { cancelOrder: "" } ) )
        dispatch(changefilterStateOrder({filterStateOrder: ""}));

        updateOrders();
        dispatch( changeFindOrder({findOrder: null}));
        e.target.parentElement.children[0].value = "";
        e.target.parentElement.children[3].value = "";
        dispatch( changeMenu( { menu: Menus.Workplace } ))
    }

    // Atualizar dados das orders a apresentar
    let updateOrders = async () => {

        // remover alert
        dispatch( changeCancelOrderState( { cancelOrder: "" } ) )
        dispatch(changefilterStateOrder({filterStateOrder: ""}));

        let new_orders: ORDER_CLIENT[] =  await getOrders(token)
        
        dispatch( changeOrders({orders: new_orders}))
        
    }
    
    // Quando carrega a pagina se não exstir orders na sessao vamos carregar do back-end
    if(orders.length === 0) updateOrders()

    // Atualizar a paginação
    let updateIndex = async (increase: boolean) => {
        let change: number = increase ? pagesize : (-1 * pagesize)
        dispatch( changeIndex( { index: index + change } ) )
    }

    // Incrementar a paginação
    let increaseIndex = async () => {
        // remover alert
        dispatch( changeCancelOrderState( { cancelOrder: "" } ) )

        updateIndex(true)
    }

    // Decrementar a paginação
    let decreaseIndex = async () => {
        // remover alert
        dispatch( changeCancelOrderState( { cancelOrder: "" } ) )

        updateIndex(false)
    }

    // Pesquisar order por order id
    const findorder = (e) => {
        // remover alert
        dispatch( changeCancelOrderState( { cancelOrder: "" } ) )

        let value = e.target.parentElement.children[0].value;

        if(/^\d+$/.test(value) === true) {
            dispatch( changeFindOrder({findOrder: value}));
            dispatch( changeMenu( { menu: Menus.Workplace } ))
        } else {
            e.target.parentElement.children[0].value = "";
        }
    }

    // Filtrar as orders por estado
    const filterState = (e) => {
        dispatch(changefilterStateOrder({filterStateOrder: e.target.value}));    
    }

    // Caso exista pesquisa de order por order id
    if(findOrder !== null) {
        return (
            <div>
                <Form>
                    <Form.Group className="SearchForm">
                        <Form.Control type="text" placeholder="Find orders" defaultValue={findOrder}></Form.Control>
                        <Button onClickCapture={findorder}>Search</Button>
                        <Button onClickCapture={refresh}>Refresh</Button>

                        <Form.Select aria-label="Default select example" onChange={filterState}>
                            <option value="">No Filter</option>
                            <option value={OrderStates.PENDING}>{OrderStates.PENDING}</option>
                            <option value={OrderStates.CREATED}>{OrderStates.CREATED}</option>
                            <option value={OrderStates.SENT_WMS}>{OrderStates.SENT_WMS}</option>
                            <option value={OrderStates.SENT_WMS_FORCEFULLY}>{OrderStates.SENT_WMS_FORCEFULLY}</option>
                            <option value={OrderStates.FAILED_SEND_WMS}>{OrderStates.FAILED_SEND_WMS}</option>
                            <option value={OrderStates.SENT_PHC}>{OrderStates.SENT_PHC}</option>
                            <option value={OrderStates.PICKED}>{OrderStates.PICKED}</option>
                            <option value={OrderStates.FAILLED_SEND_PHC}>{OrderStates.FAILLED_SEND_PHC}</option>
                            <option value={OrderStates.FULLFIELD}>{OrderStates.FULLFIELD}</option>
                            <option value={OrderStates.CANCELLED}>{OrderStates.CANCELLED}</option>
                        </Form.Select>
                    </Form.Group>  
                </Form>
                
                <div className="OrdersContainer">
                    {
                        orders.map((order: any) => {

                            // Verificar se tambem existe filtro de order por estado
                            if(filterStateOrder !== "") {
                                if(findOrder === order.order_id.toString() && filterStateOrder === order.state) {
                                    return (<Order order={order}>
                                        </Order>)
                                }
                            } else {
                                if(findOrder === order.order_id.toString()) {
                                    return (<Order order={order}>
                                        </Order>)
                                }
                            }                        
                        })   
                    }
                </div>
    
                <div className="BtnPagination">    
                    <Button onClick={decreaseIndex}>Previous</Button>  
                    <Button onClick={increaseIndex}>Next</Button> 
                </div>
            </div>
        )
    } else {
        // Caso exista filtro de order por estado
        if(filterStateOrder !== "") {

            // Novo array só com as orders com o filtro
            let orderstatefiltered: ORDER_CLIENT[] = [];
        
            for (let i = 0; i < orders.length; i++) {
                if(orders[i].state === filterStateOrder) {
                    orderstatefiltered.push(orders[i]);
                }
                
            }

            // Verificar se existe algum alert para mostrar
            if(cancelOrderState !== "") {
                // Caso de sucesso em cancelar uma order
                if(cancelOrderState === "success") {
                    return (
                        <div>
                            <Alert variant="success" className="cancelAlert" >Order cancelada com sucesso!</Alert>
                            <Form>
                                <Form.Group className="SearchForm">
                                    <Form.Control type="text" placeholder="Find orders"></Form.Control>
                                    <Button onClickCapture={findorder}>Search</Button>
                                    <Button onClickCapture={refresh}>Refresh</Button>
    
                                    <Form.Select aria-label="Default select example" onChange={filterState} defaultValue={filterStateOrder}>
                                        <option value="">No Filter</option>
                                        <option value={OrderStates.PENDING}>{OrderStates.PENDING}</option>
                                        <option value={OrderStates.CREATED}>{OrderStates.CREATED}</option>
                                        <option value={OrderStates.SENT_WMS}>{OrderStates.SENT_WMS}</option>
                                        <option value={OrderStates.SENT_WMS_FORCEFULLY}>{OrderStates.SENT_WMS_FORCEFULLY}</option>
                                        <option value={OrderStates.FAILED_SEND_WMS}>{OrderStates.FAILED_SEND_WMS}</option>
                                        <option value={OrderStates.SENT_PHC}>{OrderStates.SENT_PHC}</option>
                                        <option value={OrderStates.PICKED}>{OrderStates.PICKED}</option>
                                        <option value={OrderStates.FAILLED_SEND_PHC}>{OrderStates.FAILLED_SEND_PHC}</option>
                                        <option value={OrderStates.FULLFIELD}>{OrderStates.FULLFIELD}</option>
                                        <option value={OrderStates.CANCELLED}>{OrderStates.CANCELLED}</option>
                                    </Form.Select>
                                </Form.Group>  
                            </Form>
                            
                            <div className="OrdersContainer">
                                {
                                    orderstatefiltered.slice(index,index + pagesize).map((order: any,index: number) => {
                                        return (<Order order={order}>
                                        </Order>)
                                    })   
                                }
                            </div>
                
                            <div className="BtnPagination">    
                                <Button onClick={decreaseIndex}>Previous</Button>  
                                <Button onClick={increaseIndex}>Next</Button> 
                            </div>
                        </div>
                    )
                // Existe alert mas a order não foi cancelada com sucesso
                } else {
                    return (
                        <div>
                            <Form>
                                <Alert variant="danger" className="cancelAlert" >{cancelOrderState}</Alert>
                                <Form.Group className="SearchForm">
                                    <Form.Control type="text" placeholder="Find orders"></Form.Control>
                                    <Button onClickCapture={findorder}>Search</Button>
                                    <Button onClickCapture={refresh}>Refresh</Button>
    
                                    <Form.Select aria-label="Default select example" onChange={filterState} defaultValue={filterStateOrder}>
                                        <option value="">No Filter</option>
                                        <option value={OrderStates.PENDING}>{OrderStates.PENDING}</option>
                                        <option value={OrderStates.CREATED}>{OrderStates.CREATED}</option>
                                        <option value={OrderStates.SENT_WMS}>{OrderStates.SENT_WMS}</option>
                                        <option value={OrderStates.SENT_WMS_FORCEFULLY}>{OrderStates.SENT_WMS_FORCEFULLY}</option>
                                        <option value={OrderStates.FAILED_SEND_WMS}>{OrderStates.FAILED_SEND_WMS}</option>
                                        <option value={OrderStates.SENT_PHC}>{OrderStates.SENT_PHC}</option>
                                        <option value={OrderStates.PICKED}>{OrderStates.PICKED}</option>
                                        <option value={OrderStates.FAILLED_SEND_PHC}>{OrderStates.FAILLED_SEND_PHC}</option>
                                        <option value={OrderStates.FULLFIELD}>{OrderStates.FULLFIELD}</option>
                                        <option value={OrderStates.CANCELLED}>{OrderStates.CANCELLED}</option>
                                    </Form.Select>
                                </Form.Group>  
                            </Form>
                            
                            <div className="OrdersContainer">
                                {
                                    orderstatefiltered.slice(index,index + pagesize).map((order: any,index: number) => {
                                        return (<Order order={order}>
                                        </Order>)
                                    })   
                                }
                            </div>
                
                            <div className="BtnPagination">    
                                <Button onClick={decreaseIndex}>Previous</Button>  
                                <Button onClick={increaseIndex}>Next</Button> 
                            </div>
                        </div>
                    )
                }
            // Não existe nenhum alert
            } else {
                return (
                    <div>
                        <Form>
                        <Alert style={{display:"none"}}  >{cancelOrderState}</Alert>
                            <Form.Group className="SearchForm">
                                <Form.Control type="text" placeholder="Find orders"></Form.Control>
                                <Button onClickCapture={findorder}>Search</Button>
                                <Button onClickCapture={refresh}>Refresh</Button>
    
                                <Form.Select aria-label="Default select example" onChange={filterState} defaultValue={filterStateOrder}>
                                    <option value="">No Filter</option>
                                    <option value={OrderStates.PENDING}>{OrderStates.PENDING}</option>
                                    <option value={OrderStates.CREATED}>{OrderStates.CREATED}</option>
                                    <option value={OrderStates.SENT_WMS}>{OrderStates.SENT_WMS}</option>
                                    <option value={OrderStates.SENT_WMS_FORCEFULLY}>{OrderStates.SENT_WMS_FORCEFULLY}</option>
                                    <option value={OrderStates.FAILED_SEND_WMS}>{OrderStates.FAILED_SEND_WMS}</option>
                                    <option value={OrderStates.SENT_PHC}>{OrderStates.SENT_PHC}</option>
                                    <option value={OrderStates.PICKED}>{OrderStates.PICKED}</option>
                                    <option value={OrderStates.FAILLED_SEND_PHC}>{OrderStates.FAILLED_SEND_PHC}</option>
                                    <option value={OrderStates.FULLFIELD}>{OrderStates.FULLFIELD}</option>
                                    <option value={OrderStates.CANCELLED}>{OrderStates.CANCELLED}</option>
                                </Form.Select>
                            </Form.Group>  
                        </Form>
                        
                        <div className="OrdersContainer">
                            {
                                orderstatefiltered.slice(index,index + pagesize).map((order: any,index: number) => {
                                    return (<Order order={order}>
                                    </Order>)
                                })   
                            }
                        </div>
            
                        <div className="BtnPagination">    
                            <Button onClick={decreaseIndex}>Previous</Button>  
                            <Button onClick={increaseIndex}>Next</Button> 
                        </div>
                    </div>
                )
            } 
        // Não existe filtro exista filtro de order por estado nem pesquisa
        } else {
            // Verificar se existe algum alert para mostrar
            if(cancelOrderState !== "") {
                // Caso de sucesso em cancelar uma order
                if(cancelOrderState === "success") {
                    return (
                        <div>
                            <Alert variant="success" className="cancelAlert" >Order cancelada com sucesso!</Alert>
                            <Form>
                                <Form.Group className="SearchForm">
                                    <Form.Control type="text" placeholder="Find orders"></Form.Control>
                                    <Button onClickCapture={findorder}>Search</Button>
                                    <Button onClickCapture={refresh}>Refresh</Button>
    
                                    <Form.Select aria-label="Default select example" onChange={filterState}>
                                        <option value="">No Filter</option>
                                        <option value={OrderStates.PENDING}>{OrderStates.PENDING}</option>
                                        <option value={OrderStates.CREATED}>{OrderStates.CREATED}</option>
                                        <option value={OrderStates.SENT_WMS}>{OrderStates.SENT_WMS}</option>
                                        <option value={OrderStates.SENT_WMS_FORCEFULLY}>{OrderStates.SENT_WMS_FORCEFULLY}</option>
                                        <option value={OrderStates.FAILED_SEND_WMS}>{OrderStates.FAILED_SEND_WMS}</option>
                                        <option value={OrderStates.SENT_PHC}>{OrderStates.SENT_PHC}</option>
                                        <option value={OrderStates.PICKED}>{OrderStates.PICKED}</option>
                                        <option value={OrderStates.FAILLED_SEND_PHC}>{OrderStates.FAILLED_SEND_PHC}</option>
                                        <option value={OrderStates.FULLFIELD}>{OrderStates.FULLFIELD}</option>
                                        <option value={OrderStates.CANCELLED}>{OrderStates.CANCELLED}</option>
                                    </Form.Select>
                                </Form.Group>  
                            </Form>

                            <div className="OrdersContainer">
                                {
                                    orders.slice(index,index + pagesize).map((order: any,index: number) => {
                                        return (<Order order={order}>
                                        </Order>)
                                    })   
                                }
                            </div>
                
                            <div className="BtnPagination">    
                                <Button onClick={decreaseIndex}>Previous</Button>  
                                <Button onClick={increaseIndex}>Next</Button> 
                            </div>
                        </div>
                    )
                // Existe alert mas a order não foi cancelada com sucesso
                } else {
                    return (
                        <div>
                            <Form>
                                <Alert variant="danger" className="cancelAlert" >{cancelOrderState}</Alert>
                                <Form.Group className="SearchForm">
                                    <Form.Control type="text" placeholder="Find orders"></Form.Control>
                                    <Button onClickCapture={findorder}>Search</Button>
                                    <Button onClickCapture={refresh}>Refresh</Button>
    
                                    <Form.Select aria-label="Default select example" onChange={filterState}>
                                        <option value="">No Filter</option>
                                        <option value={OrderStates.PENDING}>{OrderStates.PENDING}</option>
                                        <option value={OrderStates.CREATED}>{OrderStates.CREATED}</option>
                                        <option value={OrderStates.SENT_WMS}>{OrderStates.SENT_WMS}</option>
                                        <option value={OrderStates.SENT_WMS_FORCEFULLY}>{OrderStates.SENT_WMS_FORCEFULLY}</option>
                                        <option value={OrderStates.FAILED_SEND_WMS}>{OrderStates.FAILED_SEND_WMS}</option>
                                        <option value={OrderStates.SENT_PHC}>{OrderStates.SENT_PHC}</option>
                                        <option value={OrderStates.PICKED}>{OrderStates.PICKED}</option>
                                        <option value={OrderStates.FAILLED_SEND_PHC}>{OrderStates.FAILLED_SEND_PHC}</option>
                                        <option value={OrderStates.FULLFIELD}>{OrderStates.FULLFIELD}</option>
                                        <option value={OrderStates.CANCELLED}>{OrderStates.CANCELLED}</option>
                                    </Form.Select>
                                </Form.Group>  
                            </Form>
                            
                            
                            <div className="OrdersContainer">
                                {
                                    orders.slice(index,index + pagesize).map((order: any,index: number) => {
                                        return (<Order order={order}>
                                        </Order>)
                                    })   
                                }
                                
                            </div>
                
                            <div className="BtnPagination">    
                                <Button onClick={decreaseIndex}>Previous</Button>  
                                <Button onClick={increaseIndex}>Next</Button> 
                            </div>
                        </div>
                    )
                }
            // Não existe Alert
            } else {
                return (
                    <div>
                    
                        <Form>
                        <Alert style={{display:"none"}}  >{cancelOrderState}</Alert>
                            <Form.Group className="SearchForm">
                                <Form.Control type="text" placeholder="Find orders"></Form.Control>
                                <Button onClickCapture={findorder}>Search</Button>
                                <Button onClickCapture={refresh}>Refresh</Button>
    
                                <Form.Select aria-label="Default select example" onChange={filterState}>
                                    <option value="">No Filter</option>
                                    <option value={OrderStates.PENDING}>{OrderStates.PENDING}</option>
                                    <option value={OrderStates.CREATED}>{OrderStates.CREATED}</option>
                                    <option value={OrderStates.SENT_WMS}>{OrderStates.SENT_WMS}</option>
                                    <option value={OrderStates.SENT_WMS_FORCEFULLY}>{OrderStates.SENT_WMS_FORCEFULLY}</option>
                                    <option value={OrderStates.FAILED_SEND_WMS}>{OrderStates.FAILED_SEND_WMS}</option>
                                    <option value={OrderStates.SENT_PHC}>{OrderStates.SENT_PHC}</option>
                                    <option value={OrderStates.PICKED}>{OrderStates.PICKED}</option>
                                    <option value={OrderStates.FAILLED_SEND_PHC}>{OrderStates.FAILLED_SEND_PHC}</option>
                                    <option value={OrderStates.FULLFIELD}>{OrderStates.FULLFIELD}</option>
                                    <option value={OrderStates.CANCELLED}>{OrderStates.CANCELLED}</option>
                                </Form.Select>
                            </Form.Group>  
                        </Form>
                        
                        <div className="OrdersContainer">
                            {
                                orders.slice(index,index + pagesize).map((order: any,index: number) => {
                                    return (<Order order={order}>
                                    </Order>)
                                })   
                            }
                        </div>
            
                        <div className="BtnPagination">    
                            <Button onClick={decreaseIndex}>Previous</Button>  
                            <Button onClick={increaseIndex}>Next</Button> 
                        </div>
                    </div>
                )
            } 
        }     
    }
}
    

export default Orders