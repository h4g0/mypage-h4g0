import { useSelector,useDispatch } from 'react-redux'
import { changeCurrentOrder, changeFieldsOrder, changeMenu, changeOrders, changeOriginalOrder, editOrder } from '../UpdateState/Actions'
import Header from '../Header/Header'
import Menus from './../Menus/Types'
import { Button, Table, Toast } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './OrderInfo.css';
import { ORDER_CLIENT } from '../TYPES/OrderType';
import { updateOrder } from './UpdateOrder';
import React from 'react';
import { transform_ordersToArray, transform_ordersToObject } from '../Workplace/GetOrders';

export function OrderInfo(props: any) {

    let dispatch = useDispatch()

    let token: any = useSelector((state: any) => state.token)

    let originalOrder: ORDER_CLIENT = useSelector((state: any) => state.originalOrder)

    let orders: ORDER_CLIENT[] = useSelector((state: any) => state.orders);

    let order: ORDER_CLIENT = useSelector((state: any) => state.currentOrder)

    let edit: boolean = useSelector((state: any) => state.edit)

    let menu: any = useSelector((state: any) => state.menu)

    let fieldsOrder: string[] = useSelector((state: any) => state.fieldsOrder)

    if (menu !== Menus.OrderInfo) return null

    var orderToEdit = JSON.parse(JSON.stringify(order));
    var orderUpdated = JSON.parse(JSON.stringify(orderToEdit));

    
    // Mudar modo para editar a order
    const editParameters = () => {

        if(edit === true) {
            dispatch( editOrder( { edit: false } ) )
        } else {
            dispatch( editOrder( { edit: true } ) )            
        }
        
        dispatch( changeMenu( { menu: Menus.OrderInfo } ) )
    }

    // Cancelar edição da order
    const cancelEdit = (e) => {

        let form = e.target.parentElement.parentElement;

        for (let i = 0; i < form.length; i++) {

            if (form[i].type !== "button" && form[i].type !== "submit") {

                if(form[i].name.includes("/")) {
                    let name = form[i].name.replaceAll(" ", "_").split("/");
                    if(orderToEdit[name[0]][name[1]] === null) {
                        form[i].value = "null";
                    } else {
                        form[i].value = orderToEdit[name[0]][name[1]].toString();
                    }
                    
                } else {
                    if(orderToEdit[form[i].name] === null) {
                        form[i].value = "null";
                    } else {
                        form[i].value = orderToEdit[form[i].name].toString();
                    }
                    
                }
                
                //form[i].value = orderToEdit[form[i].name]
                //console.log(form[i].value)
            }
            
        }

        dispatch(changeFieldsOrder( { fieldsOrder: [] } ) )
        dispatch( editOrder( { edit: false } ) )
        dispatch( changeCurrentOrder( { currentOrder: originalOrder } ) )
        dispatch( changeMenu( { menu: Menus.OrderInfo } ) )


    }

    // converte tipos para string
    const parseToType = (value: any, type: any) => {
        if(value === null || value === "null") {
            return null;
        }

        if(type === "string") {
            return value.toString();
        }

        if(type === "number") {
            if(value.includes(".") || value.includes(",")) {
                return parseFloat(value);
            } else {
                return parseInt(value);
            }
        }


        if(type === "boolean") {
            if(value === "true" || value === true) {
                return true;
            } else if (value === "false" || value === false) {
                return false;
            } else {
                return "";
            }
        }

    }

    // mudar valor do parametro da order
    const changeValue = (e) => {
        let name = e.target.name.replaceAll(" ","_");
        if(name.includes("/")) {
            orderUpdated[name.split("/")[0]][name.split("/")[1]] = e.target.value;
        } else{
            orderUpdated[name] = e.target.value;
        }
    }

    // gravar dados alterados
    const saveOrder = (event) => {
        event.preventDefault();

        let form = event.target;
        var validationFields = true;

        for (let index = 0; index < form.length; index++) {
            if (form[index].type !== "button" && form[index].type !== "submit") {
                let name = form[index].name;
                
                if (name.includes("/")) {
                    name = name.replaceAll(" ", "_");
                    if(orderUpdated[name.split("/")[0]][name.split("/")[1]] !== "") {
                        orderUpdated[name.split("/")[0]][name.split("/")[1]] = parseToType(orderUpdated[name.split("/")[0]][name.split("/")[1]], typeof(orderUpdated[name.split("/")[0]][name.split("/")[1]]));      
                        if(orderUpdated[name.split("/")[0]][name.split("/")[1]] === "") {
                            validationFields = false;
                            name = name.split("/")[0].charAt(0).toUpperCase() + name.split("/")[0].slice(1) + " - " + name.split("/")[1].charAt(0).toUpperCase() + name.split("/")[1].slice(1);
                            if(!fieldsOrder.includes(name)) {
                                fieldsOrder.push(name);
                            }
                        } 
                    } else {
                        validationFields = false;
                        name = name.split("/")[0].charAt(0).toUpperCase() + name.split("/")[0].slice(1) + " - " + name.split("/")[1].charAt(0).toUpperCase() + name.split("/")[1].slice(1);
                        if(!fieldsOrder.includes(name)) {
                            fieldsOrder.push(name);
                        }
                    }  
                } else {
                    if(orderUpdated[name] !== "") {
                        orderUpdated[name] = parseToType(orderUpdated[name], typeof(orderUpdated[name]));  
                        if(orderUpdated[name] === "") {
                            validationFields = false;
                            name = name.split("/")[0].charAt(0).toUpperCase() + name.split("/")[0].slice(1);
                            if(!fieldsOrder.includes(name)) {
                                fieldsOrder.push(name);
                            }
                        }      
                    } else {                        
                        validationFields = false;
                        name = name.split("/")[0].charAt(0).toUpperCase() + name.split("/")[0].slice(1);
                        if(!fieldsOrder.includes(name)) {
                            fieldsOrder.push(name);
                        }
                    }  
                }
            }
            
        }

        
        if(validationFields === true) {

            // atualizar order no wms e bd
            updateOrder(token, orderUpdated);
            dispatch( changeCurrentOrder( { currentOrder: orderUpdated } ) )
            dispatch( changeOriginalOrder( { originalOrder: orderUpdated } ) )

            let new_orders = transform_ordersToObject(orders);

            new_orders[orderUpdated.order_id] = orderUpdated;

            dispatch( changeOrders({orders: transform_ordersToArray(new_orders)}))

            dispatch( changeFieldsOrder( { fieldsOrder: [] } ) )
            dispatch( editOrder( { edit: false } ) )

            dispatch( changeMenu( { menu: Menus.OrderInfo } ) )

        } else {
            dispatch( changeCurrentOrder( { currentOrder: orderUpdated } ) )
            dispatch( changeFieldsOrder( { fieldsOrder: fieldsOrder } ) )
            dispatch( changeMenu( { menu: Menus.OrderInfo } ) )
        }
    }

    let strFields = "";

    if(fieldsOrder.length > 0) {
        
        strFields = "";
        
        for (let index = 0; index < fieldsOrder.length; index++) {
            if(index+1 === fieldsOrder.length) {
                strFields += fieldsOrder[index];
            } else {
                strFields += fieldsOrder[index] + "\n";
            }            
        }
    }

    return(
        <div className="WorkPlaceContainer">
            <Header></Header>
            <form onSubmit={saveOrder}>
            <div className="editParameters">
                <Button className="btnEdit" style={{display:  edit !== true ? 'block' : 'none' }} onClick={editParameters}>Edit</Button>
                <Button className="btnSave" style={{display:  edit === true ? 'block' : 'none' }} type="submit" >Save</Button>
                <Button className="btnCancel" style={{display:  edit === true ? 'block' : 'none' }} onClick={cancelEdit} >Cancel</Button>
            </div>
            <Toast className="notificationSave" style={{display:  fieldsOrder.length > 0 ? 'block' : 'none' }}>
                <Toast.Header>
                    <strong className="mr-auto">Incorrect Fields!</strong>
                </Toast.Header>
                <Toast.Body>{strFields}</Toast.Body>
            </Toast>
            <div className="TableContainer">
                <Table striped bordered hover size="sm" >
                    <thead>
                        <tr>
                        <th>Order Parameter</th>
                        <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {
                            Object.keys(orderToEdit).map( (key) => {

                                //console.log(key)

                                let key_title = key;

                                if(key_title.includes("_")) {
                                    key_title = key_title.replaceAll("_", " ");
                                }

                                if(key === "billing_address" || key === "shipping_address") {

                                    let order_value = orderToEdit[key];

                                    return (
                                    
                                        Object.keys(order_value).map( (k) => {
                                            let k_title = k;

                                            if(k_title.includes("_")) {
                                                k_title = k_title.replaceAll("_", " ");
                                            }

                                            let str_order_value =  order_value[k];

                                            if (str_order_value === null) {
                                                str_order_value = "null";
                                            } else {
                                                str_order_value = str_order_value.toString();
                                            }

                                            let name = key_title + "/" + k_title;

                                            if(edit) {
                                                return (
                                                    <tr>
                                                        <td>{key_title} - {k_title}</td>
                                                        <td><input className="tableInput" name={name} type="text" defaultValue={str_order_value} onChange={changeValue}/></td>
                                                    </tr>
                                                )
                                            } else {

                                                return (
                                                    <tr>
                                                        <td>{key_title} - {k_title}</td>
                                                        <td><input className="tableInput" name={name} type="text" readOnly defaultValue={str_order_value}/></td>
                                                    </tr>
                                                )
                                            }
                                        })
                                    )

                                } else if (key === "line_items") {
                                    return(
                                        orderToEdit[key].map( (obj) => {
                                            let i = orderToEdit[key].indexOf(obj)
                                            return(
                                                Object.keys(orderToEdit[key][i]).map( (k) => {
                                                    let k_title = k;
                                                    
                                                    if(k_title.includes("_")) {
                                                        k_title = k_title.replaceAll("_", " ");
                                                    }

                                                    let str_order_value =  orderToEdit[key][i][k];

                                                    if(typeof(orderToEdit[key][i][k]) === "object" && orderToEdit[key][i][k] !== null) {
                                                        if(Array.isArray(orderToEdit[key][i][k])) {
                                                            if(orderToEdit[key][i][k].length === 0) {
                                                                str_order_value = "[ ]";

                                                                return (
                                                                    <tr>
                                                                        <td>{key_title} [{i}] - {k_title}</td>
                                                                        <td>{str_order_value}</td>
                                                                    </tr>
                                                                )
                                                            } else {
                                                                return(
                                                                    <tr>
                                                                        <td>{key_title} [{i}] - {k_title}</td>
                                                                        <td>{orderToEdit[key][i][k].toString()}</td>
                                                                    </tr>
                                                                )
                                                            }
                                                        } else {
                                                            let obj = orderToEdit[key][i][k];
                                                            return(
                                                                Object.keys(obj).map( (j) => {

                                                                    let j_title = j;

                                                                    if(j_title.includes("_")) {
                                                                        j_title = j_title.replaceAll("_", " ");
                                                                    }

                                                                    if(typeof(obj[j]) === "object") {
                                                                        return(
                                                                            Object.keys(obj[j]).map( (w) => {

                                                                                let w_title = w;

                                                                                if(w_title.includes("_")) {
                                                                                    w_title = w_title.replaceAll("_", " ");
                                                                                }

                                                                                str_order_value = obj[j][w];

                                                                                if (str_order_value === null) {
                                                                                    str_order_value = "null";
                                                                                } else {
                                                                                    str_order_value = str_order_value.toString();
                                                                                }
                                                                                return(
                                                                                    <tr>
                                                                                        <td>{key_title} [{i}] - {k_title} - {j_title} - {w_title}</td>
                                                                                        <td>{str_order_value}</td>
                                                                                    </tr>
                                                                                )
                                                                            })
                                                                        )
                                                                    } else {

                                                                        str_order_value = obj[j];

                                                                        if (str_order_value === null) {
                                                                            str_order_value = "null";
                                                                        } else {
                                                                            str_order_value = str_order_value.toString();
                                                                        }

                                                                        return(
                                                                            <tr>
                                                                                <td>{key_title} [{i}] - {k_title} - {j_title}</td>
                                                                                <td>{str_order_value}</td>
                                                                            </tr>
                                                                        )
                                                                    }
                                                                    
                                                                })
                                                            )
                                                        }
                                                    } else {
                                                        if (str_order_value === null) {
                                                            str_order_value = "null";
                                                        } else {
                                                            str_order_value = str_order_value.toString();
                                                        }

                                                        return (
                                                            <tr>
                                                                <td>{key_title} [{i}] - {k_title}</td>
                                                                <td>{str_order_value}</td>
                                                            </tr>
                                                        )
                                                    }
                                                })
                                            )
                                        })
                                    )
                                
                                } else {
                                    if(key !== "order_id" && key !== "order_number" && key !== "state") {
                                        if(key === "email") {
                                            if(edit) {
                                                return (
                                                    <tr>
                                                        <td>{key_title}</td>
                                                        <td><input className="tableInput" name={key} type="email" defaultValue={orderToEdit[key].toString()} onChange={changeValue}/></td>
                                                    </tr>
                                                )
                                            } else {
                                                return (
                                                    <tr>
                                                        <td>{key_title}</td>
                                                        <td><input className="tableInput" name={key} type="email" readOnly defaultValue={orderToEdit[key].toString()}/></td>
                                                    </tr>
                                                )
                                            }
                                        } else if(key === "wms") {
                                            if(edit) {
                                                return (
                                                    <tr>
                                                        <td>{key_title}</td>
                                                        <td>
                                                            <select className="tableInput" name={key} defaultValue={orderToEdit[key].toString()} onChange={changeValue}>
                                                                <option value="true" >true</option>
                                                                <option value="false" >false</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                )
                                            } else {
                                                return (
                                                    <tr>
                                                        <td>{key_title}</td>
                                                        <td><input className="tableInput" name={key} type="email" readOnly defaultValue={orderToEdit[key].toString()}/></td>
                                                    </tr>
                                                )
                                            }
                                        } else {
                                            if(edit) {
                                                return (
                                                    <tr>
                                                        <td>{key_title}</td>
                                                        <td><input className="tableInput" name={key} type="text" defaultValue={orderToEdit[key].toString()} onChange={changeValue}/></td>
                                                    </tr>
                                                )
                                            } else {
                                                return (
                                                    <tr>
                                                        <td>{key_title}</td>
                                                        <td><input className="tableInput" name={key} type="text" readOnly defaultValue={orderToEdit[key].toString()}/></td>
                                                    </tr>
                                                )
                                            }
                                        }                                        
                                    } else {
                                        return (
                                            <tr>
                                                <td>{key_title}</td>
                                                <td>{orderToEdit[key].toString()}</td>
                                            </tr>
                                        )
                                    }
                                }                                                               
                            })
                        }
                    </tbody>
                </Table>
            </div>
            </form>
        </div>
        
    )
}

export default OrderInfo
