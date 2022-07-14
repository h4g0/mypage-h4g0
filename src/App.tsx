import Login from './Login/Login'
import CreateAccount from './CreateAccount/CreateAccount';
import { Provider } from 'react-redux'
import loginStore from './UpdateState/Store'
import Workplace  from './Workplace/Workplace';
import OrderInfo from './OrderInfo/OrderInfo';
import Products from './Products/Products';
import ProductsToEdit from './Products/ProductsToEdit';
import Stock from './Stock/Stock';
import SearchOrder from './SearchOrder/SearchOrder';
import Receptions from './Receptions/Receptions';
import ReceptionInfo from './Receptions/ReceptionInfo';

// App principal onde contem um Provider que contem todas as páginas ativando-as consoante o estado da variavel menu

function App() {
  return (
    <Provider store={loginStore} >
       <Login></Login>
    </Provider>
   
  );
}



export default App;
