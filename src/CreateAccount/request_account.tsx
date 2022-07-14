var axios = require('axios');

let mdw_server: string =  (process.env.REACT_APP_MDW_SERVER as string)

export async function request_account(id: string,email: string, password: string, token: string): Promise<void> {
    var config = {
    method: 'post',
    url: mdw_server + '/requestaccount?id=' + id + '&password=' + password + '&email=' + email,
    headers: { 
        'Authorization': 'Bearer ' + token
    }
    };

    await axios(config)
    .then(function (response: any) {
    //console.log(JSON.stringify(response.data));
    })
    .catch(function (error: any) {
    console.log(error);
    });

}