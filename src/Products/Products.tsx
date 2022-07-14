import { useSelector,useDispatch } from 'react-redux'
import Header from './../Header/Header'
import Menus from './../Menus/Types'
import { Button, Dropdown, Form, Table,DropdownButton, Alert } from 'react-bootstrap';
import * as XLSX from "xlsx";
import './Products.css'
import { changeFileProducts, changeMenu, changeReceptionFailed, changeReceptionSubmited } from '../UpdateState/Actions';
import { createReception } from './Reception';

// Send Reception
export function Products(props:any) {

    let dispatch = useDispatch()

    let token: any = useSelector((state: any) => state.token)

    let menu: any = useSelector((state: any) => state.menu)

    let file: any = useSelector((state: any) => state.fileProducts)

    let productsError: any = useSelector((state: any) => state.productsWithError)

    let productsSubmited: any = useSelector((state: any) => state.receptionsubmited)

    if (menu !== Menus.Products) return null

    // validação do ficheiro
    const validateFile = (e) => { 

        if(e.target.value.includes(".xlsx")) {
            const file = e!.target!.files![0]; 
        
            readExcel(file, e.target);
        } else {
            e.target.value = "";
        }
        
    };

    // Leitura do ficheiro
    const readExcel = (file, input) => {

        const promise = new Promise((resolve, reject) => {
        
          const fileReader = new FileReader();
          fileReader.readAsArrayBuffer(file);
    
          fileReader.onload = (e) => {
            const bufferArray = e.target!.result;
    
            const wb = XLSX.read(bufferArray, { type: "buffer" });
    
            const wsname = wb.SheetNames[0];
    
            const ws = wb.Sheets[wsname];

            //console.log(ws.A1.w)

            if(ws.A1.w.includes("Material_SAP") 
                && ws.B1.w.includes("Descricao_Interna_SAP_PT") 
                && ws.C1.w.includes("Gp_Material") 
                && ws.D1.w.includes("Embalagem") 
                && ws.E1.w.includes("EAN")) 
            {
                const data = XLSX.utils.sheet_to_json(ws);
                resolve(data);
            } else {
                input.value = "";
                resolve("");
            }
    
            
          };
    
          fileReader.onerror = (error) => {
            reject(error);
          };
        });

        promise.then((d) => {
            dispatch( changeFileProducts( {fileProducts: d} ) )
        });
    };

    const selectAll = (e) => {
        let form = e.target.form;

        if(e.target.checked) {
            for (let i = 0; i < form.length; i++) {
                if(form[i].type === "checkbox" && !form[i].disabled) {
                    form[i].checked = true;
                }                
            }
        } else {
            for (let i = 0; i < form.length; i++) {
                if(form[i].type === "checkbox") {
                    form[i].checked = false;
                }                
            }
        }
        
    };

    // Enviar recepção
    const sendReception = async (e) => {
        e.preventDefault();

        let reception: any[] = [];
        let receptionSubmited: any[] = [];


        // Adicionar parametros extra a recepção
        reception.push(e.target.idDocOrigem.value);
        reception.push(e.target.codigoentidade.value);
        reception.push(e.target.notes.value);

        
        for (let i = 0; i < e.target.length; i++) {
            if(e.target[i].type === "checkbox" && e.target[i].checked && !e.target[i].classList.contains("selectAll") && !e.target[i].disabled) {
                reception.push(JSON.parse(e.target[i].value));
                //console.log(JSON.parse(e.target[i].value).Material_SAP)
                receptionSubmited.push(JSON.parse(e.target[i].value).Material_SAP.toString());
            }               
        }


        if(reception.length > 3) {
            try {
                // Enviar recepção para o wms
                let resp: any[] = await createReception(token, reception);

                if(resp.length > 0) {
                    for (let index = 0; index < resp.length; index++) {
                        if(receptionSubmited.includes(resp[index])) {
                            receptionSubmited.splice(receptionSubmited.indexOf(resp[index]), 1);
                        }                        
                    }
                }

                for (let i = 0; i < e.target.length; i++) {
                    if(e.target[i].type === "checkbox") {
                        e.target[i].checked = false;
                    }   
                }

                if(productsSubmited.length > 0) {
                    for (let index = 0; index < receptionSubmited.length; index++) {
                        productsSubmited.push(receptionSubmited[index])                        
                    }

                    dispatch( changeReceptionSubmited( { receptionsubmited: productsSubmited } ) )
                } else {
                    dispatch( changeReceptionSubmited( { receptionsubmited: receptionSubmited } ) )
                }
                                
                dispatch( changeReceptionFailed( { productsWithError: resp } ) )
                dispatch( changeMenu({ menu: Menus.Products }) )
    
            } catch(e) {
                //console.log(e)
            }
            
        }
    };


    // Eliminar ficheiro
    const deleteFile = (e) => {
        e.target.parentElement.parentElement.parentElement.parentElement.parentElement.children[1].value = "";
        //e.target.parentElement.parentElement.parentElement.parentElement.children[1].children[0].value = "";
        dispatch( changeReceptionSubmited( {receptionsubmited: []} ) )
        dispatch( changeFileProducts( {fileProducts: null} ) )
        dispatch( changeReceptionFailed( {productsWithError: null} ) )
        dispatch( changeMenu({ menu: Menus.Products }) )
    };

    // Permitir mudar id caso dê erro na recepção
    const changeCode = (e) => {
        let inputMaterialSap = e.target.parentElement.children[0].value;
        let productIndex = e.target.parentElement.children[1].value;

        productsError.splice(productsError.indexOf(file[productIndex].Material_SAP.toString(), 1))

        file[productIndex].Material_SAP = parseInt(inputMaterialSap);
        
        dispatch( changeFileProducts( {fileProducts: file} ) );
        if(productsError.length !== 0) {
            dispatch( changeReceptionFailed( {productsWithError: productsError} ) );
        } else if(productsSubmited.length > 0) {
            dispatch( changeReceptionFailed( {productsWithError: [] } ) );
        } else {
            dispatch( changeReceptionFailed( {productsWithError: null} ) );
        }
        

        //console.log("dispatch")

        dispatch( changeMenu({ menu: Menus.ProductsToEdit }) );
    }



    if(file != null) {
        // Caso não exista produtos com erro após o envio da recepção
        if(productsError === null)  {
            return (
                <div className="WorkPlaceContainer">
                    <Header></Header>
                    <Form.Control type="file" onChange={validateFile} className="inputFile" />
                    <div className="tableContainer" >
                        <form onSubmit={sendReception}>
                        <div className="submitContainer">
                            <div></div>
                            <div>
                                <Button onClick={deleteFile}>Delete File</Button>
                                <Button type="submit" className="send">Send Reception</Button>
                            </div>
                        </div>                    
                        <div>
                            <div className="inputsContainer">
                                <Form.Control type="text" placeholder="Id Doc Origem" name="idDocOrigem"></Form.Control>
                                <Form.Select name="codigoentidade">
                                    <option value="AMB">Ambar</option>
                                    <option value="AMS">Ambar Science</option>
                                </Form.Select>
                            </div>
                            
                            <Form.Control as="textarea" rows={2} placeholder="Notas" className="notes" name="notes"></Form.Control>
                        </div>
                        <Table>
                            <thead>
                                <tr>
                                    <th><input type="checkbox" onChange={selectAll} className="selectAll" value={file}></input></th>
                                    <th>Material_SAP</th>
                                    <th>Descricao_Interna_SAP_PT</th>
                                    <th>Gp_Material</th>
                                    <th>Embalagem</th>
                                    <th>EAN</th>
                                </tr>
                            </thead>
                            <tbody>
                                    {
                                        file.map( (product, index) => {
                                            return (
                                                <tr>
                                                    <td><input type="checkbox" value={JSON.stringify(product)}></input></td>
                                                    <td>{product.Material_SAP}</td>
                                                    <td>{product.Descricao_Interna_SAP_PT}</td>
                                                    <td>{product.Gp_Material}</td>
                                                    <td>{product.Embalagem}</td>
                                                    <td>{product.EAN}</td>
                                                </tr>
                                            )                                     
                                        })
                                    }
                            </tbody>
                        </Table>
                        </form>
                    </div>
                </div>
            )
        // Caso em que a receção foi feita com sucesso
        } else if( productsError.length === 0)  {
            return (
                <div className="WorkPlaceContainer">
                    <Header></Header>
                    <Form.Control type="file" onChange={validateFile} className="inputFile" />
                    <div className="tableContainer" >
                        <form onSubmit={sendReception}>
                        <div className="submitContainer">
                            <div>
                                <Alert variant="success">Receção submetida com sucesso!</Alert>
                            </div>
                            <div>
                                <Button onClick={deleteFile}>Delete File</Button>
                                <Button type="submit" className="send">Send Reception</Button>
                            </div>
                        </div>                    
                        <div>
                            <div className="inputsContainer">
                                <Form.Control type="text" placeholder="Id Doc Origem" name="idDocOrigem"></Form.Control>
                                <Form.Select name="codigoentidade">
                                    <option value="AMB">Ambar</option>
                                    <option value="AMS">Ambar Science</option>
                                </Form.Select>
                            </div>
                            
                            <Form.Control as="textarea" rows={2} placeholder="Notas" className="notes" name="notes"></Form.Control>
                        </div>
                        <Table>
                            <thead>
                                <tr>
                                    <th><input type="checkbox" onChange={selectAll} className="selectAll" value={file}></input></th>
                                    <th>Material_SAP</th>
                                    <th>Descricao_Interna_SAP_PT</th>
                                    <th>Gp_Material</th>
                                    <th>Embalagem</th>
                                    <th>EAN</th>
                                </tr>
                            </thead>
                            <tbody>
                                    {
                                        file.map( (product, index) => {
                                            //console.log(productsSubmited)
                                            if(productsSubmited.includes(product.Material_SAP.toString())) {
                                                return (
                                                    <tr style={{backgroundColor:"#DDE0E3"}} >
                                                        <td><input type="checkbox" value={JSON.stringify(product)} disabled ></input></td>
                                                        <td>{product.Material_SAP}</td>
                                                        <td>{product.Descricao_Interna_SAP_PT}</td>
                                                        <td>{product.Gp_Material}</td>
                                                        <td>{product.Embalagem}</td>
                                                        <td>{product.EAN}</td>
                                                    </tr>
                                                )    
                                            } else {
                                                return (
                                                    <tr>
                                                        <td><input type="checkbox" value={JSON.stringify(product)}></input></td>
                                                        <td>{product.Material_SAP}</td>
                                                        <td>{product.Descricao_Interna_SAP_PT}</td>
                                                        <td>{product.Gp_Material}</td>
                                                        <td>{product.Embalagem}</td>
                                                        <td>{product.EAN}</td>
                                                    </tr>
                                                )    
                                            }                                                                     
                                        })
                                    }
                            </tbody>
                        </Table>
                        </form>
                    </div>
                </div>
            )
        // Caso em que obtem-se erros
        } else {
            let productsErrorString = "";
            for (let i = 0; i < productsError.length; i++) {
                productsErrorString += '\n' + productsError[i];
                
            }
            return (
                
                <div className="WorkPlaceContainer">
                    <Header></Header>
                    <Form.Control type="file" onChange={validateFile} className="inputFile" />
                    <div className="tableContainer" >
                        <form onSubmit={sendReception}>
                        <div className="submitContainer">
                            <div>
                                <Alert variant="warning">Produtos não existentes no WMS: {productsErrorString}</Alert>
                            </div>
                            <div>
                                <Button onClick={deleteFile} style={{maxHeight:"5vh"}}>Delete File</Button>
                                <Button type="submit" className="send"  style={{maxHeight:"5vh"}}>Send Reception</Button>
                            </div>
                        </div>                    
                        <div>
                            <div className="inputsContainer">
                                <Form.Control type="text" placeholder="Id Doc Origem" name="idDocOrigem"></Form.Control>
                                <Form.Select name="codigoentidade">
                                    <option value="AMB">Ambar</option>
                                    <option value="AMS">Ambar Science</option>
                                </Form.Select>
                            </div>
                            
                            <Form.Control as="textarea" rows={2} placeholder="Notas" className="notes" name="notes"></Form.Control>
                        </div>
                        <Table>
                            <thead>
                                <tr>
                                    <th><input type="checkbox" onChange={selectAll} className="selectAll" value={file}></input></th>
                                    <th>Material_SAP</th>
                                    <th>Descricao_Interna_SAP_PT</th>
                                    <th>Gp_Material</th>
                                    <th>Embalagem</th>
                                    <th>EAN</th>
                                </tr>
                            </thead>
                            <tbody>
                                    {
                                        file.map( (product, index) => {
                                            
                                            if(productsError.includes(product.Material_SAP.toString())) {
                                                //console.log("1111")
                                                return (
                                                    <tr style={{backgroundColor:"red"}}>
                                                        <td><input type="checkbox" value={JSON.stringify(product)}></input></td>
                                                        <td style={{display: "flex"}}>
                                                            <Form.Control type="text" defaultValue={product.Material_SAP} style={{marginRight: "10%"}}></Form.Control>
                                                            <Form.Control type="hidden" value={index}></Form.Control>
                                                            <Button onClick={changeCode} >Save</Button>
                                                        </td>
                                                        <td>{product.Descricao_Interna_SAP_PT}</td>
                                                        <td>{product.Gp_Material}</td>
                                                        <td>{product.Embalagem}</td>
                                                        <td>{product.EAN}</td>
                                                    </tr>
                                                )
                                            } else {
                                                //console.log("0000")
                                                if(productsSubmited.includes(product.Material_SAP.toString())) {
                                                    return (
                                                        <tr style={{backgroundColor:"#DDE0E3"}} >
                                                            <td><input type="checkbox" value={JSON.stringify(product)} disabled ></input></td>
                                                            <td>{product.Material_SAP}</td>
                                                            <td>{product.Descricao_Interna_SAP_PT}</td>
                                                            <td>{product.Gp_Material}</td>
                                                            <td>{product.Embalagem}</td>
                                                            <td>{product.EAN}</td>
                                                        </tr>
                                                    )    
                                                } else {
                                                    return (
                                                        <tr>
                                                            <td><input type="checkbox" value={JSON.stringify(product)}></input></td>
                                                            <td>{product.Material_SAP}</td>
                                                            <td>{product.Descricao_Interna_SAP_PT}</td>
                                                            <td>{product.Gp_Material}</td>
                                                            <td>{product.Embalagem}</td>
                                                            <td>{product.EAN}</td>
                                                        </tr>
                                                    )    
                                                }       
                                            }                                        
                                        })
                                    }
                            </tbody>
                        </Table>
                        </form>
                    </div>
                </div>
            )
        }
    // Ainda não foi carregado nenhum ficheiro
    } else {
        return (
            <div className="WorkPlaceContainer">
                <Header></Header>
                <Form.Control type="file" onChange={validateFile} className="inputFile" />
            </div>
        )
    }

    
}

export default Products