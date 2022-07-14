import { useSelector } from "react-redux"
import Header from "../Header/Header"
import Menus from './../Menus/Types'
import "./Stock.css"

// apenas carrega iframe do mongo
export function Stock(props: any) {

    let menu: any = useSelector( (state: any) => state.menu)


    if (menu !== Menus.Stock) return null

    return (
        <div className="WorkPlaceContainer">
            <Header></Header>
            <iframe className="iFrame" width="640" height="480" src="https://charts.mongodb.com/charts-ambar-rjamf/embed/charts?id=371d9d84-ab6d-468c-ad31-3d499a2b9462&theme=light"></iframe>
        </div>
    )
}

export default Stock