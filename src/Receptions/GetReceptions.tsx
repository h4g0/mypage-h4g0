let axios = require('axios')

let mdw_server: string =  (process.env.REACT_APP_MDW_SERVER as string)

export async function get_receptions(token: string): Promise<any>{ 

    let resp: any = null;
    
    var config = {
        method: 'get',
        url: mdw_server + '/getreceptionsbko',
        headers: { 
            'Authorization': 'Bearer ' + token
        }
    };

    await axios(config)
    .then(function (response: any) {
        //console.log(response);

        resp = response.data;
    })
    .catch(function (error: any) {
        console.log(error);
    });

    //console.log(resp)
    return resp;

}