import { Button, Form } from "react-bootstrap"
import { useSelector } from "react-redux"
import Header from "../Header/Header"
import { ORDER_CLIENT } from "../TYPES/OrderType"
import Menus from './../Menus/Types'
import { gerOrderbySKU } from "./GetOrderSKU"


// Procurar por order verifica se existe já na sessão, se não vai buscar a bd ou wms
export function SearchOrder(props: any) {

    let menu: any = useSelector( (state: any) => state.menu)
    let token: any = useSelector( (state: any) => state.token)
    let orders: ORDER_CLIENT[] = useSelector( (state: any) => state.orders)

    if (menu !== Menus.SearchOrder) return null

    const findOrder = (e) => {
        let order_id = e.target.parentElement.children[0].value;

        if(/\d/.test(order_id) && order_id !== "") {
            gerOrderbySKU(token, orders, Number(order_id));
        } else {
            console.log("SKU inválido!")
        }
    }

    return (
        <div className="WorkPlaceContainer">
            <Header></Header>

            <Form>
                <Form.Group className="SearchForm">
                    <Form.Control type="text" placeholder="Order ID"></Form.Control>
                    <Button onClick={findOrder}>Search</Button>
                </Form.Group>  
            </Form>
        </div>
    )
}

export default SearchOrder