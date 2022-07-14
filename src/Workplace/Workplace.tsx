import './Workplace.css'
import { useSelector } from 'react-redux'
import Menus from './../Menus/Types'
import Header from './../Header/Header'
import Orders from './Orders'
import 'bootstrap/dist/css/bootstrap.min.css';

export function Workplace(props: any) {

    let menu: any = useSelector( (state: any) => state.menu)

    let orders: any[] = []

    if (menu !== Menus.Workplace) return null

    // Pagina principal depois do Login 
    
    return (
        <div className="WorkPlaceContainer">
            <Header></Header>
            <Orders orders={orders}></Orders>
        </div>
    )
}

export default Workplace