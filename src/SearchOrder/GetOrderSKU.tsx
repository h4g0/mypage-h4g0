import { ORDER_CLIENT } from "../TYPES/OrderType";


let axios = require('axios')

let mdw_server: string =  (process.env.REACT_APP_MDW_SERVER as string)

export async function gerOrderbySKU(token: string, orders: ORDER_CLIENT[], order_id: number): Promise<any>{ 

    let orderexists = false;
    let order: any = {};

    for (let i = 0; i < orders.length; i++) {
        if(orders[i].order_id === order_id) {
            orderexists = true;
            order = orders[i];
        }        
    }

    if(orderexists) {

        return order;

    } else {
        var config = {
            method: 'get',
            url: mdw_server + '/getorderbysku',
            headers: { 
                'Authorization': 'Bearer ' + token
            },
            data: JSON.stringify(order_id)
        };
    
        await axios(config)
        .then(function (response: any) {
            //console.log(response);
            //orders = response.data
        })
        .catch(function (error: any) {
            console.log(error);
        });
    }
    
}