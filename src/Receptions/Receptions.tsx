import { Button, Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Header from "../Header/Header"
import Menus from '../Menus/Types'
import { changeMenu, changeReceptionInfo, changeReceptions, Types } from "../UpdateState/Actions"
import { get_receptions } from "./GetReceptions"
import './Receptions.css'

export function Receptions(props:any) {

    let dispatch = useDispatch()

    let token: any = useSelector((state: any) => state.token)

    let menu: any = useSelector((state: any) => state.menu)

    let receptions: any = useSelector((state: any) => state.receptions)

    if (menu !== Menus.Receptions) return null

    const getReceptions = async() => {
        receptions = await get_receptions(token);

        if(receptions !== null) {
            dispatch(changeReceptions({receptions: receptions}));
        }
        
    }

    if(receptions === null) {
        getReceptions();        
    }
    
    const gotoReceptionInfo = (reception: any) => {
        dispatch(changeReceptionInfo({receptionInfo: reception}));
        dispatch(changeMenu({menu: Menus.ReceptionInfo}));
    }

    if(receptions !== null) {
        return (
            <div className="WorkPlaceContainer">
                <Header></Header>
                <div className="tableContainer">
                    <Table className="tableReceptions">
                        <thead>
                            <tr>
                                <th>ID Empresa</th>
                                <th>Numero Externo</th>
                                <th>Estado</th>
                                <th>Entidade</th>
                                <th>Secção</th>
                                <th>+Info</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                receptions.map( (reception) => {

                                    let estado = "";
                                    let entidade = "";

                                    if(reception.status !== undefined && reception.status !== null && reception.status.toString().toLowerCase() === "received") {
                                        estado = "Recebida";
                                    } else {
                                        estado = "Por Iniciar";
                                    }

                                    if(reception.codigoentidade === "AMB") {
                                        entidade = "AMBAR";
                                    } else if(reception.codigoentidade === "AMS") {
                                        entidade = "AMBAR SCIENCE";
                                    }

                                    return(
                                        <tr>
                                            <td>{reception.idempresa}</td>
                                            <td>{reception.numeroexterno}</td>
                                            <td>{estado}</td>
                                            <td>{entidade}</td>
                                            <td>Secção {reception.codigoseccao}</td>
                                            <td><Button onClick={() => gotoReceptionInfo(reception)} className="btnInfo" >+</Button></td>
                                        </tr>
                                    )
                                }) 
                            }
                        </tbody>
                    </Table> 
                </div>                           
            </div>
        )
    } else {
        return (
            <div className="WorkPlaceContainer">
                <Header></Header>
                <div className="tableContainer">
                    <Table className="tableReceptions">
                        <thead>
                            <tr>
                                <th>ID Empresa</th>
                                <th>Numero Externo</th>
                                <th>Estado</th>
                                <th>Entidade</th>
                                <th>Secção</th>
                                <th>+Info</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </Table> 
                </div>                           
            </div>
        )
    }

}

export default Receptions