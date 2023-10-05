import React from 'react';
import {ButtonWrapper} from "../orders/OrderComponent";
import {connect, useDispatch} from "react-redux";
import {saveCommand} from "../../actions/commandService";

const CartTotals = ({value: {cartSubTotal, cartTax, cartTotal, clearCart, cart}}) => {

    const dispatch = useDispatch();

    console.log('cart {}', cart);

    return (
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right"
                         style={{fontFamily: 'Lato_medium'}}>

                        <ButtonWrapper
                            bgColor='#606779'
                            color="#FFF"
                            className="mr-2"
                            onClick={() => {
                                clearCart()
                            }}>
                            Clear
                        </ButtonWrapper>
                        <ButtonWrapper
                            bgColor='#D6AE4F'
                            color='#FFF'
                            className="mb-5"
                            onClick={() => {
                                dispatch(saveCommand(cart, clearCart))
                            }}>Approve
                        </ButtonWrapper>

                        <h5>
                            <span> Sum :</span>{" "}
                            <strong>$ {cartSubTotal} </strong>
                        </h5>
                        <h5>
                            <span> tax :</span>{" "}
                            <strong>$ {cartTax} </strong>
                        </h5>
                        <h5 className="mt-5">
                            <span> total :</span>{" "}
                            <strong>$ {cartTotal} </strong>
                        </h5>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
const mapStateToProps = state => {
    return {
        loading: state.commandReducer.loading,
        alert: state.auth.alert
    }
};
export default connect(mapStateToProps)(CartTotals);
