import { Dropdown, DropdownButton, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css'
import { useDispatch } from 'react-redux'
import Menus from './../Menus/Types'
import { changeCancelOrderState, changeCurrentOrder, changeFieldsOrder, changeFileProducts, changefilterStateOrder, changeFindOrder, changeMenu, changeOriginalOrder, changeReceptionFailed, changeReceptionInfo, changeReceptions, changeReceptionSubmited, editOrder, logOut } from '../UpdateState/Actions'

export function Header(props: any) {

    let dispatch = useDispatch()

    // Sempre que mudar de pagina faz reset à variáveis globais
    const resetGlobalVars = () => {

        dispatch( changeCurrentOrder( { currentOrder: null } ) )
        dispatch( changeOriginalOrder( { originalOrder: null } ) )
        dispatch( changeFieldsOrder( { fieldsOrder: [] } ) )
        dispatch( changeFileProducts( {fileProducts: null} ) )
        dispatch( changeReceptionFailed( {productsWithError: null} ) )
        dispatch( changeReceptionSubmited( {receptionsubmited: []} ) )
        dispatch( editOrder( { edit: false } ) )
        dispatch( changeReceptions( { receptions: null } ) )
        dispatch( changeReceptionInfo( { receptionInfo: null } ) )
        dispatch( changeFindOrder( { findOrder: null } ) )
        dispatch( changeCancelOrderState( { cancelOrder: "" } ) )
        dispatch( changefilterStateOrder({filterStateOrder: ""}));
    }

    const gologOut = () => {
        
        resetGlobalVars();
        dispatch( logOut() )
    }

    const goToWorkplace = () => {
        resetGlobalVars();
        dispatch( changeMenu({ menu: Menus.Workplace }) )
        
    }

    const goToProducts = () => {
        resetGlobalVars();
        dispatch( changeMenu({ menu: Menus.Products }) )
        
    }

    const goToReceptions = () => {
        resetGlobalVars();
        dispatch( changeMenu({ menu: Menus.Receptions }) )
    }

    const goToStock = () => {
        resetGlobalVars();
        dispatch( changeMenu({ menu: Menus.Stock }) )
        
    }

    const goToOrder = () => {
        resetGlobalVars();
        dispatch( changeMenu({ menu: Menus.SearchOrder }) )
        
    }

    

    return(
        <div className="WorkPlaceMenu">
            <DropdownButton id="dropdown-basic-button" title="Middleware Backoffice">
                <Dropdown.Item onSelect={goToWorkplace} >Orders</Dropdown.Item>
                <Dropdown.Item onSelect={goToReceptions}>Receptions</Dropdown.Item>
                <Dropdown.Item onSelect={goToProducts}>Send Reception</Dropdown.Item>
                <Dropdown.Item onSelect={goToStock} >Stock</Dropdown.Item>
                <Dropdown.Item onSelect={goToOrder} >Search Order</Dropdown.Item>
            </DropdownButton>

            <Button variant="primary" onClick={gologOut}> Logout </Button>
        </div>
    )
}

export default Header