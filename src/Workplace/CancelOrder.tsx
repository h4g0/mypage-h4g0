let axios = require('axios')

let mdw_server: string =  (process.env.REACT_APP_MDW_SERVER as string)

export async function cancelOrder(token: string, order: any): Promise<any>{ 

    let data = { id: order.order_id, state: order.state }

    var config = {
        method: 'post',
        url: mdw_server + '/cancelorderbko',
        headers: { 
            'Authorization': 'Bearer ' + token
        },
        data: JSON.stringify(data)
    };

    let msg: any = "";

    await axios(config)
    .then(function (response: any) {

        if(response.data !== undefined) {
            msg = response.data.message.split("- ")[1].toString();
        } else {
            msg =  "success";
        }
    })
    .catch(function (error: any) {
        console.log(error);
    });

    return msg;

}