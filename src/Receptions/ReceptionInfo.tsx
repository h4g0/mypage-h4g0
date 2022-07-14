import { Badge, Button, Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Header from "../Header/Header"
import Menus from '../Menus/Types'
import { changeMenu, changeReceptionInfo, changeReceptions, Types } from "../UpdateState/Actions"
import { get_receptions } from "./GetReceptions"
import './Receptions.css'


export function ReceptionInfo(props:any) {

    let dispatch = useDispatch()

    let token: any = useSelector((state: any) => state.token)

    let menu: any = useSelector((state: any) => state.menu)

    let reception: any = useSelector((state: any) => state.receptionInfo)

    if (menu !== Menus.ReceptionInfo) return null

    reception = JSON.parse(JSON.stringify(reception));

    // Caso a receção esteja Recebida mostrar Quantidade Recebida
    if(reception.status !== undefined && reception.status !== null && reception.status.toString().toLowerCase() === "received") {
        return (
            <div className="WorkPlaceContainer">
                <Header></Header>
                <div className="tableContainerReceptions">
                    <div className="receptionBadgeContainer">
                        <Badge bg="info">IdDocOrigem: {reception.iddocorigem}</Badge>
                        <Badge bg="info">CodigoEntidade: {reception.codigoentidade}</Badge>
                        <Badge bg="info">Data: {reception.data}</Badge>
                        <Badge bg="info">Estado: Recebida</Badge>
                    </div>
                    <Table className="tableReceptions">
                        <thead>
                            <tr>
                                <th>Código Artigo</th>
                                <th>Quantidade Prevista</th>
                                <th>Quantidade Recebida</th>
                            </tr>
                        </thead>
                        <tbody>
                            {                                
                                reception.Detalhes.map( (product) => {
                                    return(
                                        <tr>
                                            <td>{product.codigoartigo}</td>
                                            <td>{product.qtdprevista}</td>
                                            <td>{product.quantidaderecebida}</td>
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
    // Caso a receção não esteja Recebida não mostrar Quantidade Recebida
        return (
            <div className="WorkPlaceContainer">
                <Header></Header>
                <div className="tableContainerReceptions">
                    <div className="receptionBadgeContainer">
                        <Badge bg="info">IdDocOrigem: {reception.iddocorigem}</Badge>
                        <Badge bg="info">CodigoEntidade: {reception.codigoentidade}</Badge>
                        <Badge bg="info">Data: {reception.data}</Badge>
                        <Badge bg="info">Estado: Por Iniciar</Badge>
                    </div>
                    <Table className="tableReceptions">
                        <thead>
                            <tr>
                                <th>Código Artigo</th>
                                <th>Quantidade Prevista</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                
                                reception.Detalhes.map( (product) => {
                                    return(
                                        <tr>
                                            <td>{product.codigoartigo}</td>
                                            <td>{product.qtdprevista}</td>
                                        </tr>                                
                                    )                                                               
                                })                            
                            }
                        </tbody>
                    </Table>                            
                </div>
            </div>
        )
    }
}

export default ReceptionInfo