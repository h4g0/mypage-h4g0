let axios = require('axios')

let mdw_server: string =  (process.env.REACT_APP_MDW_SERVER as string)

export async function createReception(token: string, reception: any[]): Promise<any>{ 

    let resp: any;
    
    var config = {
    method: 'post',
    url: mdw_server + '/receptionbko',
    headers: { 
        'Authorization': 'Bearer ' + token
    },
    data: JSON.stringify(reception)
    };

    await axios(config)
    .then(function (response: any) {
        //console.log(response);
        //orders = response.data

        if(response.data !== "OK") {
            resp = response.data["products"];
        } else {
            resp = []
        }
    })
    .catch(function (error: any) {
        console.log(error);
    });

    return resp;

}