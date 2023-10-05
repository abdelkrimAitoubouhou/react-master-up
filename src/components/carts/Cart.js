import React, {Component} from 'react';
import Title from '../../containers/Title';
import CartColumns from './CartColumns';
import EmptyCart from './EmptyCart';
import {ProductConsumer} from '../../context/context';
import CartList from './CartList';
import CartTotals from './CartTotals';
import styled from "styled-components";

export default class Cart extends Component {
    render() {
        return (
            <section style={{ position: 'relative', top: '3rem' }}>
                <ProductConsumer>
                    {(value) => {
                        const {cart} = value;
                        if (cart.length > 0) {
                            return (
                                <React.Fragment>
                                    <DivWrapper>
                                        <CartColumns/>
                                        <CartList value={value}/>
                                        <CartTotals value={value}/>
                                    </DivWrapper>


                                </React.Fragment>
                            );
                        } else {
                            return (
                                <EmptyCart/>
                            );
                        }
                    }}
                </ProductConsumer>

            </section>
        );
    }
}

const DivWrapper = styled.div`
  background-color: rgb(255, 255, 255);
  padding: 50px 0;
  width: 80%;
  margin: auto;
`;
