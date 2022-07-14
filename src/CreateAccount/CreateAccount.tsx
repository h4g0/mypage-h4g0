import React from 'react'
import './CreateAccount.css'
import { useSelector,useDispatch } from 'react-redux'
import { changePassword,changeEmail,changeUser,changeMenu, changePassword2 } from '../UpdateState/Actions'
import Menus from './../Menus/Types'
import { request_account } from './request_account'
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


import {
    BrowserRouter as Router,
    Route,
    Link,
    useParams,
    useNavigate,
    Routes,
  } from "react-router-dom";

export function CreateAccount(props: any) {
   
    let dispatch = useDispatch()

    
    
    let menu: any = useSelector( (state: any) => state.menu)
    
    if (menu !== Menus.CreateAccount) return null

    function Bio(props: any) {
        return <><div className="NewAccountContainer">
        <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus</p>        </div> </>
    }
    

    /*
    return ( <div className="account-div-external">
                <h1 className="account-message"> Request new account </h1>
                <button className="account-return-login-menu" onClick={returnMainMenu}> Return to main menu </button>
                 <div className="account-div-internal">
                        <input type="username" className="account-username" placeholder="Username" onChange={updateUsername}/>
                        <input type="email" className="account-email" placeholder="Email" onChange={updateEmail}/>
                        <input type="password" className="account-password" placeholder="Password" onChange={updatePassword}/>
                        <input type="password" className="account-password2" placeholder="Repeat password" onChange={updatePassword2}/>
                        <div>
                            <button className="account-login-button" onClick={createAccount} > Request new account </button>
                        </div>
                    </div>   
                </div>)
    */

    return (
        <Router>



        </Router>
    
    )
    
}

export default CreateAccount