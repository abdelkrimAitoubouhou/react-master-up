import React from 'react';
import {OverlayTrigger, Tooltip} from "react-bootstrap";

const TableWrapper = ({data, columns, handleEdit, onDelete}) => {
    return (
        <div>
            <table className="table" style={{fontSize: 14}}>
                <thead>
                <tr>
                    {columns && columns.map(column =>
                        <th key={column}
                            scope="col" style={{
                            fontFamily: 'Lato',
                            textAlign: column === 'Action' ? 'center' : 'left'
                        }}>{column}</th>
                    )}
                </tr>
                </thead>
                <tbody>
                {data && data.map(item =>
                    <tr  key={item.id} style={{fontFamily: 'Lato'}}>
                        <td>{item && item.product && item.product.title}</td>
                        <td>{item && item.product && item.product.price}</td>
                        <td>{item && item.product && item.product.currency}</td>
                        <td>{item && item.product && item.product.company}</td>
                        <td>{item && item.quantity}</td>
                        <td>{item && item.emplacement}</td>
                        <td className="text-center">
                            <OverlayTrigger placement="bottom" overlay={(props) => (
                                <Tooltip id="tooltip-top" {...props}>
                                    Update
                                </Tooltip>
                            )}>
                                <span role="button" onClick={() => handleEdit(item)}>
                                    <svg fill="#1c8c34" width="30px" height="30px" viewBox="0 0 24 24"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M12.5,10.2071068 L8,14.7071068 L8,16 L9.29289322,16 L13.7928932,11.5 L12.5,10.2071068 Z M13.2071068,9.5 L14.5,10.7928932 L15.7928932,9.5 L14.5,8.20710678 L13.2071068,9.5 Z M12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 Z M12,21 C16.9705627,21 21,16.9705627 21,12 C21,7.02943725 16.9705627,3 12,3 C7.02943725,3 3,7.02943725 3,12 C3,16.9705627 7.02943725,21 12,21 Z M14.8535534,7.14644661 L16.8535534,9.14644661 C17.0488155,9.34170876 17.0488155,9.65829124 16.8535534,9.85355339 L9.85355339,16.8535534 C9.7597852,16.9473216 9.63260824,17 9.5,17 L7.5,17 C7.22385763,17 7,16.7761424 7,16.5 L7,14.5 C7,14.3673918 7.05267842,14.2402148 7.14644661,14.1464466 L14.1464466,7.14644661 C14.3417088,6.95118446 14.6582912,6.95118446 14.8535534,7.14644661 Z"/>
                                    </svg>
                                </span>
                            </OverlayTrigger>

                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default TableWrapper;
