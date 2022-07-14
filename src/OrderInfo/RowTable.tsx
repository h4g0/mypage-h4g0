import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export function RowTable(props: any) {
    //console.log(props['order'])
    //console.log(props.order[props.key])
    
    return (
        
        <tr>
            <td>{props.key}</td>
            <td>{props.order[props.key]}</td>
        </tr>
    )
} 

export default RowTable