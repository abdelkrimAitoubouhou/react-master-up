import React, {useEffect, useState} from 'react';
import Title from "../../containers/Title";
import {ButtonWrapper, Paper, SpanWrapper} from "../orders/OrderComponent";
import {Button, Form, InputGroup, Modal, OverlayTrigger, Tooltip} from "react-bootstrap";
import {connect, useDispatch} from "react-redux";
import {allUsers, removeUser} from "../../actions/authService";
import Logo from "../logo-re.png";

const columns = [
    {
        key: 'firstName',
        value: 'First Name'
    },
    {
        key: 'lastName',
        value: 'Last Name'
    },
    {
        key: 'email',
        value: 'Email'
    }, {
        key: 'phone',
        value: 'Phone'
    }, {
        key: 'username',
        value: 'Username'
    }, {
        key: 'status',
        value: 'Status'
    }, {
        key: 'actions',
        value: 'Actions'
    }
];
const UserComponent = (props) => {

        const [show, setShow] = useState(false);
        const [warning, setWarning] = useState(false);
        const [selected, setSelected] = useState({});

        const {clients} = props;
        const dispatch = useDispatch();

        useEffect(() => {
            if (clients && clients.length === 0) {
                dispatch(allUsers());
            }
        }, [clients]);


        const handleClose = () => {
            setShow(false);
            setWarning(false);
        };

        const handleRemove = data => {
            setWarning(true);
            setSelected(data);
        };
        const handleEdit = data => {
            setShow(true);
            setSelected(data);
        };


        return (
            <div className="py-5">
                <div className="container">
                    {/*<Title title="Client Management"/>*/}
                    <div className="row">
                        <div className="logo">
                            <img  className="logoClient" src={Logo} alt="Logo" />
                        </div>
                    </div>
                    <Paper>
                        <table className="table" style={{fontSize: 14}}>
                            <thead className="text-center" style={{fontFamily: 'Lato_semibold'}}>
                            <tr>
                                {columns && columns.map(column =>
                                    <th key={column.key} scope="col" style={{fontFamily: 'Lato'}}>
                                        {column.value}
                                    </th>
                                )}
                            </tr>
                            </thead>
                            <tbody className="text-center">
                            {clients && clients.map(client =>
                                <tr style={{fontFamily: 'Lato'}} key={client.id}>
                                    {columns && columns.map(column =>
                                        column.key === 'status' ? (
                                                <td key={column.key} className="text-center">
                                                    <SpanWrapper width={100} color="#FFF" padding='5px 20px'
                                                                 bgColor='rgb(124, 197, 181)'>
                                                        {client[column.key]}
                                                    </SpanWrapper>

                                                </td>
                                            ) :
                                            column.key === 'actions' ? (
                                                    <td key={column.key}>
                                                        <OverlayTrigger placement="bottom" overlay={(props) => (
                                                            <Tooltip id="tooltip-top" {...props}>
                                                                Update
                                                            </Tooltip>
                                                        )}>
                                                                <span role="button" onClick={() => handleEdit(client)}>
                                                                    <svg fill="#1c8c34" width="27px" height="30px"
                                                                         viewBox="0 0 24 24"
                                                                         xmlns="http://www.w3.org/2000/svg">
                                                                        <path
                                                                            d="M12.5,10.2071068 L8,14.7071068 L8,16 L9.29289322,16 L13.7928932,11.5 L12.5,10.2071068 Z M13.2071068,9.5 L14.5,10.7928932 L15.7928932,9.5 L14.5,8.20710678 L13.2071068,9.5 Z M12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 Z M12,21 C16.9705627,21 21,16.9705627 21,12 C21,7.02943725 16.9705627,3 12,3 C7.02943725,3 3,7.02943725 3,12 C3,16.9705627 7.02943725,21 12,21 Z M14.8535534,7.14644661 L16.8535534,9.14644661 C17.0488155,9.34170876 17.0488155,9.65829124 16.8535534,9.85355339 L9.85355339,16.8535534 C9.7597852,16.9473216 9.63260824,17 9.5,17 L7.5,17 C7.22385763,17 7,16.7761424 7,16.5 L7,14.5 C7,14.3673918 7.05267842,14.2402148 7.14644661,14.1464466 L14.1464466,7.14644661 C14.3417088,6.95118446 14.6582912,6.95118446 14.8535534,7.14644661 Z"/>
                                                                    </svg>
                                                                </span>
                                                        </OverlayTrigger>

                                                        <OverlayTrigger placement="bottom" overlay={(props) => (
                                                            <Tooltip id="tooltip-top" {...props}>
                                                                Delete
                                                            </Tooltip>
                                                        )}>
                                                                <span role="button"
                                                                      onClick={() => handleRemove(client.id)}>
                                                                    <svg width="28px" height="30px"
                                                                         viewBox="0 0 1024 1024" fill="#d8503d"
                                                                         className="icon"
                                                                         version="1.1"
                                                                         xmlns="http://www.w3.org/2000/svg">
                                                                        <path
                                                                            d="M512 897.6c-108 0-209.6-42.4-285.6-118.4-76-76-118.4-177.6-118.4-285.6 0-108 42.4-209.6 118.4-285.6 76-76 177.6-118.4 285.6-118.4 108 0 209.6 42.4 285.6 118.4 157.6 157.6 157.6 413.6 0 571.2-76 76-177.6 118.4-285.6 118.4z m0-760c-95.2 0-184.8 36.8-252 104-67.2 67.2-104 156.8-104 252s36.8 184.8 104 252c67.2 67.2 156.8 104 252 104 95.2 0 184.8-36.8 252-104 139.2-139.2 139.2-364.8 0-504-67.2-67.2-156.8-104-252-104z"
                                                                            fill=""/>
                                                                        <path
                                                                            d="M707.872 329.392L348.096 689.16l-31.68-31.68 359.776-359.768z"
                                                                            fill=""/>
                                                                        <path d="M328 340.8l32-31.2 348 348-32 32z"
                                                                              fill=""/>
                                                                    </svg>
                                                                </span>
                                                        </OverlayTrigger>

                                                    </td>
                                                )
                                                : (
                                                    <td key={column.key}>
                                                        {client[column.key]}
                                                    </td>
                                                )
                                    )}
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </Paper>
                </div>

                <Modal size="lg" show={show} onHide={handleClose} centered style={{fontFamily: 'Lato'}}>
                    <Modal.Header style={{backgroundColor: '#303c50', color: '#fff', fontFamily: 'Lato_light'}}>
                        <Modal.Title>Edit Customer</Modal.Title>
                        <Button onClick={handleClose}
                                style={{backgroundColor: "transparent", borderColor: "transparent"}}
                                data-bs-dismiss="modal"
                                data-bs-target="#exampleModal">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" fill="currentColor"
                                 className="bi bi-x-lg" viewBox="0 0 16 16">
                                <path
                                    d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                            </svg>
                        </Button>
                    </Modal.Header>
                    <Modal.Body style={{padding: '2rem'}}>
                        <InputGroup className="mb-3">
                            <Form.Control type="text" placeholder="Title"/>
                            <InputGroup.Text>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-braces" viewBox="0 0 16 16">
                                    <path
                                        d="M2.114 8.063V7.9c1.005-.102 1.497-.615 1.497-1.6V4.503c0-1.094.39-1.538 1.354-1.538h.273V2h-.376C3.25 2 2.49 2.759 2.49 4.352v1.524c0 1.094-.376 1.456-1.49 1.456v1.299c1.114 0 1.49.362 1.49 1.456v1.524c0 1.593.759 2.352 2.372 2.352h.376v-.964h-.273c-.964 0-1.354-.444-1.354-1.538V9.663c0-.984-.492-1.497-1.497-1.6zM13.886 7.9v.163c-1.005.103-1.497.616-1.497 1.6v1.798c0 1.094-.39 1.538-1.354 1.538h-.273v.964h.376c1.613 0 2.372-.759 2.372-2.352v-1.524c0-1.094.376-1.456 1.49-1.456V7.332c-1.114 0-1.49-.362-1.49-1.456V4.352C13.51 2.759 12.75 2 11.138 2h-.376v.964h.273c.964 0 1.354.444 1.354 1.538V6.3c0 .984.492 1.497 1.497 1.6z"/>
                                </svg>
                            </InputGroup.Text>
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <Form.Control type="text" placeholder="Company"/>
                            <InputGroup.Text>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-buildings" viewBox="0 0 16 16">
                                    <path
                                        d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022ZM6 8.694 1 10.36V15h5V8.694ZM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15Z"/>
                                    <path
                                        d="M2 11h1v1H2v-1Zm2 0h1v1H4v-1Zm-2 2h1v1H2v-1Zm2 0h1v1H4v-1Zm4-4h1v1H8V9Zm2 0h1v1h-1V9Zm-2 2h1v1H8v-1Zm2 0h1v1h-1v-1Zm2-2h1v1h-1V9Zm0 2h1v1h-1v-1ZM8 7h1v1H8V7Zm2 0h1v1h-1V7Zm2 0h1v1h-1V7ZM8 5h1v1H8V5Zm2 0h1v1h-1V5Zm2 0h1v1h-1V5Zm0-2h1v1h-1V3Z"/>
                                </svg>
                            </InputGroup.Text>
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <Form.Control type="number" placeholder="Price"/>
                            <InputGroup.Text style={{padding: '0.375rem 0.95rem'}}>$</InputGroup.Text>
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <Form.Control type="number" placeholder="Quantity"/>
                            <InputGroup.Text>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-123" viewBox="0 0 16 16">
                                    <path
                                        d="M2.873 11.297V4.142H1.699L0 5.379v1.137l1.64-1.18h.06v5.961h1.174Zm3.213-5.09v-.063c0-.618.44-1.169 1.196-1.169.676 0 1.174.44 1.174 1.106 0 .624-.42 1.101-.807 1.526L4.99 10.553v.744h4.78v-.99H6.643v-.069L8.41 8.252c.65-.724 1.237-1.332 1.237-2.27C9.646 4.849 8.723 4 7.308 4c-1.573 0-2.36 1.064-2.36 2.15v.057h1.138Zm6.559 1.883h.786c.823 0 1.374.481 1.379 1.179.01.707-.55 1.216-1.421 1.21-.77-.005-1.326-.419-1.379-.953h-1.095c.042 1.053.938 1.918 2.464 1.918 1.478 0 2.642-.839 2.62-2.144-.02-1.143-.922-1.651-1.551-1.714v-.063c.535-.09 1.347-.66 1.326-1.678-.026-1.053-.933-1.855-2.359-1.845-1.5.005-2.317.88-2.348 1.898h1.116c.032-.498.498-.944 1.206-.944.703 0 1.206.435 1.206 1.07.005.64-.504 1.106-1.2 1.106h-.75v.96Z"/>
                                </svg>
                            </InputGroup.Text>
                        </InputGroup>
                    </Modal.Body>

                    <div className="d-flex justify-content-sm-between" style={{padding: '0.9rem 2rem'}}>
                        <ButtonWrapper bgColor='#E7E8EB' color="#606779" onClick={handleClose}>
                            Cancel
                        </ButtonWrapper>
                        <div>
                            <ButtonWrapper bgColor='#606779' color="#FFF" className="mr-2" onClick={handleClose}>
                                Reset
                            </ButtonWrapper>
                            <ButtonWrapper bgColor='#D6AE4F' color='#FFF' onClick={handleClose}>
                                Modify
                            </ButtonWrapper>
                        </div>

                    </div>
                </Modal>

                <Modal size="lg" show={warning} onHide={() => setWarning(false)} centered
                       style={{fontFamily: 'Lato'}}>
                    <Modal.Header style={{backgroundColor: '#303c50', color: '#fff', fontFamily: 'Lato_light'}}>
                        <Modal.Title>Warning</Modal.Title>
                        <Button onClick={handleClose}
                                style={{backgroundColor: "transparent", borderColor: "transparent"}}
                                data-bs-dismiss="modal"
                                data-bs-target="#exampleModal">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" fill="currentColor"
                                 className="bi bi-x-lg" viewBox="0 0 16 16">
                                <path
                                    d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                            </svg>
                        </Button>
                    </Modal.Header>
                    <Modal.Body style={{padding: '4rem 1.2rem', fontSize: 20, fontFamily: 'Lato_light'}}>
                        Do you really want to delete this customer ?
                    </Modal.Body>
                    <div className="d-flex justify-content-sm-between" style={{padding: '0.9rem 2rem'}}>
                        <ButtonWrapper bgColor='#E7E8EB' color="#606779" onClick={handleClose}>
                            Cancel
                        </ButtonWrapper>
                        <ButtonWrapper bgColor='#D6AE4F' color='#FFF' onClick={() => dispatch(removeUser(selected))}>
                            CONFIRM
                        </ButtonWrapper>

                    </div>
                </Modal>
            </div>

        );
    }
;

const mapStateToProps = state => {
    return {
        clients: state.auth.clients,
    }
}
export default connect(mapStateToProps)(UserComponent);
