import React, {useEffect, useState} from 'react';
import TableWrapper from "../../containers/TableWrapper";
import Title from "../../containers/Title";
import {Button, Form, InputGroup, Modal} from 'react-bootstrap';
import styled from "styled-components";
import {ButtonWrapper} from "../orders/OrderComponent";
import {connect, useDispatch} from "react-redux";
import {allStore, editQuantity} from "../../actions/storeService";
import Logo from "../logo-re.png";

const StockComponent = ({list, loading}) => {

    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState({});
    const [quantity, setQuantity] = useState(0);
    const [action, setAction] = useState('add');

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(allStore())
    }, []);

    useEffect(() => {
        if (selected && selected.quantity) {
            setQuantity(selected.quantity)
        }
    }, [selected]);

    const onchange = q => {
        setQuantity(q);
    }

    const columns = ['Title', 'Price', 'Currency', 'Company', 'Quantity', 'Location', 'Action'];

    const handleClose = () => {
        setShow(false);
    };
    const handleEditQuantity = async () => {
        await dispatch(editQuantity(selected.id, quantity));
        setShow(false);
        setSelected({});
    };

    const handleEdit = data => {
        setShow(true);
        setAction('edit');
        setSelected(data);
    };

    return (
        <React.Fragment>
            <div>
                <div style={{position: 'relative', top: '1rem'}} className="container">
                    {/*<Title title="Stock management"/>*/}

                    <div className="row">
                        <div className="logo">
                            <img  className="logoStock" src={Logo} alt="Logo" />
                        </div>
                    </div>

                    <Paper>
                        <TableWrapper handleEdit={handleEdit} data={list} columns={columns}/>
                    </Paper>
                </div>
            </div>

            <Modal size="lg" show={show} onHide={handleClose} centered style={{fontFamily: 'Lato'}}>
                <Modal.Header style={{backgroundColor: '#303c50', color: '#fff', fontFamily: 'Lato_light'}}>
                    <Modal.Title>{action === 'add' ? 'Add new product' : 'Edit product'}</Modal.Title>
                    <Button onClick={handleClose}
                            style={{backgroundColor: "transparent", borderColor: "transparent", boxShadow: 'none'}}
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
                        <Form.Control disabled type="text" placeholder="Title"
                                      value={selected && selected.product && selected.product.title}/>
                        <InputGroup.Text>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-braces" viewBox="0 0 16 16">
                                <path
                                    d="M2.114 8.063V7.9c1.005-.102 1.497-.615 1.497-1.6V4.503c0-1.094.39-1.538 1.354-1.538h.273V2h-.376C3.25 2 2.49 2.759 2.49 4.352v1.524c0 1.094-.376 1.456-1.49 1.456v1.299c1.114 0 1.49.362 1.49 1.456v1.524c0 1.593.759 2.352 2.372 2.352h.376v-.964h-.273c-.964 0-1.354-.444-1.354-1.538V9.663c0-.984-.492-1.497-1.497-1.6zM13.886 7.9v.163c-1.005.103-1.497.616-1.497 1.6v1.798c0 1.094-.39 1.538-1.354 1.538h-.273v.964h.376c1.613 0 2.372-.759 2.372-2.352v-1.524c0-1.094.376-1.456 1.49-1.456V7.332c-1.114 0-1.49-.362-1.49-1.456V4.352C13.51 2.759 12.75 2 11.138 2h-.376v.964h.273c.964 0 1.354.444 1.354 1.538V6.3c0 .984.492 1.497 1.497 1.6z"/>
                            </svg>
                        </InputGroup.Text>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <Form.Control disabled type="text" placeholder="Company"
                                      value={selected && selected.product && selected.product.company}/>
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
                        <Form.Control disabled type="number" placeholder="Price"
                                      value={selected && selected.product && selected.product.price}/>
                        <InputGroup.Text style={{padding: '0.375rem 0.95rem'}}>$</InputGroup.Text>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <Form.Control type="number" placeholder="Quantity" value={quantity}
                                      onChange={e => onchange(e.target.value)}/>
                        <InputGroup.Text>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-123" viewBox="0 0 16 16">
                                <path
                                    d="M2.873 11.297V4.142H1.699L0 5.379v1.137l1.64-1.18h.06v5.961h1.174Zm3.213-5.09v-.063c0-.618.44-1.169 1.196-1.169.676 0 1.174.44 1.174 1.106 0 .624-.42 1.101-.807 1.526L4.99 10.553v.744h4.78v-.99H6.643v-.069L8.41 8.252c.65-.724 1.237-1.332 1.237-2.27C9.646 4.849 8.723 4 7.308 4c-1.573 0-2.36 1.064-2.36 2.15v.057h1.138Zm6.559 1.883h.786c.823 0 1.374.481 1.379 1.179.01.707-.55 1.216-1.421 1.21-.77-.005-1.326-.419-1.379-.953h-1.095c.042 1.053.938 1.918 2.464 1.918 1.478 0 2.642-.839 2.62-2.144-.02-1.143-.922-1.651-1.551-1.714v-.063c.535-.09 1.347-.66 1.326-1.678-.026-1.053-.933-1.855-2.359-1.845-1.5.005-2.317.88-2.348 1.898h1.116c.032-.498.498-.944 1.206-.944.703 0 1.206.435 1.206 1.07.005.64-.504 1.106-1.2 1.106h-.75v.96Z"/>
                            </svg>
                        </InputGroup.Text>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <Form.Control disabled type="text" placeholder="Location"
                                      value={selected && selected.emplacement}/>
                        <InputGroup.Text>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-shop-window" viewBox="0 0 16 16">
                                <path
                                    d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h12V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zm2 .5a.5.5 0 0 1 .5.5V13h8V9.5a.5.5 0 0 1 1 0V13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a.5.5 0 0 1 .5-.5z"/>
                            </svg>
                        </InputGroup.Text>
                    </InputGroup>

                    {action !== 'edit' && (
                        <InputGroup className="mb-3">
                            <Form.Control type="file" placeholder="Choose an image"/>
                            <InputGroup.Text>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-phone" viewBox="0 0 16 16">
                                    <path
                                        d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z"/>
                                    <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                                </svg>
                            </InputGroup.Text>
                        </InputGroup>
                    )}

                </Modal.Body>

                <div className="d-flex justify-content-sm-between" style={{padding: '0.9rem 2rem'}}>
                    <ButtonWrapper bgColor='#E7E8EB' color="#606779" onClick={handleClose}>
                        Cancel
                    </ButtonWrapper>
                    <div>
                        <ButtonWrapper bgColor='#606779' color="#FFF" className="mr-2" onClick={handleClose}>
                            Reset
                        </ButtonWrapper>
                        <ButtonWrapper bgColor='#D6AE4F' color='#FFF' onClick={handleEditQuantity}>
                            {action === 'add' ? 'Submit' : 'Edit'}
                        </ButtonWrapper>
                    </div>

                </div>
            </Modal>

        </React.Fragment>
    );
}
const mapStateToProps = state => {
    return {
        list: state.storeReducer.list,
        loading: state.storeReducer.loading
    }
}

export default connect(mapStateToProps)(StockComponent);

const Paper = styled.div`
  background-color: #fff;
  padding: 50px;
`;
