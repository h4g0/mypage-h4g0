import { ORDER_CLIENT } from "../TYPES/OrderType";

let axios = require('axios')

let mdw_server: string =  (process.env.REACT_APP_MDW_SERVER as string)

export async function getOrders(token: string): Promise<any>{ 
    
    let orders: any = []

    var config = {
    method: 'get',
    url: mdw_server + '/getordersdb?data=client',
    headers: { 
        'Authorization': 'Bearer ' + token
    }
    };

    

    await axios(config)
    .then(function (response: any) {
        orders = response.data
    
    })
    .catch(function (error: any) {
        console.log(error);
    });



    return orders;
    
}

export function transform_ordersToObject(orders) {

    let new_orders = {};

    for(let i = 0; i < orders.length; i++) {
        new_orders[orders[i].order_id] = orders[i];
    }

    return new_orders;
}

export function transform_ordersToArray(orders) {

    let new_orders: ORDER_CLIENT[] = [];

    let i = 0;

    for(var ord in orders) {

        new_orders[i] = orders[ord];
        i++;
    }

    return new_orders;
}
