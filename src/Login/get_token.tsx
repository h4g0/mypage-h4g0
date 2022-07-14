let axios = require('axios')

let dotenv = require('dotenv')

dotenv.config()

let mdw_server: string =  (process.env.REACT_APP_MDW_SERVER as string)


//console.log("mdw server " + mdw_server)

export async function get_token(id: string, password: string): Promise<string> {

    let data: string = '';
    let token: string = ''

    var config = {
    method: 'get',
    url: mdw_server + '/gettoken?id=' + id + '&password=' + password,
    headers: { },
    data : data
    };

    await axios(config)
    .then(function (response: any) {
    token = response.data.token
    })
    .catch(function (error: any) {
    console.log(error);
    });

    return token

}