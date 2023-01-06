import Login from './Login/Login'
import "./App.css"


// App principal onde contem um Provider que contem todas as páginas ativando-as consoante o estado da variavel menu

function App() {
  return (
    <div className='App'>
       <Login></Login>
    </div>
   
  );
}



export default App;
