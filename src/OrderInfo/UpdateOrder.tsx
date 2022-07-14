import { ORDER_CLIENT } from "../TYPES/OrderType";

let axios = require('axios')

let mdw_server: string =  (process.env.REACT_APP_MDW_SERVER as string)

export async function updateOrder(token: string, order: ORDER_CLIENT): Promise<any>{ 
    
    let orders: any = []

    var config = {
    method: 'post',
    url: mdw_server + '/updateorderbko',
    headers: { 
        'Authorization': 'Bearer ' + token
    },
    data: JSON.stringify(order)
    };

    await axios(config)
    .then(function (response: any) {
        //console.log(response);
        //orders = response.data
    })
    .catch(function (error: any) {
        console.log(error);
    });

    return orders
}