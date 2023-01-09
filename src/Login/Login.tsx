import './Login.css'

import hugo from "./../hugo.jpg"

import {
    BrowserRouter as Router,
    Route,
    Link,
    useParams,
    Routes,
  } from "react-router-dom";


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
                                      <a href="https://h4g0.github.io/gc2022.pdf">  <p>A model-driven approach for DevOps Hugo Gião IEEE Symposium on Visual Languages and Human-Centric Computing (VL/HCC’22) </p></a>

                                      <a href="https://h4g0.github.io/LPBlocks___A_Block_based_Language_for_LinearProgramming.pdf">    <p>LPBlocks - A Block-based Language for Linear Programming - Master thesis supervised by
Jácome Cunha and co-supervised by Rui Pereira,</p> </a>


<a href="https://h4g0.github.io/INForum21_LPBlocks__Linear_Programming_Meets_Block_basedLanguages.pdf">   <p>Towards a Block-based Language for Linear Programming? Hugo Gião, Rui Pereira, Jácome
Cunha 12th National Symposium of Informatics (INForum’21)</p> </a>

<a href="https://h4g0.github.io/VLHCC21_LPBlocks__Linear_Programming_Meets_Block_basedLanguages.pdf">    <p>Linear Programming Meets Block-based Languages Hugo Gião, Rui Pereira, Jácome Cunha
IEEE Symposium on Visual Languages and Human-Centric Computing (VL/HCC’21)</p>   </a>    



             
</div> 
                    <p> 
</p>
    </>
                }
                
                function Bio(props: any) {
                    return <><div className="NewAccountContainer">
                    <p>
                    Hi, my name is Hugo da Gião, I am currently doing research at the intersection of DevOps and Model-driven engineering, and i am a researcher at HASLab/INESC TEC. I am also a Ph.D. student in Informatics Engineering at FEUP working on a thesis titled "A Model-driven approach to DevOps" whose end goal is to research methodologies and tools that would allow developers to create different DevOps pipelines without resorting to the use of specific tools. I also did research in the field of visual languages where I worked on creating a visual language to allow non-technical users to solve optimization problems.
                    </p>
                    <p>My CV can accessed <a href="https://h4g0.github.io/cv.pdf">here</a>
.</p>

<img className="profilePic" src={hugo} alt="profile"></img>


                       </div> </>
        
        }


               

        function Interests(props: any) {
            return <><div className="NewAccountContainer">
            <p>
            My current research interests are the following: </p>     
         <ul>
            <li>
            Software engineering
            </li>
            <li>
                DevOps
            </li>
            <li>
                Model-driven software engineering
            </li>
            <li>
                Human-centered computing
            </li>
            <li>
                Visual languages
            </li>
         </ul>

               </div> </>

}
                
              

    return (
        <Router>
        



                <div className="LoginContainer">

               <div>
                <h1 >Hugo da Gião</h1>
   
                    <Link to="/Bio">            

                <button>Bio</button>

                </Link>

                <Link to="/Interests">            

                <button>Research Interests</button>

                </Link>

                <Link to="/Publications">            

                <button>Publications</button>

                </Link>

                <Link to="/Education">            

                <button>Education</button>

                </Link>
            </div>
               </div>
               

            



         
                <Routes>        

            
            <Route path="/" element={<Bio />} />

            <Route path="Bio" element={<Bio />} />

            <Route path="Interests" element={<Interests />} />

            
            <Route path="Publications" element={<Publications />} />

            <Route path="Education" element={<Educaton />} />

            </Routes>

            
        </Router>


      
    )
    
}

export default Login