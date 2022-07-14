import './Login.css'
import { get_token } from './get_token'
import { useSelector,useDispatch } from 'react-redux'
import { newLogin,changePassword,changeUser,changeMenu, editOrder } from '../UpdateState/Actions'
import Menus from './../Menus/Types'
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
    BrowserRouter as Router,
    Route,
    Link,
    useParams,
    Routes,
    useNavigate,
  } from "react-router-dom";
import { useReducer } from 'react'


export function Login(this: any, props: any) {
        
    let id  = useParams()

    console.log(id)
    /*
    return ( <div className="login-div-external">
                <h1 className="login-message"> Login backoffice </h1>
                 <div className="login-div-internal">
                        <input type="username" className="login-username" placeholder="Username" onChange={updateUsername}/>
                        <input type="password" className="login-password" placeholder="Password" onChange={updatePassword}/>
                        <div>
                            <button className="login-new-account" onClick={createNewAccount} > Request new account </button>
                            <button className="login-login-button" onClick={getToken}> Login </button>
                        </div>
                    </div>   
                </div>)
                */

                
              


            function Educaton(props: any) {
                return <><div className="NewAccountContainer">
                <p>Bachelors in Computer Science 2016-2019
University of Minho</p>     

<p>Masters in Informatics engineering 2019-2022
University of Minho</p>   

                <p>  Doctoral Program in Informatics Engineering 2022-
                University of Porto, Faculty of Engineering   </p>
</div> </>
            }

                function Publications(props: any) {
                    return <><div className="NewAccountContainer">
                    <p>Linear Programming Meets Block-based Languages Hugo Gião, Rui Pereira, Jácome Cunha
IEEE Symposium on Visual Languages and Human-Centric Computing (VL/HCC’21)</p>       


                <p>Towards a Block-based Language for Linear Programming? Hugo Gião, Rui Pereira, Jácome
Cunha 12th National Symposium of Informatics (INForum’21)</p> 

                <p>LPBlocks - A Block-based Language for Linear Programming - Master thesis supervised by
Jácome Cunha and co-supervised by Rui Pereira,</p>
                    <p>A model-driven approach for DevOps Hugo Gião IEEE Symposium on Visual Languages and Human-Centric Computing (VL/HCC’22)</p>
</div> 
                    <p> 
</p>
    </>
                }
                
                function Bio(props: any) {
                    return <><div className="NewAccountContainer">
                    <p>
                    Hi, my name is Hugo da Gião, I am currently doing research at the intersection of DevOps and Model-driven engineering, and i am a researcher at HASLab/INESC TEC. I am also a Ph.D. student in Informatics Engineering at FEUP working on a thesis titled "A Model-driven approach to DevOps" whose end goal is to research methodologies and tools that would allow developers to create different DevOps pipelines without resorting to the use of specific tools. I also did research in the field of visual languages where I worked on creating a visual language to allow non-technical users to solve optimization problems. </p>     
                    <p>My CV can accessed <a href="https://h4g0.github.io/cv.pdf">here</a>
.</p>

                       </div> </>
        
        }
                
              

    return (
        <Router>
          <div className="LoginContainer">
            <h1 >Hugo Afonso da Gião</h1>
            
            <Link to="/Bio">            
            
            <button>Bio</button>

            </Link>

            <Link to="/Publications">            
            
            <button>Publications</button>

            </Link>

            <Link to="/Education">            
            
            <button>Education</button>

            </Link>
           </div>
           
          
            <Routes>        
            
            <Route path="/" element={<Bio />} />

            <Route path="Bio" element={<Bio />} />

            
            <Route path="Publications" element={<Publications />} />

            <Route path="Education" element={<Educaton />} />

            </Routes>

            
        </Router>


      
    )
    
}

export default Login